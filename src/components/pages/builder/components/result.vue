<template>
  <v-layout row wrap>
    <v-flex xs12>
      <ul>
        <li v-for="(res,i) in data" :key="i">
          <template v-if="res.list_eq.length > 0">
            <h4 class="mb-1">{{tabName[i]}}:</h4>
            <ul>
              <li class="device-item" v-for="(eq,i) in res.list_eq" :key="i">
                <div>
                  <span>{{eqName[eq.eq_type]}}:</span>
                  <template v-if="eq.eq_type === 'ecs'">
                    <span class="ml-2">{{ecs[eq[eq.eq_type + '_apart']]}}</span>
                  </template>
                  <template v-else>
                    <span v-if="!isExist(eq[eq.eq_type + '_current'])" class="ml-2">{{eq[eq.eq_type + '_current']}}A</span>
                    <span class="ml-2">{{eq[eq.eq_type + '_voltage']}}В</span>
                    <span class="ml-2">{{manufc[eq[eq.eq_type + '_mnf']]}}</span>
                    <span class="ml-2">{{eq[eq.eq_type + '_amount']}} шт.</span>
                  </template>
                </div>
              </li>
            </ul>
          </template>
        </li>
      </ul>
    </v-flex>
    <v-flex v-show="false" xs12 class="mt-4">
      <v-btn block disabled color="success">Рассчитать</v-btn>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  props: {
    data: Object
  },
  data() {
    return {};
  },
  methods: {
    isExist(elem) {
      return elem === undefined ? true : false;
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
    }
  }
};
</script>
<style scoped>
.device-item{
    border-bottom: 1px solid #ccc;
    padding: 0 0 5px 0;
    margin-bottom: 5px;
}
</style>

