<template>
  <aside class="summary">
    <h1 class="main">
      Order Summary
    </h1>
    <ul class="summary-items wrapper border">
      <li>
        <span class="summary-items-number">{{ totalQuantity || 'No' }} Items</span>
        <span class="summary-items-price">{{ rawTotalCost }}<span class="currency">€</span></span>
      </li>
    </ul>
    <div
      v-if="appliedDiscounts.length"
      class="summary-discounts wrapper-half border"
    >
      <h2>Discounts</h2>
      <ul>
        <li
          v-for="discount in appliedDiscounts"
          :key="discount.name"
        >
          <span>{{ discount.name }}</span>
          <span>-{{ discount.value }} €</span>
        </li>
      </ul>
    </div>
    <div class="summary-total wrapper">
      <ul>
        <li>
          <span class="summary-total-cost">Total cost</span>
          <span class="summary-total-price">{{ finalTotalCost }}&nbsp;€</span>
        </li>
      </ul>
      <button type="submit">
        Checkout
      </button>
    </div>
  </aside>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: mapGetters([
    'totalQuantity',
    'rawTotalCost',
    'appliedDiscounts',
    'finalTotalCost'
  ])
}
</script>
