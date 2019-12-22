<template>
  <li class="product row">
    <div class="col-product">
      <figure class="product-image">
        <img
          :src="product.img"
          :alt="product.name"
        >
        <div class="product-description">
          <h1>{{ product.name }}</h1>
          <p class="product-code">
            Product code {{ product.code }}
          </p>
        </div>
      </figure>
    </div>
    <div class="col-quantity">
      <button
        class="count"
        @click="removeOne"
      >
        -
      </button>
      <input
        v-model="quantity"
        type="number"
        class="product-quantity"
      >
      <button
        class="count"
        @click="addOne"
      >
        +
      </button>
    </div>
    <div class="col-price">
      <span class="product-price">{{ product.price }}</span>
      <span class="product-currency currency">€</span>
    </div>
    <div class="col-total">
      <span class="product-price">{{ totalPrice }}</span>
      <span class="product-currency currency">€</span>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  computed: {
    quantity: {
      get () {
        return this.$store.state.cart[this.product.code].quantity
      },
      set (quantity) {
        this.$store.commit('scanProduct', {
          productCode: this.product.code,
          quantity
        })
      }
    },
    totalPrice () {
      return this.quantity * this.product.price
    }
  },
  methods: {
    addOne () {
      this.quantity++
    },
    removeOne () {
      this.quantity--
    }
  }
}
</script>
