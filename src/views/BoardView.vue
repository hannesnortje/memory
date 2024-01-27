<template>
  <div>
    <section class="flex-section">
      <div>
        <h2>Players</h2>
      </div>
      <div class="flex-playbox">
        <p>Player 1: {{ player1Name }}</p>
        <p>Player 2: {{ player2Name }}</p>
      </div>
    </section>
    <div class="card-container">        
      <PlayingCard
        v-for="(value, index) in subDeckFaces" :key="index"
        ref="playingCards"
        :svg-back="backFace"
        :alt-back="backName"
        :svg-front="value"
        :alt-front="subDeckNames[index]"
        class="playing-card"
        @card2Turn="card2Turn"
        :place-number="index"
        />
    </div>
    <StartDialog v-if="controlDialoge" @close-event="closeStartDialog" @start-event="startGame"/>
  </div>
</template>

<script setup lang="ts">
import PlayingCard from '@/components/PlayingCard.vue';
import StartDialog from '@/components/StartDialog.vue'
import { useCardStore } from '@/stores/useCardStore';
import { onMounted, ref } from 'vue'
import { useTimeoutFn } from '@vueuse/core'

const controlDialoge = ref()
const player1Name = ref()
const player2Name = ref()
let numberCards: number;
let wholeDeck;
let subDeckIndexes;
const subDeckNames = ref([]);
const subDeckFaces = ref([]);

const backName = ref();
const backFace = ref();

const playingCards = ref();

let doubleCards = {
  firstAlt: '',
  firstPlace: -1,
  secondCard: false,
};

const clearCards = () => {
  doubleCards.firstAlt = '';
  doubleCards.firstPlace = -1;
  doubleCards.secondCard = false;
}

const card2Turn = (altFront: string, placeNumber: number)=>{
  if(doubleCards.firstAlt === ''){
    doubleCards.firstAlt = altFront;
    doubleCards.firstPlace = placeNumber
    playingCards.value[placeNumber].turnCard();
  } else if(!doubleCards.secondCard) {
    doubleCards.secondCard = true;
    playingCards.value[placeNumber].turnCard();
    if(doubleCards.firstAlt === altFront){
      clearCards();
    } else {
      const { isPending, start, stop } = useTimeoutFn(() => {
        playingCards.value[placeNumber].turnBack();
        playingCards.value[doubleCards.firstPlace].turnBack();
        clearCards();
      }, 3000)
    }
  }
}

onMounted(() => {
  controlDialoge.value = true
})

const closeStartDialog = () => {
  controlDialoge.value = false
}

const insertCards = ()=>{
  wholeDeck = useCardStore().getDeck();
  subDeckIndexes = useCardStore().getSupDeckIndexs(numberCards);
  for(let i = 0; i < numberCards; i++){
    for(let [key, value] of Object.entries(wholeDeck[subDeckIndexes[i]])){
      subDeckNames.value.push(key);
      subDeckFaces.value.push(value);
    }
  }
}

const startGame = (plr1Name: string, plr2Name: string, numSize: number, choice4Back) => {
  player1Name.value = plr1Name
  player2Name.value = plr2Name
  numberCards = numSize;
  backName.value = Object.keys(choice4Back)[0];
  backFace.value = Object.values(choice4Back)[0];
  closeStartDialog();
  insertCards();
}
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
}
.flex-playbox {
  display: flex;
  flex: 1;
  justify-content: space-around;
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}

.playing-card {
  object-fit: cover;  
  height: auto;
} 
</style>
