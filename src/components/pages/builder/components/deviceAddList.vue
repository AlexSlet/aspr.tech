<template>
  <v-layout row wrap>
    <v-flex xs12>
      <ul>
        <li class="py-2" v-for="item in list" :key="item.id">
          <h4>{{item.title}}</h4>
          <ul>
            <template v-if="item.list.length <= 1">
              <li v-for="(btn,i) in item.list" :key="i">
                <span class="deviceName">{{btn}}</span>
                <v-btn fab dark small color="info" @click="$emit('addDevice', item.list[0])">
                  <v-icon dark>add</v-icon>
                </v-btn>
              </li>
            </template>
            <template v-else>
              <li>
                <v-select class="deviceSelect" :items="item.list" v-model="selectVal" solo></v-select>
                <v-btn fab dark small color="info" @click="$emit('addDevice', selectVal)">
                  <v-icon dark>add</v-icon>
                </v-btn>
              </li>
            </template>
          </ul>
          <v-divider></v-divider>
        </li>
      </ul>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  props: {
    list: Array
  },
  data() {
    return {
      selectVal: ''
    };
  },
  computed: {}
};
</script>
<style scoped>
ul {
  list-style: none;
  padding-left: 0;
}
.deviceName {
  width: 50%;
  display: inline-block;
}
.deviceSelect{
  width: 50%;
  display: inline-block;
}
</style>

