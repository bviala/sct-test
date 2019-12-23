import Vue from 'vue'
import Vuex from 'vuex'

import { products, discounts } from '@/api/shop'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cart: {},
    discounts: []
  },
  getters: {
    totalQuantity (state) {
      return Object.values(state.cart) // turn in an array
        .reduce((quantityAccumulator, product) => quantityAccumulator + product.quantity, 0)
    },
    rawTotalCost (state) {
      return Object.values(state.cart) // turn in an array
        .reduce((costAccumulator, product) => costAccumulator + product.quantity * product.price, 0)
    },
    appliedDiscounts (state) {
      return state.discounts.map(discount => { // for each type of discount
        return discount.scope.map(product => { // for each product it applies to
          return {
            name: `${discount.name} ${state.cart[product].name} offer`,
            value: discount.function(state.cart[product].quantity, state.cart[product].price)
          }
        })
      })
        .reduce((discountAccumulator, discount) => { // flatten the array of array
          return discountAccumulator.concat(discount)
        }, [])
        .filter(discount => discount.value > 0)
    },
    finalTotalCost (state, getters) {
      const totalDiscount = getters.appliedDiscounts.reduce((discountAccumulator, discount) => discountAccumulator + discount.value, 0)
      return getters.rawTotalCost - totalDiscount
    }
  },
  mutations: {
    setDiscounts (state, { discounts }) {
      state.discounts = discounts
    },
    setCart (state, { cart }) {
      state.cart = cart
    },
    scanProduct (state, { productCode, quantity }) {
      if (quantity < 0) {
        state.cart[productCode].quantity = 0
      } else {
        state.cart[productCode].quantity = Number(quantity)
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

      commit('setDiscounts', { discounts })
    }
  }
})
