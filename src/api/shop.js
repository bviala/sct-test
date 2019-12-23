import { products } from './static/products'
import { discounts } from './static/discounts'

const DELAY = 2000

// we mock a request to an external API
export const getShopInfo = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        products,
        discounts
      })
    }, DELAY)
  })
}
