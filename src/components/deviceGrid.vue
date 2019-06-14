<template>
  <v-layout row wrap>
    <v-flex xs12>
      <h2 class="mainTitle">Выберите тип Вашего оборудования</h2>
    </v-flex>
    <v-flex xs4>
      <v-card class="ma-3">
        <v-img :src="require('@/assets/bg_3.png')" aspect-ratio="2.5"></v-img>
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">Квартирные электрошкафы</h3>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-btn color="info" class="commonBtn" to="/flatboard">Рассчитать</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
    <v-flex xs4>
      <v-card class="ma-3">
        <v-img :src="require('@/assets/bg_3.png')" aspect-ratio="2.5"></v-img>
        <v-card-title primary-title>
          <h3 class="headline mb-0" style="width: 100%;">Типовое ВРУ</h3>
        </v-card-title>
        <v-card-actions>
          <v-btn dark color="info" class="commonBtn" to="/vru">Рассчитать</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
    <v-flex xs4>
      <v-card class="ma-3">
        <v-img :src="require('@/assets/bg_1.png')" aspect-ratio="2.5"></v-img>
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">Распределительное электрооборудование (ГРЩ, ВРУ и т.д.)</h3>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-btn color="info" class="commonBtn" to="/switchboard">Рассчитать</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
    <v-flex xs4>
      <v-card class="ma-3">
        <v-img :src="require('@/assets/bg_2.png')" aspect-ratio="2.5"></v-img>
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">Шкафы с устройствами плавного пуска и частотниками</h3>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-btn disabled color="info" class="commonBtn" to="/foo">Рассчитать</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
    <v-flex xs4>
      <v-card class="ma-3">
        <v-img :src="require('@/assets/bg_4.png')" aspect-ratio="2.5"></v-img>
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">Шкафы управления, системы автоматизации (ШУ, ША, РСУ, и т.д.)</h3>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-btn disabled color="info" class="commonBtn" to="/foo">Рассчитать</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
    <v-flex xs4>
      <v-card class="ma-3">
        <v-img :src="require('@/assets/bg_3.png')" aspect-ratio="2.5"></v-img>
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">Устройства компенсации реактивной мощности (УКРМ)</h3>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-btn disabled color="info" class="commonBtn" to="/foo">Рассчитать</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
export default {};
</script>
