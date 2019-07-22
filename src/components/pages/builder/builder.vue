<template>
  <v-container fluid fill-height>
    <v-layout fill-height>
      <v-flex xs4 class="border-right px-2">
        <v-tabs v-model="model" grow slider-color="#25396f">
          <v-tab
            class="caption"
            v-for="tab in tabs"
            :key="tab.id"
            :href="`#tab-${tab.id}`"
          >{{ tab.name }}</v-tab>
        </v-tabs>
        <v-tabs-items v-model="model">
          <v-tab-item v-for="tab in tabs" :key="tab.id" :value="`tab-${tab.id}`">
            <device-add-list :type="tab.type" :list="tab.devices" @addDevice="addDevice($event)"></device-add-list>
          </v-tab-item>
        </v-tabs-items>
      </v-flex>
      <v-flex xs4 class="border-right px-2">
        <Form :formName="formName"></Form>
      </v-flex>
      <v-flex xs4 class="pl-4">Результат</v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import deviceAddList from "./components/deviceAddList";
import Form from "./components/generateFields/index";
export default {
  components: {
    deviceAddList,
    Form
  },
  data() {
    return {
      tabs: [
        {
          id: 0,
          name: "Вводные устройства",
          type: "insw",
          devices: [
            {
              title: "Добавить вводные устройства:",
              list: [
                { name: "Автоматический выключатель", type: "cb" },
                {name: "Устройство защиты отключения", type:"uzo"},
                {name: "Дифференциальный автомат", type: "difcb"}
              ]
            },
            {
              title: "Добавьте счетчик электроэнергии:",
              list: [{name: "Счетчик электроэнергии", type: "pmeter"}]
            },
            {
              title: "Укажите параметры корпуса шкафа:",
              list: [{name: "Параметры корпуса шкафа", type: "ecs"}]
            }
          ]
        },
        {
          id: 1,
          name: "Отходящие автоматы",
          type: "list_eq",
          devices: [
            {
              title: "Добавить отходящие устройства:",
              list: [
                { name: "Автоматический выключатель", type: "cb" },
                {name: "Устройство защиты отключения", type:"uzo"},
                {name: "Дифференциальный автомат", type: "difcb"}
              ]
            }
          ]
        }
      ],
      model: "tab-0",
      formName: ""
    };
  },
  methods: {
    addDevice(event) {
      this.formName = event;
    }
  }
};
</script>
<style scoped>
.border-right {
  border-right: 1px solid #ccc;
}
</style>

