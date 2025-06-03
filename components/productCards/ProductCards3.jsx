"use client";
import { useContextElement } from "@/context/Context";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import AddToCart from "../common/AddToCart";
import AddToWishlist from "../common/AddToWishlist";

export default function ProductCards3({ product }) {
  const { addToWishlist, addProductToCart, isAddedToCartProducts } =
    useContextElement();
  const quantity = 1;

  if (!product) {
    return null;
  }

  return (
    <div className="card-product mb-4">
      <div className="card-product-wrapper">
        <Link href={`/product-detail/${product.id}`} className="product-img">
          <Image
            className="img-product ls-is-cached lazyloaded"
            src={product.imgSrc || "/placeholder-image.jpg"}
            alt="image-product"
            width={500}
            height={500}
          />
          <Image
            className="img-hover ls-is-cached lazyloaded"
            src={product.imgHover || product.imgSrc || "/placeholder-image.jpg"}
            alt="image-product"
            width={500}
            height={500}
          />
        </Link>
        <ul className="list-product-btn top-0 end-0">
          <li>
            <AddToCart productId={product.id} tooltipClass="tooltip-left" />
          </li>
          <li className="wishlist">
            <AddToWishlist productId={product.id} tooltipClass="tooltip-left" />
          </li>
        </ul>
      </div>
      <div className="card-product-info">
        <div className="box-title">
          <div>
            <Link
              href={`/product-detail/${product.id}`}
              className="name-product body-md-2 fw-semibold text-secondary link"
            >
              {product.title || "Untitled Product"}
            </Link>
          </div>
          <p className="price-wrap fw-medium">
            <span className="new-price price-text fw-medium">
              ₹{Number(product.price || 0).toFixed(2)}
            </span>
            {product.oldPrice && (
              <span className="old-price body-md-2 text-main-2">
                ₹{Number(product.oldPrice).toFixed(2)}
              </span>
            )}
          </p>
        </div>
        <div className="box-infor-detail">
          <div className="star-review flex-wrap">
            <ul className="list-star">
              {[1, 2, 3, 4, 5].map((star) => (
                <li key={star}>
                  <i
                    className={`icon-star ${
                      star <= (product.rating || 4) ? "" : "text-main-4"
                    }`}
                  />
                </li>
              ))}
            </ul>
            <p className="caption text-main-2">(74)</p>
          </div>
        </div>
      </div>
      {/* Add to Cart Button */}
      <a
        href="#shoppingCart"
        data-bs-toggle="offcanvas"
        className="tf-btn text-white"
        onClick={(e) => {
          e.preventDefault();
          addProductToCart(product.id, quantity);
        }}
      >
        {isAddedToCartProducts(product.id) ? "Already Added" : "Add to cart"}
        <i className="icon-cart-2" />
      </a>
    </div>
  );
}
