"use client";
import React, { useState, useEffect } from "react";
import { Grid, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import Image from "next/image";
import AddToCart from "@/components/common/AddToCart";
import AddToWishlist from "@/components/common/AddToWishlist";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrendingProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://unique.rightinfoservice.com/api/products/trending"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.success && data.products) {
          // Transform API data to match your component's expected format
          const transformedProducts = data.products.map((product) => ({
            id: product.id,
            imgSrc:
              product.images && product.images.length > 0
                ? `https://unique.rightinfoservice.com${product.images[0]}`
                : "/placeholder-image.jpg", // fallback image
            imgHover:
              product.images && product.images.length > 1
                ? `https://unique.rightinfoservice.com${product.images[1]}`
                : product.images && product.images.length > 0
                ? `https://unique.rightinfoservice.com${product.images[0]}`
                : "/placeholder-image.jpg",
            width: 360,
            height: 360,
            category: product.category?.name || product.brand,
            title: product.name,
            price: parseFloat(product.newPrice),
            originalPrice: product.oldPrice
              ? parseFloat(product.oldPrice)
              : null,
            slug: product.slug,
            stock: product.stock,
            brand: product.brand,
            sku: product.sku,
            shortDescription: product.shortDescription,
            animation: "fadeInUp", // Default animation
            wowDelay: "0s",
          }));

          setProducts(transformedProducts);
        } else {
          throw new Error("Invalid API response format");
        }
      } catch (err) {
        console.error("Error fetching trending products:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingProducts();
  }, []);

  if (loading) {
    return (
      <section className="tf-sp-2">
        <div className="container">
          <div className="flat-title wow fadeInUp" data-wow-delay="0s">
            <h5 className="fw-semibold">Trending Products</h5>
          </div>
          <div>Loading...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="tf-sp-2">
        <div className="container">
          <div className="flat-title wow fadeInUp" data-wow-delay="0s">
            <h5 className="fw-semibold">Trending Products</h5>
          </div>
          <div>Error loading products. Please try again.</div>
        </div>
      </section>
    );
  }

  if (!products.length) {
    return (
      <section className="tf-sp-2">
        <div className="container">
          <div className="flat-title wow fadeInUp" data-wow-delay="0s">
            <h5 className="fw-semibold">Trending Products</h5>
          </div>
          <div>No trending products available.</div>
        </div>
      </section>
    );
  }

  return (
    <section className="tf-sp-2">
      <div className="container">
        <div className="flat-title wow fadeInUp" data-wow-delay="0s">
          <h5 className="fw-semibold">Trending Products</h5>
          <div className="box-btn-slide relative">
            <div className="swiper-button-prev nav-swiper nav-prev-products snbp40">
              <i className="icon-arrow-left-lg" />
            </div>
            <div className="swiper-button-next nav-swiper nav-next-products snbn40">
              <i className="icon-arrow-right-lg" />
            </div>
          </div>
        </div>
        <Swiper
          className="swiper tf-sw-products"
          breakpoints={{
            0: { slidesPerView: 2 },
            575: {
              slidesPerView: 3,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            992: {
              slidesPerView: 5,
              spaceBetween: 30,
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
            el: ".spd40",
          }}
          navigation={{
            prevEl: ".snbp40",
            nextEl: ".snbn40",
          }}
        >
          {products.map((product) => (
            <SwiperSlide key={product.id} className="swiper-slide">
              <div
                className={`card-product ${
                  product.animation
                    ? `style-img-border wow ${product.animation}`
                    : "style-small style-img-border"
                }`}
                {...(product.wowDelay
                  ? { "data-wow-delay": product.wowDelay }
                  : {})}
              >
                <div className="card-product-wrapper">
                  {/* Main product image - clickable */}
                  <Link
                    href={`/product-detail/${product.id}`}
                    className="product-img"
                  >
                    <Image
                      className="img-product lazyload"
                      src={product.imgSrc}
                      alt={product.title || "Product image"}
                      width={product.width}
                      height={product.height}
                    />
                    <Image
                      className="img-hover lazyload"
                      src={product.imgHover}
                      alt={product.title || "Product hover image"}
                      width={product.width}
                      height={product.height}
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
                  </ul>
                </div>
                <div className="card-product-info">
                  <div className="box-title">
                    <div className="d-flex flex-column">
                      <p className="caption text-main-2 font-2">
                        {product.category}
                      </p>
                      {/* Product title - also clickable */}
                      <Link
                        href={`/product-detail/${product.id}`}
                        className="name-product body-md-2 fw-semibold text-secondary link"
                      >
                        {product.title}
                      </Link>
                    </div>
                    <p className="price-wrap fw-medium">
                      <span className="new-price price-text fw-medium">
                        ₹{product.price.toFixed(2)}
                      </span>
                      {product.originalPrice &&
                        product.originalPrice > product.price && (
                          <span className="old-price text-decoration-line-through text-muted ms-2">
                            ₹{product.originalPrice.toFixed(2)}
                          </span>
                        )}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
          <div className="d-flex d-lg-none sw-dot-default sw-pagination-products justify-content-center spd40" />
        </Swiper>
      </div>
    </section>
  );
}
