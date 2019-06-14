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
      <v-menu v-if="isUser" offset-y>
        <template v-slot:activator="{ on }">
          <v-btn flat v-on="on">
            <v-icon left>account_circle</v-icon>
            {{user.username}}
            <v-icon>keyboard_arrow_down</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-tile @click="logOut()">
            <v-list-tile-title>Выйти</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
      <div v-else>
        <v-btn outline color="blue darken-4" :to="'/login'">Login</v-btn>
        <v-btn outline color="blue darken-4" :to="'/signin'">SignIn</v-btn>
      </div>
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
      location: ""
    };
  },
  computed: {
    isUser() {
      return this.$store.getters.getIsUser;
    },
    user() {
      return this.$store.getters.getUser;
    }
  },
  methods: {
    logOut() {
      this.$store.commit("clearUser");
    },
    checkUser(){
      if(sessionStorage.user){
        this.$store.commit('setUser', JSON.parse(sessionStorage.user));
      }
    }
  },
  beforeUpdate() {
    this.location = this.$route.path;
  },
  mounted() {
    this.location = this.$route.path;
  },
  created(){
    this.checkUser();
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

