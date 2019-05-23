<template>
  <v-container>
    <v-layout row wrap>
      <v-flex>
        <v-layout row wrap>
          <v-flex xs4>
            <v-card class="ma-3">
              <v-img :src="require('@/assets/bg_1.png')" aspect-ratio="2.5"></v-img>
              <v-card-title primary-title>
                <div>
                  <h3 class="headline mb-0">Шкаф 1</h3>
                </div>
              </v-card-title>
              <v-card-actions>
                <router-link to="/foo">www.some.link</router-link>
              </v-card-actions>
            </v-card>
          </v-flex>
          <v-flex xs4>
            <v-card class="ma-3">
              <v-img :src="require('@/assets/bg_2.png')" aspect-ratio="2.5"></v-img>
              <v-card-title primary-title>
                <div>
                  <h3 class="headline mb-0">Шкаф 2</h3>
                </div>
              </v-card-title>
              <v-card-actions>
                <router-link to="/foo">www.some.link</router-link>
              </v-card-actions>
            </v-card>
          </v-flex>
          <v-flex xs4>
            <v-card class="ma-3">
              <v-img :src="require('@/assets/bg_2.png')" aspect-ratio="2.5"></v-img>
              <v-card-title primary-title>
                <div>
                  <h3 class="headline mb-0">Шкаф 3</h3>
                </div>
              </v-card-title>
              <v-card-actions>
                <router-link to="/foo">www.some.link</router-link>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
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
  background-color: #144279;
  background-image: linear-gradient(to top, #172d61 0, #1f5594 100%);
}
.commonCard {
  position: relative;
  background-color: #144279;
  background-image: linear-gradient(to top, #172d61 0, #1f5594 100%);
}
.secondCommonBtn {
  background: linear-gradient(to bottom, #c4d700, #b5cd00);
}
.closeModal {
  position: absolute;
  right: 5px;
  top: 5px;
  color: red;
  padding: 5px;
  cursor: pointer;
}
</style>
