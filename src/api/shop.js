import shirtImg from '@/assets/img/shirt.png'
import mugImg from '@/assets/img/mug.png'
import capImg from '@/assets/img/cap.png'

export const products = [
  {
    code: 'X7R2OPX',
    name: 'Shirt',
    img: shirtImg,
    price: 20
  },
  {
    code: 'X2G2OPZ',
    name: 'Mug',
    img: mugImg,
    price: 5
  },
  {
    code: 'X3W2OPY',
    name: 'Cap',
    img: capImg,
    price: 10
  }
]

const XplusYDiscountFactory = (X, Y) => (itemQuantity, itemPrice) => Math.trunc(itemQuantity / (X + Y)) * itemPrice
const BulkDiscountFactory = (treshold, cut) => (itemQuantity, itemPrice) => itemQuantity >= treshold ? itemQuantity * itemPrice * cut : 0

const TwoForOne = XplusYDiscountFactory(1, 1)
const Bulk = BulkDiscountFactory(3, 0.05)

export const discounts = [
  {
    scope: ['X7R2OPX', 'X3W2OPY'],
    name: '2for1',
    compute: TwoForOne
  },
  {
    scope: ['X7R2OPX', 'X3W2OPY'],
    name: 'Bulk',
    compute: Bulk
  }
]
