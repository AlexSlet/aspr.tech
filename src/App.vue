<template>
  <v-app>
    <v-toolbar color="white">
      <v-toolbar-title>
        <router-link to="/">ASPR.TECH</router-link>
      </v-toolbar-title>
      <v-toolbar-items class="hidden-sm-and-down ml-4">
        <v-btn flat :to="'/myboard'">Мои шкафы</v-btn>
        <v-btn flat :to="'/opportunities'">Возможности</v-btn>
        <v-btn flat :to="'/help'">Помощь</v-btn>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <v-menu v-if="user" offset-y>
        <template v-slot:activator="{ on }">
          <v-btn flat v-on="on">
            <v-icon left>account_circle</v-icon>{{userName}}
            <v-icon>keyboard_arrow_down</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-tile @click="logOut()">
            <v-list-tile-title>Выйти</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
      <v-btn flat v-else :to="'/login'">Login</v-btn>
    </v-toolbar>
    <v-container fluid class="pa-0">
      <router-view/>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      location: "",
    };
  },
  computed: {
    user(){
      return this.$store.getters.getUser;
    },
    userName(){
      return this.$store.getters.getUserLogin;
    }
  },
  methods: {
    logOut(){
      this.$store.commit('clearUser');
    }
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

