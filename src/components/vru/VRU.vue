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
                <v-btn color="blue darken-4" outline @click="comecs = !comecs">Ввести данные</v-btn>
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
            <v-btn color="success" :disabled="ifDisable" dark large @click="calc()">Рассчитать</v-btn>
            <v-btn
              v-if="isUser"
              color="info"
              :disabled="ifDisable"
              large
              @click="sendBoard()"
            >Сохранить</v-btn>
          </v-flex>
        </v-layout>
      </v-flex>
      <window1
        :dataFilds="forSend.insw"
        v-if="insw"
        @closeModal="insw = !insw"
        @saved="setSaved($event)"
      ></window1>
      <window2
        :dataFilds="forSend.list_outcb"
        v-if="list_outcb"
        @closeModal="list_outcb = !list_outcb"
        @saved="setSaved($event)"
      ></window2>
      <window3
        :dataFilds="forSend.comecs"
        v-if="comecs"
        @closeModal="comecs = !comecs"
        @saved="setSaved($event)"
      ></window3>
      <Result
        :resData="resData"
        v-if="resultOpen"
        @recount="recount($event)"
        @closeModal="resultOpen = !resultOpen"
      ></Result>
    </v-layout>
    <write-name v-if="modalName" @sendName="saveName($event)"></write-name>
  </v-container>
</template>
<script>
import Window1 from "@/components/vru/Window1";
import Window2 from "@/components/flatBoard/Window2";
import Window3 from "@/components/vru/Window3";
import Result from "@/components/Result";
import WriteName from "@/components/WriteName";
export default {
  name: "VRU",
  components: {
    Window1,
    Window2,
    Window3,
    Result,
    WriteName
  },
  data: () => ({
    insw: false,
    comecs: false,
    list_outcb: false,
    resultOpen: false,
    modalName: false,
    isSaved: {
      insw: false,
      comecs: false,
      list_outcb: false
    },
    id_board: -1,
    resData: {},
    forSend: {
      type: 2,
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
      this.axios
        .post("math/switchboardv1", this.forSend, {
          headers: {
            "Content-Type": "text/plain"
          }
        })
        .then(res => {
          this.resData = { ...res.data };
          this.resultOpen = true;
          console.log(res);
        });
    },
    sendBoard() {
      if (this.id_board != -1) {
        this.updateBoard();
      } else {
        this.saveBoard();
      }
    },
    saveBoard() {
      this.axios
        .post(
          "users/saveasmbl",
          {
            id_user: this.user.id,
            save_json: { ...this.forSend }
          },
          {
            headers: {
              "Content-Type": "text/plain"
            }
          }
        )
        .then(res => {
          this.id_board = res.data;
          this.$router.push("/myboard");
        });
    },
    updateBoard() {
      this.axios
        .post(
          "users/updasmbl",
          {
            id: this.id_board,
            id_user: this.user.id,
            save_json: { ...this.forSend }
          },
          {
            headers: {
              "Content-Type": "text/plain"
            }
          }
        )
        .then(res => {
          this.$router.push("/myboard");
        });
    },
    saveName(name) {
      this.forSend.name = name;
      this.modalName = false;
    },
    checkUser() {
      if (this.isUser && this.forSend.name == "noname") {
        this.modalName = true;
      }
    },
    recount(mnf) {
      this.forSend.insw.incb.incb_mnf = mnf;
      this.forSend.list_outcb.map(item => {
        item.outcb_mnf = mnf;
      });
      this.calc();
    },
    ifEdit() {
      let editObj = this.$store.getters.getForEdit;
      if (Object.keys(editObj).length > 0) {
        this.forSend = { ...editObj };
        this.id_board = editObj.id;
        this.isSaved = {
          insw: true,
          comecs: true,
          list_outcb: true
        };
      }
      this.$store.commit("clearEdited");
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
    this.ifEdit();
    this.checkUser();
  }
};
</script>

<style>
</style>
