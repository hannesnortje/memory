<template>
  <main>
    <p>
      Welcome to Memory. Click the following link to start a game, alternatively use the menu above
    </p>
    <button @click="navigateToBoard">Start a Game</button>
  </main>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const navigateToBoard = () => {
  router.push('/board')
}
</script>
