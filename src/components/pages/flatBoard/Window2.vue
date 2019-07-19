<template>
  <div class="myModal">
    <div class="modalOverlay" @click="$emit('closeModal')"></div>
    <div class="modalBox">
      <h3 class="comModalTitle">
        Отходящие линии
        <span @click="$emit('closeModal')" class="closeModal">✕</span>
      </h3>
    </div>
  </div>
</template>
<script>
export default {
  props: {},
  data: () => ({}),
  methods: {},
  created() {}
};
</script>
<style scoped>

</style>

