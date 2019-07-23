<template>
  <v-container fluid fill-height>
    <v-layout fill-height>
      <v-flex xs4 class="border-right px-2">
        <v-tabs v-model="model" grow slider-color="#25396f">
          <v-tab class="caption" v-for="tab in tabs" :key="tab.id" :href="`#tab-${tab.id}`">
            <div class="req-icons">
              <v-icon v-if="requiredDevices[tab.type].length == 0" color="green">check_circle</v-icon>
              <v-icon v-if="requiredDevices[tab.type].length != 0" color="red">highlight_off</v-icon>
            </div>

            {{ tab.name }}
          </v-tab>
        </v-tabs>
        <v-tabs-items v-model="model">
          <v-tab-item v-for="tab in tabs" :key="tab.id" :value="`tab-${tab.id}`">
            <device-add-list :type="tab.type" :list="tab.devices" @addDevice="addDevice($event)"></device-add-list>
          </v-tab-item>
        </v-tabs-items>
      </v-flex>
      <v-flex xs4 class="border-right px-2">
        <my-form :formName="formName" @saveDevice="saveDevice($event)"></my-form>
      </v-flex>
      <v-flex xs4 class="pl-4">
        <result :data="save_json"></result>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import deviceAddList from "./components/deviceAddList";
import result from "./components/result";
import myForm from "./components/generateFields/myForm";
export default {
  components: {
    deviceAddList,
    myForm,
    result
  },
  data() {
    return {
      save_json: {},
      requiredDevices: {},
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
              title: "Добавить отходящие устройства:*",
              list: [
                { name: "Автоматический выключатель", type: "cb" },
                { name: "Устройство защиты отключения", type: "uzo" },
                { name: "Дифференциальный автомат", type: "difcb" }
              ]
            }
          ]
        }
      ],
      model: "tab-0",
      formName: {
        formType: "",
        id: "",
        tab: ""
      }
    };
  },
  methods: {
    addDevice(event) {
      this.formName = event;
    },
    setJsonFields() {
      this.tabs.forEach(tab => {
        this.$set(this.save_json, tab.type, {
          list_eq: []
        });
      });
    },
    saveDevice(event) {
      this.removeRequired(event);
      this.save_json[event.name].list_eq.push(event.equipment);
    },
    setRequiredDev() {
      this.tabs.forEach(tab => {
        this.$set(this.requiredDevices, tab.type, []);
        this.requiredDevices[tab.type] = tab.devices.filter(
          dev => dev.required === true
        );
      });
    },
    removeRequired(item) {
      this.requiredDevices[item.name] = this.requiredDevices[item.name].filter(
        dev => dev.id !== item.id
      );
    },
    checkReq(tab) {
      return this.requiredDevices[tab].length === 0;
    }
  },
  created() {
    this.setJsonFields();
    this.setRequiredDev();
  }
};
</script>
<style scoped>
.border-right {
  border-right: 1px solid #ccc;
}
.caption{
  position: relative;
}
.req-icons{
  position: absolute;
  right: 0;
}
</style>

