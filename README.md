# Electronics Shop

A frontend-only electronics store built with **React (Vite), Bootstrap 5, HTML, CSS and JavaScript**.
It is a learning project based on my Figma design. All data is sample data, there is no backend.

## How to run

1. Install Node.js (version 18 or higher) from https://nodejs.org
2. Open the `electronics-shop` folder in VS Code
3. Open the terminal in VS Code (Terminal > New Terminal) and run:

```
npm install
npm run dev
```

4. Open the address shown in the terminal (usually http://localhost:5173)

To make a production build: `npm run build`

## Pages (hash navigation, no router library)

| URL | Page |
| --- | --- |
| `#/` | Home |
| `#/products` | Search, filters, sort, pagination (`?category=Laptops`, `?search=dell`, `?wishlist=1`, `?deals=1`) |
| `#/product/3` | Product details |
| `#/compare` | Compare up to 3 products |
| `#/cart` | Cart |
| `#/checkout` | Checkout (demo) |
| `#/login`, `#/register` | Demo forms |

## Project structure

```
src/
  App.jsx            main state (cart, wishlist, compare, recently viewed) + page switching
  App.css            all custom styles
  main.jsx           starts React and loads Bootstrap
  data/products.js   sample products (edit this to add products)
  utils/helpers.js   formatPrice, getDiscountPercent, isValidEmail
  components/        Header, Navbar, Footer, ProductCard, FilterSidebar, CompareBar, ChatWidget
  pages/             Home, Products, ProductDetails, Compare, Cart, Checkout, Login, Register
public/images/
  placeholders/      placeholder pictures (SVG)
  products/          put your real exported Figma images here
```

## Replacing the placeholder images

Product pictures are placeholders, because only full-page screenshots were available.
1. Export each product image from Figma and copy it to `public/images/products/`
2. In `src/data/products.js` change the product's `image`, for example `image: '/images/products/macbook-air.jpg'`

## Important notes

- Everything is a **demo**. Checkout does not take payment or card details, and Login / Register do not
  create accounts or store passwords.
- The chat window is a demo with a few ready-made answers. It is not an AI.
- Cart, wishlist and recently viewed items are saved in `localStorage`.
- Icons are emoji / text symbols so that no extra icon library is needed.
