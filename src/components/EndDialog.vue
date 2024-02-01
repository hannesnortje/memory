<!-- src/components/Dialog.vue -->
<template>
  <div class="overlay">
    <div class="dialog">
      <p v-if="numberOfPlayers > 1">
        Congratulations {{ winner }} you won with a score of {{ score }}!!!!
      </p>
      <p v-else>Congratulations {{ winner }} you complete this round!!!!</p>
      <div class="flex">
        <button @click="nextStep('playAgain')">Play Again</button>
        <button @click="nextStep('startOver')">Start All Over</button>
        <button @click="endGame">End Game</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  winner: {
    type: String,
    required: true,
    default: ''
  },
  score: {
    type: Number,
    required: true,
    default: 0
  },
  numberOfPlayers: {
    type: Number,
    required: true,
    default: 1
  }
});

const emits = defineEmits(['nextStep']);

const nextStep = (step: string) => {
  emits('nextStep', step);
};

const endGame = () => {
  window.open('/', '_self');
};
</script>

<style scoped>
p {
  font-weight: 900;
  font-size: 2rem;
}

button {
  padding: 10px;
  background-color: #3498db;
  color: #fff;
  border: none;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
}
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

.font-red {
  color: red;
}

.flex {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
