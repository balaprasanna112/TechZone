
import products, { categories } from '../data/products'

function FilterSidebar({
  selectedCategory,
  onCategoryChange,
  brands,
  selectedBrands,
  onBrandToggle,
  minPrice,
  maxPrice,
  onMinPriceChange,
  onMaxPriceChange,
  inStockOnly,
  onInStockChange,
  onClearAll
}) {
  function countCategory(name) {
    return products.filter(
      (product) => product.category === name
    ).length
  }

  function countBrand(name) {
    return products.filter(
      (product) => product.brand === name
    ).length
  }

  return (
    <aside className="filter-box">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h6 className="mb-0">Filters</h6>
        <button className="link-button" onClick={onClearAll}>
          Clear All
        </button>
      </div>

      <div className="filter-group stock-toggle">
        <label className="d-flex justify-content-between align-items-center">
          <span>
            <strong>In Stock only</strong>
            <br />
            <small className="text-muted">
              Exclude out-of-stock items
            </small>
          </span>

          <input
            type="checkbox"
            className="form-check-input"
            checked={inStockOnly}
            onChange={(event) =>
              onInStockChange(event.target.checked)
            }
          />
        </label>
      </div>

      <div className="filter-group">
        <h6>Price Range (₹)</h6>

        <div className="d-flex gap-2">
          <input
            type="number"
            className="form-control form-control-sm"
            placeholder="Min"
            value={minPrice}
            onChange={(event) =>
              onMinPriceChange(event.target.value)
            }
          />

          <input
            type="number"
            className="form-control form-control-sm"
            placeholder="Max"
            value={maxPrice}
            onChange={(event) =>
              onMaxPriceChange(event.target.value)
            }
          />
        </div>
      </div>

      <div className="filter-group">
        <h6>Category</h6>

        <button
          className={
            selectedCategory === 'All'
              ? 'filter-item active'
              : 'filter-item'
          }
          onClick={() => onCategoryChange('All')}
        >
          <span>All Products</span>
          <span>{products.length}</span>
        </button>

        {categories.map((name) => (
          <button
            key={name}
            className={
              selectedCategory === name
                ? 'filter-item active'
                : 'filter-item'
            }
            onClick={() => onCategoryChange(name)}
          >
            <span>{name}</span>
            <span>{countCategory(name)}</span>
          </button>
        ))}
      </div>

      <div className="filter-group">
        <h6>Brand</h6>

        {brands.map((name) => (
          <label key={name} className="brand-row">
            <span>
              <input
                type="checkbox"
                className="form-check-input me-2"
                checked={selectedBrands.includes(name)}
                onChange={() => onBrandToggle(name)}
              />
              {name}
            </span>

            <span className="text-muted">
              {countBrand(name)}
            </span>
          </label>
        ))}
      </div>
    </aside>
  )
}

export default FilterSidebar
