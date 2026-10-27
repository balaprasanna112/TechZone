import { useState, useEffect } from 'react'
import products from '../data/products'
import ProductCard from '../components/ProductCard'
import { formatPrice, getDiscountPercent } from '../utils/helpers'

function ProductDetails({
  product,
  wishlist,
  onAddToCart,
  onToggleWishlist,
  onViewed
}) {
  const options = product.options || {}
  const colors = options.colors || []
  const storageList = options.storage || []

  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [selectedColor, setSelectedColor] = useState(colors[0] || '')
  const [selectedStorage, setSelectedStorage] = useState(storageList[0] || '')

  useEffect(() => {
    onViewed(product.id)
  }, [product.id])

  const gallery = product.gallery || [
    product.image,
    product.image,
    product.image,
    product.image
  ]

  const discount = getDiscountPercent(
    product.price,
    product.originalPrice
  )

  const savedAmount = product.originalPrice - product.price
  const monthlyEmi = Math.round(product.price / 12)
  const isWishlisted = wishlist.includes(product.id)

  const relatedProducts = products
    .filter(
      (item) =>
        item.category === product.category &&
        item.id !== product.id
    )
    .slice(0, 4)

  function getOptionsText() {
    const parts = []

    if (selectedColor) {
      parts.push(selectedColor)
    }

    if (selectedStorage) {
      parts.push(selectedStorage)
    }

    return parts.join(' / ')
  }

  function handleAddToCart() {
    onAddToCart(product.id, quantity, getOptionsText())
  }

  function handleBuyNow() {
    onAddToCart(product.id, quantity, getOptionsText())
    window.location.hash = '/cart'
  }

  function decreaseQuantity() {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  return (
    <div className="container page-section">
      <nav className="breadcrumb-text mb-3">
        <a href="#/">Home</a> ›{' '}
        <a
          href={
            '#/products?category=' +
            encodeURIComponent(product.category)
          }
        >
          {product.category}
        </a>
        {' '}› {product.name}
      </nav>

      <div className="row g-4">
        <div className="col-lg-5">
          <div className="detail-card">
            <div className="detail-image-box">
              <img
                src={gallery[selectedImage]}
                alt={product.name}
              />
            </div>

            <div className="thumb-row">
              {gallery.map((imagePath, index) => (
                <button
                  key={index}
                  className={
                    index === selectedImage
                      ? 'thumb active'
                      : 'thumb'
                  }
                  onClick={() => setSelectedImage(index)}
                >
                  <img
                    src={imagePath}
                    alt={'View ' + (index + 1)}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="col-lg-7">
          <div className="detail-card">
            <div className="d-flex justify-content-between flex-wrap gap-2 mb-2">
              <span className="info-tag">
                {product.brand.toUpperCase()}
              </span>

              <span className="text-muted small">
                Product ID: {product.id}
              </span>
            </div>

            <h1 className="detail-title">{product.name}</h1>

            <p className="mb-3">
              <span className="rating-pill">
                ★ {product.rating}
              </span>{' '}
              <span className="text-primary small">
                {product.reviews} verified ratings
              </span>
            </p>

            <div className="price-box">
              <span className="detail-price">
                {formatPrice(product.price)}
              </span>

              {discount > 0 && (
                <>
                  <span className="old-price">
                    {formatPrice(product.originalPrice)}
                  </span>

                  <span className="save-pill">
                    Save {formatPrice(savedAmount)} ({discount}% OFF)
                  </span>
                </>
              )}

              <p className="small text-muted mb-0 mt-2">
                Inclusive of all taxes. EMI from about{' '}
                {formatPrice(monthlyEmi)}/month (12 months, sample estimate).
              </p>
            </div>

            <p
              className={
                product.inStock
                  ? 'stock-text in'
                  : 'stock-text out'
              }
            >
              {product.inStock
                ? '● In stock - ready to ship'
                : '● Currently out of stock'}
            </p>

            {colors.length > 0 && (
              <div className="option-group">
                <strong>
                  Colour:{' '}
                  <span className="text-primary">
                    {selectedColor}
                  </span>
                </strong>

                <div className="option-buttons">
                  {colors.map((color) => (
                    <button
                      key={color}
                      className={
                        color === selectedColor
                          ? 'option-btn active'
                          : 'option-btn'
                      }
                      onClick={() => setSelectedColor(color)}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {storageList.length > 0 && (
              <div className="option-group">
                <strong>Storage:</strong>

                <div className="option-buttons">
                  {storageList.map((storage) => (
                    <button
                      key={storage}
                      className={
                        storage === selectedStorage
                          ? 'option-btn active'
                          : 'option-btn'
                      }
                      onClick={() => setSelectedStorage(storage)}
                    >
                      {storage}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="d-flex flex-wrap gap-2 align-items-center my-4">
              <div className="quantity-box">
                <button
                  onClick={decreaseQuantity}
                  aria-label="Decrease quantity"
                >
                  −
                </button>

                <span>{quantity}</span>

                <button
                  onClick={() => setQuantity(quantity + 1)}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <button
                className="btn btn-primary flex-grow-1"
                disabled={!product.inStock}
                onClick={handleAddToCart}
              >
                🛒 Add to Cart
              </button>

              <button
                className="btn btn-dark flex-grow-1"
                disabled={!product.inStock}
                onClick={handleBuyNow}
              >
                Buy Now →
              </button>
            </div>

            <div className="d-flex flex-wrap gap-4 small">
              <button
                className="link-button"
                onClick={() => onToggleWishlist(product.id)}
              >
                {isWishlisted
                  ? '♥ Remove from Wishlist'
                  : '♡ Add to Wishlist'}
              </button>

              <a href="#/products" className="link-button">
                ⇄ Compare with other products
              </a>
            </div>

            <ul className="highlight-list">
              {product.shortSpecs.map((spec) => (
                <li key={spec}>✓ {spec}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <section className="detail-card mt-4">
        <h3 className="h5 mb-3">
          Technical Specifications
        </h3>

        <table className="table spec-table mb-0">
          <tbody>
            {Object.entries(product.specs).map(([name, value]) => (
              <tr key={name}>
                <th>{name}</th>
                <td>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {relatedProducts.length > 0 && (
        <section className="mt-5">
          <h2 className="h4 mb-3">Related Products</h2>

          <div className="row g-3">
            {relatedProducts.map((item) => (
              <div
                key={item.id}
                className="col-12 col-sm-6 col-lg-3"
              >
                <ProductCard
                  product={item}
                  isWishlisted={wishlist.includes(item.id)}
                  onAddToCart={onAddToCart}
                  onToggleWishlist={onToggleWishlist}
                />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

export default ProductDetails