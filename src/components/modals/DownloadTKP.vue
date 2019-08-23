<template>
  <v-dialog v-model="dialog" persistent width="500">
    <v-card>
      <v-card-title class="headline grey lighten-2" primary-title>Заполните форму</v-card-title>

      <v-card-text>
        <v-text-field label="Имя обьекта" v-model="nameObject"></v-text-field>
        <v-text-field label="Имя компании" v-model="nameCustomer"></v-text-field>
        <v-text-field label="Имя проекта" v-model="nameProject"></v-text-field>

        <h3 class="mb-2" style="text-align: left;">Укажите количество:</h3>
        <ul>
          <li v-for="(board,i) in boards" :key="board.id">
            <v-layout row wrap>
              <v-flex xs4 d-flex align-center>
                <span>{{board.name}}:</span>
              </v-flex>
              <v-flex xs2>
                <v-text-field
                  class="ma-0 pa-0"
                  mask="###"
                  hide-details
                  v-model.number="boardsForSend[i].amount"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </li>
        </ul>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <div class="flex-grow-1"></div>
        <v-btn color="primary" text @click="download()">Скачать</v-btn>
        <v-btn color="warning" text @click="close()">Закрыть</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    boards: Array,
    dialog: Boolean
  },
  data() {
    return {
      nameObject: "",
      nameCustomer: "",
      nameProject: "",
      boardsForSend: []
    };
  },
  methods: {
    download() {
      this.$emit("close");

      this.$emit("download-tkp", {
        object: this.nameObject,
        customer: this.nameCustomer,
        basis: this.nameProject,
        array_asmbls: [...this.boardsForSend]
      });
    },
    close() {
      this.$emit("close");
    },
    fillBoards() {
      this.boards.forEach(el => {
        this.boardsForSend.push({
          idorder: el.id,
          amount: 1
        });
      });
    }
  },
  created() {
    this.fillBoards();
  },
  watch: {
    boards: function() {
      this.fillBoards();
      this.nameObject = "";
      this.nameCustomer = "";
      this.nameProject = "";
    }
  }
};
</script>

<style lang="scss" scoped>
</style>