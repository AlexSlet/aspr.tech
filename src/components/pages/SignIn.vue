<template>
  <div class="myModalContainer">
    <v-layout justify-center>
      <v-flex xs4>
        <v-card>
          <v-card-title primary-title>
            <v-layout row wrap>
              <v-flex xs12>
                <h3>Регистрация</h3>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Логин" v-model="user.username" :rules="[rules.required]"></v-text-field>
                <v-text-field label="Имя" v-model="user.firstName"></v-text-field>
                <v-text-field label="Фамилия" v-model="user.lastName"></v-text-field>
                <v-text-field label="Email" v-model="user.email"></v-text-field>
                <v-text-field
                  label="Пароль"
                  v-model="user.password"
                  :append-icon="show1 ? 'visibility' : 'visibility_off'"
                  :rules="[rules.required, rules.min]"
                  :type="show1 ? 'text' : 'password'"
                  hint="At least 6 characters"
                  counter
                  @click:append="show1 = !show1"
                ></v-text-field>
                <v-text-field
                  label=" Повторите пароль"
                  v-model="password2"
                  :append-icon="show2 ? 'visibility' : 'visibility_off'"
                  :rules="[rules.required, rules.min]"
                  :type="show2 ? 'text' : 'password'"
                  hint="At least 6 characters"
                  counter
                  @click:append="show2 = !show2"
                ></v-text-field>
                <span style="color: red;">{{errorMessage}}</span>
              </v-flex>
            </v-layout>
          </v-card-title>

          <v-card-actions>
            <v-btn flat color="info" @click="signIn()" :disabled="ckeckFields">Отправить</v-btn>
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
      errorMessage: "",
      password2: "",
      show1: false,
      show2: false,
      rules: {
        required: value => !!value || "Required.",
        min: v => v.length >= 6 || "Min 6 characters",
        emailMatch: () => "The email and password you entered don't match"
      }
    };
  },
  computed: {
    ckeckFields() {
      return this.user.username == "" || this.user.password == ""
        ? true
        : false;
    }
  },
  methods: {
    signIn() {
      if (this.matchPassword() && this.checkLogin()) {
        this.axios.post("auth/users/save", this.user).then(res => {
          let result = JSON.stringify(res.data);

          sessionStorage.setItem("user", result);

          this.$store.commit("setUser", res.data);
          this.$router.push("/");
        });
      }
    },
    checkLogin() {
      if (this.user.username == "") {
        this.errorMessage = "Введите логин";
        return false;
      } else {
        this.errorMessage = "";
        return true;
      }
    },
    matchPassword() {
      if (this.user.password != this.password2) {
        this.errorMessage = "Пароли не совпадают";
        return false;
      } else {
        return true;
        this.errorMessage = "";
      }
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

