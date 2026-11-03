import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice.jsx';
import CartItem from './CartItem.jsx';
import './ProductList.css';

// Simple leaf thumbnail (inline SVG) so images always load.
// Swap any `image` value below for a real photo URL if you like.
const thumb = (bg, leaf) =>
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
       <rect width="200" height="200" fill="${bg}"/>
       <path d="M100 170 C40 140 40 70 100 30 C160 70 160 140 100 170Z" fill="${leaf}"/>
       <path d="M100 165 L100 60" stroke="${bg}" stroke-width="4" fill="none"/>
     </svg>`
  );

const plantsArray = [
  {
    category: 'Air Purifying Plants',
    plants: [
      { name: 'Snake Plant', image: thumb('#dff0e4', '#2f6b4c'), description: 'Produces oxygen at night and removes toxins.', cost: 15 },
      { name: 'Spider Plant', image: thumb('#e9f5df', '#5a9a3c'), description: 'Filters formaldehyde and xylene from the air.', cost: 12 },
      { name: 'Peace Lily', image: thumb('#e3eef2', '#3b7f6e'), description: 'Removes mould spores and purifies the air.', cost: 18 },
      { name: 'Boston Fern', image: thumb('#dcefe0', '#3f8a63'), description: 'Adds humidity and removes pollutants.', cost: 20 },
      { name: 'Rubber Plant', image: thumb('#e4eadf', '#245238'), description: 'Easy-care plant that absorbs airborne toxins.', cost: 17 },
      { name: 'Aloe Vera', image: thumb('#e6f2e8', '#6fb88a'), description: 'Purifies the air and soothes minor burns.', cost: 14 },
    ],
  },
  {
    category: 'Aromatic Fragrant Plants',
    plants: [
      { name: 'Lavender', image: thumb('#ece6f5', '#7a5fb0'), description: 'Calming scent that helps you relax and sleep.', cost: 20 },
      { name: 'Jasmine', image: thumb('#f7f3e3', '#4f8f5c'), description: 'Sweet floral fragrance that lifts the mood.', cost: 18 },
      { name: 'Rosemary', image: thumb('#e1ede6', '#3d7556'), description: 'Fragrant herb used in cooking and aromatherapy.', cost: 15 },
      { name: 'Mint', image: thumb('#dcf3e8', '#34a073'), description: 'Refreshing aroma, great for teas and cocktails.', cost: 12 },
      { name: 'Lemon Balm', image: thumb('#eef5d9', '#7fa83a'), description: 'Citrus scent that reduces stress and repels insects.', cost: 14 },
      { name: 'Hyacinth', image: thumb('#e8e3f3', '#5b7fb5'), description: 'Strong, sweet perfume that fills a whole room.', cost: 22 },
    ],
  },
  {
    category: 'Succulents & Low Light',
    plants: [
      { name: 'Jade Plant', image: thumb('#e2efe3', '#2e7d4f'), description: 'A symbol of good luck that is very hard to kill.', cost: 16 },
      { name: 'Zebra Haworthia', image: thumb('#e7ede6', '#2b5d44'), description: 'Compact striped succulent that loves bright shade.', cost: 13 },
      { name: 'ZZ Plant', image: thumb('#dfeee6', '#1f5a3f'), description: 'Thrives in low light with very little water.', cost: 25 },
      { name: 'Cast Iron Plant', image: thumb('#e0e9e1', '#27503a'), description: 'Nearly indestructible, perfect for dark corners.', cost: 19 },
      { name: 'Echeveria', image: thumb('#f1e7ee', '#8aa88f'), description: 'Rosette-shaped succulent in soft pastel tones.', cost: 11 },
      { name: 'Pothos', image: thumb('#e4f1d8', '#58a04a'), description: 'Trailing vine that tolerates shade and neglect.', cost: 10 },
    ],
  },
];

function ProductList({ onHomeClick }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [showCart, setShowCart] = useState(false);

  // Total number of items in the cart (sum of quantities)
  const calculateTotalQuantity = () =>
    cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalQuantity = calculateTotalQuantity();

  // A plant's button is disabled while it is in the cart
  const isInCart = (name) => cartItems.some((item) => item.name === name);

  const handleAddToCart = (plant) => {
    dispatch(addItem({ name: plant.name, image: plant.image, cost: plant.cost }));
  };

  const handleHomeClick = (e) => {
    e.preventDefault();
    onHomeClick();
  };

  const handlePlantsClick = (e) => {
    e.preventDefault();
    setShowCart(false);
  };

  const handleCartClick = (e) => {
    e.preventDefault();
    setShowCart(true);
  };

  return (
    <div>
      {/* Navbar: shown on both the Plants and Cart pages */}
      <nav className="navbar">
        <a href="#home" className="brand" onClick={handleHomeClick}>
          Paradise Nursery
        </a>
        <div className="nav-links">
          <a href="#home" onClick={handleHomeClick}>Home</a>
          <a href="#plants" onClick={handlePlantsClick}>Plants</a>
          <a
            href="#cart"
            className="cart-link"
            onClick={handleCartClick}
            aria-label={`Cart, ${totalQuantity} items`}
          >
            <svg viewBox="0 0 256 256" width="34" height="34" aria-hidden="true">
              <rect width="256" height="256" fill="none" />
              <circle cx="80" cy="216" r="12" fill="currentColor" />
              <circle cx="184" cy="216" r="12" fill="currentColor" />
              <path
                d="M42.3 72H221.7l-26.4 92.4A15.9 15.9 0 0 1 179.9 176H84.1a15.9 15.9 0 0 1-15.4-11.6L32.5 37.8A8 8 0 0 0 24.8 32H8"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="16"
              />
            </svg>
            <span className="cart_quantity_count">{totalQuantity}</span>
          </a>
        </div>
      </nav>

      {!showCart ? (
        <main className="product-grid-page product-list">
          {plantsArray.map((group) => (
            <section key={group.category} className="category">
              <h2 className="category-title">{group.category}</h2>
              <div className="product-grid">
                {group.plants.map((plant) => (
                  <article className="product-card" key={plant.name}>
                    <img className="product-image" src={plant.image} alt={plant.name} />
                    <h3 className="product-title">{plant.name}</h3>
                    <p className="product-description">{plant.description}</p>
                    <p className="product-price">${plant.cost}</p>
                    <button
                      className="product-button"
                      onClick={() => handleAddToCart(plant)}
                      disabled={isInCart(plant.name)}
                    >
                      {isInCart(plant.name) ? 'Added to Cart' : 'Add to Cart'}
                    </button>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </main>
      ) : (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      )}
    </div>
  );
}

export default ProductList;
