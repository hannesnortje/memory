<template>
    <div>
        <img :src="svgMarkup" :alt="svgAlt" @click="turnCard()"/>
    </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue';

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
    }
});

const svgMarkup = ref(props.svgBack);
const svgAlt = ref(props.altBack);

let isTurned = false;

const emits = defineEmits(['cardTurned']);

const turnCard = () => {
    if (!isTurned){
        svgMarkup.value = props.svgFront;
        svgAlt.value = props.altFront
        isTurned = false;
        emits('cardTurned', props.altFront);
    }
}

</script>

<style scoped>

</style>