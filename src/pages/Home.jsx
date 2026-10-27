import { useState } from 'react'
import products, { categories } from '../data/products'
import ProductCard from '../components/ProductCard'
import { formatPrice } from '../utils/helpers'

const slides = [
  {
    title: 'Latest Tech.',
    highlight: 'Better Living.',
    text: 'Top brands. Best prices. The latest electronics engineered for peak work, play, and sound.'
  },
  {
    title: 'Work Smarter.',
    highlight: 'Go Further.',
    text: 'Powerful laptops and accessories for students and professionals.'
  },
  {
    title: 'Hear Every.',
    highlight: 'Detail.',
    text: 'Noise cancelling headphones and earbuds from the best audio brands.'
  }
]

const categoryIcons = {
  Laptops: '💻',
  Mobiles: '📱',
  Audio: '🎧',
  'TV & Home': '📺',
  Accessories: '🖱️',
  Gaming: '🎮',
  'Smart Watch': '⌚',
  Cameras: '📷'
}

const benefits = [
  {
    icon: '🚚',
    title: 'Free Express Shipping',
    text: 'On all orders over ₹4,000'
  },
  {
    icon: '🛡️',
    title: 'Secure Checkout',
    text: 'Demo checkout, no card details needed'
  },
  {
    icon: '🎧',
    title: '24/7 Expert Support',
    text: 'Specialized hardware guidance'
  },
  {
    icon: '💲',
    title: 'Price Match Guarantee',
    text: 'Found it lower? We match it'
  }
]

function Home({
  wishlist,
  recentlyViewed,
  onAddToCart,
  onToggleWishlist,
  onClearHistory
}) {
  const [slideIndex, setSlideIndex] = useState(0)

  const currentSlide = slides[slideIndex]

  const featuredProducts = products.filter(
    (product) => product.featured
  )

  const recentProducts = recentlyViewed.map((id) =>
    products.find((product) => product.id === id)
  )

  function showPreviousSlide() {
    if (slideIndex === 0) {
      setSlideIndex(slides.length - 1)
    } else {
      setSlideIndex(slideIndex - 1)
    }
  }

  function showNextSlide() {
    if (slideIndex === slides.length - 1) {
      setSlideIndex(0)
    } else {
      setSlideIndex(slideIndex + 1)
    }
  }

  function countProducts(categoryName) {
    return products.filter(
      (product) => product.category === categoryName
    ).length
  }

  return (
    <div className="container page-section">
      <section className="hero">
        <div className="row align-items-center g-4">
          <div className="col-md-6">
            <span className="hero-tag">UPGRADE YOUR TECH LIFE</span>

            <h1 className="hero-title">
              {currentSlide.title}
              <span className="text-blue d-block">
                {currentSlide.highlight}
              </span>
            </h1>

            <p className="hero-text">{currentSlide.text}</p>

            <div className="d-flex gap-2 mb-4">
              <a href="#/products" className="btn btn-primary">
                Shop Now →
              </a>

              <a href="#/products" className="btn btn-light">
                Browse Catalog
              </a>
            </div>

            <div className="d-flex align-items-center gap-2">
              <button
                className="slide-btn"
                onClick={showPreviousSlide}
                aria-label="Previous slide"
              >
                ‹
              </button>

              <button
                className="slide-btn"
                onClick={showNextSlide}
                aria-label="Next slide"
              >
                ›
              </button>

              <span className="slide-count">
                0{slideIndex + 1} / 0{slides.length}
              </span>
            </div>
          </div>

          <div className="col-md-6">
            <img
              className="hero-image"
              src="/images/placeholders/hero.svg"
              alt="Electronics placeholder"
            />
          </div>
        </div>
      </section>

      <section className="mt-5">
        <div className="section-heading">
          <div>
            <h2>Shop by Category</h2>
            <p className="text-muted mb-0">
              Explore premium hardware by category
            </p>
          </div>

          <a href="#/products" className="section-link">
            View All Categories →
          </a>
        </div>

        <div className="row g-3">
          {categories
            .filter((name) => name !== 'Computers')
            .map((name) => (
              <div
                key={name}
                className="col-6 col-md-3 col-lg-3 col-xl"
              >
                <a
                  href={'#/products?category=' + encodeURIComponent(name)}
                  className="category-card"
                >
                  <span className="category-icon">
                    {categoryIcons[name]}
                  </span>

                  <strong>{name}</strong>

                  <small>{countProducts(name)} Products</small>
                </a>
              </div>
            ))}
        </div>
      </section>

      <section className="mt-5">
        <div className="section-heading">
          <div>
            <small className="text-success fw-semibold">
              ● HARDWARE HIGHLIGHTS
            </small>

            <h2>Featured Products</h2>
          </div>

          <a href="#/products" className="section-link">
            View All Products →
          </a>
        </div>

        <div className="row g-3">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="col-12 col-md-6 col-lg-4"
            >
              <ProductCard
                product={product}
                isWishlisted={wishlist.includes(product.id)}
                onAddToCart={onAddToCart}
                onToggleWishlist={onToggleWishlist}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="mt-5">
        <div className="row g-3">
          <div className="col-md-6">
            <div className="promo-banner promo-dark">
              <span className="promo-tag">LIMITED TECH FEST</span>

              <h3>Big Deals for Tech Lovers</h3>

              <p>
                Up to 40% off on flagship laptops, audio gear, and peripherals.
              </p>

              <a
                href="#/products?deals=1"
                className="btn btn-light"
              >
                Shop Deals
              </a>
            </div>
          </div>

          <div className="col-md-6">
            <div className="promo-banner promo-light">
              <span className="promo-tag">
                ERGONOMICS &amp; PERFORMANCE
              </span>

              <h3>Upgrade Your Setup</h3>

              <p>
                Laptops, displays, mechanical keys, everyday work enhancers.
              </p>

              <a
                href="#/products?category=Accessories"
                className="btn btn-primary"
              >
                Explore Now
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="benefits mt-5">
        <div className="row g-3">
          {benefits.map((item) => (
            <div key={item.title} className="col-6 col-lg-3">
              <div className="benefit-item">
                <span className="benefit-icon">{item.icon}</span>

                <div>
                  <strong>{item.title}</strong>
                  <small>{item.text}</small>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-5">
        <div className="section-heading">
          <h2 className="h4">🕘 Recently Viewed Items</h2>

          {recentProducts.length > 0 && (
            <button
              className="link-button"
              onClick={onClearHistory}
            >
              Clear History
            </button>
          )}
        </div>

        {recentProducts.length === 0 ? (
          <p className="text-muted">
            You have not viewed any products yet. Open a product and it
            will show up here.
          </p>
        ) : (
          <div className="row g-3">
            {recentProducts.slice(0, 4).map((product) => (
              <div key={product.id} className="col-6 col-lg-3">
                <a
                  href={'#/product/' + product.id}
                  className="recent-card"
                >
                  <img src={product.image} alt={product.name} />

                  <strong>{product.name}</strong>

                  <span>{formatPrice(product.price)}</span>
                </a>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default Home