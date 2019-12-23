const XplusYDiscountFactory = (X, Y) => (itemQuantity, itemPrice) => Math.trunc(itemQuantity / (X + Y)) * itemPrice
const BulkDiscountFactory = (treshold, cut) => (itemQuantity, itemPrice) => itemQuantity >= treshold ? itemQuantity * itemPrice * cut : 0

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
