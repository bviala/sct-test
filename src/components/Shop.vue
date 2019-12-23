<template>
  <main class="App">
    <section class="products">
      <h1 class="main">
        Shopping cart
      </h1>
      <ul class="products-list tableHead">
        <li class="products-list-title row">
          <div class="col-product">
            Product details
          </div>
          <div class="col-quantity">
            Quantity
          </div>
          <div class="col-price">
            Price
          </div>
          <div class="col-total">
            Total
          </div>
        </li>
      </ul>
      <ul class="products-list">
        <Product
          v-for="product in cart"
          :key="product.code"
          :product="product"
        />
      </ul>
    </section>
    <Summary />
  </main>
</template>

<script>
import { mapState } from 'vuex'
import Product from '@/components/Product'
import Summary from '@/components/Summary'

export default {
  components: { Product, Summary },
  computed: mapState(['cart']),
  created () {
    this.$store.dispatch('initializeCart')
  }
}
</script>
