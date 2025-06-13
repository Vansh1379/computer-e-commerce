"use client";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import Image from "next/image";
import { Pagination } from "swiper/modules";

// API base URL
const API_BASE_URL = "https://unique.rightinfoservice.com";

// Function to fetch banners by position
async function fetchBannersByPosition(position) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/banners/position/${position}`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch banners for position: ${position}`);
    }

    const data = await response.json();
    return data.success ? data.banners : [];
  } catch (error) {
    console.error(`Error fetching banners for position ${position}:`, error);
    return [];
  }
}

export default function Banner2() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        // Fetch banners for both positions
        const [midOneBanners, midTwoBanners] = await Promise.all([
          fetchBannersByPosition("home_mid_one"),
          fetchBannersByPosition("home_mid_two"),
        ]);

        // Combine banners from both positions
        const allBanners = [...(midOneBanners || []), ...(midTwoBanners || [])];

        setBanners(allBanners);
      } catch (error) {
        console.error("Error fetching banners:", error);
        // Set fallback banners if API fails
        setBanners(getFallbackBanners());
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  // Fallback banners if API fails or no banners available
  const getFallbackBanners = () => [
    {
      id: "fallback-1",
      title: "Lenovo ThinkBook",
      subtitle: "8GB/MX450 2GB",
      imageUrl: "/images/item/laptop.png",
      backgroundImage: "/images/banner/banner-3.jpg",
      linkUrl: "/shop-default",
      price: "₹399",
      priceLabel: "From",
    },
    {
      id: "fallback-2",
      title: "ThinkPad X1 Carbon Gen 9",
      subtitle: "4K HDR-Core i7 32GB",
      imageUrl: "/images/item/camera-1.png",
      backgroundImage: "/images/banner/banner-4.jpg",
      linkUrl: "/shop-default",
      price: "₹1,399",
      priceLabel: "From",
    },
  ];

  // Helper function to get image source
  const getImageSrc = (banner, fallbackImage) => {
    if (banner?.imageUrl) {
      return banner.imageUrl.startsWith("/")
        ? `${API_BASE_URL}${banner.imageUrl}`
        : banner.imageUrl;
    }
    return fallbackImage;
  };

  // Helper function to get background image
  const getBackgroundImage = (banner, fallbackBg) => {
    if (banner?.backgroundImage) {
      const bgUrl = banner.backgroundImage.startsWith("/")
        ? `${API_BASE_URL}${banner.backgroundImage}`
        : banner.backgroundImage;
      return `url("${bgUrl}")`;
    }
    return `url("${fallbackBg}")`;
  };

  // Helper function to get link URL
  const getLinkUrl = (banner) => {
    if (banner?.linkUrl) {
      return banner.linkUrl;
    }
    if (banner?.category?.slug) {
      return `/category/${banner.category.slug}`;
    }
    return "/shop-default";
  };

  // Use fallback banners if no API banners or still loading
  const displayBanners = banners.length > 0 ? banners : getFallbackBanners();

  if (loading) {
    return (
      <section>
        <div className="container">
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "300px" }}
          >
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="container">
        <Swiper
          className="swiper tf-sw-categories overflow-xxl-visible"
          spaceBetween={15}
          breakpoints={{
            0: { slidesPerView: 1 },
            575: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            992: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            1200: {
              slidesPerView: 2,
            },
          }}
          modules={[Pagination]}
          pagination={{
            clickable: true,
            el: ".spd1",
          }}
        >
          {displayBanners.map((banner, index) => (
            <SwiperSlide
              key={banner.id || `banner-${index}`}
              className="swiper-slide"
            >
              <Link
                href={getLinkUrl(banner)}
                className={`banner-image-product-2 ${
                  index % 2 === 1 ? "style-2" : ""
                } type-sp-2 hover-img d-block`}
              >
                <div
                  className={`item-image img-style overflow-visible ${
                    index % 2 === 0 ? "position2" : "position3"
                  }`}
                >
                  <Image
                    src={getImageSrc(
                      banner,
                      index % 2 === 0
                        ? "/images/item/laptop.png"
                        : "/images/item/camera-1.png"
                    )}
                    alt={banner.title || "Product Banner"}
                    className="lazyload"
                    width={index % 2 === 0 ? 239 : 231}
                    height={index % 2 === 0 ? 227 : 230}
                  />
                </div>
                <div
                  className="item-banner has-bg-img"
                  style={{
                    backgroundImage: getBackgroundImage(
                      banner,
                      index % 2 === 0
                        ? "/images/banner/banner-3.jpg"
                        : "/images/banner/banner-4.jpg"
                    ),
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <div
                    className={`inner ${
                      index % 2 === 0 ? "justify-content-xl-end" : ""
                    }`}
                  >
                    <div className="box-sale-wrap type-3 relative">
                      <p className="small-text">
                        {banner.priceLabel || "From"}
                      </p>
                      <p className="main-title-2">{banner.price || "₹399"}</p>
                    </div>
                    <h4
                      className={`name fw-normal text-white lh-lg-38 ${
                        index % 2 === 0
                          ? "text-xl-end"
                          : "text-xxl-center text-line-clamp-2"
                      }`}
                    >
                      {banner.title || "Product Title"}
                      <br className="d-none d-sm-block" />
                      <span className="fw-bold">
                        {banner.subtitle || "Product Subtitle"}
                      </span>
                    </h4>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}

          <div className="sw-dot-default sw-pagination-categories justify-content-center spd1" />
        </Swiper>
      </div>
    </section>
  );
}
