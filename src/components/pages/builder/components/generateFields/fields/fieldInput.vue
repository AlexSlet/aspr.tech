<template>
  <v-text-field solo mask="###" v-model="value"></v-text-field>
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
        this.$emit("update-value", this.data.name, val);
      }
    }
  },
  created(){
      this.value = this.data.value;
  }
};
</script>
