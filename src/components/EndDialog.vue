<!-- src/components/Dialog.vue -->
<template>
  <div class="overlay">
    <div class="dialog">
      <p>Congratulations {{ winner }} you won with a score of {{ score }}!!!!</p>
      <button @click="nextStep('playAgain')">Play Again</button>
      <button @click="nextStep('startOver')">Start All Over</button>
    </div>
  </div>
</template>

<script setup lang="ts">

const props = defineProps({
  winner: {
    type: String,
    required: true,
    default: ""
  },
  score: {
    type: Number,
    required: true,
    default: 0
  }
})

const emits = defineEmits(['nextStep']);

const nextStep = (step: string) => {
  emits('nextStep', step);
}

</script>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.dialog {
  background: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.font-red{
  color: red;
}
</style>
