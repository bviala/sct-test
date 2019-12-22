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
    <aside class="summary">
      <h1 class="main">
        Order Summary
      </h1>
      <ul class="summary-items wrapper border">
        <li>
          <span class="summary-items-number">{{ totalQuantity }} Items</span>
          <span class="summary-items-price">{{ rawTotalCost }}<span class="currency">€</span></span>
        </li>
      </ul>
      <div class="summary-discounts wrapper-half border">
        <h2>Discounts</h2>
        <ul>
          <li><span>2x1 Mug offer</span><span>-10€</span></li>
          <li><span>x3 Shirt offer</span><span>-3€</span></li>
          <li><span>Promo code</span><span>0€</span></li>
        </ul>
      </div>
      <div class="summary-total wrapper">
        <ul>
          <li>
            <span class="summary-total-cost">Total cost</span><span class="summary-total-price">107€</span>
          </li>
        </ul>
        <button type="submit">
          Checkout
        </button>
      </div>
    </aside>
  </main>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Product from '@/components/Product'

export default {
  components: { Product },
  computed: {
    ...mapState(['cart']),
    ...mapGetters(['totalQuantity', 'rawTotalCost'])
  },
  created () {
    this.$store.dispatch('initializeCart')
  }
}
</script>
