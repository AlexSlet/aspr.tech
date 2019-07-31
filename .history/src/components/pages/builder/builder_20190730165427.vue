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
        <my-form :notes="notes" :form="form" @saveDevice="saveDevice($event)"></my-form>
      </v-flex>
      <v-flex xs4 class="pl-4">
        <result
          :data="save_json"
          :requiredDevices="requiredDevices"
          @removeItem="removeItem($event)"
          @calc="calc()"
        ></result>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import deviceAddList from "./components/deviceAddList";
import result from "./components/result";
import myForm from "./components/generateFields/myForm";
export default {
  props: {
    tabs: Array,
    typeBoard: Number,
    notes: Object
  },
  components: {
    deviceAddList,
    myForm,
    result
  },
  data() {
    return {
      save_json: {},
      requiredDevices: {},
      model: "tab-0",
      form: {
        eq_type: "",
        id: "",
        tab: "",
        formFields: []
      },
    };
  },
  methods: {
    addDevice(event) {
      this.form.eq_type = event.eq_type;
      this.form.tab = event.tab;
      this.form.id = event.id;
      this.axios.get(`front/asmbl${this.typeBoard}?eq_type=${event.eq_type}`).then(result => {
        console.log(result);
        
        this.form.formFields = [...result.data];
      });
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
    isRequired(tabType, eqType) {
      let tabByType = this.tabs.filter(item => {
        return item.type === tabType;
      });
      let reqDevs = tabByType[0].devices.filter(dev => dev.required === true);
      let dev = reqDevs.filter(obj => {
        return obj.list.some(item => item.type === eqType);
      });
      if (dev.length !== 0) {
        this.requiredDevices[tabType].push(dev[0]);
      }
    },
    removeItem(indexes) {
      if (!indexes.dubl) {
        this.isRequired(indexes.tabIndex, indexes.equipType);
      }
      this.save_json[indexes.tabIndex].list_eq.splice(indexes.equipIndex, 1);
    },
    calc() {
      this.$emit("calc", this.save_json);
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
.caption {
  position: relative;
}
.req-icons {
  position: absolute;
  right: 0;
}
</style>

