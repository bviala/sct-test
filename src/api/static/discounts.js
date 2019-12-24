import { verifyPositiveInteger, verifyStrictlyPositiveInteger, verifyProportion } from '@/utils.js'

const XplusYDiscountFactory = (X, Y) => {
  verifyStrictlyPositiveInteger(X)
  verifyStrictlyPositiveInteger(Y)
  return (itemQuantity, itemPrice) => {
    verifyPositiveInteger(itemQuantity)
    verifyPositiveInteger(itemPrice)
    return Math.trunc(itemQuantity / (X + Y)) * itemPrice * Y
  }
}

const BulkDiscountFactory = (treshold, cut) => {
  verifyPositiveInteger(treshold)
  verifyProportion(cut)
  return (itemQuantity, itemPrice) => {
    verifyPositiveInteger(itemQuantity)
    verifyPositiveInteger(itemPrice)
    return itemQuantity >= treshold ? itemQuantity * itemPrice * cut : 0
  }
}

const TwoForOne = XplusYDiscountFactory(1, 1)
const Bulk = BulkDiscountFactory(3, 0.05)

export const discounts = [
  {
    scope: ['X3W2OPY'],
    name: '2for1',
    getValue: TwoForOne
  },
  {
    scope: ['X7R2OPX'],
    name: 'Bulk',
    getValue: Bulk
  }
]
