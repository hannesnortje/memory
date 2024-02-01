<template>
  <Layout>
    <template #header>
      <header v-if="$route.name !== 'imprint'">
        <nav>
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/board">Start a Game</RouterLink>
          <RouterLink to="/about">About</RouterLink>
        </nav>
      </header>
    </template>

    <main>
      <RouterView />
    </main>
    <template #footer>
      <footer v-if="$route.name !== 'imprint'">
        <FooterElement></FooterElement>
      </footer>
    </template>
  </Layout>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import Layout from './components/Layout.vue';
import { useCardStore } from '@/stores/useCardStore';
import { onMounted } from 'vue';
import FooterElement from './components/FooterElement.vue';

onMounted(() => {
  useCardStore().fetchDeck();
  useCardStore().fetchBacks();
});
</script>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
