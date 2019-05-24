<template>
  <v-container>
    <v-layout row wrap>
      <v-flex>
        <v-layout row wrap>
          <v-flex xs4 v-for="(item,i) in 3" :key="i">
            <v-card class="ma-3 myCard">
              <v-img :src="require('@/assets/bg_1.png')" aspect-ratio="2.5">
                <div class="cardOverlay">
                  <v-btn color="info" round>Управлять и редактировать</v-btn>
                  <div class="fastAction">
                    <v-menu offset-y>
                      <template v-slot:activator="{ on }">
                        <v-btn color="white" round flat dark v-on="on">Быстрые действия <v-icon color="white">keyboard_arrow_down</v-icon></v-btn>
                      </template>
                      <v-list>
                        <v-list-tile v-for="(item, index) in 3" :key="index" @click>
                          <v-list-tile-title>Some Action</v-list-tile-title>
                        </v-list-tile>
                      </v-list>
                    </v-menu>
                  </div>
                </div>
              </v-img>
              <v-card-title primary-title>
                <div>
                  <h3 class="headline mb-0">Шкаф {{i+1}}</h3>
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

<style scoped>
.v-image {
  height: 190px;
}
.myCard {
  position: relative;
}
.myCard:hover {
  transform: scale(1.1);
}
.cardOverlay {
  position: absolute;
  opacity: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s;
}
.cardOverlay:hover {
  opacity: 1;
}
.fastAction {
  position: absolute;
  top: 0;
  right: 0;
}
</style>
