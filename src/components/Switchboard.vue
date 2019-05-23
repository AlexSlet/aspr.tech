<template>
  <v-layout row wrap>
    <v-flex xs6>
      <img src="@/assets/Switchboard.jpg" alt="Switchboard">
    </v-flex>
    <v-flex xs6>
      <h2 style="text-align: center;">Заполните данные распределительного устройства</h2>
      <v-card class="ma-3 white--text" color="commonCard">
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">Вводные автоматы</h3>
          </div>
        </v-card-title>
        <v-card-actions class="mt-4">
          <v-layout row wrap>
            <v-flex xs6>
              <v-btn dark color="secondCommonBtn" @click="insw = !insw">Ввести данные</v-btn>
            </v-flex>
            <v-flex xs6 style="text-align: right;">
              <v-icon v-if="isSaved.insw" class="mt-2" color="green">check_circle</v-icon>
              <v-icon v-if="!isSaved.insw" class="mt-2" color="red">highlight_off</v-icon>
            </v-flex>
          </v-layout>
        </v-card-actions>
      </v-card>
      <v-card class="ma-3 white--text" color="commonCard">
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">Отходящие линии</h3>
          </div>
        </v-card-title>
        <v-card-actions class="mt-4">
          <v-layout row wrap>
            <v-flex xs6>
              <v-btn dark color="secondCommonBtn" @click="outgoing = !outgoing">Ввести данные</v-btn>
            </v-flex>
            <v-flex xs6 style="text-align: right;">
              <v-icon v-if="isSaved.outgoing" class="mt-2" color="green">check_circle</v-icon>
              <v-icon v-if="!isSaved.outgoing" class="mt-2" color="red">highlight_off</v-icon>
            </v-flex>
          </v-layout>
        </v-card-actions>
      </v-card>
      <v-card class="ma-3 white--text" color="commonCard">
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">Уточнения к комплектации</h3>
          </div>
        </v-card-title>
        <v-card-actions class="mt-4">
          <v-layout row wrap>
            <v-flex xs6>
              <v-btn dark color="secondCommonBtn" @click="clarific = !outgoing">Ввести данные</v-btn>
            </v-flex>
            <v-flex xs6 style="text-align: right;">
              <v-icon v-if="isSaved.clarific" class="mt-2" color="green">check_circle</v-icon>
              <v-icon v-if="!isSaved.clarific" class="mt-2" color="red">highlight_off</v-icon>
            </v-flex>
          </v-layout>
        </v-card-actions>
      </v-card>
      <v-layout row wrap>
        <v-flex xs12 d-flex class="pa-2">
          <v-btn color="success" :disabled="ifDisable" dark large @click="calc()">Рассчитать</v-btn>
        </v-flex>
      </v-layout>
    </v-flex>
    <Introductory v-if="insw" @closeModal="insw = !insw" @saved="setSaved($event)"></Introductory>
    <Outgoing v-if="outgoing" @closeModal="outgoing = !outgoing" @saved="setSaved($event)"></Outgoing>
    <Clarifications v-if="clarific" @closeModal="clarific = !clarific" @saved="setSaved($event)"></Clarifications>
    <Result :resData="resData" v-if="resultOpen" @closeModal="resultOpen = !resultOpen"></Result>
  </v-layout>
</template>
<script>
import Introductory from "@/components/switchboard/Introductory";
import Outgoing from "@/components/switchboard/Outgoing";
import Clarifications from "@/components/switchboard/Clarifications";
import Result from "@/components/Result";
import { log } from 'util';
export default {
  name: 'Switchboard',
  components: {
    Introductory,
    Outgoing,
    Clarifications,
    Result
  },
  data: () => ({
    insw: false,
    outgoing: false,
    clarific: false,
    resultOpen: false,
    isSaved: {
      insw: false,
      outgoing: false,
      clarific: false
    },
    resData: {}
  }),
  methods: {
    setSaved(e){
      this.isSaved[e.name] = e.data;
    },
    calc(){
      this.$store.dispatch('sendData').then(res => {
        this.resultOpen = !this.resultOpen;
      })
    }
  },
  computed: {
    ifDisable(){
      let disArr = Object.values(this.isSaved);
      if(disArr.indexOf(false) == -1){
        return false;
      } else{
        return true;
      }
    }
  }
};
</script>

<style>

</style>
