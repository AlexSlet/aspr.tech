<template>
  <v-container fluid fill-height>
    <v-layout fill-height>
      <v-flex xs4 class="border-right px-2">
        <v-tabs v-model="model" grow slider-color="#25396f">
          <v-tab class="caption" v-for="tab in tabs" :key="tab.id" :href="`#tab-${tab.id}`">
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
        <my-form
          :notes="notes"
          :form="form"
          @clearForm="clearForm()"
          @saveDevice="saveDevice($event)"
        ></my-form>
      </v-flex>
      <v-flex xs4 class="pl-4">
        <selected-dev
          :data.sync="save_json"
          :requiredDevices.sync="requiredDevices"
          @removeItem="removeItem($event)"
          @calc="calc()"
          @save="saveBoard($event)"
        ></selected-dev>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import deviceAddList from "./components/deviceAddList";
import selectedDev from "./components/selectedDev";
import myForm from "./components/generateFields/myForm";
import { log } from "util";
export default {
  props: {
    tabs: Array,
    typeBoard: Number,
    notes: Object
  },
  components: {
    deviceAddList,
    myForm,
    selectedDev
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
        renderKey: 0,
        formFields: []
      }
    };
  },
  methods: {
    addDevice(event) {
      this.form.eq_type = event.eq_type;
      this.form.tab = event.tab;
      this.form.id = event.id;
      this.axios
        .get(`front/asmbl${this.typeBoard}?eq_type=${event.eq_type}`)
        .then(result => {
          this.form.renderKey++;

          this.form.formFields = [...result.data];

          this.setDisabledFields();
        });
    },
    setJsonFields() {
      this.tabs.forEach(tab => {
        this.$set(this.save_json, tab.type, {
          list_eq: []
        });
      });
    },
    setDisabledFields(){
      this.form.formFields.forEach(field => {
        this.$set(field, 'disabled', false);
      })
    },
    saveDevice(event) {
      // this.removeRequired(event);
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
    // removeRequired(item) {
    //   this.requiredDevices[item.name] = this.requiredDevices[item.name].filter(
    //     dev => dev.id !== item.id
    //   );
    // },
    // isRequired(tabType, eqType) {
    //   let tabByType = this.tabs.filter(item => {
    //     //find tab array
    //     return item.type === tabType;
    //   });

    //   //find only required devices array
    //   let reqDevs = tabByType[0].devices.filter(dev => dev.required === true);

    //   let dev = reqDevs.filter(obj => {
    //     // find device what we need in required devices
    //     return obj.list.some(item => item.eq_type === eqType);
    //   });

    //   if (dev.length !== 0) {
    //     //if device exist pust him to required array
    //     this.requiredDevices[tabType].push(dev[0]);
    //   }
    // },
    // removeItem(indexes) {
    //   if (!indexes.dubl) {
    //     //if not duble required object add this object to required array
    //     this.isRequired(indexes.tabIndex, indexes.equipType);
    //   }

    //   this.save_json[indexes.tabIndex].list_eq.splice(indexes.equipIndex, 1);
    // },
    calc() {
      this.$emit("calc", this.save_json);
    },
    saveBoard(board) {
      this.$emit("save", {
        save_json: this.save_json,
        name_board: board.name,
        id: board.id
      });
    },
    clearForm() {
      this.form = {
        eq_type: "",
        id: "",
        tab: "",
        renderKey: 0,
        formFields: []
      };
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
  right: 0px;
}
.req-icons i {
  font-size: 15px;
}
</style>

