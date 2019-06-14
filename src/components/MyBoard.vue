<template>
  <div>
    <v-card class="mt-1">
      <v-container>
        <v-layout row wrap v-if="!user">
          <v-flex xs12>
            <p>
              Страница доступна для зарегистрированных пользователей (кроме логина и пароля ничего не требуется) - здесь вы можете сохранять, копить, менять ваши сборки электрошкафов.
              Так же, для тех кому шаблонных решений для определения шкафа не хватает - открыт доступ для свободной разработки шкафа.
            </p>
            <p>
              Как вариант, вы можете взять спецификацию шкафа в проекте и поэлементно занести детали в шкаф -
              наша система сама соберет его в шкаф и выдаст Вам цену и спецификацию со всем необходимым (зачастую проектировщики описывают в проекте только основное оборудование, не учитывая множество мелочей, которые так важны, например, шина, реле и т.д.).
            </p>
          </v-flex>
        </v-layout>
        <v-layout v-if="user">
          <v-flex xs6>
            <h1>Мои шкафы</h1>
            <p>Выбирете шкаф для редактирования, просмотра и управления</p>
          </v-flex>
          <v-flex xs6>
            <v-layout>
              <v-flex xs7>
                <v-text-field hide-details label="Найти шкаф" prepend-icon="search"></v-text-field>
              </v-flex>
              <v-flex xs4 d-flex align-end>
                <v-menu offset-y>
                  <template v-slot:activator="{ on }">
                    <v-btn class="ma-0" round outline color="info" v-on="on">
                      <v-icon>add</v-icon>Создать шкаф
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-tile v-for="(item, index) in boards" :key="index" @click="addBoard(item.link)">
                      <v-list-tile-title>{{item.name}}</v-list-tile-title>
                    </v-list-tile>
                  </v-list>
                </v-menu>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
    <v-container v-if="user">
      <v-layout row wrap>
        <v-flex>
          <v-layout row wrap>
            <v-flex xs4 v-for="(item,i) in 1" :key="i">
              <v-card class="ma-3 myCard">
                <v-img :src="require('@/assets/bg_1.png')" aspect-ratio="2.5">
                  <div class="cardOverlay">
                    <v-btn color="info" round>Управлять и редактировать</v-btn>
                    <div class="fastAction">
                      <v-menu offset-y>
                        <template v-slot:activator="{ on }">
                          <v-btn color="white" round flat dark v-on="on">
                            Быстрые действия
                            <v-icon color="white">keyboard_arrow_down</v-icon>
                          </v-btn>
                        </template>
                        <v-list>
                          <v-list-tile v-for="(item, index) in 3" :key="index">
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
  </div>
</template>

<script>
export default {
  data: () => ({
    boards: [
      {name: 'ВРУ', link: '/vru'},
      {name: 'Квартирные электрошкафы', link: '/flatboard'},
      {name: 'Распределительное электрооборудование', link: '/switchboard'},
    ]
  }),
  methods: {
    addBoard(link){
      this.$router.push(link);
      
    }
  },
  computed: {
    user() {
      return this.$store.getters.getIsUser;
    }
  }
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
