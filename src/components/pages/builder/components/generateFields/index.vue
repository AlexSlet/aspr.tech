<template>
  <v-layout row wrap>
    <v-flex class="px-1" xs6 v-for="(field,i) in pmeter" :key="i">
      <span>{{field.title}}</span>
      <component :is="field.type" :data="field"></component>
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
      pmeter: [
        {
          name: "pmeter_voltage",
          type: "fieldSelect",
          title: "Напряжение",
          values: [
            {
              name: "Однофазный",
              value: 230
            },
            {
              name: "Трехфазный",
              value: 400
            }
          ]
        },
        {
          name: "pmeter_mnf",
          type: "fieldSelect",
          title: "Производитель",
          values: [
            {
              name: "Ленэлектро",
              value: 84
            },
            {
              name: "Инкотекс (Меркурий)",
              value: 82
            },
            {
              name: "ЛЭМЗ",
              value: 85
            }
          ]
        },
        {
          name: "pmeter_tarif",
          type: "fieldSelect",
          title: "Тариф",
          values: [
            {
              name: "Однотарифный",
              value: 1
            },
            {
              name: "многотарифный",
              value: 2
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
  }
};
</script>
