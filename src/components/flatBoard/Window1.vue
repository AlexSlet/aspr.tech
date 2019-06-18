<template>
  <div class="myModal">
    <div class="modalOverlay" @click="$emit('closeModal')"></div>
    <div class="modalBox">
      <h3 class="comModalTitle">
        Введите параметры
        <span @click="$emit('closeModal')" class="closeModal">✕</span>
      </h3>
      <div class="pa-3">
        <v-layout row wrap>
          <v-flex xs12>
            <span>Выберите тип счетчика</span>
            <v-select
              height="30"
              hide-details
              v-model="ecs.pmeter_aparttype"
              :items="pmeter_aparttype"
              placeholder="тип счетчика"
              item-text="name"
              item-value="id"
              outline
            ></v-select>
          </v-flex>
          <v-flex xs12>
            <span>Производитель</span>
            <v-select
              height="30"
              hide-details
              v-model="ecs.pmeter_mnf"
              :items="pmeter_mnf"
              item-text="name"
              item-value="id"
              placeholder="Производитель"
              outline
            ></v-select>
          </v-flex>
        </v-layout>
        <h4 class="mt-2">Параметры вводного автомата</h4>
        <v-layout row>
          <v-flex xs6 class="mr-2">
            <v-select
              height="30"
              hide-details
              v-model="ecs.incb.incb_current"
              :items="getCurrent"
              placeholder="Номинальный ток"
              outline
            ></v-select>
          </v-flex>
          <v-flex xs6>
            <v-select
              height="30"
              hide-details
              v-model="ecs.incb.incb_voltage"
              :items="incb_voltage"
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
              v-model="ecs.incb.incb_mnf"
              :items="incb_mnf"
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
              v-model="ecs.incb.incb_series"
              :items="incb_series"
              item-text="name"
              item-value="id"
              placeholder="Серия"
              outline
            ></v-select>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12>
            <h4 class="mt-2">Укажите параметры корпуса шкафа</h4>
            <v-radio-group hide-details class="ma-0" v-model="ecs.ecs_aparttype">
              <v-radio label="Пластиковый корпус" :value="1"></v-radio>
              <v-radio label="металический навесной" :value="2"></v-radio>
            </v-radio-group>
          </v-flex>
        </v-layout>
        <v-btn color="blue darken-4" outline class="mt-3 ml-0" @click="saveData()">Сохранить</v-btn>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    dataFilds: Object
  },
  data: () => ({
    ecs: {
      pmeter_aparttype: 1,
      pmeter_mnf: 84,
      ecs_aparttype: 1,
      incb: {
        incb_current: 10,
        incb_voltage: 230,
        incb_mnf: 2,
        incb_series: 0
      }
    },
    pmeter_aparttype: [
      {
        name: "Однофазный многотарифный (2 тарифа)",
        id: 1
      },
      {
        name: "Счетчик элекроэнергии с GSM",
        id: 2
      }
    ],
    incb_voltage: [230, 400],
    pmeter_mnf: [
      { name: "Ленэлектро", id: 84 },
      { name: "НЕВА", id: 81 },
      { name: "Меркурий", id: 82 },
      { name: "Альфа", id: 83 }
    ],
    incb_mnf: [
      { name: "DEKraft", id: 2 },
      { name: "IEK", id: 3 },
      { name: "TDM", id: 4 },
    ],
    incb_series: [{ name: "Бюджетная", id: 0 }]
  }),
  methods: {
    saveData() {
      this.$emit("saved", {
        name: "insw",
        data: this.ecs
      });
    }
  },
  computed: {
    getCurrent() {
      return this.$store.getters.getCurrent;
    }
  },
  created() {
    if (Object.keys(this.dataFilds).length != 0) {
      this.ecs = this.dataFilds;
    }
  }
};
</script>
<style scoped>
</style>

