
import { useState } from 'react'
import { isValidEmail } from '../utils/helpers'

function Footer() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  function handleJoin(event) {
    event.preventDefault()

    if (!isValidEmail(email)) {
      setMessage('Please enter a valid email address.')
      return
    }

    setMessage('Thanks for subscribing! This is a demo.')
    setEmail('')
  }

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-3 col-md-6">
            <h5>🛒 Electronics Shop</h5>
            <p className="footer-text">
              Your destination for electronics, consumer hardware,
              premium audio and computing gear.
            </p>
          </div>

          <div className="col-lg-3 col-md-6">
            <h6>Shop Categories</h6>
            <ul className="footer-list">
              <li>
                <a href="#/products?category=Laptops">
                  Laptops &amp; Ultrabooks
                </a>
              </li>
              <li>
                <a href="#/products?category=Mobiles">
                  Flagship Smartphones
                </a>
              </li>
              <li>
                <a href="#/products?category=Audio">
                  Studio &amp; Hi-Fi Audio
                </a>
              </li>
              <li>
                <a href="#/products?category=TV%20%26%20Home">
                  OLED TVs &amp; Smart Home
                </a>
              </li>
              <li>
                <a href="#/products?category=Gaming">
                  Gaming Consoles &amp; PCs
                </a>
              </li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6">
            <h6>Customer Service</h6>
            <ul className="footer-list">
              <li>Track Your Order</li>
              <li>Warranty &amp; Repairs</li>
              <li>Easy Returns Policy</li>
              <li>Help Center &amp; FAQs</li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6">
            <h6>Newsletter Signup</h6>
            <p className="footer-text">
              Subscribe to receive deals and new product launches.
            </p>

            <form className="newsletter-form" onSubmit={handleJoin}>
              <input
                type="text"
                placeholder="Enter your email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />

              <button type="submit">Join</button>
            </form>

            {message && (
              <p className="footer-message">{message}</p>
            )}
          </div>
        </div>

        <div className="footer-bottom d-flex justify-content-between flex-wrap gap-2">
          <span>
            ACCEPTED PAYMENTS:
            <span className="pay-chip">Visa</span>
            <span className="pay-chip">Mastercard</span>
            <span className="pay-chip">UPI</span>
            <span className="pay-chip">RuPay</span>
            <span className="pay-chip">NetBanking</span>
          </span>

          <span>© 2025 Electronics Shop. Demo project.</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
