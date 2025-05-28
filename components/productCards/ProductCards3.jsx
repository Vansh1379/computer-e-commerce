"use client";
import { useContextElement } from "@/context/Context";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import AddToCart from "../common/AddToCart";
import AddToWishlist from "../common/AddToWishlist";

export default function ProductCards3({ product }) {
  const {
    addToWishlist,
    // isAddedtoWishlist,
    // addProductToCart,
    // isAddedToCartProducts,
  } = useContextElement();

  return (
    <div className="card-product mb-4">
      <div className="card-product-wrapper">
        <Link href={`/product-detail/${product.id}`} className="product-img">
          <Image
            className="img-product ls-is-cached lazyloaded"
            src={product.imgSrc}
            alt="image-product"
            width={500}
            height={500}
          />
          <Image
            className="img-hover ls-is-cached lazyloaded"
            src={product.imgHover}
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
              {product.title}
            </Link>
          </div>
          <p className="price-wrap fw-medium">
            <span className="new-price price-text fw-medium">
              ₹{product.price.toFixed(3)}
            </span>
            {product.oldPrice && (
              <span className="old-price body-md-2 text-main-2">
                ₹{product.oldPrice.toFixed(3)}
              </span>
            )}
          </p>
        </div>
        <div className="box-infor-detail">
          <div className="star-review flex-wrap">
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
                <i className="icon-star text-main-4" />
              </li>
              <li>
                <i className="icon-star text-main-4" />
              </li>
            </ul>
            <p className="caption text-main-2">(74)</p>
          </div>
        </div>
      </div>

      {/* ✅ Bootstrap Add to Cart Button (no logic yet) */}
      <div className="">
        <button className="btn btn-primary">Add to Cart</button>
      </div>
    </div>
  );
}
