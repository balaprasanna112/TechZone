
import products from '../data/products'
import { formatPrice } from '../utils/helpers'

function Cart({ cart, onChangeQuantity, onRemove }) {
  const cartItems = cart.map((item) => {
    const product = products.find((p) => p.id === item.id)

    return {
      ...item,
      product,
    }
  })

  let subtotal = 0
  let savings = 0

  cartItems.forEach((item) => {
    subtotal += item.product.price * item.quantity

    savings +=
      (item.product.originalPrice - item.product.price) *
      item.quantity
  })

  let shipping = 0

  if (subtotal > 0 && subtotal < 4000) {
    shipping = 99
  }

  const total = subtotal + shipping

  if (cart.length === 0) {
    return (
      <div className="container page-section">
        <div className="empty-box">
          <h3>Your cart is empty</h3>

          <p className="text-muted">
            Looks like you have not added anything yet.
          </p>

          <a href="#/products" className="btn btn-primary">
            Continue Shopping
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="container page-section">
      <h1 className="h3 mb-4">Shopping Cart</h1>

      <div className="row g-4">
        <div className="col-lg-8">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img
                src={item.product.image}
                alt={item.product.name}
              />

              <div className="cart-item-info">
                <a
                  href={'#/product/' + item.id}
                  className="product-name"
                >
                  {item.product.name}
                </a>

                {item.options && (
                  <small className="text-muted">
                    {item.options}
                  </small>
                )}

                <strong>
                  {formatPrice(item.product.price)}
                </strong>
              </div>

              <div className="quantity-box">
                <button
                  onClick={() => onChangeQuantity(item.id, -1)}
                  aria-label="Decrease quantity"
                >
                  −
                </button>

                <span>{item.quantity}</span>

                <button
                  onClick={() => onChangeQuantity(item.id, 1)}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <strong className="cart-line-total">
                {formatPrice(item.product.price * item.quantity)}
              </strong>

              <button
                className="remove-btn static"
                onClick={() => onRemove(item.id)}
                aria-label="Remove item"
              >
                🗑
              </button>
            </div>
          ))}

          <a
            href="#/products"
            className="btn btn-outline-primary mt-2"
          >
            ← Continue Shopping
          </a>
        </div>

        <div className="col-lg-4">
          <div className="summary-card">
            <h5>Order Summary</h5>

            <div className="summary-row">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>

            <div className="summary-row">
              <span>Shipping</span>
              <span>
                {shipping === 0 ? 'Free' : formatPrice(shipping)}
              </span>
            </div>

            {savings > 0 && (
              <div className="summary-row text-success">
                <span>You save</span>
                <span>{formatPrice(savings)}</span>
              </div>
            )}

            <div className="summary-row total">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>

            <a
              href="#/checkout"
              className="btn btn-primary w-100"
            >
              Proceed to Checkout
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
