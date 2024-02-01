<!-- src/components/Dialog.vue -->
<template>
  <div class="overlay">
    <div class="dialog">
      <p v-if="numberOfPlayers > 1">
        Congratulations {{ winner }} you won with a score of {{ score }}!!!!
      </p>
      <p v-else>Congratulations {{ winner }} you complete this round!!!!</p>
      <div v-if="score > oldScore" class="flex-horz m-2 font">
        <span>
          Congratulations we have a new Hight Score. The last High Score was {{ oldScore }}
        </span>
      </div>
      <div class="flex-vert">
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
  },
  oldScore: {
    type: Number,
    default: 0
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

.m-2 {
  margin: 2rem;
}

.font {
  font-size: 1.5rem;
  font-weight: 600;
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

.flex-horz {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.flex-vert {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
