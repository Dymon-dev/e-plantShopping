import React, { useState } from 'react';
import ProductList from './ProductList.jsx';
import AboutUs from './AboutUs.jsx';
import './App.css';

function App() {
  const [showProductList, setShowProductList] = useState(false);

  const handleGetStartedClick = () => {
    setShowProductList(true);
  };

  return (
    <div className="app-container">
      {/* Landing page */}
      <div className={`landing-page background-image ${showProductList ? 'fade-out' : ''}`}>
        <div className="landing-content">
          <div className="landing-copy">
            <h1>Welcome to Paradise Nursery</h1>
            <p className="tagline">Where green meets serenity</p>
            <button
              className="get-started-button"
              onClick={handleGetStartedClick}
            >
              Get Started
            </button>
          </div>
          <AboutUs />
        </div>
      </div>

      {/* Product listing page (includes navbar + cart) */}
      <div className={`product-list-container ${showProductList ? 'visible' : ''}`}>
        {showProductList && (
          <ProductList onHomeClick={() => setShowProductList(false)} />
        )}
      </div>
    </div>
  );
}

export default App;
