export function validateCI(ci) {
  let total = 0
  if (ci.length === 10) {
    const digits = ci.split('').map(Number)
    const coef = [2, 1, 2, 1, 2, 1, 2, 1, 2]

    for (let i = 0; i < coef.length; i++) {
      const val = digits[i] * coef[i]
      total += val > 9 ? val - 9 : val
    }

    const checkDigit = total % 10 === 0 ? 0 : 10 - (total % 10)
    return checkDigit === digits[9]
  }

  return false
}
