
import products from '../data/products'

function CompareBar({ compareList, onClear }) {
  if (compareList.length === 0) return null

  const selectedProducts = compareList.map((id) =>
    products.find((product) => product.id === id)
  )

  const names = selectedProducts
    .map((product) => product.name)
    .join(' vs ')

  return (
    <div className="compare-bar">
      <span className="compare-count">
        {compareList.length}
      </span>

      <div className="compare-text">
        <strong>Compare Queue Active</strong>
        <small>{names}</small>
      </div>

      {compareList.length >= 2 ? (
        <a href="#/compare" className="btn btn-primary btn-sm">
          Compare Now ({compareList.length})
        </a>
      ) : (
        <span className="compare-hint">
          Select one more
        </span>
      )}

      <button
        className="compare-close"
        onClick={onClear}
        aria-label="Clear compare list"
      >
        ✕
      </button>
    </div>
  )
}

export default CompareBar
