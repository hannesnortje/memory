<template>
  <main class="flex">
    <div class="flex">
      <h2>
        Welcome to Memory. Click the following button to start a game, alternatively use the menu
        above
      </h2>
      <p><ShowHighScore /></p>
      <button @click="navigateToBoard" class="btn">Start a Game</button>
    </div>
  </main>
</template>

<script setup lang="ts">
import ShowHighScore from '@/components/ShowHighScore.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const navigateToBoard = () => {
  router.push('/board');
};
</script>

<style scoped>
main {
  min-height: 75vh;
}

.flex {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.btn {
  margin: 3rem;
}
</style>
