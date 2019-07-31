<template>
  <v-layout row wrap>
    <v-flex xs12>
      <ul>
        <li v-for="(res,index) in data" :key="index">
          <template v-if="res.list_eq.length > 0">
            <h4 class="mb-1">{{tabName[index]}}:</h4>
            <ul>
              <li class="device-item" v-for="(eq,i) in res.list_eq" :key="i">
                <div>
                  <span>{{eqName[eq.eq_type]}}:</span>
                  <template v-if="eq.eq_type === 5">
                    <span class="ml-2">{{ecs[eq[type[eq.eq_type] + '_apart'] - 1]}}</span>
                  </template>
                  <template v-else>
                    <span
                      v-if="!isExist(eq[type[eq.eq_type] + '_current'])"
                      class="ml-2"
                    >{{eq[type[eq.eq_type] + '_current']}}A</span>
                    <span class="ml-2">{{eq.voltage}}В</span>
                    <span class="ml-2">{{manufc[eq[type[eq.eq_type] + '_mnf']]}}</span>
                    <span class="ml-2">{{eq[type[eq.eq_type] + '_amount']}} шт.</span>
                  </template>
                  <span class="remove-item" @click="removeItem(index,i,eq.eq_type)">✕</span>
                </div>
              </li>
            </ul>
          </template>
        </li>
      </ul>
    </v-flex>
    <v-flex v-show="calcReady" xs12 class="mt-4">
      <v-btn block color="success" @click="calc()">Рассчитать</v-btn>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  props: {
    data: Object,
    requiredDevices: Object
  },
  data() {
    return {};
  },
  methods: {
    isExist(elem) {
      return elem === undefined ? true : false;
    },
    removeItem(tabIndex, equipIndex, equipType) {
      let dubl = false;
      let dublArr = this.data[tabIndex].list_eq.filter(eq => {
        return eq.eq_type == equipType;
      });
      dubl =  dublArr.length > 1 ? true : false;
      
      this.$emit("removeItem", {
        tabIndex: tabIndex,
        equipIndex: equipIndex,
        equipType: equipType,
        dubl: dubl
      });
    },
    calc(){
      this.$emit('calc');
    }
  },
  computed: {
    tabName() {
      return this.$store.getters.getTabName;
    },
    eqName() {
      return this.$store.getters.getEqName;
    },
    manufc() {
      return this.$store.getters.getManufc;
    },
    ecs() {
      return this.$store.getters.getEcs;
    },
    type() {
      return this.$store.getters.getDevTypes;
    },
    calcReady() {
      let length = 0;
      for (let key in this.requiredDevices) {
        length += this.requiredDevices[key].length;
      }
      return length === 0;
    }
  }
};
</script>
<style scoped>
.device-item {
  border-bottom: 1px solid #ccc;
  padding: 0 0 5px 0;
  margin-bottom: 5px;
  position: relative;
}
.remove-item {
  position: absolute;
  right: -5px;
  color: red;
  padding: 0px;
  cursor: pointer;
}
</style>

