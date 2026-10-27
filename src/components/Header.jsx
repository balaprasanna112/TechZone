
import { useState } from 'react'
import { formatPrice } from '../utils/helpers'

function Header({
  cartCount,
  cartTotal,
  wishlistCount,
  compareCount,
  initialSearch
}) {
  const [searchText, setSearchText] = useState(initialSearch || '')

  function handleSearch(event) {
    event.preventDefault()

    const text = searchText.trim()

    if (!text) {
      window.location.hash = '/products'
      return
    }

    window.location.hash =
      '/products?search=' + encodeURIComponent(text)
  }

  return (
    <header className="site-header">
      <div className="container d-flex align-items-center flex-wrap gap-3 py-3">
        <a href="#/" className="brand">
          <span className="brand-logo">🛒</span>
          <span>Electronics Shop</span>
        </a>

        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search for products, brands and more..."
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
          />

          <button type="submit">Search</button>
        </form>

        <div className="header-icons ms-auto d-flex align-items-center gap-3">
          <a href="#/login" className="header-link">
            <span className="header-icon">👤</span>
            <span className="d-none d-md-inline">Account</span>
          </a>

          <a
            href="#/compare"
            className="header-link"
            title="Compare products"
          >
            <span className="header-icon">⇄</span>
            <span className="icon-badge">{compareCount}</span>
          </a>

          <a
            href="#/products?wishlist=1"
            className="header-link"
            title="My wishlist"
          >
            <span className="header-icon">♡</span>
            <span className="icon-badge badge-red">
              {wishlistCount}
            </span>
          </a>

          <a href="#/cart" className="cart-box">
            <span className="header-icon">🛒</span>
            <span className="icon-badge">{cartCount}</span>

            <span className="cart-text">
              <small>Cart Total</small>
              <strong>{formatPrice(cartTotal)}</strong>
            </span>
          </a>
        </div>
      </div>
    </header>
  )
}

export default Header
