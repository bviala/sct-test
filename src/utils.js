export const verifyPositiveInteger = X => {
  if (!Number.isInteger(X) || X < 0) {
    throw new Error(`Expected positive integer but got ${X}`)
  }
}

export const verifyStrictlyPositiveInteger = X => {
  if (!Number.isInteger(X) || X < 1) {
    throw new Error(`Expected strictly positive integer but got ${X}`)
  }
}

export const verifyProportion = X => {
  if (isNaN(X) || X < 0 || X > 1) {
    throw new Error(`Expected number between 0 and 1 but got ${X}`)
  }
}
