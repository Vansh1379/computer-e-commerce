"use client";
import React, { useEffect, useState } from "react";
import FilterOptions from "./FilterOptions.jsx";
import LayoutHandler from "./LayoutHandler.jsx";
import ProductCards3 from "../productCards/ProductCards3.jsx";

// Banner Component
const ProductBanner = () => {
  return (
    <div className="product-banner mb-4">
      <div className="banner-container position-relative overflow-hidden rounded">
        <div className="row align-items-center min-vh-50">
          <div className="col-lg-6 col-md-6">
            <div className="banner-content p-4 p-lg-5">
              <div className="banner-text">
                <h2 className="banner-title fw-bold mb-3 text-dark">
                  Power Up Your <br />
                  <span className="text-primary">Productivity</span>
                </h2>
                <p className="banner-description text-muted mb-4">
                  Discover the Ultimate Acer Laptop Adapter for Seamless
                  Charging and Uninterrupted Performance
                </p>
                <div className="acer-logo">
                  <svg
                    width="120"
                    height="40"
                    viewBox="0 0 120 40"
                    className="text-success"
                  >
                    <text
                      x="10"
                      y="25"
                      fontSize="24"
                      fontWeight="bold"
                      fill="currentColor"
                    >
                      acer
                    </text>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-6">
            <div className="banner-image p-3">
              <img
                src="https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Acer Laptop"
                className="img-fluid rounded shadow-sm"
                style={{ maxHeight: "300px", objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .product-banner {
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          border: 1px solid #dee2e6;
        }

        .banner-container {
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.9) 0%,
            rgba(248, 249, 250, 0.9) 100%
          );
        }

        .banner-title {
          font-size: 2.5rem;
          line-height: 1.2;
        }

        .banner-description {
          font-size: 1.1rem;
          line-height: 1.6;
        }

        .min-vh-50 {
          min-height: 300px;
        }

        .acer-logo {
          opacity: 0.8;
        }

        @media (max-width: 768px) {
          .banner-title {
            font-size: 2rem;
          }

          .banner-description {
            font-size: 1rem;
          }

          .min-vh-50 {
            min-height: 250px;
          }
        }

        @media (max-width: 576px) {
          .banner-title {
            font-size: 1.75rem;
          }

          .banner-content {
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
};

// Base URL for your backend server
const BASE_URL = "https://unique.rightinfoservice.com";

// Helper function to convert relative image paths to absolute URLs
const getImageUrl = (imagePath) => {
  if (!imagePath) return "/placeholder-image.jpg";

  // If already absolute URL, return as is
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }

  // If relative path, prepend base URL
  return `${BASE_URL}${imagePath}`;
};

// Transform API product to match your existing format
const transformProduct = (apiProduct) => {
  // Process images array to create absolute URLs
  const processedImages =
    apiProduct.images && apiProduct.images.length > 0
      ? apiProduct.images.map(getImageUrl)
      : ["/placeholder-image.jpg"];

  return {
    id: apiProduct.id,
    title: apiProduct.name || "Untitled Product",
    price: Number(apiProduct.newPrice || 0),
    oldPrice:
      apiProduct.oldPrice && Number(apiProduct.oldPrice) > 0
        ? Number(apiProduct.oldPrice)
        : null,
    imgSrc: processedImages[0],
    imgHover: processedImages[1] || processedImages[0],
    rating: 4, // Default rating since API doesn't provide it
    filterBrands: [apiProduct.brand || "Unknown"],
    inNew: Boolean(apiProduct.isFeatured),
    isTodaysDeals: Boolean(apiProduct.isFeatured),
    brand: apiProduct.brand || "Unknown",
    sku: apiProduct.sku || "",
    description: apiProduct.description || "",
    shortDescription: apiProduct.shortDescription || "",
    stock: Number(apiProduct.stock || 0),
    isActive: Boolean(apiProduct.isActive),
    chipset: apiProduct.chipset || "",
    gpuSeries: apiProduct.gpuSeries || "",
    memorySize: apiProduct.memorySize || "",
    memoryInterface: apiProduct.memoryInterface || "",
    memoryType: apiProduct.memoryType || "",
    warranty: apiProduct.warranty || "",
    // Keep all processed images for potential future use
    allImages: processedImages,
  };
};

export default function Products1() {
  const [allProducts, setAllProducts] = useState([]); // Store all products from API
  const [displayProducts, setDisplayProducts] = useState([]); // Store filtered/sorted products
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [sortingOption, setSortingOption] = useState("Default");

  // Filter states
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [isNew, setIsNew] = useState("All");
  const [deals, setDeals] = useState("All");
  const [rating, setRating] = useState("All");
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [availableBrands, setAvailableBrands] = useState([]);

  const itemPerPage = 20;

  // Fetch products from API
  const fetchProducts = async (page = 1, limit = 100) => {
    // Fetch more products to enable proper filtering
    try {
      setLoading(true);
      const response = await fetch(
        `${BASE_URL}/api/products?page=${page}&limit=${limit}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("API Response:", data);

      if (data.success && data.products) {
        const transformedProducts = data.products.map(transformProduct);
        console.log("Transformed Products:", transformedProducts);

        setAllProducts(transformedProducts);
        setTotalProducts(data.count || data.products.length);

        // Extract unique brands and set price range
        const brands = [
          ...new Set(transformedProducts.map((p) => p.brand).filter(Boolean)),
        ];
        setAvailableBrands(brands);

        // Set max price based on products
        const prices = transformedProducts.map((p) => Number(p.price || 0));
        const maxPriceValue = Math.max(...prices, 1000);
        setMaxPrice(maxPriceValue);
        setPriceRange([0, maxPriceValue]);
      } else {
        throw new Error("API returned unsuccessful response or no products");
      }
    } catch (err) {
      console.error("Error fetching products:", err);
      setError(err.message);
      setAllProducts([]);
      setTotalProducts(0);
    } finally {
      setLoading(false);
    }
  };

  // Apply filters to products
  const applyFilters = () => {
    let filtered = [...allProducts];

    // Price filter
    filtered = filtered.filter((product) => {
      const price = Number(product.price || 0);
      return price >= priceRange[0] && price <= priceRange[1];
    });

    // Brand filter
    if (selectedBrands.length > 0) {
      filtered = filtered.filter((product) =>
        selectedBrands.includes(product.brand)
      );
    }

    // New products filter
    if (isNew === "New") {
      filtered = filtered.filter((product) => product.inNew);
    } else if (isNew === "Old") {
      filtered = filtered.filter((product) => !product.inNew);
    }

    // Deals filter
    if (deals === "On Sale") {
      filtered = filtered.filter((product) => product.isTodaysDeals);
    } else if (deals === "Regular") {
      filtered = filtered.filter((product) => !product.isTodaysDeals);
    }

    // Rating filter
    if (rating !== "All") {
      const minRating = Number(rating);
      filtered = filtered.filter(
        (product) => Number(product.rating || 0) >= minRating
      );
    }

    return filtered;
  };

  // Apply sorting to filtered products
  const applySorting = (products) => {
    let sortedProducts = [...products];

    switch (sortingOption) {
      case "Price Ascending":
        sortedProducts.sort(
          (a, b) => Number(a.price || 0) - Number(b.price || 0)
        );
        break;
      case "Price Descending":
        sortedProducts.sort(
          (a, b) => Number(b.price || 0) - Number(a.price || 0)
        );
        break;
      case "Title Ascending":
        sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "Title Descending":
        sortedProducts.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        // Default sorting (no change)
        break;
    }

    return sortedProducts;
  };

  // Update display products when filters or sorting changes
  useEffect(() => {
    if (allProducts.length > 0) {
      const filtered = applyFilters();
      const sorted = applySorting(filtered);
      setDisplayProducts(sorted);
      setCurrentPage(1); // Reset to first page when filters change
    }
  }, [
    allProducts,
    priceRange,
    selectedBrands,
    isNew,
    deals,
    rating,
    sortingOption,
  ]);

  // Filter handlers
  const handlePriceChange = (newPriceRange) => {
    setPriceRange(newPriceRange);
  };

  const handleBrandChange = (brands) => {
    setSelectedBrands(brands);
  };

  const removeBrand = (brandToRemove) => {
    setSelectedBrands((prev) =>
      prev.filter((brand) => brand !== brandToRemove)
    );
  };

  const clearAllFilters = () => {
    setPriceRange([0, maxPrice]);
    setSelectedBrands([]);
    setIsNew("All");
    setDeals("All");
    setRating("All");
    setSortingOption("Default");
  };

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts(1, 100);
  }, []);

  // Filter sidebar functionality
  useEffect(() => {
    const handleOpenFilter = () => {
      if (window.innerWidth <= 1200) {
        document.querySelector(".sidebar-filter")?.classList.add("show");
        document.querySelector(".overlay-filter")?.classList.add("show");
        document.body.classList.toggle("no-scroll");
      }
    };

    const handleCloseFilter = () => {
      document.querySelector(".sidebar-filter")?.classList.remove("show");
      document.querySelector(".overlay-filter")?.classList.remove("show");
      document.body.classList.remove("no-scroll");
    };

    // Reset filter handler
    const handleResetFilter = () => {
      clearAllFilters();
      handleCloseFilter();
    };

    const openButtons = document.querySelectorAll("#filterShop, .sidebar-btn");
    openButtons.forEach((button) => {
      button.addEventListener("click", handleOpenFilter);
    });

    const closeButtons = document.querySelectorAll(
      ".close-filter, .overlay-filter"
    );
    closeButtons.forEach((button) => {
      button.addEventListener("click", handleCloseFilter);
    });

    const resetButton = document.querySelector("#reset-filter");
    if (resetButton) {
      resetButton.addEventListener("click", handleResetFilter);
    }

    return () => {
      openButtons.forEach((button) => {
        button.removeEventListener("click", handleOpenFilter);
      });
      closeButtons.forEach((button) => {
        button.removeEventListener("click", handleCloseFilter);
      });
      if (resetButton) {
        resetButton.removeEventListener("click", handleResetFilter);
      }
    };
  }, [maxPrice]);

  // Pagination for display products
  const getPaginatedProducts = () => {
    const startIndex = (currentPage - 1) * itemPerPage;
    const endIndex = startIndex + itemPerPage;
    return displayProducts.slice(startIndex, endIndex);
  };

  const totalFilteredProducts = displayProducts.length;
  const totalPages = Math.ceil(totalFilteredProducts / itemPerPage);
  const paginatedProducts = getPaginatedProducts();

  // Handle pagination
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="flat-content">
        <div className="container">
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "400px" }}
          >
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flat-content">
        <div className="container">
          <div className="alert alert-danger text-center" role="alert">
            <h4>Error Loading Products</h4>
            <p>{error}</p>
            <button
              className="btn btn-primary"
              onClick={() => fetchProducts(1, 100)}
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Filter props for FilterOptions component
  const filterProps = {
    price: priceRange,
    maxPrice: maxPrice,
    isNew: isNew,
    deals: deals,
    rating: rating,
    brands: selectedBrands,
    availableBrands: availableBrands,
    setPrice: handlePriceChange,
    setDeals: setDeals,
    setRating: setRating,
    setIsNew: setIsNew,
    setBrands: handleBrandChange,
    removeBrand: removeBrand,
    clearFilter: clearAllFilters,
  };

  return (
    <div className="flat-content">
      <div className="container">
        <div className="tf-product-view-content wrapper-control-shop">
          {/* Filter Sidebar */}
          <div className="canvas-filter-product sidebar-filter handle-canvas left">
            <div className="canvas-wrapper">
              <div className="canvas-header d-flex d-xl-none">
                <h5 className="title">Filter</h5>
                <span className="icon-close link icon-close-popup close-filter" />
              </div>
              <div className="canvas-body">
                <FilterOptions allProps={filterProps} />
              </div>
              <div className="canvas-bottom d-flex d-xl-none">
                <button id="reset-filter" className="tf-btn btn-reset w-100">
                  <span className="caption text-white">Reset Filters</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="content-area">
            <ProductBanner />

            {/* Active Filters Display */}
            {(selectedBrands.length > 0 ||
              isNew !== "All" ||
              deals !== "All" ||
              rating !== "All" ||
              priceRange[0] > 0 ||
              priceRange[1] < maxPrice) && (
              <div className="active-filters mb-3">
                <div className="d-flex flex-wrap align-items-center gap-2">
                  <span className="fw-medium">Active Filters:</span>

                  {/* Price filter */}
                  {(priceRange[0] > 0 || priceRange[1] < maxPrice) && (
                    <span className="badge bg-primary">
                      Price: ${priceRange[0]} - ${priceRange[1]}
                      <button
                        className="btn-close btn-close-white ms-1"
                        style={{ fontSize: "10px" }}
                        onClick={() => setPriceRange([0, maxPrice])}
                      ></button>
                    </span>
                  )}

                  {/* Brand filters */}
                  {selectedBrands.map((brand) => (
                    <span key={brand} className="badge bg-primary">
                      {brand}
                      <button
                        className="btn-close btn-close-white ms-1"
                        style={{ fontSize: "10px" }}
                        onClick={() => removeBrand(brand)}
                      ></button>
                    </span>
                  ))}

                  {/* Other filters */}
                  {isNew !== "All" && (
                    <span className="badge bg-primary">
                      {isNew} Products
                      <button
                        className="btn-close btn-close-white ms-1"
                        style={{ fontSize: "10px" }}
                        onClick={() => setIsNew("All")}
                      ></button>
                    </span>
                  )}

                  {deals !== "All" && (
                    <span className="badge bg-primary">
                      {deals}
                      <button
                        className="btn-close btn-close-white ms-1"
                        style={{ fontSize: "10px" }}
                        onClick={() => setDeals("All")}
                      ></button>
                    </span>
                  )}

                  {rating !== "All" && (
                    <span className="badge bg-primary">
                      {rating}+ Stars
                      <button
                        className="btn-close btn-close-white ms-1"
                        style={{ fontSize: "10px" }}
                        onClick={() => setRating("All")}
                      ></button>
                    </span>
                  )}

                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={clearAllFilters}
                  >
                    Clear All
                  </button>
                </div>
              </div>
            )}

            {/* Shop Controls */}
            <div className="tf-shop-control flex-wrap gap-10">
              <div className="d-flex align-items-center gap-10">
                <button
                  id="filterShop"
                  className="tf-btn-filter d-flex d-xl-none"
                >
                  <span className="icon icon-filter">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={20}
                      height={20}
                      fill="#121212"
                      viewBox="0 0 256 256"
                    >
                      <path d="M176,80a8,8,0,0,1,8-8h32a8,8,0,0,1,0,16H184A8,8,0,0,1,176,80ZM40,88H144v16a8,8,0,0,0,16,0V56a8,8,0,0,0-16,0V72H40a8,8,0,0,0,0,16Zm176,80H120a8,8,0,0,0,0,16h96a8,8,0,0,0,0-16ZM88,144a8,8,0,0,0-8,8v16H40a8,8,0,0,0,0,16H80v16a8,8,0,0,0,16,0V152A8,8,0,0,0,88,144Z" />
                    </svg>
                  </span>
                  <span className="body-md-2 fw-medium">Filter</span>
                </button>
                <p className="body-text-3 d-none d-lg-block">
                  Showing {paginatedProducts.length} of {totalFilteredProducts}{" "}
                  results
                  {totalFilteredProducts !== allProducts.length && (
                    <span className="text-muted">
                      {" "}
                      (filtered from {allProducts.length} total)
                    </span>
                  )}
                </p>
              </div>
              <div className="tf-control-view flat-title-tab-product flex-wrap">
                <div className="d-flex align-items-center gap-3">
                  <span>Sort by:</span>
                  <select
                    className="form-select"
                    value={sortingOption}
                    onChange={(e) => setSortingOption(e.target.value)}
                    style={{ width: "auto", minWidth: "150px" }}
                  >
                    <option value="Default">Default</option>
                    <option value="Price Ascending">Price: Low to High</option>
                    <option value="Price Descending">Price: High to Low</option>
                    <option value="Title Ascending">Name: A to Z</option>
                    <option value="Title Descending">Name: Z to A</option>
                  </select>
                </div>
                <LayoutHandler />
              </div>
            </div>

            {/* Products Grid */}
            <div className="gridLayout-wrapper">
              <div
                className="tf-grid-layout lg-col-4 md-col-3 sm-col-2 flat-grid-product wrapper-shop layout-tabgrid-1"
                id="gridLayout"
              >
                {paginatedProducts && paginatedProducts.length > 0 ? (
                  paginatedProducts.map((product) => (
                    <ProductCards3 key={product.id} product={product} />
                  ))
                ) : (
                  <div className="col-12 text-center py-5">
                    <div className="no-products">
                      <h4>No products found</h4>
                      <p className="text-muted mb-3">
                        {totalFilteredProducts === 0 && allProducts.length > 0
                          ? "Try adjusting your filters to see more products."
                          : "No products available at the moment."}
                      </p>
                      {totalFilteredProducts === 0 &&
                        allProducts.length > 0 && (
                          <button
                            className="btn btn-primary"
                            onClick={clearAllFilters}
                          >
                            Clear All Filters
                          </button>
                        )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Debug Info */}
            <div className="mt-3 text-center">
              <small className="text-muted">
                Debug: {allProducts.length} total products,{" "}
                {totalFilteredProducts} after filters, showing{" "}
                {paginatedProducts.length} on page {currentPage}
              </small>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="d-flex justify-content-center mt-4">
                <ul className="wg-pagination">
                  <li>
                    <button
                      className="link"
                      disabled={currentPage <= 1}
                      onClick={() => handlePageChange(currentPage - 1)}
                    >
                      <i className="icon-arrow-left-lg" />
                    </button>
                  </li>
                  {Array.from(
                    {
                      length: Math.min(5, totalPages),
                    },
                    (_, i) => {
                      const pageNum = i + Math.max(1, currentPage - 2);
                      return pageNum <= totalPages ? pageNum : null;
                    }
                  )
                    .filter(Boolean)
                    .map((page) => (
                      <li
                        key={page}
                        className={currentPage === page ? "active" : ""}
                      >
                        <button
                          className="title-normal link"
                          onClick={() => handlePageChange(page)}
                        >
                          {page}
                        </button>
                      </li>
                    ))}
                  <li>
                    <button
                      className="link"
                      disabled={currentPage >= totalPages}
                      onClick={() => handlePageChange(currentPage + 1)}
                    >
                      <i className="icon-arrow-right-lg" />
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Filter Overlay */}
        <div className="overlay-filter" />
      </div>
    </div>
  );
}
