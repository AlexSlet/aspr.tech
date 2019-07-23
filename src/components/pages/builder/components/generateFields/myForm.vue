<template>
  <v-layout row wrap>
    <v-flex xs12 class="mb-4">
      <h3>{{eqName[formName.formType]}}</h3>
    </v-flex>
    <template v-if="formName.formType === 'ecs'">
      <v-flex class="px-1" xs12 v-for="field in form" :key="field.name + formName.tab">
        <span>{{field.title}}</span>
        <component
          :is="field.type"
          :key="field.name + formName.tab"
          :data="field"
          @update-value="updateVal($event)"
        ></component>
      </v-flex>
    </template>
    <v-flex v-else class="px-1" xs6 v-for="field in form" :key="field.name + formName.tab">
      <span>{{field.title}}</span>
      <component
        :is="field.type"
        :key="field.name + formName.tab"
        :data="field"
        @update-value="updateVal($event)"
      ></component>
    </v-flex>
    <v-flex xs12 v-if="isFormName">
      <v-btn :disabled="checkDataLength" block color="success" @click="saveDevice()">Сохранить</v-btn>
    </v-flex>
  </v-layout>
</template>
<script>
import fieldSelect from "./fields/fieldSelect";
import fieldInput from "./fields/fieldInput";
import { devices } from "@/devices.js";
export default {
  components: {
    fieldSelect,
    fieldInput
  },
  props: {
    formName: Object
  },
  data() {
    return {
      formData: {}
    };
  },
  methods: {
    updateVal(event) {
      this.$set(this.formData, event.name, event.value);
    },
    saveDevice() {
      this.$emit("saveDevice", {
        name: this.formName.tab,
        id: this.formName.id,
        equipment: this.formData
      });
    }
  },
  computed: {
    form() {
      this.formData = {
        eq_type: this.formName.formType
      };
      return devices[this.formName.formType];
    },
    checkDataLength() {
      let arrLength = Object.values(this.formData).length - 1;
      let equalLength = arrLength !== this.form.length;
      return equalLength;
    },
    isFormName() {
      return this.formName.formType.length > 0;
    },
    eqName() {
      return this.$store.getters.getEqName;
    }
  },
  created() {}
};
</script>
