import { useState } from 'react'
import products from '../data/products'
import { formatPrice, getDiscountPercent } from '../utils/helpers'

function Compare({ compareList, onRemove, onAddToCart }) {
  const [highlightDifferences, setHighlightDifferences] = useState(false)

  const selectedProducts = compareList.map((id) =>
    products.find((product) => product.id === id)
  )

  const specNames = []

  selectedProducts.forEach((product) => {
    Object.keys(product.specs).forEach((name) => {
      if (!specNames.includes(name)) {
        specNames.push(name)
      }
    })
  })

  const rows = [
    {
      label: 'Rating',
      values: selectedProducts.map(
        (product) => product.rating + ' / 5 (' + product.reviews + ' reviews)'
      )
    },
    {
      label: 'Availability',
      values: selectedProducts.map((product) =>
        product.inStock ? 'In stock' : 'Out of stock'
      )
    }
  ]

  specNames.forEach((name) => {
    rows.push({
      label: name,
      values: selectedProducts.map((product) => product.specs[name] || '—')
    })
  })

  function rowIsDifferent(row) {
    return row.values.some((value) => value !== row.values[0])
  }

  let cheapest = null
  let topRated = null
  let biggestSaving = null

  selectedProducts.forEach((product) => {
    if (cheapest === null || product.price < cheapest.price) {
      cheapest = product
    }

    if (topRated === null || product.rating > topRated.rating) {
      topRated = product
    }

    const discount = getDiscountPercent(
      product.price,
      product.originalPrice
    )

    if (
      biggestSaving === null ||
      discount >
        getDiscountPercent(biggestSaving.price, biggestSaving.originalPrice)
    ) {
      biggestSaving = product
    }
  })

  const emptySlots = 3 - selectedProducts.length

  return (
    <>
      <div className="page-banner">
        <div className="container">
          <nav className="breadcrumb-text">
            <a href="#/">Home</a> › Compare
          </nav>

          <h1>Compare Electronics</h1>

          <p className="text-muted mb-2">
            Compare up to 3 products side by side.
          </p>

          <button
            className={
              highlightDifferences
                ? 'btn btn-primary btn-sm'
                : 'btn btn-outline-primary btn-sm'
            }
            onClick={() =>
              setHighlightDifferences(!highlightDifferences)
            }
          >
            Highlight Differences
          </button>
        </div>
      </div>

      <div className="container page-section">
        {selectedProducts.length < 2 && (
          <div className="alert alert-info">
            Select at least 2 products on the products page using
            "Compare model" to see the comparison.
          </div>
        )}

        <div className="compare-wrapper">
          <table className="compare-table">
            <thead>
              <tr>
                <th className="compare-label-cell">
                  {selectedProducts.length} of 3 selected
                </th>

                {selectedProducts.map((product) => (
                  <th
                    key={product.id}
                    className="compare-product-cell"
                  >
                    <div className="compare-product">
                      <button
                        className="remove-btn"
                        onClick={() => onRemove(product.id)}
                        aria-label="Remove from compare"
                      >
                        ✕
                      </button>

                      <img src={product.image} alt={product.name} />

                      <small className="text-primary">
                        {product.brand}
                      </small>

                      <a href={'#/product/' + product.id}>
                        {product.name}
                      </a>

                      <span className="rating">
                        ★ {product.rating}
                      </span>

                      <strong>{formatPrice(product.price)}</strong>

                      <button
                        className="btn btn-primary btn-sm w-100"
                        disabled={!product.inStock}
                        onClick={() => onAddToCart(product.id)}
                      >
                        🛒 Add to Cart
                      </button>
                    </div>
                  </th>
                ))}

                {Array.from({ length: emptySlots }).map((item, index) => (
                  <th
                    key={'empty-' + index}
                    className="compare-product-cell"
                  >
                    <a href="#/products" className="empty-slot">
                      + Add product
                    </a>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {selectedProducts.length > 0 &&
                rows.map((row) => (
                  <tr
                    key={row.label}
                    className={
                      highlightDifferences && rowIsDifferent(row)
                        ? 'diff-row'
                        : ''
                    }
                  >
                    <th className="compare-label-cell">
                      {row.label}
                    </th>

                    {row.values.map((value, index) => (
                      <td key={index}>{value}</td>
                    ))}

                    {Array.from({ length: emptySlots }).map(
                      (item, index) => (
                        <td key={'e-' + index}></td>
                      )
                    )}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {selectedProducts.length >= 2 && (
          <section className="mt-5">
            <h2 className="h4 mb-3">The Final Verdict</h2>

            <div className="row g-3">
              <div className="col-md-4">
                <div className="verdict-card">
                  <span className="info-tag">Best Value</span>

                  <h5>{cheapest.name}</h5>

                  <p>
                    It has the lowest price of the selected products
                    at {formatPrice(cheapest.price)}.
                  </p>

                  <button
                    className="btn btn-primary btn-sm"
                    disabled={!cheapest.inStock}
                    onClick={() => onAddToCart(cheapest.id)}
                  >
                    Select {cheapest.brand}
                  </button>
                </div>
              </div>

              <div className="col-md-4">
                <div className="verdict-card">
                  <span className="info-tag">Top Rated</span>

                  <h5>{topRated.name}</h5>

                  <p>
                    It has the best customer rating of {topRated.rating}
                    {' '}out of 5 from {topRated.reviews} reviews.
                  </p>

                  <button
                    className="btn btn-primary btn-sm"
                    disabled={!topRated.inStock}
                    onClick={() => onAddToCart(topRated.id)}
                  >
                    Select {topRated.brand}
                  </button>
                </div>
              </div>

              <div className="col-md-4">
                <div className="verdict-card highlight">
                  <span className="info-tag green">
                    Biggest Saving
                  </span>

                  <h5>{biggestSaving.name}</h5>

                  <p>
                    It has the highest discount:
                    {' '}{getDiscountPercent(
                      biggestSaving.price,
                      biggestSaving.originalPrice
                    )}% off, saving
                    {' '}{formatPrice(
                      biggestSaving.originalPrice - biggestSaving.price
                    )}.
                  </p>

                  <button
                    className="btn btn-success btn-sm"
                    disabled={!biggestSaving.inStock}
                    onClick={() => onAddToCart(biggestSaving.id)}
                  >
                    Select {biggestSaving.brand}
                  </button>
                </div>
              </div>
            </div>

            <p className="small text-muted mt-3">
              This verdict only uses price, rating and discount from
              the sample data.
            </p>
          </section>
        )}
      </div>
    </>
  )
}

export default Compare