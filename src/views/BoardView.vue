<template>
  <div>
    <PlayerInterface
      :player1-name="player1Name"
      :player2-name="player2Name"
      :number-cards="numberCards"
      @the-winner="theWinner"
      ref="swapPlayers"/>
    <div class="card-container">        
      <PlayingCard
        v-for="(value, index) in subDeckFaces" :key="index"
        ref="playingCards"
        :svg-back="backFace"
        :alt-back="backName"
        :svg-front="value"
        :alt-front="subDeckNames[index]"
        class="playing-card fade-in"
        @card2Turn="card2Turn"
        :place-number="index"
        :animation-delay="animationDelay()"
        />
    </div>
    <StartDialog v-if="controlDialoge" @close-event="closeStartDialog" @start-event="startGame"/>
    <EndDialog v-if="endDialog" :winner="winner" :score="score" @next-step="nextStep"/>
  </div>
</template>

<script setup lang="ts">
import PlayingCard from '@/components/PlayingCard.vue';
import StartDialog from '@/components/StartDialog.vue'
import { useCardStore } from '@/stores/useCardStore';
import { onMounted, ref } from 'vue'
import { useTimeoutFn } from '@vueuse/core'
import PlayerInterface from '@/components/PlayerInterface.vue';
import EndDialog from '@/components/EndDialog.vue';

const controlDialoge = ref()
const player1Name = ref('')
const player2Name = ref('')
const numberCards = ref(0);
let wholeDeck;
let subDeckIndexes;
const subDeckNames = ref([]);
const subDeckFaces = ref([]);

const backName = ref();
const backFace = ref();

const swapPlayers = ref();

const playingCards = ref();

const winner = ref();
const score = ref();
const endDialog = ref(false);

let delayCal = -2;

const animationDelay = ()=>{
  delayCal = delayCal + 0.2;
  return delayCal;
}

const theWinner = (winnerName: string, winnerScore: number)=>{
  winner.value = winnerName;
  score.value = winnerScore;
  endDialog.value = true;
}

const nextStep = (step: string)=>{
  endDialog.value = false;
  if(step === "playAgain"){
    
    insertCards();
  } else if (step === "startOver"){
    closeStartDialog();
    insertCards();
  }
}

let doubleCards = {
  firstAlt: '',
  firstPlace: -1,
  secondCard: false,
};

const atSwapPlayers = (correct="") => {
  doubleCards.firstAlt = '';
  doubleCards.firstPlace = -1;
  doubleCards.secondCard = false;
  swapPlayers.value.swapPlayers(correct);
}

const timeOut = (number1: number, number2:number)=>{
  const { isPending, start, stop } = useTimeoutFn(() => {
        playingCards.value[number1].turnCard();
        playingCards.value[number2].turnCard();
        atSwapPlayers();
      }, 3000)
  start();
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
      atSwapPlayers("correct");
    } else {
      timeOut(placeNumber, doubleCards.firstPlace);
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
  subDeckIndexes = useCardStore().getSupDeckIndexs(numberCards.value);
  for(let i = 0; i < numberCards.value; i++){
    for(let [key, value] of Object.entries(wholeDeck[subDeckIndexes[i]])){
      subDeckNames.value.push(key);
      subDeckFaces.value.push(value);
    }
  }
}

const startGame = (plr1Name: string, plr2Name: string, numSize: number, choice4Back) => {
  player1Name.value = plr1Name
  player2Name.value = plr2Name
  numberCards.value = numSize;
  backName.value = Object.keys(choice4Back)[0];
  backFace.value = Object.values(choice4Back)[0];
  closeStartDialog();
  insertCards();
}
</script>

<style scoped>
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

.fade-in {
  opacity: 0;
  transition: opacity 0.5s;
}
</style>
