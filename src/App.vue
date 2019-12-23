<template>
  <main class="App">
    <Promised
      :promise="promise"
      class="display-contents"
    >
      <template v-slot:pending>
        <Spinner />
      </template>
      <Cart />
      <Summary />
    </Promised>
  </main>
</template>

<script>
import { Promised } from 'vue-promised'
import Cart from '@/components/Cart'
import Summary from '@/components/Summary'
import Spinner from '@/components/Spinner'

export default {
  name: 'App',
  components: {
    Cart,
    Summary,
    Promised,
    Spinner
  },
  computed: {
    promise () {
      return this.$store.dispatch('initializeShop')
    }
  }
}
</script>

<style>
  @import "main.css";
  .display-contents {
    display: contents;
  }
</style>
