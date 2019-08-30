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
export default {
  name: "FlatBoard",
  components: {
    builder,
    result
  },
  data: () => ({
    forSend: {
      type: 3,
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
            title: "Добавить вводные устройства",
            list: [
              { name: "Автоматический выключатель", type: "cb", eq_type: 1 },
              { name: "Устройство защиты отключения", type: "uzo", eq_type: 2 },
              { name: "Дифференциальный автомат", type: "difcb", eq_type: 3 }
            ]
          },
          {
            id: 1,
            required: false,
            title: "Добавьте счетчик электроэнергии",
            list: [
              { name: "Счетчик электроэнергии", type: "pmeter", eq_type: 4 }
            ]
          },
          {
            id: 2,
            required: false,
            title: "Укажите параметры корпуса шкафа",
            list: [{ name: "Параметры корпуса шкафа", type: "ecs", eq_type: 5 }]
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
              { name: "Устройство защиты отключения", type: "uzo", eq_type: 2 },
              { name: "Дифференциальный автомат", type: "difcb", eq_type: 3 }
            ]
          }
        ]
      }
    ],
    notes: {
      "1": [
        "Для квартирных шкафов используются устройства с отключающей способность 4.5 кА",
        "Для квартирных шкафов используются устройства с характеристикой расцепителя С"
      ],
      "2": [
        "Для квартирных шкафов используются устройства с током утечки 30 мА"
      ],
      "3": [
        "Для квартирных шкафов используются устройства с отключающей способность 4.5 кА",
        "Для квартирных шкафов используются устройства с характеристикой расцепителя С",
        "Для квартирных шкафов используются устройства с дифференциальным током утечки 30 мА"
      ],
      "4": [
        "Для квартирных шкафов используются счетчики с номинальным током до 5-60 A"
      ]
    }
  }),
  methods: {
    calc(board) {
      this.forSend = { ...this.forSend, ...board };
      this.calcData();
    },
    saveOrUpdate(board) {
      this.forSend.name = board.name_board;

      let url;
      if (board.id == -1) {
        url = "users/saveasmbl";
      } else {
        url = "users/updasmbl";
      }
      return this.axios
        .post(
          url,
          {
            id_user: this.user.id || -1,
            id: board.id,
            save_json: { ...this.forSend, ...board.save_json }
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
          "math/apartsw",
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
