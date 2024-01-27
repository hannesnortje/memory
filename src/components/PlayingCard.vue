<template>
    <div>
        <img :src="svgMarkup" :alt="svgAlt" @click="$emit('card2Turn', props.altFront, props.placeNumber);"/>
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
    },
    placeNumber: {
        type: Number,
        required: true
    }
});

const svgMarkup = ref(props.svgBack);
const svgAlt = ref(props.altBack);

const turnCard = () => {
        svgMarkup.value = props.svgFront;
        svgAlt.value = props.altFront;
}

const turnBack = ()=>{
    svgMarkup.value = props.svgBack;
    svgAlt.value = props.altBack;
}

defineExpose({
    turnCard,
    turnBack,
})

</script>

<style scoped>

</style>