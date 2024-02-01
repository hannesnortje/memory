<template>
  <section class="flex-section">
    <div>
      <h2 v-if="numberOfPlayers > 1">Players</h2>
      <h2 v-else>Player</h2>
    </div>
    <div class="flex-playbox">
      <span :class="{ active: player1Active }"
        >Player 1:
        <PlayerDisplay
          :player-name="player1Name"
          :player-score="player1Score"
          :is-active="player1Active"
      /></span>
      <span v-if="numberOfPlayers > 1" :class="{ active: player2Active }"
        >Player 2:
        <PlayerDisplay
          :player-name="player2Name"
          :player-score="player2Score"
          :is-active="player2Active"
      /></span>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import PlayerDisplay from './PlayerDisplay.vue';

const props = defineProps({
  player1Name: {
    type: String,
    required: true
  },
  player2Name: {
    type: String,
    default: ''
  },
  numberCards: {
    type: Number,
    required: true
  },
  numberOfPlayers: {
    type: Number,
    required: true,
    default: 1
  }
});

const player1Active = ref(true);
const player2Active = ref(false);

const player1Score = ref(0);
const player2Score = ref(0);

let rounds = 0;

const emits = defineEmits(['theWinner']);

const handleScore = (correct = '') => {
  if (correct === 'correct') {
    rounds++;
    if (player1Active.value) {
      player1Score.value++;
    } else {
      player2Score.value++;
    }
    if (rounds === props.numberCards / 2) {
      let winnerName;
      let winnerScore;
      if (player1Score.value > player2Score.value) {
        winnerName = props.player1Name;
        winnerScore = player1Score.value;
      } else {
        winnerName = props.player2Name;
        winnerScore = player2Score.value;
      }
      emits('theWinner', winnerName, winnerScore);
    }
  }
  return true;
};

const swapPlayers = (correct = '') => {
  if (handleScore(correct) && props.numberOfPlayers > 1) {
    player1Active.value = !player1Active.value;
    player2Active.value = !player2Active.value;
  }
};

const playAgain = () => {
  rounds = 0;
  player1Active.value = true;
  player2Active.value = false;
  player1Score.value = 0;
  player2Score.value = 0;
};

defineExpose({
  swapPlayers,
  playAgain
});
</script>

<style scoped>
.flex-section {
  display: flex;
  flex-direction: column;
}
h2 {
  text-align: center;
  text-decoration: underline;
  text-underline-offset: 0.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
}
.flex-playbox {
  display: flex;
  flex: 1;
  justify-content: space-around;
}

.active {
  border: 2px solid black;
  border-radius: 10px;
  padding: 1rem;
  margin-bottom: 1rem;
}

span {
  display: flex;
}
</style>
