<template>
  <builder :tabs="tabs" @calc="calc($event)"></builder>
</template>
<script>
import builder from "@/components/pages/builder/builder";
export default {
  name: "FlatBoard",
  components: {
    builder
  },
  data: () => ({
    forSend: {
      type: 3,
      name: "noname"
    },
    resData: {},
    id_board: -1,
    user_id: -1,
    tabs: [
      {
        id: 0,
        name: "Вводные устройства",
        type: "insw",
        devices: [
          {
            id: 0,
            required: true,
            title: "Добавить вводные устройства",
            list: [
              { name: "Автоматический выключатель", type: "cb" },
              { name: "Устройство защиты отключения", type: "uzo" },
              { name: "Дифференциальный автомат", type: "difcb" }
            ]
          },
          {
            id: 1,
            required: false,
            title: "Добавьте счетчик электроэнергии",
            list: [{ name: "Счетчик электроэнергии", type: "pmeter" }]
          },
          {
            id: 2,
            required: true,
            title: "Укажите параметры корпуса шкафа",
            list: [{ name: "Параметры корпуса шкафа", type: "ecs" }]
          }
        ]
      },
      {
        id: 1,
        name: "Отходящие автоматы",
        type: "outsw",
        devices: [
          {
            id: 0,
            required: true,
            title: "Добавить отходящие устройства",
            list: [
              { name: "Автоматический выключатель", type: "cb" },
              { name: "Устройство защиты отключения", type: "uzo" },
              { name: "Дифференциальный автомат", type: "difcb" }
            ]
          }
        ]
      }
    ]
  }),
  methods: {
    calc(event) {
      this.forSend = { ...this.forSend, ...event };

      return this.axios
        .post(
          "math/apartsw",
          {
            id: this.id_board,
            id_user: this.user_id,
            save_json: { ...this.forSend }
          },
          {
            headers: {
              "Content-Type": "text/plain"
            }
          }
        )
        .then(res => {
          console.log(res);
        });
    }
  },
  computed: {},
  created() {}
};
</script>

<style>
</style>
