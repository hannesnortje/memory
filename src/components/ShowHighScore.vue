<template>
  <div class="flex m-2 font">
    <p v-if="storedHighScore > 0">
      The hightscore is held by {{ storedHighScoreName }} with a score of {{ storedHighScore }}.
    </p>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useCardStore } from '@/stores/useCardStore';
import { retrieveHighScore } from '@/composables/localStorage';

const storedHighScore = ref();
const storedHighScoreName = ref(useCardStore().getHightScore().name);

onMounted(() => {
  retrieveHighScore();
  storedHighScore.value = useCardStore().getHightScore().score;
  storedHighScoreName.value = useCardStore().getHightScore().name;
});
</script>

<style scoped>
.flex {
  display: flex;
  justify-content: center;
}

.m-2 {
  margin-top: 3rem;
  margin-bottom: 1rem;
}

.font {
  font-size: 2rem;
  font-weight: 600;
}
</style>
