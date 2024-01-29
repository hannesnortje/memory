<template>
    <div class="player-indicator">
        <span class="player-name">{{ playerName }}</span>
        <span class="player-score">Score: {{ playerScore }}</span>
        <svg width="10" height="10" class="status-indicator">
          <circle cx="5" cy="5" r="5" :class="isActive ? 'active' : 'inactive'"/>
        </svg>
    </div>
  </template>
  
  <script setup lang="ts">

    const props = defineProps({
      playerName: {
        type: String,
        required: true
      },
      isActive: {
        type: Boolean,
        required: true
      },
      playerScore: {
        type: Number,
        required: true
      }
    })

  </script>
  
  <style scoped>
  .player-indicator {
    display: flex;
    align-items: center;
  }
  
  .player-name {
    margin-left: 2rem;
  }
  
  .player-score {
    margin-left: 2rem;
  }
  .status-indicator {
    margin-left: 2rem;
  }
  
  .status-indicator .active {
    fill: green;
  }
  
  .status-indicator .inactive {
    fill: gray;
  }
  </style>
  