
import { useState, useEffect } from 'react'
import products from './data/products'
import Header from './components/Header'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ChatWidget from './components/ChatWidget'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetails from './pages/ProductDetails'
import Compare from './pages/Compare'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
  const [path, setPath] = useState(window.location.hash || '#/')
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('shop-cart') || '[]'))
  const [wishlist, setWishlist] = useState(JSON.parse(localStorage.getItem('shop-wishlist') || '[]'))
  const [recent, setRecent] = useState(JSON.parse(localStorage.getItem('shop-recent') || '[]'))
  const [compare, setCompare] = useState([])
  const [message, setMessage] = useState('')

  useEffect(() => {
    const updatePage = () => {
      setPath(window.location.hash || '#/')
      window.scrollTo(0, 0)
    }

    window.addEventListener('hashchange', updatePage)
    return () => window.removeEventListener('hashchange', updatePage)
  }, [])

  useEffect(() => {
    localStorage.setItem('shop-cart', JSON.stringify(cart))
    localStorage.setItem('shop-wishlist', JSON.stringify(wishlist))
    localStorage.setItem('shop-recent', JSON.stringify(recent))
  }, [cart, wishlist, recent])

  function showMessage(text) {
    setMessage(text)
    setTimeout(() => setMessage(''), 2000)
  }

  function addToCart(id, quantity = 1, options = '') {
    const item = cart.find(p => p.id === id)

    if (item) {
      setCart(cart.map(p =>
        p.id === id
          ? { ...p, quantity: p.quantity + quantity }
          : p
      ))
    } else {
      setCart([...cart, { id, quantity, options }])
    }

    showMessage('Added to cart')
  }

  function changeQuantity(id, change) {
    setCart(cart.map(item =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + change) }
        : item
    ))
  }

  function removeFromCart(id) {
    setCart(cart.filter(item => item.id !== id))
  }

  function toggleWishlist(id) {
    if (wishlist.includes(id)) {
      setWishlist(wishlist.filter(item => item !== id))
      showMessage('Removed from wishlist')
    } else {
      setWishlist([...wishlist, id])
      showMessage('Added to wishlist')
    }
  }

  function toggleCompare(id) {
    if (compare.includes(id)) {
      setCompare(compare.filter(item => item !== id))
    } else if (compare.length < 3) {
      setCompare([...compare, id])
    } else {
      showMessage('Compare only 3 products')
    }
  }

  function addRecent(id) {
    setRecent([id, ...recent.filter(item => item !== id)].slice(0, 8))
  }

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0)

  const cartTotal = cart.reduce((total, item) => {
    const product = products.find(p => p.id === item.id)
    return total + (product ? product.price * item.quantity : 0)
  }, 0)

  const [route, query = ''] = path.replace('#', '').split('?')
  const params = Object.fromEntries(new URLSearchParams(query))

  let page

  if (route === '/') {
    page = <Home wishlist={wishlist} recentlyViewed={recent} onAddToCart={addToCart} onToggleWishlist={toggleWishlist} onClearHistory={() => setRecent([])} />
  } else if (route === '/products') {
    page = <Products query={params} wishlist={wishlist} compareList={compare} onAddToCart={addToCart} onToggleWishlist={toggleWishlist} onToggleCompare={toggleCompare} onClearCompare={() => setCompare([])} />
  } else if (route.startsWith('/product/')) {
    const product = products.find(p => p.id === Number(route.split('/')[2]))

    page = product
      ? <ProductDetails key={product.id} product={product} wishlist={wishlist} onAddToCart={addToCart} onToggleWishlist={toggleWishlist} onViewed={addRecent} />
      : <NotFound />
  } else if (route === '/compare') {
    page = <Compare compareList={compare} onRemove={toggleCompare} onAddToCart={addToCart} />
  } else if (route === '/cart') {
    page = <Cart cart={cart} onChangeQuantity={changeQuantity} onRemove={removeFromCart} />
  } else if (route === '/checkout') {
    page = <Checkout cart={cart} onClearCart={() => setCart([])} />
  } else if (route === '/login') {
    page = <Login />
  } else if (route === '/register') {
    page = <Register />
  } else {
    page = <NotFound />
  }

  return (
    <div className="app">
      <Header cartCount={cartCount} cartTotal={cartTotal} wishlistCount={wishlist.length} compareCount={compare.length} initialSearch={params.search} />
      <Navbar currentCategory={params.category} />
      <main>{page}</main>
      <Footer />
      <ChatWidget />
      {message && <div className="toast-message">{message}</div>}
    </div>
  )
}

function NotFound() {
  return (
    <div className="container page-section">
      <div className="empty-box">
        <h3>Page not found</h3>
        <a href="#/" className="btn btn-primary">Go to Home</a>
      </div>
    </div>
  )
}

export default App
