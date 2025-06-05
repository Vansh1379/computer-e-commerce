"use client";
import React, { useState, useEffect } from "react";
import { Grid, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import Image from "next/image";
import AddToCart from "@/components/common/AddToCart";
import AddToWishlist from "@/components/common/AddToWishlist";
import AddToQuickview from "@/components/common/AddToQuickview";
import AddToCompare from "@/components/common/AddToCompare";

export default function Products7() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://unique.rightinfoservice.com/api/products/featured"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();

        if (data.success && data.products) {
          setProducts(data.products);
        } else {
          throw new Error("Invalid API response format");
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Helper function to get the primary image
  const getPrimaryImage = (images) => {
    if (!images || images.length === 0) {
      return "/placeholder-product.jpg"; // Fallback image
    }
    // If the image starts with '/', prepend the base URL
    const imagePath = images[0];
    return imagePath.startsWith("/")
      ? `https://unique.rightinfoservice.com${imagePath}`
      : imagePath;
  };

  // Helper function to get hover image (second image if available)
  const getHoverImage = (images) => {
    if (!images || images.length < 2) {
      return getPrimaryImage(images); // Use primary image as fallback
    }
    const imagePath = images[1];
    return imagePath.startsWith("/")
      ? `https://unique.rightinfoservice.com${imagePath}`
      : imagePath;
  };

  // Helper function to format price
  const formatPrice = (price) => {
    return parseFloat(price).toFixed(2);
  };

  if (loading) {
    return (
      <section className="tf-sp-2">
        <div className="container">
          <div className="flat-title">
            <h5 className="fw-semibold text-light-blue">
              Smart Home Appliances
            </h5>
          </div>
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading featured products...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="tf-sp-2">
        <div className="container">
          <div className="flat-title">
            <h5 className="fw-semibold text-light-blue">
              Smart Home Appliances
            </h5>
          </div>
          <div className="text-center py-5">
            <div className="alert alert-danger" role="alert">
              <h6>Error loading products</h6>
              <p className="mb-0">{error}</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="tf-sp-2">
      <div className="container">
        <div className="flat-title wow fadeInUp" data-wow-delay="0s">
          <h5 className="fw-semibold text-light-blue">Featured Products</h5>
          <div className="box-btn-slide relative">
            <div className="swiper-button-prev nav-swiper nav-prev-products snbp39">
              <i className="icon-arrow-left-lg" />
            </div>
            <div className="swiper-button-next nav-swiper nav-next-products snbn39">
              <i className="icon-arrow-right-lg" />
            </div>
          </div>
        </div>
        <div className="slider-wrap style-2">
          {/* Swiper Component (Left Side) */}
          {products.length > 0 ? (
            <Swiper
              className="swiper width-item-2 tf-sw-products"
              breakpoints={{
                0: { slidesPerView: 2 },
                575: {
                  slidesPerView: 3,
                },
                768: {
                  slidesPerView: 4,
                },
                992: {
                  slidesPerView: 4,
                },
              }}
              spaceBetween={15}
              grid={{
                rows: 2,
                fill: "row",
              }}
              modules={[Navigation, Pagination, Grid]}
              pagination={{
                clickable: true,
                el: ".spd39",
              }}
              navigation={{
                prevEl: ".snbp39",
                nextEl: ".snbn39",
              }}
            >
              {products.map((product) => (
                <SwiperSlide key={product.id} className="swiper-slide">
                  <div className="card-product style-small style-img-border">
                    <div className="card-product-wrapper">
                      <Link
                        href={`/product-detail/${product.slug || product.id}`}
                        className="product-img"
                      >
                        <Image
                          className="img-product lazyload"
                          src={getPrimaryImage(product.images)}
                          alt={product.name}
                          width={300}
                          height={300}
                          onError={(e) => {
                            e.target.src = "/placeholder-product.jpg";
                          }}
                        />
                        <Image
                          className="img-hover lazyload"
                          src={getHoverImage(product.images)}
                          alt={product.name}
                          width={300}
                          height={300}
                          onError={(e) => {
                            e.target.src = getPrimaryImage(product.images);
                          }}
                        />
                      </Link>
                      <ul className="list-product-btn">
                        <li>
                          <AddToCart
                            tooltipClass="tooltip-left"
                            productId={product.id}
                          />
                        </li>
                        <li className="d-none d-sm-block wishlist">
                          <AddToWishlist
                            tooltipClass="tooltip-left"
                            productId={product.id}
                          />
                        </li>
                        <li>
                          <AddToQuickview
                            productId={product.id}
                            tooltipClass="tooltip-left"
                          />
                        </li>
                        <li className="d-none d-sm-block">
                          <AddToCompare
                            productId={product.id}
                            tooltipClass="tooltip-left"
                          />
                        </li>
                      </ul>
                    </div>
                    <div className="card-product-info">
                      <div className="box-title">
                        <div className="d-flex flex-column">
                          <p className="caption text-main-2 font-2">
                            {product.category?.name || product.brand}
                          </p>
                          <Link
                            href={`/product-detail/${
                              product.slug || product.id
                            }`}
                            className="name-product body-md-2 fw-semibold text-secondary link"
                            title={product.name}
                          >
                            {product.name}
                          </Link>
                        </div>
                        <p className="price-wrap fw-medium">
                          <span className="new-price price-text fw-medium mb-0">
                            ₹{formatPrice(product.newPrice)}
                          </span>
                          {product.oldPrice &&
                            parseFloat(product.oldPrice) >
                              parseFloat(product.newPrice) && (
                              <span className="old-price body-md-2 text-main-2 fw-normal">
                                ₹{formatPrice(product.oldPrice)}
                              </span>
                            )}
                        </p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
              <div className="d-flex d-lg-none sw-dot-default sw-pagination-products justify-content-center spd39" />
            </Swiper>
          ) : (
            <div className="text-center py-5">
              <p>No featured products available at the moment.</p>
            </div>
          )}

          {/* Banner - Right Side */}
          <div
            className="width-item-1 banner-product-2 d-none d-xl-block wow fadeInRight"
            data-wow-delay="0s"
            style={{ order: 2 }}
          >
            <a href="#" className="image h-100">
              <Image
                src="https://i.pinimg.com/736x/be/03/92/be0392abf9edca2f8e75d8c0f2a1cfa7.jpg"
                alt="Featured Banner"
                className="lazyload"
                width={400}
                height={650}
              />
            </a>
            <div className="content">
              <div className="box-top">
                <p
                  className="text-white body-text-3 text-uppercase fw-2"
                  style={{ letterSpacing: "9.8px" }}
                >
                  Featured
                </p>
              </div>
              <div className="box-bottom">
                <Link
                  href={`/shop-default`}
                  className="link h3 mb-0 lh-xl-49 text-white"
                >
                  Latest &amp; <br />
                  Greatest
                </Link>
                <div className="box-price">
                  <span className="text fw-2 price-text text-white">
                    Starting
                  </span>
                  <span className="h2 mb-0 fw-bold text-price">
                    ₹
                    {products.length > 0
                      ? formatPrice(products[0].newPrice)
                      : "0.00"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
