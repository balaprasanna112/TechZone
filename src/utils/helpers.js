export function formatPrice(amount) {
  return '₹' + amount.toLocaleString('en-IN')
}

export function getDiscountPercent(price, originalPrice) {
  if (!originalPrice || originalPrice <= price) {
    return 0
  }

  return Math.round(
    ((originalPrice - price) / originalPrice) * 100
  )
}

export function isValidEmail(email) {
  return /^\S+@\S+\.\S+$/.test(email)
}