"use client";
import React, { useEffect, useReducer } from "react";
import FilterOptions from "./FilterOptions";
import { products3 } from "@/data/products";

import ShowLength from "./ShowLength";
import { initialState, reducer } from "@/reducer/filterReducer";
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

export default function Products1() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    price,
    isNew,
    deals,
    rating,
    brands,

    filtered,
    sortingOption,
    sorted,

    currentPage,
    itemPerPage,
  } = state;

  const allProps = {
    ...state,
    setPrice: (value) => dispatch({ type: "SET_PRICE", payload: value }),

    setDeals: (value) => {
      value == deals
        ? dispatch({ type: "SET_DEALS", payload: "All" })
        : dispatch({ type: "SET_DEALS", payload: value });
    },
    setRating: (value) => {
      value == rating
        ? dispatch({ type: "SET_RATING", payload: "All" })
        : dispatch({ type: "SET_RATING", payload: value });
    },
    setIsNew: (value) => {
      dispatch({ type: "SET_ISNEW", payload: value });
    },

    setBrands: (newBrand) => {
      if (brands.includes(newBrand)) {
        const updated = [...brands].filter((brand) => brand != newBrand);
        dispatch({ type: "SET_BRANDS", payload: updated });
      } else {
        dispatch({ type: "SET_BRANDS", payload: [...brands, newBrand] });
      }
    },
    removeBrand: (newBrand) => {
      const updated = [...brands].filter((brand) => brand != newBrand);

      dispatch({ type: "SET_BRANDS", payload: updated });
    },
    setSortingOption: (value) =>
      dispatch({ type: "SET_SORTING_OPTION", payload: value }),

    setCurrentPage: (value) =>
      dispatch({ type: "SET_CURRENT_PAGE", payload: value }),
    setItemPerPage: (value) => {
      dispatch({ type: "SET_CURRENT_PAGE", payload: 1 }),
        dispatch({ type: "SET_ITEM_PER_PAGE", payload: value });
    },
    clearFilter: () => {
      dispatch({ type: "CLEAR_FILTER" });
    },
  };

  useEffect(() => {
    let filteredArrays = [];

    if (brands.length) {
      const filteredByBrands = [...products3].filter((elm) =>
        brands.some((el) => elm.filterBrands.includes(el))
      );
      filteredArrays = [...filteredArrays, filteredByBrands];
    }
    if (isNew !== "All") {
      const filteredByisNew = [...products3].filter((elm) => {
        if (isNew) {
          return elm.inNew;
        } else {
          return !elm.inNew;
        }
      });
      filteredArrays = [...filteredArrays, filteredByisNew];
    }
    if (deals !== "All") {
      if (deals == "All Discounts") {
        const filteredBydeails = [...products3].filter((elm) => elm.oldPrice);
        filteredArrays = [...filteredArrays, filteredBydeails];
      }
      if (deals == "Today's Deals") {
        const filteredBydeails = [...products3].filter(
          (elm) => elm.isTodaysDeals
        );
        filteredArrays = [...filteredArrays, filteredBydeails];
      }
    }
    if (rating !== "All") {
      const filteredByrating = [...products3].filter(
        (elm) => elm.rating >= rating
      );
      filteredArrays = [...filteredArrays, filteredByrating];
    }

    const filteredByPrice = [...products3].filter(
      (elm) => elm.price >= price[0] && elm.price <= price[1]
    );
    filteredArrays = [...filteredArrays, filteredByPrice];

    const commonItems = [...products3].filter((item) =>
      filteredArrays.every((array) => array.includes(item))
    );
    dispatch({ type: "SET_FILTERED", payload: commonItems });
  }, [price, isNew, deals, rating, brands]);

  useEffect(() => {
    if (sortingOption === "Price Ascending") {
      dispatch({
        type: "SET_SORTED",
        payload: [...filtered].sort((a, b) => a.price - b.price),
      });
    } else if (sortingOption === "Price Descending") {
      dispatch({
        type: "SET_SORTED",
        payload: [...filtered].sort((a, b) => b.price - a.price),
      });
    } else if (sortingOption === "Title Ascending") {
      dispatch({
        type: "SET_SORTED",
        payload: [...filtered].sort((a, b) => a.title.localeCompare(b.title)),
      });
    } else if (sortingOption === "Title Descending") {
      dispatch({
        type: "SET_SORTED",
        payload: [...filtered].sort((a, b) => b.title.localeCompare(a.title)),
      });
    } else {
      dispatch({ type: "SET_SORTED", payload: filtered });
    }
    dispatch({ type: "SET_CURRENT_PAGE", payload: 1 });
  }, [filtered, sortingOption]);

  useEffect(() => {
    const handleOpenFilter = () => {
      if (window.innerWidth <= 1200) {
        document.querySelector(".sidebar-filter").classList.add("show");
        document.querySelector(".overlay-filter").classList.add("show");
        document.body.classList.toggle("no-scroll");
      }
    };

    const handleCloseFilter = () => {
      document.querySelector(".sidebar-filter").classList.remove("show");
      document.querySelector(".overlay-filter").classList.remove("show");
      document.body.classList.toggle("no-scroll");
    };

    // Get all elements that should trigger the open action
    const openButtons = document.querySelectorAll("#filterShop, .sidebar-btn");
    openButtons.forEach((button) => {
      button.addEventListener("click", handleOpenFilter);
    });

    // Get all elements that should trigger the close action
    const closeButtons = document.querySelectorAll(
      ".close-filter, .overlay-filter"
    );
    closeButtons.forEach((button) => {
      button.addEventListener("click", handleCloseFilter);
    });

    // Cleanup function to remove event listeners
    return () => {
      openButtons.forEach((button) => {
        button.removeEventListener("click", handleOpenFilter);
      });
      closeButtons.forEach((button) => {
        button.removeEventListener("click", handleCloseFilter);
      });
    };
  }, []); // Empty dependency array means this runs once on mount

  return (
    <div className="flat-content">
      <div className="container">
        <div className="tf-product-view-content wrapper-control-shop">
          <div className="canvas-filter-product sidebar-filter handle-canvas left">
            <div className="canvas-wrapper">
              <div className="canvas-header d-flex d-xl-none">
                <h5 className="title">Filter</h5>
                <span className="icon-close link icon-close-popup close-filter" />
              </div>
              <div className="canvas-body">
                <FilterOptions allProps={allProps} />
              </div>
              <div className="canvas-bottom d-flex d-xl-none">
                <button
                  id="reset-filter"
                  onClick={() => allProps.clearFilter()}
                  className="tf-btn btn-reset w-100"
                >
                  <span className="caption text-white">Reset Filters</span>
                </button>
              </div>
            </div>
          </div>
          <div className="content-area">
            {/* Banner Component Added Here */}
            <ProductBanner />
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
                  1-16 of 66 results for "
                  <span className="title-sidebar fw-bold"> macbook m1 </span>"
                </p>
              </div>
              <div className="tf-control-view flat-title-tab-product flex-wrap">
                <LayoutHandler />
                <ShowLength />
              </div>
            </div>{" "}
            {/* this is the filter option which comes above the product listed
            and comes when he filter option is selected */}
            {price[0] != 0 ||
            price[1] != 100 ||
            isNew != "All" ||
            deals != "All" ||
            rating != "All" ||
            brands.length ? (
              <div className="meta-filter-shop" style={{}}>
                <div id="product-count-grid" className="count-text">
                  <span className="count">{sorted.length}</span> Products Found
                </div>
                <div id="product-count-list" className="count-text" />
                <div id="applied-filters">
                  {isNew == true && (
                    <span
                      className="filter-tag"
                      onClick={() => allProps.setIsNew("All")}
                    >
                      New <span className="remove-tag icon-close" />
                    </span>
                  )}
                  {isNew == false && (
                    <span
                      className="filter-tag"
                      onClick={() => allProps.setIsNew("All")}
                    >
                      Old <span className="remove-tag icon-close" />
                    </span>
                  )}
                  {brands.map((elm, i) => (
                    <span
                      key={i}
                      className="filter-tag"
                      onClick={() => allProps.removeBrand(elm)}
                    >
                      {elm}
                      <span className="remove-tag icon-close" />
                    </span>
                  ))}
                  {deals != "All" && (
                    <span
                      className="filter-tag"
                      onClick={() => allProps.setDeals("All")}
                    >
                      {deals}
                      <span className="remove-tag icon-close" />
                    </span>
                  )}
                  {rating != "All" && (
                    <span
                      className="filter-tag"
                      onClick={() => allProps.setRating("All")}
                    >
                      {rating} Rating
                      <span className="remove-tag icon-close" />
                    </span>
                  )}
                  {(price[0] != 0 || price[1] != 100) && (
                    <span
                      className="filter-tag"
                      onClick={() => allProps.setPrice([0, 100])}
                    >
                      ${price[0]} to ${price[1]}
                      <span
                        className="remove-tag icon-close"
                        data-filter="priceRadio"
                      />
                    </span>
                  )}
                </div>
                <button
                  id="remove-all"
                  className="remove-all-filters"
                  onClick={() => allProps.clearFilter()}
                >
                  <span className="caption">REMOVE ALL</span>
                  <i className="icon icon-close" />
                </button>
              </div>
            ) : (
              ""
            )}
            <div className="gridLayout-wrapper">
              <div
                className="tf-grid-layout lg-col-4 md-col-3 sm-col-2 flat-grid-product wrapper-shop layout-tabgrid-1"
                id="gridLayout"
              >
                {/*the main file which renders the products it takes data from product.js 
                data set and then goes to reducer by redux and comes by the name of sorted
                 from redux to this file and then gets render*/}
                {sorted.map((product, i) => (
                  <ProductCards3 key={i} product={product} />
                ))}
                {/* Navigation */}
                <ul className="wg-pagination wd-load">
                  <li>
                    <a href="#" className="link">
                      <i className="icon-arrow-left-lg" />
                    </a>
                  </li>
                  <li className="active">
                    <p className="title-normal link">1</p>
                  </li>
                  <li>
                    <a href="#" className="title-normal link">
                      2
                    </a>
                  </li>
                  <li className="d-none d-sm-flex">
                    <a href="#" className="title-normal link">
                      3
                    </a>
                  </li>
                  <li className="d-none d-sm-flex">
                    <a href="#" className="title-normal link">
                      4
                    </a>
                  </li>
                  <li>
                    <p className="title-normal">...</p>
                  </li>
                  <li>
                    <a href="#" className="title-normal link">
                      10
                    </a>
                  </li>
                  <li>
                    <a href="#" className="link">
                      <i className="icon-arrow-right-lg" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
