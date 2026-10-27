import { useState } from 'react'
import products from '../data/products'
import { formatPrice, isValidEmail } from '../utils/helpers'

function Checkout({ cart, onClearCart }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    payment: 'cod'
  })

  const [errors, setErrors] = useState({})
  const [orderPlaced, setOrderPlaced] = useState(false)

  let subtotal = 0

  cart.forEach((item) => {
    const product = products.find((p) => p.id === item.id)
    subtotal += product.price * item.quantity
  })

  const shipping = subtotal > 0 && subtotal < 4000 ? 99 : 0
  const total = subtotal + shipping

  function handleChange(event) {
    const name = event.target.name
    const value = event.target.value

    setFormData({
      ...formData,
      [name]: value
    })
  }

  function validateForm() {
    const newErrors = {}

    if (formData.fullName.trim() === '') {
      newErrors.fullName = 'Please enter your full name.'
    }

    if (!isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email.'
    }

    if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be 10 digits.'
    }

    if (formData.address.trim() === '') {
      newErrors.address = 'Please enter your address.'
    }

    if (formData.city.trim() === '') {
      newErrors.city = 'Please enter your city.'
    }

    if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = 'Pincode must be 6 digits.'
    }

    return newErrors
  }

  function handleSubmit(event) {
    event.preventDefault()

    const newErrors = validateForm()
    setErrors(newErrors)

    if (Object.keys(newErrors).length > 0) {
      return
    }

    setOrderPlaced(true)
    onClearCart()
  }

  if (orderPlaced) {
    return (
      <div className="container page-section">
        <div className="empty-box">
          <h3>✅ Demo order placed</h3>
          <p className="text-muted">
            This is a frontend demo. No real order or payment was created.
          </p>
          <a href="#/" className="btn btn-primary">
            Back to Home
          </a>
        </div>
      </div>
    )
  }

  if (cart.length === 0) {
    return (
      <div className="container page-section">
        <div className="empty-box">
          <h3>Your cart is empty</h3>
          <a href="#/products" className="btn btn-primary">
            Continue Shopping
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="container page-section">
      <h1 className="h3 mb-4">
        Checkout <small className="demo-label">Demo only</small>
      </h1>

      <form className="row g-4" onSubmit={handleSubmit} noValidate>
        <div className="col-lg-8">
          <div className="detail-card">
            <h5 className="mb-3">Delivery Details</h5>

            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Full Name</label>
                <input
                  name="fullName"
                  className={errors.fullName ? 'form-control is-invalid' : 'form-control'}
                  value={formData.fullName}
                  onChange={handleChange}
                />
                <div className="invalid-feedback">{errors.fullName}</div>
              </div>

              <div className="col-md-6">
                <label className="form-label">Email</label>
                <input
                  name="email"
                  className={errors.email ? 'form-control is-invalid' : 'form-control'}
                  value={formData.email}
                  onChange={handleChange}
                />
                <div className="invalid-feedback">{errors.email}</div>
              </div>

              <div className="col-md-6">
                <label className="form-label">Phone</label>
                <input
                  name="phone"
                  className={errors.phone ? 'form-control is-invalid' : 'form-control'}
                  value={formData.phone}
                  onChange={handleChange}
                />
                <div className="invalid-feedback">{errors.phone}</div>
              </div>

              <div className="col-md-6">
                <label className="form-label">Pincode</label>
                <input
                  name="pincode"
                  className={errors.pincode ? 'form-control is-invalid' : 'form-control'}
                  value={formData.pincode}
                  onChange={handleChange}
                />
                <div className="invalid-feedback">{errors.pincode}</div>
              </div>

              <div className="col-12">
                <label className="form-label">Address</label>
                <textarea
                  name="address"
                  rows="2"
                  className={errors.address ? 'form-control is-invalid' : 'form-control'}
                  value={formData.address}
                  onChange={handleChange}
                />
                <div className="invalid-feedback">{errors.address}</div>
              </div>

              <div className="col-md-6">
                <label className="form-label">City</label>
                <input
                  name="city"
                  className={errors.city ? 'form-control is-invalid' : 'form-control'}
                  value={formData.city}
                  onChange={handleChange}
                />
                <div className="invalid-feedback">{errors.city}</div>
              </div>
            </div>

            <h5 className="mt-4 mb-2">Payment Method</h5>

            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="payment"
                id="pay-cod"
                value="cod"
                checked={formData.payment === 'cod'}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="pay-cod">
                Cash on Delivery (demo)
              </label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="payment"
                id="pay-later"
                value="later"
                checked={formData.payment === 'later'}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="pay-later">
                Pay at pickup (demo)
              </label>
            </div>

            <p className="small text-muted mt-2 mb-0">
              No card details are collected on this page.
            </p>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="summary-card">
            <h5>Order Summary</h5>

            {cart.map((item) => {
              const product = products.find((p) => p.id === item.id)

              return (
                <div key={item.id} className="summary-row">
                  <span>
                    {product.name} × {item.quantity}
                  </span>
                  <span>
                    {formatPrice(product.price * item.quantity)}
                  </span>
                </div>
              )
            })}

            <div className="summary-row">
              <span>Shipping</span>
              <span>
                {shipping === 0 ? 'Free' : formatPrice(shipping)}
              </span>
            </div>

            <div className="summary-row total">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Place Demo Order
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Checkout