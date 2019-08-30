<template>
  <v-layout row wrap>
    <v-flex xs12>
      <h2 class="mainTitle">Выберите тип Вашего оборудования</h2>
    </v-flex>
    <v-flex xs4 v-for="(board,i) in boards" :key="i">
      <v-card class="ma-3">
        <v-img :src="require('@/assets/bg_3.png')" aspect-ratio="2.5"></v-img>
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">{{board.name}}</h3>
          </div>
        </v-card-title>
        <v-card-text class="my_card_text mb-3" :class="{'fit-content': board.opened}">{{board.descrip}}</v-card-text>
        <v-card-actions class="action_block">
          <v-btn class="show_text" text icon @click="board.opened = !board.opened">
            <transition>
              <v-icon v-if="!board.opened">keyboard_arrow_down</v-icon>
              <v-icon v-else>keyboard_arrow_up</v-icon>
            </transition>
          </v-btn>
          <v-btn color="info" class="commonBtn" :disabled="board.disabled" @click="calc(board.url)">Рассчитать</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  data() {
    return {
      boards: [
        {
          name: "Электрошкаф для жилых помещений",
          descrip:
            "Используется в квартирах, на этажах, дачах и т.д. Состоят из простых и доступных по цене моделей оборудования. Срок изготовления до 3х рабочих дней.",
          url: "/flatboard",
          opened: false,
          disabled: false
        },
        {
          name: "Вводно-распределительное устройство",
          descrip:
            "Для приема, учета и распределения электроэнергии. Типовое исполнения в составе которого: автоматические выключатели, рубильники и счетчики. Возможность добавить АВР. Исполнение до 630 А. Срок изготовления от 7 до 14 дней.",
          url: "/vru",
          opened: false,
          disabled: false
        },
        {
          name: "Главный распределительный щит",
          descrip:
            "Комплексное устройство для распределения энергии. Состоит из панелей ввода, учета, отходящих линий. Используется оборудование самых различных параметров (все характеристики и отключающие токи). Перед сборкой с Вами свяжется наш конструктор обсудить детали проекта.",
          url: "/switchboard",
          opened: false,
          disabled: true
        }
      ]
    };
  },
  methods: {
    calc(url) {
      this.$store.commit("clearEdited");
      this.$router.push(url);
    }
  }
};
</script>
<style scoped>
.my_card_text {
  height: 100px;
  overflow: hidden;
  transition: all 0.3s;
  position: relative;
}
.show_text {
  position: absolute;
  bottom: 5px;
  right: 10px;
}
.fit-content{
  height: fit-content;
}
</style>
