<template>
  <div class="myModal">
    <div class="modalOverlay" @click="$emit('closeModal')"></div>
    <div class="modalBox">
      <h3 class="comModalTitle">
        Отходящие линии
        <span @click="$emit('closeModal')" class="closeModal">✕</span>
      </h3>
      <div class="pa-3">
        <div v-for="(item, i) in list_incb" :key="i">
          <h4 class="mb-2 mt-2">
            Параметры отходящего автомата {{i+1}}
            <span
              v-if="list_incb.length > 1"
              class="ml-3 removeItem"
              @click="removeIncb(i)"
            >✕</span>
          </h4>
          <span style="color: red;" v-if="message">Заполните все поля!</span>
          <v-layout>
            <v-flex xs6 class="mr-2">
              <v-select
                height="30"
                hide-details
                v-model="list_incb[i].outcb_current"
                :items="getCurrent"
                placeholder="Номинальный ток"
                outline
              ></v-select>
            </v-flex>
            <v-flex xs6>
              <v-select
                height="30"
                hide-details
                v-model="item.outcb_voltage"
                :items="outcb_voltage"
                placeholder="Напряжение"
                outline
              ></v-select>
            </v-flex>
          </v-layout>
          <v-layout class="mt-2">
            <v-flex xs6 class="mr-2">
              <v-select
                height="30"
                hide-details
                v-model="item.outcb_mnf"
                :items="outcb_mnf"
                item-text="name"
                item-value="id"
                placeholder="Производитель"
                outline
              ></v-select>
            </v-flex>
            <v-flex xs6>
              <v-select
                height="30"
                hide-details
                v-model="item.outcb_series"
                :items="outcb_series"
                item-text="name"
                item-value="id"
                placeholder="Серия"
                outline
              ></v-select>
            </v-flex>
          </v-layout>
        </div>

        <v-btn color="blue darken-4" outline class="mt-3 ml-0" @click="saveData()">Сохранить</v-btn>
        <v-btn color="warning" outline class="mt-3 ml-0" @click="addIncb()">Добавить автомат</v-btn>
      </div>
    </div>
  </div>
</template>
<script>
import { log } from "util";
export default {
  props: {
    dataFilds: Array
  },
  data: () => ({
    list_incb: [
      {
        outcb_current: 10,
        outcb_voltage: 230,
        outcb_mnf: 1,
        outcb_series: 0
      }
    ],
    outcb_voltage: [230, 400],
    outcb_mnf: [
      { name: "Schneider Electric", id: 1 },
      { name: "DEKraft", id: 2 },
      { name: "IEK", id: 3 },
      { name: "TDM", id: 4 },
      { name: "КЭАЗ", id: 5 },
      { name: "ABB", id: 6 }
    ],
    outcb_series: [{ name: "Бюджетная", id: 0 }],
    message: false
  }),
  methods: {
    addIncb() {
      this.list_incb.push({
        outcb_current: 10,
        outcb_voltage: 230,
        outcb_mnf: 1,
        outcb_series: 0
      });
    },
    removeIncb(index) {
      this.list_incb.splice(index, 1);
    },
    saveData() {
      this.$emit("saved", {
          name: "list_outcb",
          data: this.list_incb
        });
    },
  },
  computed: {
    getCurrent() {
      return this.$store.getters.getCurrent;
    }
  },
  created() {
    if (this.dataFilds.length != 0) {
      this.list_incb = this.dataFilds;
    }
  }
};
</script>
<style scoped>
.removeItem {
  padding: 5px;
  color: red;
  cursor: pointer;
}
</style>

