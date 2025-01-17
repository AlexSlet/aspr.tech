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
          <v-flex xs5>
            <h1>Мои шкафы</h1>
            <p>Выбирете шкаф для редактирования, просмотра и управления</p>
          </v-flex>
          <v-flex xs7>
            <v-layout>
              <v-flex class="px-1" xs3 d-flex align-end>
                <v-menu offset-y>
                  <template v-slot:activator="{ on }">
                    <v-btn block class="ma-0" round outline color="info" v-on="on">
                      <v-icon>add</v-icon>Создать шкаф
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-tile
                      v-for="(item, index) in addBoards"
                      :key="index"
                      @click="addBoard(item.link)"
                    >
                      <v-list-tile-title>{{item.name}}</v-list-tile-title>
                    </v-list-tile>
                  </v-list>
                </v-menu>
              </v-flex>
              <v-flex class="px-1" xs3 d-flex align-end>
                <v-btn
                  class="ma-0"
                  block
                  round
                  outline
                  color="success"
                  @click="openTKP(boards)"
                >Скачать ТКП</v-btn>
              </v-flex>
              <v-flex xs6>
                <v-text-field
                  hide-details
                  label="Найти шкаф"
                  v-model="search"
                  @input="searchBoard()"
                  prepend-icon="search"
                ></v-text-field>
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
            <v-flex xs4 v-for="(item,i) in searchArr" :key="i">
              <v-card class="ma-3 myCard">
                <v-img :src="require('@/assets/bg_1.png')" aspect-ratio="2.5">
                  <div class="cardOverlay">
                    <v-btn color="info" round @click="editBoard(item)">Управлять и редактировать</v-btn>
                    <div class="fastAction">
                      <v-menu offset-y>
                        <template v-slot:activator="{ on }">
                          <v-btn color="white" round flat dark v-on="on">
                            Быстрые действия
                            <v-icon color="white">keyboard_arrow_down</v-icon>
                          </v-btn>
                        </template>
                        <v-list>
                          <v-list-tile @click="downloadSpec(item)">
                            <v-list-tile-title>Скачать спецификацию</v-list-tile-title>
                          </v-list-tile>
                          <v-list-tile @click="openTKP([{...item}])">
                            <v-list-tile-title>Скачать ТКП</v-list-tile-title>
                          </v-list-tile>
                          <v-list-tile @click="deleteBoard(item.id)">
                            <v-list-tile-title>Удалить</v-list-tile-title>
                          </v-list-tile>
                        </v-list>
                      </v-menu>
                    </div>
                  </div>
                </v-img>
                <v-card-title primary-title>
                  <div>
                    <h3 class="headline mb-0">{{item.name}}</h3>
                  </div>
                </v-card-title>
                <v-card-actions>
                  <p>{{types[item.type - 1]}}</p>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
    <DownloadTKP
      v-if="tkpDialog"
      :dialog.sync="tkpDialog"
      :boards="tkpArray"
      @close="tkpDialog = false"
      @download-tkp="downloadTKP($event)"
    ></DownloadTKP>
  </div>
</template>

<script>
import DownloadTKP from "@/components/modals/DownloadTKP";

export default {
  name: "MyBoards",
  components: {
    DownloadTKP
  },
  data: () => ({
    search: "",
    tkpDialog: false,
    tkpArray: [],
    searchArr: [],
    addBoards: [
      { name: "ВРУ", link: "/vru" },
      { name: "Электрошкаф для жилых помещений", link: "/flatboard" },
      // { name: "Главный распределительный щит", link: "/switchboard" }
    ],
    boards: [],
    types: [
      "Распределительное электрооборудование",
      "Типовое ВРУ",
      "Квартирные электрошкафы"
    ]
  }),
  methods: {
    addBoard(link) {
      this.$store.commit("clearEdited");
      this.$router.push(link);
    },
    getMyBoards() {
      if (this.user) {
        this.axios.get("users/getasmbl?id=" + this.userData.id).then(res => {
          this.boards = [...res.data];
          this.searchArr = [...res.data];
        });
      }
    },
    editBoard(item) {
      this.$store.commit("setEdited", item);
      this.$router.push(this.checkType(item.type));
    },
    checkType(type) {
      let url;
      switch (type) {
        case 1:
          url = "/switchboard";
          break;
        case 2:
          url = "/vru";
          break;
        case 3:
          url = "/flatboard";
          break;
      }
      return url;
    },
    deleteBoard(id) {
      this.axios.post("users/delasmbl?id=" + id).then(() => {
        this.getMyBoards();
      });
    },
    downloadSpec(item) {
      this.axios
        .post(
          "create/specification",
          {
            id: item.id,
            id_user: -1,
            save_json: { ...item }
          },
          {
            headers: {
              "Content-Type": "text/plain"
            }
          }
        )
        .then(res => {
          window.open(
            "http://aspr.tech:8080/download/specification?id=" + res.data,
            "new_window"
          );
        });
    },
    openTKP(items) {

      this.tkpArray = items;
      this.tkpDialog = true;
    },
    downloadTKP(event) {
      this.axios.post("create/offer", event).then(res => {
        window.open(
          "http://aspr.tech:8080/download/offer?id=" + res.data,
          "new_window"
        );
      });
    },
    checkUrl(type) {
      let url;
      switch (type) {
        case 1:
          url = "math/switchboard";
          break;
        case 2:
          url = "math/switchboardv1";
          break;
        case 3:
          url = "users/saveasmbl";
          break;
      }
      return url;
    },
    searchBoard() {
      if (this.search.length == 0) {
        this.searchArr = this.boards;
      } else {
        this.searchArr = this.boards.filter(item => {
          return item.name.toLowerCase().includes(this.search.toLowerCase());
        });
      }
    }
  },
  computed: {
    user() {
      return this.$store.getters.getIsUser;
    },
    userData() {
      return this.$store.getters.getUser;
    }
  },
  created() {
    this.getMyBoards();
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
