<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div id="app">
    <header>
      <!-- Header content goes here -->
      <slot name="header">
      </slot>
    </header>

    <main>
      <slot></slot>
    </main>

    <footer>
      <slot name="footer"> </slot>
    </footer>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  font-weight: normal;
}

a,
.green {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
  padding: 3px;
}

@media (hover: hover) {
  a:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
  }
}

@media (min-width: 1024px) {
}

footer {
  background-color: #333;
  color: white;
  padding: 1rem;
  text-align: center;
}
</style>
