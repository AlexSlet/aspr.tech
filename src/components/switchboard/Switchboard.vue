<template>
  <v-container>
    <v-layout row wrap justify-center>
      <v-flex xs6>
        <h2 class="mb-3" v-if="forSend.name != 'noname'">{{forSend.name}}</h2>
        <h3 style="text-align: center;">Заполните данные распределительного устройства</h3>
        <v-card class="ma-3 white--text" color="commonCard">
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">Вводные автоматы</h3>
            </div>
          </v-card-title>
          <v-card-actions class="mt-4">
            <v-layout row wrap>
              <v-flex xs6>
                <v-btn color="blue darken-4" outline @click="insw = !insw">Ввести данные</v-btn>
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
                <v-btn color="blue darken-4" outline @click="list_outcb = !list_outcb">Ввести данные</v-btn>
              </v-flex>
              <v-flex xs6 style="text-align: right;">
                <v-icon v-if="isSaved.list_outcb" class="mt-2" color="green">check_circle</v-icon>
                <v-icon v-if="!isSaved.list_outcb" class="mt-2" color="red">highlight_off</v-icon>
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
                <v-btn color="blue darken-4" outline @click="comecs = !list_outcb">Ввести данные</v-btn>
              </v-flex>
              <v-flex xs6 style="text-align: right;">
                <v-icon v-if="isSaved.comecs" class="mt-2" color="green">check_circle</v-icon>
                <v-icon v-if="!isSaved.comecs" class="mt-2" color="red">highlight_off</v-icon>
              </v-flex>
            </v-layout>
          </v-card-actions>
        </v-card>
        <v-layout row wrap>
          <v-flex xs12 d-flex class="pa-2">
            <v-btn color="success" :disabled="ifDisable" large @click="calc()">Рассчитать</v-btn>
            <v-btn
              v-if="isUser && myBoard"
              color="info"
              :disabled="ifDisable"
              large
              @click="saveBoard()"
            >Сохранить</v-btn>
          </v-flex>
        </v-layout>
      </v-flex>
      <Introductory
        :modalData="forSend.insw"
        v-if="insw"
        @closeModal="insw = !insw"
        @saved="setSaved($event)"
      ></Introductory>
      <Outgoing
        :modalData="forSend.list_outcb"
        v-if="list_outcb"
        @closeModal="list_outcb = !list_outcb"
        @saved="setSaved($event)"
      ></Outgoing>
      <Clarifications
        :modalData="forSend.comecs"
        v-if="comecs"
        @closeModal="comecs = !comecs"
        @saved="setSaved($event)"
      ></Clarifications>
      <Result :resData="resData" v-if="resultOpen" @recount="recount($event)" @closeModal="resultOpen = !resultOpen"></Result>
    </v-layout>
    <write-name v-if="modalName && myBoard" @sendName="saveName($event)"></write-name>
  </v-container>
</template>
<script>
import Introductory from "@/components/switchboard/Introductory";
import Outgoing from "@/components/switchboard/Outgoing";
import Clarifications from "@/components/switchboard/Clarifications";
import Result from "@/components/Result";
import WriteName from "@/components/WriteName";
export default {
  name: "Switchboard",
  components: {
    Introductory,
    Outgoing,
    Clarifications,
    Result,
    WriteName
  },
  data: () => ({
    insw: false,
    list_outcb: false,
    comecs: false,
    resultOpen: false,
    modalName: false,
    myBoard: false,
    isSaved: {
      insw: false,
      list_outcb: false,
      comecs: false
    },
    resData: {},
    forSend: {
      id_user: 0,
      type: 1,
      name: "noname",
      insw: {},
      list_outcb: [],
      comecs: {}
    }
  }),
  methods: {
    setSaved(e) {
      this[e.name] = false;
      this.isSaved[e.name] = true;
      this.forSend[e.name] = e.data;
    },
    calc() {
      return this.axios
        .post("math/switchboard", this.forSend, {
          headers: {
            "Content-Type": "text/plain"
          }
        })
        .then(res => {
          this.resData = { ...res.data };
          this.resultOpen = true;
        });
    },
    saveBoard() {
      this.axios.post("users/saveassamblies", this.forSend).then(res => {
        console.log(res);
      });
    },
    saveName(name) {
      this.forSend.name = name;
      this.modalName = false;
    },
    checkUser() {
      if (this.isUser && this.forSend.name == "noname") {
        this.modalName = true;
        this.forSend.id_user = this.user.id;
      }
    },
    recount(mnf){
      this.forSend.insw.incb.incb_mnf = mnf;
      this.forSend.list_outcb.map(item => {
        item.outcb_mnf = mnf;
      })
      this.calc();
    }
  },
  computed: {
    ifDisable() {
      let disArr = Object.values(this.isSaved);
      if (disArr.indexOf(false) == -1) {
        return false;
      } else {
        return true;
      }
    },
    isUser() {
      return this.$store.getters.getIsUser;
    },
    user() {
      return this.$store.getters.getUser;
    }
  },
  created() {
    this.checkUser();
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (from.path == "/myboard") {
        vm.myBoard = true;
      }
    });
  }
};
</script>

<style>
</style>
