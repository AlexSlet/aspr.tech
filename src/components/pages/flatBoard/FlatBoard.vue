<template>
  <v-container>
    <v-layout row wrap justify-center>
      <v-flex xs6>
        <h3 style="text-align: center;">Заполните данные распределительного устройства</h3>
        <v-card class="ma-3 white--text" color="commonCard" v-for="modal in modalsList" :key="modal.id">
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{modal.name}}</h3>
            </div>
          </v-card-title>
          <v-card-actions class="mt-4">
            <v-layout row wrap>
              <v-flex xs6>
                <v-btn color="blue darken-4" outline>Добавить устройства</v-btn>
              </v-flex>
            </v-layout>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>

export default {
  name: "FlatBoard",
  components: {
  },
  data: () => ({
   modalsList: [
     {
       id: 1,
       name: "Параметры вводных устройств и комплектующие",
       type: 'insw'
     },
     {
       id: 2,
       name: "Параметры отходящих автоматов",
       type: 'list_eq'
     },
   ]
  }),
  methods: {
    
  },
  computed: {
    
  },
  created() {
    
  }
};
</script>

<style>
</style>
