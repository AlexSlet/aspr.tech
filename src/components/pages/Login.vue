<template>
  <div class="myModalContainer">
    <v-layout justify-center>
      <v-flex xs4>
        <v-card>
          <v-card-title primary-title>
            <v-layout row wrap>
              <v-flex xs12>
                <h3>Логин</h3>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Логин" v-model="user.username" :rules="[rules.required]" @keyup.enter="logIn()"></v-text-field>
                <v-text-field
                  label="Пароль"
                  v-model="user.password"
                  :append-icon="show1 ? 'visibility' : 'visibility_off'"
                  :rules="[rules.required, rules.min]"
                  :type="show1 ? 'text' : 'password'"
                  hint="At least 6 characters"
                  counter
                  @click:append="show1 = !show1"
                  @keyup.enter="logIn()"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-card-title>

          <v-card-actions>
            <v-btn flat color="info" @click="logIn()" :disabled="ckeckFields">Войти</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: {
        username: "",
        password: ""
      },
      show1: false,
      rules: {
        required: value => !!value || "Required.",
        min: v => v.length >= 6 || "Min 6 characters",
        emailMatch: () => "The email and password you entered don't match"
      }
    };
  },
  methods: {
    logIn() {
      this.axios.post("/auth/login", this.user).then(res => {
        let result = JSON.stringify(res.data);
        sessionStorage.setItem("user", result);
        this.$store.commit("setUser", res.data);
        this.$router.push("/");
      });
      
    }
  },
  computed: {
    ckeckFields() {
      return this.user.username == "" || this.user.password == ""
        ? true
        : false;
    }
  }
};
</script>
<style scoped>
.myModalContainer {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

