<template>
  <div class="border-around">
    <h3>Choose Back Image</h3>
    <div class="card-slider">
      <img
        v-if="currentIndex > 0"
        src="/src/components/icons/arrow_back.svg"
        alt="Icon Back"
        @click="goBack"
        class="cursor"
        v-element-hover="onHoverBack"
        ref="isBack"
      />

      <div class="card cursor" v-element-hover="onHover">
        <img
          :src="cardFaces[currentIndex]"
          :alt="cardNames[currentIndex]"
          @click="chooseCard"
          ref="picture"
          :class="currentIndex === chosenIndex ? 'chosen-boarder' : ''"
        />
      </div>

      <img
        v-if="currentIndex < cardFaces.length - 1"
        src="/src/components/icons/arrow_forward.svg"
        alt="Icon forward"
        @click="goForward"
        class="cursor"
        v-element-hover="onHoverForward"
        ref="isForward"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { vElementHover } from '@vueuse/components';

const props = defineProps({
  cards: {
    type: Object,
    required: true,
    default: () => {}
  }
});

const picture = ref();

const onHover = (state: boolean) => {
  if (state) {
    picture.value.style.transform = 'scale(1.2)';
  } else {
    picture.value.style.transform = 'scale(1)';
  }
};

const isBack = ref();

const onHoverBack = (state: boolean) => {
  if (state) {
    isBack.value.style.transform = 'scale(1.2)';
  } else {
    isBack.value.style.transform = 'scale(1)';
  }
};

const isForward = ref();

const onHoverForward = (state: boolean) => {
  if (state) {
    isForward.value.style.transform = 'scale(1.2)';
  } else {
    isForward.value.style.transform = 'scale(1)';
  }
};

const currentIndex = ref(0);

const cardNames = ref([]);
const cardFaces = ref([]);

let chosenIndex = ref();

onMounted(() => {
  for (const value of Object.values(props.cards)) {
    for (const [k, v] of Object.entries(value)) {
      cardNames.value.push(k);
      cardFaces.value.push(v);
    }
  }
});

const goForward = () => {
  if (currentIndex.value < props.cards.length - 1) {
    currentIndex.value++;
  }
};

const goBack = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  }
};

const emits = defineEmits(['chosenCard']);

const chooseCard = () => {
  chosenIndex.value = currentIndex.value;
  emits('chosenCard', props.cards[currentIndex.value]);
};
</script>

<style scoped>
h3 {
  padding-bottom: 1rem;
  font-weight: 700;
}
.card-slider {
  display: flex;
  align-items: center;
  padding-bottom: 1rem;
  padding-left: 1.5rem;
  padding-right: 1rem;
}

.card {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.card img {
  height: 150px;
  width: auto;
}

.border-around {
  border: 1px solid black;
  border-radius: 5px;
  max-width: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.chosen-boarder {
  border: 5px solid #3498db;
  border-radius: 10px;
  padding: 0.5rem;
}

.cursor {
  cursor: pointer;
}
</style>
