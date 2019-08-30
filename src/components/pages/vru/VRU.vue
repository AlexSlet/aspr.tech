<template>
  <v-layout row wrap fill-height>
    <builder
      :typeBoard="forSend.type"
      :tabs="tabs"
      :notes="notes"
      @calc="calc($event)"
      @save="saveOrUpdate($event)"
    ></builder>
    <result
      v-if="resultOpen"
      :resData="resData"
      :item="forSend"
      @closeModal="resultOpen = false"
      @recount="recount($event)"
    ></result>
  </v-layout>
</template>
<script>
import builder from "@/components/pages/builder/builder";
import result from "@/components/modals/Result";
import { debug } from "util";
export default {
  name: "VRU",
  components: {
    builder,
    result
  },
  data: () => ({
    forSend: {
      type: 2,
      name: "noname"
    },
    resData: {},
    resultOpen: false,
    id_board: -1,
    tabs: [
      {
        id: 0,
        name: "Вводные устройства",
        type: "insw",
        devices: [
          {
            id: 0,
            required: false,
            title: "Добавить вводной автомат",
            list: [
              { name: "Автоматический выключатель", type: "cb", eq_type: 1 }
            ]
          },
          {
            id: 1,
            required: false,
            title: "Добавить рубильник на вводные автоматы",
            list: [{ name: "Рубильник для ВРУ", type: "switch", eq_type: 6 }]
          },
          {
            id: 2,
            required: false,
            title: "Добавить тип переключения/АВР",
            list: [
              { name: "Тип переключения", type: "switch_type", eq_type: 11 }
            ]
          },
          {
            id: 3,
            required: false,
            title: "Добавить прибор учета",
            list: [
              { name: "Амперметр", type: "ammeter", eq_type: 7 },
              { name: "Вольтметр", type: "voltmeter", eq_type: 8 },
              { name: "Счетчик электроэнергии", type: "pmeter", eq_type: 4 }
            ]
          }
        ]
      },
      {
        id: 1,
        name: "Отходящие устройства",
        type: "outsw",
        devices: [
          {
            id: 0,
            required: false,
            title: "Добавить отходящие устройства",
            list: [
              { name: "Автоматический выключатель", type: "cb", eq_type: 1 },
              { name: "Плавкая вставка", type: "fuse", eq_type: 9 }
            ]
          }
        ]
      },
      {
        id: 2,
        name: "Корпус",
        type: "ecs",
        devices: [
          {
            id: 0,
            required: false,
            title: "Добавить корпус шкафа",
            list: [{ name: "Корпус шкафа для ВРУ", type: "body", eq_type: 10 }]
          }
        ]
      }
    ],
    notes: {
      "4": [
        "При добавлении счетчика автоматически добавляются трансформаторы тока и испытательная коробка ИКК"
      ],
      "7": ["Амперметр необходимо учитывать по одному на каждую фазу"],
      "8": ["Вольметр необходимо учитывать по одному на одни ввод (3 фазы)"],
      "9": ["Плавкую вставку необходимо учитывать по одному на каждую фазу"]
    }
  }),
  methods: {
    calc(board) {

      let obj = this.transformSaveJSON(board);

      this.forSend = { ...this.forSend, ...obj };
      this.calcData();
    },
    transformSaveJSON(object) {
      //SOME TIMES REWRITE THIS SHIT
      const d = Object.keys(object);
      const obj = {};

      d.forEach(key => {
        const value = object[key];

        if (typeof value === "object") {
          obj[key] = {
            list_eq: value.list_eq.map(item => {

              const o = {};
              const k = Object.keys(item);

              k.forEach(h => {
                if (typeof item[h] === "object") {
                  o[h] = item[h].value;
                } else {
                  o[h] = item[h];
                }
              });
              
              return o;
            })
          };
        } else {
          obj[key] = object[key];
        }
      });
      return obj;
      //SOME TIMES REWRITE THIS SHIT
    },
    saveOrUpdate(board) {
      this.forSend.name = board.name_board;

      let url;
      if (board.id == -1) {
        url = "users/saveasmbl";
      } else {
        url = "users/updasmbl";
      }

      let obj = this.transformSaveJSON(board.save_json);

      return this.axios
        .post(
          url,
          {
            id_user: this.user.id || -1,
            id: board.id,
            save_json: { ...this.forSend, ...obj }
          },
          {
            headers: {
              "Content-Type": "text/plain"
            }
          }
        )
        .then(() => {
          this.$router.push("/myboard");
        });
    },
    calcData() {
      return this.axios
        .post(
          "/math/vru",
          {
            id: this.id_board,
            id_user: this.user.id || -1,
            save_json: { ...this.forSend }
          },
          {
            headers: {
              "Content-Type": "text/plain"
            }
          }
        )
        .then(res => {
          this.id_board = res.data.id;
          this.resData = { ...res.data };
          this.resultOpen = true;
        });
    },
    recount(mnf) {
      for (let key in this.forSend) {
        if (typeof this.forSend[key] == "object") {
          let item = this.forSend[key];

          item.list_eq.forEach(elem => {
            if (elem.eq_type !== 4) {
              elem.mnf = mnf;
            }
          });
        }
      }
      this.calcData();
    }
  },
  computed: {
    user() {
      return this.$store.getters.getUser;
    }
  },
  created() {}
};
</script>

<style>
</style>
