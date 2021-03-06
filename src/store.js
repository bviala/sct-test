import Vue from 'vue'
import Vuex from 'vuex'

import { getShopInfo } from '@/api/shop'

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
            value: discount.getValue(state.cart[product].quantity, state.cart[product].price)
          }
        })
      })
        .reduce((discountAccumulator, discount) => { // flatten the array of array
          return discountAccumulator.concat(discount)
        }, [])
        .filter(discount => discount.value > 0)
    },
    finalTotalCost (state, getters) {
      const totalDiscount = getters.appliedDiscounts.reduce(
        (discountAccumulator, discount) => discountAccumulator + discount.value,
        0
      )
      return getters.rawTotalCost - totalDiscount
    }
  },
  mutations: {
    initializeShop (state, { cart, discounts }) {
      state.cart = cart
      state.discounts = discounts
    },
    scanProduct (state, { productCode, quantity }) {
      if (quantity < 0) {
        state.cart[productCode].quantity = 0
      } else if (quantity > 999) {
        state.cart[productCode].quantity = 999
      } else {
        state.cart[productCode].quantity = Number(quantity)
      }
    }
  },
  actions: {
    async initializeShop ({ commit }) {
      const { products, discounts } = await getShopInfo()

      // we transform the product list array returned by the api into an Object map
      // we use the product code as entry key
      // each entry value contains both product information and current quantity selected
      const cart = {}
      for (const product of products) {
        cart[product.code] = {
          ...product,
          quantity: 0
        }
      }
      commit('initializeShop', { cart, discounts })
    }
  }
})
