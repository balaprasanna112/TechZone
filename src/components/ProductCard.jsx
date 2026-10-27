
import { formatPrice, getDiscountPercent } from '../utils/helpers'

function ProductCard({
  product,
  viewMode = 'grid',
  isWishlisted,
  isCompared,
  showCompare,
  onAddToCart,
  onToggleWishlist,
  onToggleCompare,
}) {
  const discount = getDiscountPercent(
    product.price,
    product.originalPrice
  )

  const detailsLink = '#/product/' + product.id

  return (
    <div className={viewMode === 'list' ? 'product-card list-view' : 'product-card'}>
      <div className="product-image-box">
        {discount > 0 && (
          <span className="discount-badge">{discount}% OFF</span>
        )}

        <button
          className={isWishlisted ? 'wishlist-btn active' : 'wishlist-btn'}
          onClick={() => onToggleWishlist(product.id)}
          aria-label="Add to wishlist"
        >
          {isWishlisted ? '♥' : '♡'}
        </button>

        <a href={detailsLink}>
          <img src={product.image} alt={product.name} />
        </a>
      </div>

      <div className="product-info">
        <div className="d-flex justify-content-between align-items-center">
          <span className="product-brand">{product.brand}</span>

          <span className="rating">
            ★ {product.rating}
            <span className="reviews"> ({product.reviews})</span>
          </span>
        </div>

        <a href={detailsLink} className="product-name">
          {product.name}
        </a>

        <div className="spec-chips">
          {product.shortSpecs.map((spec) => (
            <span key={spec} className="spec-chip">
              {spec}
            </span>
          ))}
        </div>

        <div className="price-row">
          <span className="price">{formatPrice(product.price)}</span>

          {discount > 0 && (
            <span className="old-price">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {!product.inStock && (
          <p className="out-of-stock-text">Out of stock</p>
        )}

        {showCompare && (
          <label className="compare-check">
            <input
              type="checkbox"
              checked={isCompared}
              onChange={() => onToggleCompare(product.id)}
            />
            Compare model
          </label>
        )}

        <button
          className="btn btn-primary w-100 mt-auto"
          disabled={!product.inStock}
          onClick={() => onAddToCart(product.id)}
        >
          🛒 Add to Cart
        </button>
      </div>
    </div>
  )
}

export default ProductCard
