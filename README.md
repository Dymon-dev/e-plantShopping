# e-plantShopping

**Paradise Nursery** is an online houseplant shop built with React, Redux Toolkit and Vite.
Browse plants by category, add them to your cart, and manage quantities and totals.

## Features
- Landing page "Welcome to Paradise Nursery" with a background image and a "Get Started" button
- About Us section describing the company
- 18 houseplants in 3 categories, each with thumbnail, name, description and price
- "Add to Cart" buttons that disable after the plant is added
- Navbar (Home, Plants, Cart) with a live cart item count on the plant and cart pages
- Cart page with per-plant totals, total cart amount, +/- buttons, Delete,
  "Continue Shopping" and "Checkout" ("Coming Soon")

## Project structure
```
src/
  App.jsx          Landing page
  App.css          Global + landing page styles (.background-image)
  AboutUs.jsx      Company description (.about-us-container)
  ProductList.jsx  Navbar + plant listing (.product-list)
  CartItem.jsx     Shopping cart page
  CartSlice.jsx    Redux slice: addItem, removeItem, updateQuantity
  store.js         Redux store
```

## Run locally
```bash
npm install
npm run dev
```
