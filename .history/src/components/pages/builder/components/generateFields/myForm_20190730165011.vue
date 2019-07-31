<template>
  <v-layout row wrap>
    <v-flex xs12 class="mb-4">
      <h3>{{eqName[form.eq_type]}}</h3>
    </v-flex>
    <template v-if="form.eq_type === 5">
      <v-flex class="px-1" xs12 v-for="(field,i) in formFields" :key="field.name + form.tab + i">
        <span>{{field.title}}</span>
        <component
          :is="field.type"
          :key="field.name + form.tab"
          :data="field"
          @update-value="updateVal($event)"
        ></component>
      </v-flex>
    </template>
    <template v-else>
      <v-flex class="px-1" xs6 v-for="(field,i) in formFields" :key="field.name + form.tab + i">
        <span>{{field.title}}</span>
        <component
          :is="field.type"
          :key="field.name + form.tab"
          :data="field"
          @update-value="updateVal($event)"
        ></component>
      </v-flex>
    </template>
    <v-flex xs12>
      <ul>
        <li v-for="(note,i) in notes[form.eq_type]" :key="i">
          <small>*{{note}}</small>
        </li>
      </ul>
    </v-flex>
    <transition name="fade">
      <v-flex xs12 v-if="isFormName">
        <v-btn :disabled="checkDataLength" block color="success" @click="saveDevice()">Сохранить</v-btn>
      </v-flex>
    </transition>
  </v-layout>
</template>
<script>
import fieldSelect from "./fields/fieldSelect";
import fieldInput from "./fields/fieldInput";
export default {
  components: {
    fieldSelect,
    fieldInput
  },
  props: {
    form: Object,
    notes: Object
  },
  data() {
    return {
      formData: {
        eq_type: null
      }
    };
  },
  methods: {
    updateVal(event) {
      this.$set(this.formData, event.name, event.value);
    },
    saveDevice() {
      this.$emit("saveDevice", {
        name: this.form.tab,
        id: this.form.id,
        equipment: this.formData
      });
      this.formData = {
        eq_type: null
      };
    }
  },
  computed: {
    checkDataLength() {
      let arrLength = Object.values(this.formData).length - 1;
      return arrLength !== this.form.formFields.length;
    },
    formFields() {
      this.formData.eq_type = this.form.eq_type;
      return this.form.formFields;
    },
    isFormName() {
      return this.form.eq_type !== "";
    },
    eqName() {
      return this.$store.getters.getEqName;
    }
  },
  created() {}
};
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>

