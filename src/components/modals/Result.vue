<template>
  <div class="myModal">
    <div class="modalOverlay" @click="$emit('closeModal')"></div>
    <div class="modalBox">
      <h3 class="comModalTitle">
        Результат
        <span @click="$emit('closeModal')" class="closeModal">✕</span>
      </h3>
      <div class="pa-3">
        <v-layout row wrap>
          <v-flex xs4 d-flex justify-center align-center>
            <h4>Цена</h4>
          </v-flex>
          <v-flex xs8>
            <div>{{resData.price | priceTransform}}</div>
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
              @click="downloadSpec()"
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
                  :disabled="mnf == null"
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
import { setTimeout } from "timers";
export default {
  filters: {
    priceTransform: function(value) {
      if (!value) return "";

      return value.toLocaleString("ru-RU", {
        style: "currency",
        currency: "RUB"
      });
    }
  },
  props: {
    resData: Object,
    item: Object
  },
  data: () => ({
    loader: null,
    loading: false,
    mnf: null,
    incb_mnf: [{ name: "IEK", id: 3 }, { name: "ABB", id: 6 }]
  }),
  methods: {
    recount() {
      this.$emit("recount", this.mnf);
    },
    downloadSpec() {
      this.axios
        .post(
          "create/specification",
          {
            id: -1,
            id_user: -1,
            save_json: { ...this.item }
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
.remarks {
  color: red;
}
</style>

