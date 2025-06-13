import React, { useState } from "react";

const FilterOptions = ({ allProps }) => {
  const {
    price,
    maxPrice,
    isNew,
    deals,
    rating,
    brands,
    availableBrands,
    setPrice,
    setDeals,
    setRating,
    setIsNew,
    setBrands,
    removeBrand,
    clearFilter,
  } = allProps;

  const [tempPrice, setTempPrice] = useState(price);

  // Handle price range change
  const handlePriceChange = (index, value) => {
    const newPrice = [...tempPrice];
    newPrice[index] = Number(value);
    setTempPrice(newPrice);
    setPrice(newPrice);
  };

  // Handle brand selection
  const handleBrandChange = (brand) => {
    const updatedBrands = brands.includes(brand)
      ? brands.filter((b) => b !== brand)
      : [...brands, brand];
    setBrands(updatedBrands);
  };

  return (
    <div className="filter-options">
      {/* Price Range Filter */}
      <div className="filter-section mb-4">
        <h6 className="filter-title mb-3">Price Range</h6>
        <div className="price-range-container">
          <div className="price-inputs mb-3">
            <div className="row">
              <div className="col-6">
                <label className="form-label small">Min Price</label>
                <input
                  type="number"
                  className="form-control form-control-sm"
                  value={tempPrice[0]}
                  min="0"
                  max={maxPrice}
                  onChange={(e) => handlePriceChange(0, e.target.value)}
                />
              </div>
              <div className="col-6">
                <label className="form-label small">Max Price</label>
                <input
                  type="number"
                  className="form-control form-control-sm"
                  value={tempPrice[1]}
                  min={tempPrice[0]}
                  max={maxPrice}
                  onChange={(e) => handlePriceChange(1, e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="range-slider">
            <input
              type="range"
              className="form-range"
              min="0"
              max={maxPrice}
              value={tempPrice[0]}
              onChange={(e) => handlePriceChange(0, e.target.value)}
              style={{ marginBottom: "10px" }}
            />
            <input
              type="range"
              className="form-range"
              min="0"
              max={maxPrice}
              value={tempPrice[1]}
              onChange={(e) => handlePriceChange(1, e.target.value)}
            />
          </div>
          <div className="price-display text-center">
            <small className="text-muted">
              ₹{tempPrice[0]} - ₹{tempPrice[1]}
            </small>
          </div>
        </div>
      </div>

      {/* Brand Filter */}
      {availableBrands && availableBrands.length > 0 && (
        <div className="filter-section mb-4">
          <h6 className="filter-title mb-3">Brands</h6>
          <div
            className="brand-options"
            style={{ maxHeight: "200px", overflowY: "auto" }}
          >
            {availableBrands.map((brand) => (
              <div key={brand} className="form-check mb-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={`brand-${brand}`}
                  checked={brands.includes(brand)}
                  onChange={() => handleBrandChange(brand)}
                />
                <label className="form-check-label" htmlFor={`brand-${brand}`}>
                  {brand}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* New Products Filter */}
      <div className="filter-section mb-4">
        <h6 className="filter-title mb-3">Product Status</h6>
        <div className="product-status-options">
          <div className="form-check mb-2">
            <input
              className="form-check-input"
              type="radio"
              name="productStatus"
              id="status-all"
              checked={isNew === "All"}
              onChange={() => setIsNew("All")}
            />
            <label className="form-check-label" htmlFor="status-all">
              All Products
            </label>
          </div>
          <div className="form-check mb-2">
            <input
              className="form-check-input"
              type="radio"
              name="productStatus"
              id="status-new"
              checked={isNew === "New"}
              onChange={() => setIsNew("New")}
            />
            <label className="form-check-label" htmlFor="status-new">
              New Products
            </label>
          </div>
          <div className="form-check mb-2">
            <input
              className="form-check-input"
              type="radio"
              name="productStatus"
              id="status-old"
              checked={isNew === "Old"}
              onChange={() => setIsNew("Old")}
            />
            <label className="form-check-label" htmlFor="status-old">
              Regular Products
            </label>
          </div>
        </div>
      </div>

      {/* Deals Filter */}
      <div className="filter-section mb-4">
        <h6 className="filter-title mb-3">Deals</h6>
        <div className="deals-options">
          <div className="form-check mb-2">
            <input
              className="form-check-input"
              type="radio"
              name="deals"
              id="deals-all"
              checked={deals === "All"}
              onChange={() => setDeals("All")}
            />
            <label className="form-check-label" htmlFor="deals-all">
              All Products
            </label>
          </div>
          <div className="form-check mb-2">
            <input
              className="form-check-input"
              type="radio"
              name="deals"
              id="deals-sale"
              checked={deals === "On Sale"}
              onChange={() => setDeals("On Sale")}
            />
            <label className="form-check-label" htmlFor="deals-sale">
              On Sale
            </label>
          </div>
          <div className="form-check mb-2">
            <input
              className="form-check-input"
              type="radio"
              name="deals"
              id="deals-regular"
              checked={deals === "Regular"}
              onChange={() => setDeals("Regular")}
            />
            <label className="form-check-label" htmlFor="deals-regular">
              Regular Price
            </label>
          </div>
        </div>
      </div>

      {/* Rating Filter */}
      <div className="filter-section mb-4">
        <h6 className="filter-title mb-3">Customer Rating</h6>
        <div className="rating-options">
          <div className="form-check mb-2">
            <input
              className="form-check-input"
              type="radio"
              name="rating"
              id="rating-all"
              checked={rating === "All"}
              onChange={() => setRating("All")}
            />
            <label className="form-check-label" htmlFor="rating-all">
              All Ratings
            </label>
          </div>
          {[4, 3, 2, 1].map((ratingValue) => (
            <div key={ratingValue} className="form-check mb-2">
              <input
                className="form-check-input"
                type="radio"
                name="rating"
                id={`rating-${ratingValue}`}
                checked={rating === ratingValue.toString()}
                onChange={() => setRating(ratingValue.toString())}
              />
              <label
                className="form-check-label d-flex align-items-center"
                htmlFor={`rating-${ratingValue}`}
              >
                <span className="me-2">{ratingValue}+ Stars</span>
                <div className="star-rating">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={
                        i < ratingValue ? "text-warning" : "text-muted"
                      }
                      style={{ fontSize: "12px" }}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Clear All Button */}
      <div className="filter-section">
        <button className="btn btn-outline-primary w-100" onClick={clearFilter}>
          Clear All Filters
        </button>
      </div>

      {/* Applied Filters Summary */}
      {(brands.length > 0 ||
        isNew !== "All" ||
        deals !== "All" ||
        rating !== "All") && (
        <div className="filter-section mt-4">
          <h6 className="filter-title mb-3">Applied Filters</h6>
          <div className="applied-filters">
            {brands.map((brand) => (
              <span key={brand} className="badge bg-primary me-1 mb-1">
                {brand}
                <button
                  className="btn-close btn-close-white ms-1"
                  style={{ fontSize: "10px" }}
                  onClick={() => removeBrand(brand)}
                ></button>
              </span>
            ))}
            {isNew !== "All" && (
              <span className="badge bg-primary me-1 mb-1">
                {isNew} Products
                <button
                  className="btn-close btn-close-white ms-1"
                  style={{ fontSize: "10px" }}
                  onClick={() => setIsNew("All")}
                ></button>
              </span>
            )}
            {deals !== "All" && (
              <span className="badge bg-primary me-1 mb-1">
                {deals}
                <button
                  className="btn-close btn-close-white ms-1"
                  style={{ fontSize: "10px" }}
                  onClick={() => setDeals("All")}
                ></button>
              </span>
            )}
            {rating !== "All" && (
              <span className="badge bg-primary me-1 mb-1">
                {rating}+ Stars
                <button
                  className="btn-close btn-close-white ms-1"
                  style={{ fontSize: "10px" }}
                  onClick={() => setRating("All")}
                ></button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterOptions;
