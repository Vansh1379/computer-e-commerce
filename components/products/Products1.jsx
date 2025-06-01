"use client";
import React, { useEffect, useState } from "react";
import FilterOptions from "./FilterOptions";
import LayoutHandler from "./LayoutHandler";
import ProductCards3 from "../productCards/ProductCards3";

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

// Transform API product to match your existing format
const transformProduct = (apiProduct) => {
  return {
    id: apiProduct.id,
    title: apiProduct.name || "Untitled Product",
    price: Number(apiProduct.newPrice || 0),
    oldPrice:
      apiProduct.oldPrice && Number(apiProduct.oldPrice) > 0
        ? Number(apiProduct.oldPrice)
        : null,
    imgSrc: apiProduct.images?.[0] || "/placeholder-image.jpg",
    imgHover:
      apiProduct.images?.[1] ||
      apiProduct.images?.[0] ||
      "/placeholder-image.jpg",
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
  };
};

export default function Products1() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [sortingOption, setSortingOption] = useState("Default");
  const [displayProducts, setDisplayProducts] = useState([]);

  const itemPerPage = 20;

  // Fetch products from API
  const fetchProducts = async (page = 1, limit = 20) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://unique.rightinfoservice.com/api/products?page=${page}&limit=${limit}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("API Response:", data);

      if (data.success && data.products) {
        const transformedProducts = data.products.map(transformProduct);
        console.log("Transformed Products:", transformedProducts);
        setProducts(transformedProducts);
        setDisplayProducts(transformedProducts); // Set display products directly
        setTotalProducts(data.count || data.products.length);
      } else {
        throw new Error("API returned unsuccessful response or no products");
      }
    } catch (err) {
      console.error("Error fetching products:", err);
      setError(err.message);
      setProducts([]);
      setDisplayProducts([]);
      setTotalProducts(0);
    } finally {
      setLoading(false);
    }
  };

  // Fetch products on component mount and when pagination changes
  useEffect(() => {
    fetchProducts(currentPage, itemPerPage);
  }, [currentPage]);

  // Simple sorting logic (no complex filtering)
  useEffect(() => {
    let sortedProducts = [...products];

    if (sortingOption === "Price Ascending") {
      sortedProducts.sort(
        (a, b) => Number(a.price || 0) - Number(b.price || 0)
      );
    } else if (sortingOption === "Price Descending") {
      sortedProducts.sort(
        (a, b) => Number(b.price || 0) - Number(a.price || 0)
      );
    } else if (sortingOption === "Title Ascending") {
      sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortingOption === "Title Descending") {
      sortedProducts.sort((a, b) => b.title.localeCompare(a.title));
    }

    setDisplayProducts(sortedProducts);
  }, [products, sortingOption]);

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

    return () => {
      openButtons.forEach((button) => {
        button.removeEventListener("click", handleOpenFilter);
      });
      closeButtons.forEach((button) => {
        button.removeEventListener("click", handleCloseFilter);
      });
    };
  }, []);

  // Handle pagination
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
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
              onClick={() => fetchProducts(currentPage, itemPerPage)}
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  const totalPages = Math.ceil(totalProducts / itemPerPage);

  // Dummy props for FilterOptions (keeping UI but no functionality)
  const dummyFilterProps = {
    price: [0, 100],
    isNew: "All",
    deals: "All",
    rating: "All",
    brands: [],
    setPrice: () => {},
    setDeals: () => {},
    setRating: () => {},
    setIsNew: () => {},
    setBrands: () => {},
    removeBrand: () => {},
    clearFilter: () => {},
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
                <FilterOptions allProps={dummyFilterProps} />
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
                  Showing {displayProducts.length} of {totalProducts} results
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
                {displayProducts && displayProducts.length > 0 ? (
                  displayProducts.map((product) => (
                    <ProductCards3 key={product.id} product={product} />
                  ))
                ) : (
                  <div className="col-12 text-center py-5">
                    <p className="text-muted">
                      {loading ? "Loading..." : "No products available."}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Debug Info */}
            <div className="mt-3 text-center">
              <small className="text-muted">
                Debug: Found {products.length} products, displaying{" "}
                {displayProducts.length}
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
