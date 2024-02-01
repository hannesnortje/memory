<!-- src/components/Dialog.vue -->
<template>
  <div class="overlay">
    <div class="dialog">
      <div>
        <h2>Memory Start Dialogue</h2>
        <div class="mb-1">
          <label>
            Number of players:
            <select v-model="numberOfPlayers">
              <option value="1">One Player</option>
              <option value="2">Two Players</option>
            </select>
          </label>
        </div>

        <div class="mb-1">
          <div v-if="numberOfPlayers === '1'">
            <label>
              Player 1 Name:
              <input v-model="player1Name" type="text" />
            </label>
          </div>

          <div v-else-if="numberOfPlayers === '2'">
            <label>
              Player 1 Name:
              <input v-model="player1Name" type="text" />
            </label>
            <label>
              Player 2 Name:
              <input v-model="player2Name" type="text" />
            </label>
          </div>
        </div>

        <div class="mb-1">
          <label>
            Please give a even number min 10 and max 50 for size of game:
            <input type="number" v-model.number="numSize" @change="error = false" />
            <p v-if="error" class="font-red">Error: {{ numSize }} out of bounds</p>
          </label>
        </div>

        <div class="flex-horz">
          <CardSlider :cards="useCardStore().getBacks()" @chosen-card="chosenBack"></CardSlider>

          <div class="flex-vert">
            <button @click="startGame">Start Game</button>
            <button @click="close">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import validations from '@/miscellaneous/validations.js';
import { useCardStore } from '@/stores/useCardStore';
import CardSlider from './CardSlider.vue';

const numberOfPlayers = ref('1');
const player1Name = ref('');
const player2Name = ref('');
const numSize = ref(20);
const error = ref(false);
const choice4Back = ref({ astronaut: '/src/data/svg_playing_cards/backs/astronaut.svg' });

const chosenBack = (value) => {
  choice4Back.value = value;
};

const emits = defineEmits(['closeEvent', 'startEvent']);

const validate = () => {
  if (validations.checkDeckSize(numSize.value)) {
    error.value = true;
    return false;
  }
  return true;
};

const startGame = () => {
  if (validate()) {
    emits(
      'startEvent',
      player1Name.value,
      player2Name.value,
      numSize.value,
      choice4Back.value,
      numberOfPlayers.value
    );
  }
};

const close = () => {
  emits('closeEvent');
};
</script>

<style scoped>
h2 {
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
  font-weight: 700;
  text-decoration: underline;
  text-underline-offset: 0.7rem;
  margin-bottom: 1.5rem;
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

.mb-1 {
  margin-bottom: 1rem;
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
  justify-content: space-around;
}

.flex-vert {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
</style>
