<template>
  <v-select solo :items="data.values" item-text="name" item-value="value" v-model="handlerChange"></v-select>
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
  }
};
</script>
