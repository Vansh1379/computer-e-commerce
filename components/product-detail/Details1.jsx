"use client";
import React, { useState } from "react";
import Image from "next/image";
import Slider1 from "./sliders/Slider1";
import Link from "next/link";
import { useContextElement } from "@/context/Context";
import EMI from "../../public/images/EMI.png";

export default function Details1({ product }) {
  const [quantity, setQuantity] = useState(1);
  const { addProductToCart, isAddedToCartProducts } = useContextElement();

  // Helper function to render specifications
  const renderSpecifications = () => {
    if (
      !product.specifications ||
      Object.keys(product.specifications).length === 0
    ) {
      return (
        <>
          <li>
            <p className="body-md-2 fw-semibold">Brand</p>
            <span className="body-text-3">{product.brand || "N/A"}</span>
          </li>
          <li>
            <p className="body-md-2 fw-semibold">SKU</p>
            <span className="body-text-3">{product.sku || "N/A"}</span>
          </li>
        </>
      );
    }

    return Object.entries(product.specifications)
      .slice(0, 4)
      .map(([key, value]) => (
        <li key={key}>
          <p className="body-md-2 fw-semibold">{key}</p>
          <span className="body-text-3">{value}</span>
        </li>
      ));
  };

  // Helper function to render product description
  const renderProductDescription = () => {
    if (product.longDescription) {
      return (
        <ul className="product-about-list">
          <li>
            <p className="body-text-3">{product.longDescription}</p>
          </li>
        </ul>
      );
    }

    if (product.shortDescription) {
      return (
        <ul className="product-about-list">
          <li>
            <p className="body-text-3">{product.shortDescription}</p>
          </li>
        </ul>
      );
    }

    // Fallback content
    return (
      <ul className="product-about-list">
        <li>
          <p className="body-text-3">
            High-quality product with excellent features and reliable
            performance.
          </p>
        </li>
        <li>
          <p className="body-text-3">
            Designed to meet your needs with premium materials and
            craftsmanship.
          </p>
        </li>
        <li>
          <p className="body-text-3">
            Easy to use and maintain for long-lasting satisfaction.
          </p>
        </li>
      </ul>
    );
  };

  return (
    <section>
      <div className="tf-main-product section-image-zoom">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              {/* Product Image */}
              <div className="tf-product-media-wrap thumbs-default sticky-top">
                <div className="thumbs-slider">
                  <Slider1
                    firstImage={product.imgSrc}
                    images={product.images || [product.imgSrc]}
                  />
                </div>
              </div>
              {/* /Product Image */}
            </div>
            <div className="col-md-6">
              {/* Product Info */}
              <div className="tf-product-info-wrap position-relative">
                <div className="tf-zoom-main" />
                <div className="tf-product-info-list other-image-zoom flex-xxl-nowrap">
                  <div className="tf-product-info-content">
                    <div className="infor-heading">
                      <p className="caption">
                        Categories:
                        <Link
                          href={`/shop-default`}
                          className="link text-secondary"
                        >
                          {product.category || "Electronics"}
                        </Link>
                      </p>
                      <h5 className="product-info-name fw-semibold">
                        {product.title || "Product Name"}
                      </h5>
                      <ul className="product-info-rate-wrap">
                        <li className="star-review">
                          <ul className="list-star">
                            <li>
                              <i className="icon-star" />
                            </li>
                            <li>
                              <i className="icon-star" />
                            </li>
                            <li>
                              <i className="icon-star" />
                            </li>
                            <li>
                              <i className="icon-star" />
                            </li>
                            <li>
                              <i className="icon-star text-main-4" />
                            </li>
                          </ul>
                          <p className="caption text-main-2">Reviews (1.738)</p>
                        </li>
                        <li>
                          <p className="caption text-main-2">
                            {product.available
                              ? `Available: ${product.available}`
                              : "Sold: 349"}
                          </p>
                        </li>
                      </ul>
                    </div>
                    <div className="infor-center">
                      <div className="product-info-price">
                        <h4 className="text-primary">
                          ₹{product.price ? product.price.toFixed(2) : "0.00"}
                        </h4>
                        {product.oldPrice &&
                          product.oldPrice > product.price && (
                            <span className="price-text text-main-2 old-price">
                              ₹{product.oldPrice.toFixed(2)}
                            </span>
                          )}
                      </div>
                      <ul className="product-fearture-list">
                        {renderSpecifications()}
                      </ul>
                    </div>
                    <div className="infor-bottom">
                      <h6 className="fw-semibold">About this item</h6>
                      {renderProductDescription()}
                    </div>
                  </div>
                  <div className="tf-product-info-choose-option sticky-top">
                    <div className="product-delivery">
                      <p className="price-text fw-medium text-primary">
                        ₹{product.price ? product.price.toFixed(2) : "0.00"}
                      </p>
                      <p>
                        <i className="icon-delivery-2" /> Free shipping
                      </p>
                    </div>
                    <div className="emi-image-container">
                      <Image
                        src={EMI}
                        alt="EMI Options"
                        width={250}
                        height={100}
                        priority
                      />
                    </div>
                    <div className="product-quantity">
                      <p className="title body-text-3">Quantity</p>
                      <div className="wg-quantity">
                        <button
                          className="btn-quantity btn-decrease"
                          onClick={() =>
                            setQuantity((pre) => (pre == 1 ? 1 : pre - 1))
                          }
                        >
                          <i className="icon-minus" />
                        </button>
                        <input
                          className="quantity-product"
                          type="text"
                          readOnly
                          value={quantity}
                        />
                        <button
                          className="btn-quantity btn-increase"
                          onClick={() => setQuantity((pre) => pre + 1)}
                        >
                          <i className="icon-plus" />
                        </button>
                      </div>
                    </div>
                    <div className="product-box-btn">
                      <a
                        href="#shoppingCart"
                        data-bs-toggle="offcanvas"
                        className="tf-btn text-white"
                        onClick={() => addProductToCart(product.id, quantity)}
                      >
                        {isAddedToCartProducts(product.id)
                          ? "Already Added"
                          : "Add to cart"}
                        <i className="icon-cart-2" />
                      </a>
                      <Link
                        href={`/shop-cart`}
                        className="tf-btn text-white btn-gray"
                      >
                        Buy now
                      </Link>
                    </div>
                    <div className="product-detail">
                      <p className="caption">Details</p>
                      <p className="body-text-3">
                        <span>
                          Return policy: Eligible for Return, Refund or
                          Replacement within 30 days of receipt
                        </span>
                        <span>Support: Free Amazon tech support included</span>
                        {product.sku && <span>SKU: {product.sku}</span>}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Product Info */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
