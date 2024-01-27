<template>
    <div class="border-around">

        <h3>Choose Back Image</h3>
        <div class="card-slider">
            <img src="/src/components/icons/arrow_back.svg" alt="Icon Back" @click="goBack">
            
            <div class="card">
                <img :src="cardFaces[currentIndex]" :alt="cardNames[currentIndex]"  @click="chooseCard"/>
            </div>
            
            <img src="/src/components/icons/arrow_forward.svg" alt="Icon forward" @click="goForward">
            
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, onUpdated, ref } from 'vue'

const props = defineProps({
  cards: {
    type: Object,
    required: true
  }
})

const currentIndex = ref(0)

const cardNames = ref([]);
const cardFaces = ref([]);

onMounted(()=>{
    for (const value of Object.values(props.cards)) {
        for (const [k, v] of Object.entries(value)){
            cardNames.value.push(k);
            cardFaces.value.push(v);
        }
    } 

})

const goForward = () => {
  if (currentIndex.value < props.cards.length - 1) {
    currentIndex.value++
  }
}

const goBack = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--
  }
}

const emits = defineEmits(['chosenCard']);

const chooseCard = () => {
    emits('chosenCard', props.cards[currentIndex.value]);
}

</script>

<style scoped>

h3 {
    padding-bottom: 1rem;
}
.card-slider {
  display: flex;
  align-items: center;
  padding-bottom: 1rem;
}

.card {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  padding: 20px;
  cursor: pointer;
}

.card img {
  height: 100px;
  width: auto;
}

.border-around {
    border: 1px solid black;
    max-width: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>
