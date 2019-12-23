<template>
  <main class="App">
    <Cart />
    <Summary />
  </main>
</template>

<script>
import Cart from '@/components/Cart'
import Summary from '@/components/Summary'

export default {
  name: 'App',
  components: {
    Cart,
    Summary
  },
  created () {
    this.$store.dispatch('initializeShop')
  }
}
</script>

<style>
@import "main.css";
</style>
