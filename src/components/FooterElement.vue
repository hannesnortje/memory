<template>
  <div>
    <button @click="openImprint" class="font-bold transition-all duration-300 hover:scale-150">
      Imprint
    </button>
    <span class="ml-20"
      >&copy; {{ new Date().getFullYear() }} Hannes Nortjé - Memory Game. All rights reserved.</span
    >
  </div>
</template>

<script setup lang="ts">
const openImprint = () => {
  window.open('/imprint', '_blank');
};
</script>

<style scoped>
.ml-20 {
  margin-left: 1.2rem;
}
</style>
