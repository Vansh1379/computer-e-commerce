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
  return (
    <section>
      <div className="tf-main-product section-image-zoom">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              {/* Product Image */}
              <div className="tf-product-media-wrap thumbs-default sticky-top">
                <div className="thumbs-slider">
                  <Slider1 firstIamge={product.imgSrc} />
                </div>
              </div>
              {/* /Product Image */}
            </div>
            <div className="col-md-6">
              {/* Product Infor */}
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
                          Consumer Electronics
                        </Link>
                      </p>
                      <h5 className="product-info-name fw-semibold">
                        {product.title ??
                          `Elite Gourmet EKT1001B Electric BPA-Free Glass Kettle,
                        Cordless 360° Base`}
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
                          <p className="caption text-main-2">Sold: 349</p>
                        </li>
                      </ul>
                    </div>
                    <div className="infor-center">
                      <div className="product-info-price">
                        <h4 className="text-primary">
                          ₹{product.price.toFixed(2)}
                        </h4>{" "}
                        {product.oldPrice && (
                          <span className="price-text text-main-2 old-price">
                            ₹{product.oldPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                      <ul className="product-fearture-list">
                        <li>
                          <p className="body-md-2 fw-semibold">Brand</p>
                          <span className="body-text-3">Elite Gourmet</span>
                        </li>
                        <li>
                          <p className="body-md-2 fw-semibold">Capacity</p>
                          <span className="body-text-3">1 Liters</span>
                        </li>
                        <li>
                          <p className="body-md-2 fw-semibold">Material</p>
                          <span className="body-text-3">Glass</span>
                        </li>
                        <li>
                          <p className="body-md-2 fw-semibold">Wattage</p>
                          <span className="body-text-3">1100 watts</span>
                        </li>
                      </ul>
                    </div>
                    <div className="infor-bottom">
                      <h6 className="fw-semibold">About this item</h6>
                      <ul className="product-about-list">
                        <li>
                          <p className="body-text-3">
                            Here's the quickest way to enjoy your delicious hot
                            tea every single day.
                          </p>
                        </li>
                        <li>
                          <p className="body-text-3">
                            100% BPA - Free premium design meets excellent
                          </p>
                        </li>
                        <li>
                          <p className="body-text-3">
                            No more messy accidents or spills
                          </p>
                        </li>
                        <li>
                          <p className="body-text-3">
                            So easy &amp; convenient that everyone can use it
                          </p>
                        </li>
                        <li>
                          <p className="body-text-3">
                            This powerful 900-1100-Watt kettle has convenient
                            capacity markings on the body lets you accurately
                          </p>
                        </li>
                        <li>
                          <p className="body-text-3">
                            1 year limited warranty and us-based customer
                            support team lets you buy with confidence.
                          </p>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="tf-product-info-choose-option sticky-top">
                    <div className="product-delivery">
                      <p className="price-text fw-medium text-primary">
                        ₹{product.price.toFixed(2)}
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
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Product Infor */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
