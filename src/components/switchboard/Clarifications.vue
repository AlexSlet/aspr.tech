<template>
  <div class="myModal">
    <div class="modalOverlay" @click="$emit('closeModal')"></div>
    <div class="modalBox">
      <h3 class="comModalTitle">
        Уточнения к комплектации
        <span @click="$emit('closeModal')" class="closeModal">✕</span>
      </h3>
      <div class="pa-3">
        <h4>Параметры корпуса шкафа</h4>
        <v-switch
          v-model="recBoard"
          :label="`Ипользовать рекомендованный корпус?`"
          class="my-2"
          hide-details
        ></v-switch>
        <v-layout>
          <v-flex xs6 class="mr-2">
            <span>Степень защиты</span>
            <v-select
              :disabled="recBoard"
              height="30"
              hide-details
              v-model="ecs.ecs_ip"
              :items="ecs_ip"
              placeholder="Степень защиты"
              outline
            ></v-select>
          </v-flex>
          <v-flex xs6>
            <span>Размер корпуса</span>
            <v-select
              :disabled="recBoard"
              height="30"
              hide-details
              v-model="ecs.ecs_size"
              :items="getSizes"
              item-text="name"
              item-value="name"
              placeholder="Размер корпуса"
              outline
            ></v-select>
          </v-flex>
        </v-layout>
        <v-layout row wrap class="mt-2">
          <v-flex xs12>
            <span>Производитель</span>
            <v-select
              :disabled="recBoard"
              height="30"
              hide-details
              v-model="ecs.ecs_mnf"
              :items="ecs_mnf"
              item-text="name"
              item-value="id"
              placeholder="Производитель"
              outline
            ></v-select>
          </v-flex>
        </v-layout>
        <v-layout row wrap class="mt-2">
          <v-flex xs12>
            <h4 class="mt-2">Использовать монтажную панель или профиль?</h4>
            <v-radio-group hide-details class="ma-0" v-model="ecs.ecs_need_plate">
              <v-radio label="Монтажная панель" :value="1"></v-radio>
              <v-radio label="Профиль" :value="2"></v-radio>
            </v-radio-group>
          </v-flex>
          <v-flex xs12>
            <v-switch
              v-model="trasformBase"
              :label="`Добавить в комплектацию цоколь?`"
              class="mt-2"
              hide-details
            ></v-switch>
          </v-flex>
        </v-layout>
        <h4 class="mt-2">Количество необходимых корпусов</h4>
        <v-select
          height="30"
          hide-details
          v-model="ecs.ecs_amount"
          :items="ecs_amount"
          item-text="name"
          item-value="id"
          outline
        ></v-select>
        <v-switch
          v-model="trasformNeed"
          :label="`Добавить рубильники для вводных автоматов?`"
          class="mt-2"
          hide-details
        ></v-switch>
        <v-btn color="blue darken-4" outline class="mt-3 ml-0" @click="saveData()">Сохранить</v-btn>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    modalData: Object
  },
  data: () => ({
    recBoard: true,
    ecs: {
      ecs_mnf: 52,
      ecs_size: "2000x800x600",
      ecs_ip: 54,
      ecs_need_plate: 1,
      ecs_need_base: 0,
      ecs_amount: 1,
      switch_need: 0
    },
    ecs_mnf: [
      { name: "ИЕК", id: 3 },
      { name: "МСА", id: 51 },
      { name: "БЭТ", id: 52 },
      { name: "ФАБЕР", id: 53 }
    ],
    ecs_ip: [31, 54, 55],
    ecs_amount: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  }),
  methods: {
    saveData() {
      this.$emit("saved", {
        name: "comecs",
        data: this.ecs
      });
    }
  },
  computed: {
    getSizes() {
      return this.$store.getters.getSizes(this.ecs.ecs_mnf);
    },
    trasformBase: {
      get: function() {
        return this.ecs.ecs_need_base;
      },
      set: function(val) {
        return (this.ecs.ecs_need_base = +val);
      }
    },
    trasformNeed: {
      get: function() {
        return this.ecs.switch_need;
      },
      set: function(val) {
        return (this.ecs.switch_need = +val);
      }
    }
  },
  created() {
    if (Object.keys(this.modalData).length != 0) {
      this.ecs = this.modalData;
    }
  }
};
</script>
<style scoped>
</style>

