<template>
  <div class="myModal">
    <div class="modalOverlay" @click="$emit('closeModal')"></div>
    <div class="modalBox">
      <h3 class="commonCard">Результат <span @click="$emit('closeModal')" class="closeModal">✕</span></h3>
      <div class="pa-3">
        <v-layout row wrap>
          <v-flex xs4 d-flex justify-center align-center>
            <h4>Цена</h4>
          </v-flex>
          <v-flex xs8>
            <v-text-field hide-details readonly v-model="resData.price" solo></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row wrap class="mt-3">
          <v-flex xs4 d-flex justify-center align-center>
            <h4>Файл спецификация</h4>
          </v-flex>
          <v-flex xs8>
            <v-btn
              :loading="loading"
              :disabled="loading"
              color="blue-grey"
              class="white--text ma-0"
              :href="'http://aspr.tech:8080/loadfiles?fileid='+ resData.id"
              target="blank"
            >
              Загрузить файл
              <v-icon right dark>cloud_upload</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
        <v-layout class="mt-3">
          <v-flex xs4>
            <h4>Пересчитать на другом производителе?</h4>
          </v-flex>
          <v-flex xs8 class="pl-2">
            <v-layout>
              <v-flex xs6>
                <v-select
                  height="30"
                  hide-details
                  :items="incb_mnf"
                  item-text="name"
                  item-value="id"
                  v-model="mnf"
                  placeholder="Производитель"
                  outline
                ></v-select>
              </v-flex>
              <v-flex xs6>
                <v-btn
                  class="ma-0 ml-2"
                  color="success"
                  @click="recount()"
                  :disabled="mnf == ''"
                  dark
                >Пересчитать</v-btn>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
        <v-layout row wrap class="mt-3">
          <v-flex xs12>
            <h4 style="text-align: center;">Комментарии конструктора</h4>
            <ul class="remarks mt-2">
              <li v-for="(alarm,i) in resData.alarms" :key="i">{{alarm}}</li>
            </ul>
          </v-flex>
        </v-layout>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    price: "10000000",
    loader: null,
    loading: false,
    mnf: "",
    incb_mnf: [
      { name: "Schneider Electric", id: 1 },
      { name: "DEKraft", id: 2 },
      { name: "IEK", id: 3 },
      { name: "TDM", id: 4 },
      { name: "КЭАЗ", id: 5 },
      { name: "ABB", id: 6 }
    ]
  }),
  methods: {
    recount() {
      this.$store.dispatch("sendDataChanged", this.mnf);
    }
  },
  computed: {
    resData() {
      return this.$store.getters.getResults;
    }
  },
  watch: {
    loader() {
      const l = this.loader;
      this[l] = !this[l];

      setTimeout(() => (this[l] = false), 3000);

      this.loader = null;
    }
  }
};
</script>
<style scoped>
h3 {
  color: #fff;
  padding: 10px;
}
.remarks {
  color: red;
}
</style>

