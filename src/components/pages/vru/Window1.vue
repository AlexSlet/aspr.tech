<template>
  <div class="myModal">
    <div class="modalOverlay" @click="$emit('closeModal')"></div>
    <div class="modalBox">
      <h3 class="comModalTitle">
        Вводные автоматы
        <span @click="$emit('closeModal')" class="closeModal">✕</span>
      </h3>
      <div class="pa-3">
        <h4>Количество вводных автоматов</h4>
        <v-select
          height="30"
          hide-details
          v-model="modalData.amount_incb"
          :items="amount_incb"
          item-text="name"
          item-value="id"
          outline
        ></v-select>
        <h4 class="mt-2">Способ переключения между вводами</h4>
        <v-select
          height="30"
          hide-details
          v-model="modalData.insw_switch"
          :items="insw_switch"
          item-text="name"
          item-value="id"
          outline
        ></v-select>
        <h4 class="mt-2">Способ осуществления ввода</h4>
        <v-radio-group hide-details class="ma-0" v-model="modalData.insw_in">
          <v-radio label="только автомат" :value="1"></v-radio>
          <v-radio label="рубильник+автомат" :value="2"></v-radio>
        </v-radio-group>
        <v-switch
          v-model="trasformNeed"
          :label="`Наличие узла учета на вводе`"
          class="mt-2"
          hide-details
        ></v-switch>
        <div v-show="modalData.pmeter_need">
          <h4 class="mt-2">Выберите тип счетчика</h4>
          <v-select
            height="30"
            hide-details
            item-text="name"
            item-value="id"
            v-model="modalData.pmeter_net"
            :items="pmeter_net"
            outline
          ></v-select>
        </div>
        <v-switch
          v-model="trasformAm"
          :label="`Измерительное оборудование(амперметры,вольтметры)`"
          class="mt-2"
          hide-details
        ></v-switch>
        <h4 class="mt-2">Параметры вводного автомата</h4>
        <v-layout>
          <v-flex xs6 class="mr-2">
            <v-select
              height="30"
              hide-details
              v-model="modalData.incb.incb_current"
              :items="getCurrent"
              placeholder="Номинальный ток"
              outline
            ></v-select>
          </v-flex>
          <v-flex xs6>
            <v-select
              height="30"
              hide-details
              v-model="modalData.incb.incb_voltage"
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
              v-model="modalData.incb.incb_mnf"
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
              :items="incb_series"
              item-text="name"
              item-value="id"
              placeholder="Серия"
              v-model="modalData.incb.incb_series"
              outline
            ></v-select>
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
    modalData: {
      amount_incb: 1,
      insw_switch: 0,
      insw_in: 1,
      insw_am: 0,
      pmeter_need: 0,
      pmeter_net: 0,
      incb: {
        incb_current: 10,
        incb_voltage: 230,
        incb_mnf: 1,
        incb_series: 0
      }
    },
    insw_am: false,
    insw_switch: [
      { name: "механический", id: 0 },
      { name: "автоматический", id: 1 },
      { name: "реверсивными рубильниками (схема крест)", id: 2 },
      { name: "АВР на моторных автоматах схема 2в2", id: 3 }
    ],
    amount_incb: [
      { name: "1 ввод", id: 1 },
      { name: "2 ввод", id: 2 },
      { name: "3 ввод", id: 3 }
    ],
    incb_voltage: [230, 400],
    incb_mnf: [
      { name: "Schneider Electric", id: 1 },
      { name: "DEKraft", id: 2 },
      { name: "IEK", id: 3 },
      { name: "TDM", id: 4 },
      { name: "КЭАЗ", id: 5 },
      { name: "ABB", id: 6 }
    ],
    incb_series: [{ name: "Бюджетная", id: 0 }],
    pmeter_need: false,
    pmeter_net: [
      { name: "типовой счетчик для ВРУ", id: 0 },
      { name: "счетчик с gsm модемом", id: 1 }
    ],
    message: false
  }),
  methods: {
    saveData() {
      this.$emit("saved", {
        name: "insw",
        data: this.modalData
      });
    }
  },
  computed: {
    getCurrent() {
      return this.$store.getters.getCurrent;
    },
    trasformNeed: {
      get: function() {
        return this.modalData.pmeter_need;
      },
      set: function(val) {
        return this.modalData.pmeter_need = +val;
      }
    },
    trasformAm: {
      get: function() {
        return this.modalData.insw_am;
      },
      set: function(val) {
        return this.modalData.insw_am = +val;
      }
    },
  },
  created() {
    if (Object.keys(this.dataFilds).length != 0) {
      this.modalData = this.dataFilds;
    }
  }
};
</script>
<style scoped>
</style>

