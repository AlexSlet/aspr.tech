<template>
  <div class="myModal">
    <div class="modalOverlay" @click="$emit('closeModal')"></div>
    <div class="modalBox">
      <h3 class="commonCard">Вводные автоматы <span @click="$emit('closeModal')" class="closeModal">✕</span></h3>
      <div class="pa-3">
        <h4>Количество вводных автоматов</h4>
        <v-select
          height="30"
          hide-details
          v-model="intrObj.amount_incb"
          :items="amount_incb"
          item-text="name"
          item-value="id"
          outline
        ></v-select>
        <h4>Параметры вводного автомата</h4>
        <v-layout>
          <v-flex xs6 class="mr-2">
            <v-select
              height="30"
              hide-details
              v-model="intrObj.incb.incb_current"
              :items="incb_current"
              placeholder="Номинальный ток"
              outline
            ></v-select>
          </v-flex>
          <v-flex xs6>
            <v-select
              height="30"
              hide-details
              v-model="intrObj.incb.incb_voltage"
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
              v-model="intrObj.incb.incb_mnf"
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
              v-model="intrObj.incb.incb_series"
              outline
            ></v-select>
          </v-flex>
        </v-layout>
        <h4 v-if="intrObj.amount_incb > 1" class="mt-2">Тип АВР (автоматический ввод резерва)</h4>
        <v-select
          v-if="intrObj.amount_incb > 1"
          height="30"
          hide-details
          v-model="intrObj.air_type"
          :items="air_type"
          item-text="name"
          item-value="id"
          outline
        ></v-select>
        <v-switch
          v-model="pmeter_need"
          :label="`Необходимость в счетчиках`"
          class="mt-2"
          hide-details
        ></v-switch>
        <div v-show="pmeter_need">
          <h4 class="mt-2">Укажите количество счетчиков:</h4>
          <v-select
            height="30"
            hide-details
            v-model="intrObj.pmeter_amount"
            :items="pmeter_amount"
            outline
          ></v-select>
          <h4 class="mt-2">Введите параметры счетчика</h4>
          <v-layout class="mt-2">
            <v-flex xs6 class="mr-2">
              <v-select
                height="30"
                hide-details
                v-model="intrObj.pmeter.pmeter_mnf"
                :items="pmeter_mnf"
                item-text="name"
                item-value="id"
                placeholder="Производитель"
                outline
              ></v-select>
              <span style="color: red;" v-if="message">Заполните все поля!</span>
            </v-flex>
            <v-flex xs6>
              <v-switch
                v-model="pmeter_net"
                :label="`Необходимость в связи RS-485 для счетчика`"
                class="mt-0"
                hide-details
              ></v-switch>
            </v-flex>
          </v-layout>
        </div>
        <v-btn color="commonBtn" dark class="mt-3 ml-0" @click="saveData()">Сохранить</v-btn>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    intrObj: {
      amount_incb: 1,
      incb: {
        incb_current: '',
        incb_voltage: '',
        incb_mnf: '',
        incb_series: 0
      },
      air_type: 0,
      pmeter_need: 0,
      pmeter_amount: 1,
      pmeter: {
        pmeter_mnf: 81,
        pmeter_net: 0
      }
    },
    amount_incb: [
      { name: "1 ввод", id: 1 },
      { name: "2 ввод", id: 2 },
      { name: "3 ввод", id: 3 }
    ],
    incb_current: [
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
    air_type: [{ name: "Ручной", id: 1 }, { name: "Автоматический", id: 2 }],
    pmeter_need: true,
    pmeter_amount: [1, 2, 3],
    pmeter_mnf: [
      { name: "НЕВА", id: 81 },
      { name: "Меркурий", id: 82 },
      { name: "Альфа", id: 83 }
    ],
    pmeter_net: true,
    message: false,
  }),
  methods: {
    saveData(){
      let values = Object.values(this.intrObj.incb);
        if(values.indexOf('') != -1){
          this.$emit('saved', {
            name: 'insw',
            data: false
          });
          this.message = true;
          
          return
        } else {
          this.$emit('saved', {
            name: 'insw',
            data: true
          });
          this.message = false;
          this.$store.commit("setData", {
              name: "insw",
              data: this.intrObj
            });
        }
    }
  },
  watch: {
    pmeter_need: function(val) {
      this.intrObj.pmeter_need = +val;
    },
    pmeter_net: function(val) {
      this.intrObj.pmeter_net = +val;
    }
  },
  created(){
    let data = this.$store.getters.getInsw;
    if(Object.keys(data).length != 0){
      this.intrObj = data;
    }
  }
};
</script>
<style scoped>
h3 {
  color: #fff;
  padding: 10px;
}
</style>

