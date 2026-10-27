import { useState, useEffect } from 'react'
import products from '../data/products'
import ProductCard from '../components/ProductCard'
import FilterSidebar from '../components/FilterSidebar'
import CompareBar from '../components/CompareBar'
import { getDiscountPercent } from '../utils/helpers'

const PRODUCTS_PER_PAGE = 8

const allBrands = []

products.forEach((product) => {
  if (!allBrands.includes(product.brand)) {
    allBrands.push(product.brand)
  }
})

allBrands.sort()

function Products({
  query,
  wishlist,
  compareList,
  onAddToCart,
  onToggleWishlist,
  onToggleCompare,
  onClearCompare
}) {
  const searchText = query.search || ''
  const selectedCategory = query.category || 'All'
  const wishlistOnly = query.wishlist === '1'
  const dealsOnly = query.deals === '1'

  const [selectedBrands, setSelectedBrands] = useState([])
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [inStockOnly, setInStockOnly] = useState(false)
  const [sortBy, setSortBy] = useState('featured')
  const [viewMode, setViewMode] = useState('grid')
  const [currentPage, setCurrentPage] = useState(1)
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    setCurrentPage(1)
  }, [
    searchText,
    selectedCategory,
    selectedBrands,
    minPrice,
    maxPrice,
    inStockOnly,
    sortBy,
    wishlistOnly,
    dealsOnly
  ])

  let filteredProducts = products.filter((product) => {
    const search = searchText.toLowerCase()

    if (
      search !== '' &&
      !product.name.toLowerCase().includes(search) &&
      !product.brand.toLowerCase().includes(search)
    ) {
      return false
    }

    if (
      selectedCategory !== 'All' &&
      product.category !== selectedCategory
    ) {
      return false
    }

    if (
      selectedBrands.length > 0 &&
      !selectedBrands.includes(product.brand)
    ) {
      return false
    }

    if (minPrice !== '' && product.price < Number(minPrice)) {
      return false
    }

    if (maxPrice !== '' && product.price > Number(maxPrice)) {
      return false
    }

    if (inStockOnly && !product.inStock) {
      return false
    }

    if (wishlistOnly && !wishlist.includes(product.id)) {
      return false
    }

    if (
      dealsOnly &&
      getDiscountPercent(product.price, product.originalPrice) < 15
    ) {
      return false
    }

    return true
  })

  if (sortBy === 'price-low') {
    filteredProducts.sort((a, b) => a.price - b.price)
  } else if (sortBy === 'price-high') {
    filteredProducts.sort((a, b) => b.price - a.price)
  } else if (sortBy === 'rating') {
    filteredProducts.sort((a, b) => b.rating - a.rating)
  }

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE)
  )

  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE

  const productsOnPage = filteredProducts.slice(
    startIndex,
    startIndex + PRODUCTS_PER_PAGE
  )

  const pageNumbers = []

  for (let page = 1; page <= totalPages; page++) {
    pageNumbers.push(page)
  }

  function goToProducts(newSearch, newCategory) {
    const params = new URLSearchParams()

    if (newSearch) {
      params.set('search', newSearch)
    }

    if (newCategory && newCategory !== 'All') {
      params.set('category', newCategory)
    }

    const queryString = params.toString()

    if (queryString) {
      window.location.hash = '/products?' + queryString
    } else {
      window.location.hash = '/products'
    }
  }

  function handleCategoryChange(categoryName) {
    goToProducts(searchText, categoryName)
  }

  function handleBrandToggle(brandName) {
    if (selectedBrands.includes(brandName)) {
      const updatedBrands = selectedBrands.filter(
        (brand) => brand !== brandName
      )

      setSelectedBrands(updatedBrands)
    } else {
      setSelectedBrands([...selectedBrands, brandName])
    }
  }

  function handleClearAll() {
    setSelectedBrands([])
    setMinPrice('')
    setMaxPrice('')
    setInStockOnly(false)
    setSortBy('featured')

    goToProducts('', 'All')
  }

  let pageTitle = 'Electronics & Gadgets'

  if (wishlistOnly) {
    pageTitle = 'My Wishlist'
  } else if (dealsOnly) {
    pageTitle = "Today's Deals"
  } else if (selectedCategory !== 'All') {
    pageTitle = selectedCategory
  }

  return (
    <>
      <div className="page-banner">
        <div className="container">
          <nav className="breadcrumb-text">
            <a href="#/">Home</a> › Products
          </nav>

          <div className="d-flex justify-content-between align-items-end flex-wrap gap-2">
            <h1>
              {pageTitle}{' '}
              <small>
                Showing{' '}
                {filteredProducts.length === 0 ? 0 : startIndex + 1}–
                {startIndex + productsOnPage.length} of{' '}
                {filteredProducts.length} products
              </small>
            </h1>
          </div>
        </div>
      </div>

      <div className="container page-section">
        <div className="toolbar">
          <div className="d-flex align-items-center flex-wrap gap-2">
            <button
              className="btn btn-outline-primary btn-sm d-lg-none"
              onClick={() => setShowFilters(!showFilters)}
            >
              ☰ Filters
            </button>

            <strong className="d-none d-md-inline">
              Applied Filters:
            </strong>

            {searchText && (
              <span className="filter-chip">
                Keyword: {searchText}
              </span>
            )}

            {selectedCategory !== 'All' && (
              <span className="filter-chip">
                Category: {selectedCategory}
              </span>
            )}

            {selectedBrands.map((brand) => (
              <span key={brand} className="filter-chip">
                {brand}
              </span>
            ))}

            {inStockOnly && (
              <span className="filter-chip">In stock</span>
            )}

            {dealsOnly && (
              <span className="filter-chip">Deals</span>
            )}

            <button className="link-button" onClick={handleClearAll}>
              Reset All
            </button>
          </div>

          <div className="d-flex align-items-center gap-2">
            <label
              htmlFor="sort-select"
              className="small text-muted"
            >
              Sort by:
            </label>

            <select
              id="sort-select"
              className="form-select form-select-sm sort-select"
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
            >
              <option value="featured">Featured & Recommended</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Rating: High to Low</option>
            </select>

            <button
              className={
                viewMode === 'grid'
                  ? 'view-btn active'
                  : 'view-btn'
              }
              onClick={() => setViewMode('grid')}
              aria-label="Grid view"
            >
              ▦
            </button>

            <button
              className={
                viewMode === 'list'
                  ? 'view-btn active'
                  : 'view-btn'
              }
              onClick={() => setViewMode('list')}
              aria-label="List view"
            >
              ☰
            </button>
          </div>
        </div>

        <div className="row g-4">
          <div
            className={
              showFilters
                ? 'col-lg-3'
                : 'col-lg-3 d-none d-lg-block'
            }
          >
            <FilterSidebar
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
              brands={allBrands}
              selectedBrands={selectedBrands}
              onBrandToggle={handleBrandToggle}
              minPrice={minPrice}
              maxPrice={maxPrice}
              onMinPriceChange={setMinPrice}
              onMaxPriceChange={setMaxPrice}
              inStockOnly={inStockOnly}
              onInStockChange={setInStockOnly}
              onClearAll={handleClearAll}
            />
          </div>

          <div className="col-lg-9">
            {productsOnPage.length === 0 ? (
              <div className="empty-box">
                <h5>No products found</h5>

                <p className="text-muted">
                  Try a different search or remove some filters.
                </p>

                <button
                  className="btn btn-primary"
                  onClick={handleClearAll}
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="row g-3">
                {productsOnPage.map((product) => (
                  <div
                    key={product.id}
                    className={
                      viewMode === 'grid'
                        ? 'col-12 col-sm-6 col-xl-4'
                        : 'col-12'
                    }
                  >
                    <ProductCard
                      product={product}
                      viewMode={viewMode}
                      showCompare={true}
                      isWishlisted={wishlist.includes(product.id)}
                      isCompared={compareList.includes(product.id)}
                      onAddToCart={onAddToCart}
                      onToggleWishlist={onToggleWishlist}
                      onToggleCompare={onToggleCompare}
                    />
                  </div>
                ))}
              </div>
            )}

            {filteredProducts.length > 0 && (
              <div className="pagination-box">
                <span className="small text-muted">
                  Showing {startIndex + 1}–
                  {startIndex + productsOnPage.length} of{' '}
                  {filteredProducts.length} products
                </span>

                <div className="d-flex gap-1">
                  <button
                    className="page-btn"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                  >
                    ‹ Prev
                  </button>

                  {pageNumbers.map((page) => (
                    <button
                      key={page}
                      className={
                        page === currentPage
                          ? 'page-btn active'
                          : 'page-btn'
                      }
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    className="page-btn"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                  >
                    Next ›
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <CompareBar
        compareList={compareList}
        onClear={onClearCompare}
      />
    </>
  )
}

export default Products