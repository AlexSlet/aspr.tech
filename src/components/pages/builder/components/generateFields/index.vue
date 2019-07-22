<template>
  <v-layout row wrap>
    <v-flex class="px-1" xs6 v-for="(field,i) in fields" :key="i">
      <span>{{field.title}}</span>
      <component :is="field.type" :data="field" @update-value="updateVal($event)"></component>
    </v-flex>
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
    formName: String
  },
  data() {
    return {
      fields: [
        {
          name: "cb_current",
          type: "fieldSelect",
          title: "Номинальный ток, А",
          values: [6, 10, 16, 20, 25, 32, 40, 50]
        },
        {
          name: "cb_voltage",
          type: "fieldSelect",
          title: "Напряжение, В",
          values: [230, 400]
        },
        {
          name: "cb_mnf",
          type: "fieldSelect",
          title: "Производитель",
          values: [
            {
              name: "IEK",
              value: 3
            },
            {
              name: "ABB",
              value: 6
            }
          ]
        },
        {
          name: "cb_series",
          type: "fieldSelect",
          title: "Серия",
          values: [
            {
              name: "Квартирная серия ВА47-29",
              value: 0
            },
            {
              name: "Квартирная серия SH200",
              value: 1
            }
          ]
        },
        {
          name: "amount",
          type: "fieldInput",
          title: "Количество",
          value: 1
        }
      ]
    };
  },
  methods: {
    updateVal(name) {
      console.log(name);
    }
  }
};
</script>
