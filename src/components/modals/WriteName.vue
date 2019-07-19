<template>
  <div class="modalWrapper">
    <v-card>
      <v-card-title primary-title>
        <div>
          <h3 class="headline mb-2">Введите имя сборки</h3>
          <v-text-field label="Имя" hide-details v-model="name"></v-text-field>
        </div>
      </v-card-title>
      <v-card-actions>
        <v-btn flat color="success" @click="sendName()">Сохранить</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: ""
    };
  },
  methods: {
    sendName() {
      this.$emit("sendName", this.name);
    }
  }
};
</script>
<style scoped>
.modalWrapper {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(85, 85, 85, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
