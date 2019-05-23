<template>
  <div class="myModal">
    <div class="modalOverlay" @click="$emit('closeModal')"></div>
    <div class="modalBox">
      <h3 class="commonCard">Отходящие линии <span @click="$emit('closeModal')" class="closeModal">✕</span></h3>
      <div class="pa-3">
        <div v-for="(item, i) in list_outcb" :key="i">
          <h4 class="mb-2 mt-2">
            Параметры отходящего автомата {{i+1}}
            <span
              v-if="list_outcb.length > 1"
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
                v-model="list_outcb[i].outcb_current"
                :items="outcb_current"
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

        <v-btn color="commonBtn" dark class="mt-3 ml-0" @click="saveData()">Сохранить</v-btn>
        <v-btn color="secondCommonBtn" dark class="mt-3 ml-0" @click="addIncb()">Добавить автомат</v-btn>
      </div>
    </div>
  </div>
</template>
<script>
import { log } from "util";
export default {
  data: () => ({
    list_outcb: [
      {
        outcb_current: "",
        outcb_voltage: "",
        outcb_mnf: "",
        outcb_series: ""
      }
    ],
    outcb_current: [
      10,
      16,
      20,
      25,
      32,
      40,
      50,
      63,
      80,
      100,
      125,
      160,
      200,
      250,
      320,
      400,
      500,
      630,
      800,
      1000,
      1250,
      1600,
      2000,
      2500,
      3200,
      4000,
      5000,
      6300
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
      this.list_outcb.push({
        outcb_current: "",
        outcb_voltage: "",
        outcb_mnf: "",
        outcb_series: ""
      });
    },
    removeIncb(index) {
      this.list_outcb.splice(index, 1);
    },
    saveData() {
      for (let i = 0; i < this.list_outcb.length; i++) {
        let values = Object.values(this.list_outcb[i]);

        if (values.indexOf("") != -1) {
          this.$emit("saved", {
            name: "outgoing",
            data: false
          });
          this.message = true;
          return;
        } else {
          this.$emit("saved", {
            name: "outgoing",
            data: true
          });
          this.$store.commit("setData", {
            name: "list_outcb",
            data: this.list_outcb
          });
          this.message = false;
        }
      }
    }
  },
  created() {
    let data = this.$store.getters.getListOut;
    if (Object.keys(data).length != 0) {
      this.list_outcb = data;
    }
  }
};
</script>
<style scoped>
h3 {
  color: #fff;
  padding: 10px;
}
.removeItem {
  padding: 5px;
  color: red;
  cursor: pointer;
}
</style>

