<template>
  <v-app>
    <v-toolbar color="white">
      <v-toolbar-title>
        <router-link to="/">ASPR.TECH</router-link>
      </v-toolbar-title>
      <v-toolbar-items class="hidden-sm-and-down ml-4">
        <v-btn v-if="user" flat :to="'/myboard'">Мои шкафы</v-btn>
        <v-btn flat>Возможности</v-btn>
        <v-btn flat>Помощь</v-btn>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <v-menu v-if="user" offset-y>
        <template v-slot:activator="{ on }">
          <v-btn flat v-on="on">
            <v-icon left>account_circle</v-icon>User Name
            <v-icon>keyboard_arrow_down</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-tile v-for="(item, index) in menuItem" :key="index" @click="some()">
            <v-list-tile-title>{{ item }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
      <v-btn flat v-else>Login</v-btn>
    </v-toolbar>
    <v-card v-if="location == '/myboard'" class="mt-1">
      <v-container>
        <v-layout>
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
                <v-btn outline color="info" class="commonBtn my-0">
                  <v-icon>add</v-icon>Создать шкаф
                </v-btn>
              </v-flex>
              <v-flex xs1>
                <v-menu hide-details bottom left offset-y>
                  <template v-slot:activator="{ on }">
                    <v-btn color="info" class="ma-0 mt-2" small outline fab v-on="on">
                      <v-icon>more_horiz</v-icon>
                    </v-btn>
                  </template>

                  <v-list>
                    <v-list-tile v-for="(item, i) in 3" :key="i" @click>
                      <v-list-tile-title>Some text</v-list-tile-title>
                    </v-list-tile>
                  </v-list>
                </v-menu>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
    <v-container fluid>
      <router-view/>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      user: true,
      menuItem: ["Профиль", "Настройки", "Выйти"],
      location: ""
    };
  },
  beforeUpdate() {
    this.location = this.$route.path;
  },
  mounted() {
    this.location = this.$route.path;
  }
};
</script>
<style>
.v-btn {
  text-transform: none;
}
.v-btn__content {
  font-weight: 400;
}
</style>

