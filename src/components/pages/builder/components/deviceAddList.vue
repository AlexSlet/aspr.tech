<template>
  <v-layout row wrap>
    <v-flex xs12>
      <ul>
        <li class="py-2" v-for="item in list" :key="item.id">
          <h4>
            <span v-if="item.required">*</span>
            {{item.title}}
          </h4>
          <ul>
            <template v-if="item.list.length <= 1">
              <li v-for="(dev,i) in item.list" :key="i">
                <span class="deviceName">{{dev.name}}</span>
                <v-btn
                  fab
                  dark
                  small
                  color="info"
                  @click="$emit('addDevice', {
                  tab: type, id: item.id, eq_type: dev.eq_type
                })"
                >
                  <v-icon dark>add</v-icon>
                </v-btn>
              </li>
            </template>
            <template v-else>
              <li>
                <v-select
                  class="deviceSelect"
                  :items="item.list"
                  item-text="name"
                  item-value="eq_type"
                  v-model="selectVal"
                  solo
                ></v-select>
                <v-btn fab dark small color="info" @click="addBySelect(item)">
                  <v-icon dark>add</v-icon>
                </v-btn>
              </li>
            </template>
          </ul>
          <v-divider></v-divider>
        </li>
      </ul>
      <small>Поля со * обязательные!</small>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  props: {
    list: Array,
    type: String
  },
  data() {
    return {
      selectVal: ""
    };
  },
  methods: {
    addBySelect(item) {
      if (this.selectVal !== "") {
        this.$emit("addDevice", {
          tab: this.type,
          id: item.id,
          eq_type: this.selectVal
        });
      }
    }
  },
  computed: {}
};
</script>
<style scoped>
.deviceName {
  width: 70%;
  display: inline-block;
}
.deviceSelect {
  width: 70%;
  display: inline-block;
}
</style>

