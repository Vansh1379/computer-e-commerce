"use client";
import { products47 } from "@/data/products";
import React from "react";
import { Grid } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import Image from "next/image";
import AddToCart from "@/components/common/AddToCart";
import AddToWishlist from "@/components/common/AddToWishlist";
import AddToQuickview from "@/components/common/AddToQuickview";
import AddToCompare from "@/components/common/AddToCompare";
export default function Products3() {
  return (
    <section className="tf-sp-2">
      <div className="container">
        <div className="flat-title wow fadeInUp" data-wow-delay="0s">
          <h5 className="fw-semibold">Activity Trackers And Smartwatches</h5>
          <div className="box-btn-slide relative">
            <div className="swiper-button-prev nav-swiper nav-prev-products">
              <i className="icon-arrow-left-lg" />
            </div>
            <div className="swiper-button-next nav-swiper nav-next-products">
              <i className="icon-arrow-right-lg" />
            </div>
          </div>
        </div>
        <div className="slider-wrap style-2">
          <div
            className="width-item-1 d-none d-xl-block wow fadeInLeft"
            data-wow-delay="0s"
          >
            <div className="banner-product-3 hover-img">
              <Link href={`/shop-default`} className="image img-style h-100">
                <Image
                  src="/images/section/product-15.jpg"
                  alt=""
                  className="lazyload"
                  width={600}
                  height={975}
                />
              </Link>
              <div className="content">
                <div className="d-flex">
                  <p className="tag body-md-2 fw-bold">Baseus</p>
                </div>
                <div className="box-title">
                  <Link
                    href={`/shop-default`}
                    className="name main-title-3 fw-bold link"
                  >
                    20W Charging Speed For <br className="d-none d-xxl-block" />
                    New Apple
                  </Link>
                  <p className="sub title-sidebar-2 fw-semibold">
                    It Supports PD 20W High
                    <br className="d-none d-xxl-block" />
                    Power Output
                  </p>
                </div>
              </div>
            </div>
          </div>
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
            modules={[Grid]}
          >
            {products47.map((product) => (
              <SwiperSlide className="swiper-slide" key={product.id}>
                <div
                  className="card-product style-small style-img-border wow fadeInUp"
                  data-wow-delay={product.delay}
                >
                  <div className="card-product-wrapper">
                    <Link
                      href={`/product-detail/${product.id}`}
                      className="product-img"
                    >
                      <Image
                        className="img-product lazyload"
                        src={product.imgSrc}
                        data-src={product.imgSrc}
                        alt="image-product"
                        width={500}
                        height={500}
                      />
                      <Image
                        className="img-hover lazyload"
                        src={product.imgHover}
                        data-src={product.imgHover}
                        alt="image-product"
                        width={500}
                        height={500}
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
                          {product.category}
                        </p>
                        <Link
                          href={`/product-detail/${product.id}`}
                          className="name-product body-md-2 fw-semibold text-secondary link"
                        >
                          {product.title}
                        </Link>
                      </div>
                      <p className="price-wrap fw-medium">
                        <span className="new-price price-text fw-medium mb-0">
                          ${product.price.toFixed(3)}
                        </span>
                        <span className="old-price body-md-2 text-main-2 fw-normal">
                          ${product.oldPrice.toFixed(3)}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
            <div className="d-flex d-lg-none sw-dot-default sw-pagination-products justify-content-center" />
          </Swiper>
        </div>
      </div>
    </section>
  );
}
