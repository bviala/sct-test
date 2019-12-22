import Vue from 'vue'
import Vuex from 'vuex'

import { products } from '@/api/shop'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cart: {},
    discounts: []
  },
  getters: {
    totalQuantity () {
      // TODO
    },
    rawTotalCost () {
      // TODO
    },
    appliedDiscounts () {
      // TODO
    },
    finalTotalCost () {
      // TODO
    }
  },
  mutations: {
    setDiscounts (state) {
      // TODO
    },
    setCart (state, { cart }) {
      state.cart = cart
    },
    scanProduct (state, { productCode, quantity }) {
      if (quantity < 0) {
        state.cart[productCode].quantity = 0
      } else {
        state.cart[productCode].quantity = quantity
      }
    }
  },
  actions: {
    initializeCart ({ commit }) {
      const cart = {}
      for (const product of products) {
        cart[product.code] = {
          ...product,
          quantity: 0
        }
      }
      commit('setCart', { cart })
    }
  }
})
