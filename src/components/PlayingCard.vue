<template>
    <div :class="{ card: true, flip: isFaceUp }" class="fly-in" ref="respectiveCard">
        <img v-if="isFaceUp" :src="props.svgFront" :alt="props.altFront" />
        <img v-else :src="props.svgBack" :alt="props.altBack" @click="$emit('card2Turn', props.altFront, props.placeNumber);" />
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const props = defineProps({
    svgFront: {
        type: String,
        required: true,
    },
    altFront: {
        type: String,
        required: true,
        default: "SVG Image Front"
    },
    svgBack: {
        type: String,
        required: true,
    },
    altBack: {
        type: String,
        required: true,
        default: "SVG Image Back"
    },
    placeNumber: {
        type: Number,
        required: true
    },
    animationDelay: {
        type: Number,
        required: true,
        default: 0
    }
});

const respectiveCard = ref();

onMounted(() => {
    respectiveCard.value.style.animationDelay = `${props.animationDelay}s`
})

const isFaceUp = ref(false);

const turnCard = () => {
    isFaceUp.value = !isFaceUp.value;
}

defineExpose({
    turnCard,
})

</script>

<style scoped>

@keyframes flyIn {
  0% {
    transform: translate(-100%, -100%);
    opacity: 0;
  }
  100% {
    transform: translate(0, 0);
    opacity: 1;
  }
}

.fly-in {
    animation: flyIn 0.5s ease-out forwards;
}

.card {
  transition: transform 0.6s;
  transform-style: preserve-3d;
}

.flip {
  transform: rotateY(180deg);
}
</style>