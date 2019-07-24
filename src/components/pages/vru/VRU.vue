<template>
  <builder :tabs="tabs"></builder>
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
      type: 2,
      name: "noname",
      insw: {},
      list_outcb: [],
      comecs: {}
    },
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
  methods: {},
  computed: {},
  created() {}
};
</script>

<style>
</style>
