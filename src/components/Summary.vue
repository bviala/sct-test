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
    <transition name="fade">
      <div
        v-if="appliedDiscounts.length"
        class="summary-discounts wrapper-half"
      >
        <h2>Discounts</h2>
        <transition-group
          name="list"
          tag="ul"
          class="list"
        >
          <li
            v-for="discount in appliedDiscounts"
            :key="discount.name"
            class="list-item"
          >
            <span>{{ discount.name }}</span>
            <span>-{{ discount.value }} €</span>
          </li>
        </transition-group>
      </div>
    </transition>
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
<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

.list {
  position: relative;
}

.list-leave-active {
  position: absolute;
  right: 0;
  left: 0;
}

.list-enter, .list-leave-to {
  opacity: 0;
}

.list-move {
  transition: transform;
}

.list-item {
  transition: all 0.3s;
}
</style>
