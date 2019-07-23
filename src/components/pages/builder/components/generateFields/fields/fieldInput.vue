<template>
  <v-text-field solo mask="###" v-model.number="handlerChange"></v-text-field>
</template>
<script>
export default {
  props: {
    data: Object
  },
  data() {
    return {
      value: ""
    };
  },
  computed: {
    handlerChange: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("update-value", {name: this.data.name, value: val});
      }
    }
  },
  created(){
      this.value = this.data.value;
  }
};
</script>
