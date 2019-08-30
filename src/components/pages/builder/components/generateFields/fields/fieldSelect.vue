<template>
  <v-select solo :items="data.values" item-text="name" v-model="handlerChange" :disabled="data.disabled"></v-select>
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
  methods:{
    checkType(element){
      if(Array.isArray(element)){
        return 
      }
    }
  },
  computed: {
    handlerChange: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("update-value", {name: this.data.name, value: this.data.values.find(el => {
          if(typeof el === "object"){
            return el.value === val;
          }else{
            return el === val;
          }
        })});
      }
    }
  }
};
</script>
