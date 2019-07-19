<template>
  <div>
    <v-container class="homeContainer">
      <v-layout row wrap>
        <v-flex>
          <v-layout row wrap>
            <v-flex xs12>
              <div>
                <p>
                  Для открытого доступа мы представляем свой внутренний сервис для подбора и оценки электрооборудования.
                  Поэтапно мы будем подключать его возможности для открытого пользования.
                </p>
                <p>Получите цену и подробную спецификацию на Ваш шкаф за несколько минут.</p>
                <p>
                  Укажите параметры шкафа и получите
                  <strong>сразу</strong> результат.
                </p>
                <p>Никаких безумных цен на шкафы - только открытые цены на все комплектующие с ссылками в интернет-магазин.</p>
                <p>
                  В
                  <strong>один клик</strong> спецификация и цена будет
                  <strong>пересчитана</strong> на любого
                  <strong>другого производителя</strong>.
                  Наша система проверяет сборку на оптимальность подбора комплектующих и решений.
                  Если вы хотите, сохранять свои сборки для дальнейшей корректировки - пройдите простейшую авторизацию (кроме логина и пароля ничего не требуется).
                  Воспользуйтесь нашими решениями - несколько шаблонов ниже.
                </p>
              </div>
            </v-flex>
          </v-layout>
          <dev-grid mode="home"></dev-grid>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import DevGrid from "@/components/deviceGrid.vue";
export default {
  components: {
    DevGrid
  },
  data: () => ({})
};
</script>

<style>
.mainTitle {
  text-align: center;
}
.h1,
h2,
h3 {
  text-align: center;
}
a {
  color: inherit !important;
  text-decoration: none;
}
.v-select.v-text-field--enclosed:not(.v-text-field--single-line)
  .v-select__selections {
  padding-top: 0px;
}
.v-text-field.v-text-field--enclosed .v-input__append-inner {
  margin-top: 8px;
}
.v-text-field--outline > .v-input__control > .v-input__slot {
  min-height: 40px;
}
.myModal {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.modalOverlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: RGBA(103, 105, 106, 0.4);
  z-index: 1;
}
.modalBox {
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  background-color: #fff;
  width: 500px;
  z-index: 999;
}
.theme--dark.v-btn.v-btn--disabled:not(.v-btn--icon):not(.v-btn--flat):not(.v-btn--outline) {
  background-color: rgba(82, 175, 83, 0.6) !important;
}
.commonBtn {
  color: #fff !important;
  background-color: #144279;
  background-image: linear-gradient(to top, #172d61 0, #1f5594 100%);
}
.commonCard {
  color: #000 !important;
  position: relative;
  transition: all 0.3s;
}
.commonCard:hover{
  transform: scale(1.05);
}
.comModalTitle{
  position: relative;
  color: #000;
  margin-top: 15px;
}
.closeModal {
  position: absolute;
  right: 5px;
  top: -15px;
  color: red;
  padding: 5px;
  cursor: pointer;
}
.homeContainer .v-card__title {
  height: 136px;
  overflow: hidden;
}
</style>
