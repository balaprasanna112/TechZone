
import { useState } from 'react'
import { categories } from '../data/products'

const navLinks = [
  'Laptops',
  'Mobiles',
  'Audio',
  'TV & Home',
  'Accessories',
  'Gaming',
  'Computers'
]

function Navbar({ currentCategory }) {
  const [menuOpen, setMenuOpen] = useState(false)

  function handleMenu() {
    setMenuOpen(!menuOpen)
  }

  return (
    <nav className="category-nav">
      <div className="container d-flex align-items-center gap-4">
        <div className="all-categories">
          <button
            className="all-categories-btn"
            onClick={handleMenu}
          >
            ☰ All Categories ▾
          </button>

          {menuOpen && (
            <div className="categories-dropdown">
              {categories.map((name) => (
                <a
                  key={name}
                  href={
                    '#/products?category=' +
                    encodeURIComponent(name)
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  {name}
                </a>
              ))}
            </div>
          )}
        </div>

        <div className="nav-links">
          {navLinks.map((name) => (
            <a
              key={name}
              href={
                '#/products?category=' +
                encodeURIComponent(name)
              }
              className={
                currentCategory === name ? 'active' : ''
              }
            >
              {name}
            </a>
          ))}
        </div>

        <a
          href="#/products?deals=1"
          className="todays-deals ms-auto"
        >
          🔥 Today's Deals
        </a>
      </div>
    </nav>
  )
}

export default Navbar
