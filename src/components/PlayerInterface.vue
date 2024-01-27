<template>
    <section class="flex-section">

        <div>
            <h2>Players</h2>
        </div>
        <div class="flex-playbox">
            <p>Player 1: {{ player1Name }}</p>
            <p>Player 2: {{ player2Name }}</p>
        </div>
    </section>
</template>

<script setup lang="ts">

const props = defineProps({
    player1Name : {
        type: String,
        required: true,
    },
    player2Name: {
        type: String
    },
    numberCards: {
        type: Number,
        required: true
    }
})
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
</style>
