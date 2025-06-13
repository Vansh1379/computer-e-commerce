import React from "react";
import Link from "next/link";
import Image from "next/image";
// Fallback images
import intel from "../../../public/images/hero/hero1.jpg";
import controller from "../../../public/images/hero/controller.jpg";
import headphone from "../../../public/images/hero/headphone.jpg";

// API base URL
const API_BASE_URL = "https://unique.rightinfoservice.com";

// Function to fetch banners by position
async function fetchBannersByPosition(position) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/banners/position/${position}`,
      {
        cache: "no-store", // This ensures fresh data on each request
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

export default async function Hero() {
  // Fetch banners for all three positions
  const [leftBanners, rightTwoBanners, rightThreeBanners] = await Promise.all([
    fetchBannersByPosition("home_left_one"),
    fetchBannersByPosition("home_right_two"),
    fetchBannersByPosition("home_right_three"),
  ]);

  // Get the first banner from each position, or use fallback data
  const leftBanner = leftBanners[0];
  const rightTwoBanner = rightTwoBanners[0];
  const rightThreeBanner = rightThreeBanners[0];

  // Helper function to get image source
  const getImageSrc = (banner, fallbackImage) => {
    if (banner?.imageUrl) {
      // Check if imageUrl starts with '/' (relative path from backend)
      return banner.imageUrl.startsWith("/")
        ? `${API_BASE_URL}${banner.imageUrl}`
        : banner.imageUrl;
    }
    return fallbackImage;
  };

  // Helper function to get link URL
  const getLinkUrl = (banner, fallbackSlug) => {
    // Priority: linkUrl > category slug > fallback
    if (banner?.linkUrl) {
      return banner.linkUrl;
    }
    if (banner?.category?.slug) {
      return `/category/${banner.category.slug}`;
    }
    return `/category/${fallbackSlug}`;
  };

  return (
    <section className="py-5" style={{ minHeight: "100vh" }}>
      <div
        className="container-fluid px-4 position-relative"
        style={{ zIndex: 1 }}
      >
        <div className="row g-4 h-100">
          {/* Left Banner - 8 columns */}
          <div className="col-12 col-lg-9">
            <Link
              href={getLinkUrl(leftBanner, "processors")}
              className="d-block h-100 position-relative overflow-hidden rounded-4 shadow-lg text-decoration-none"
              style={{
                minHeight: "450px",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              <Image
                src={getImageSrc(leftBanner, intel)}
                alt={leftBanner?.title || "Product Banner"}
                fill
                className="object-cover transition-transform duration-500 hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 800px"
                quality={90}
              />
              <div className="position-absolute top-0 start-0 w-100 h-100 bg-gradient-to-br from-transparent via-black/10 to-black/30 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>

              {/* Text overlay for banner content */}
              {leftBanner && (
                <div className="position-absolute bottom-0 start-0 p-4 text-white">
                  <h2 className="h3 mb-2 fw-bold">{leftBanner.title}</h2>
                  {leftBanner.subtitle && (
                    <p className="mb-0 opacity-90">{leftBanner.subtitle}</p>
                  )}
                </div>
              )}
            </Link>
          </div>

          {/* Right Side Banners - 4 columns */}
          <div className="col-12 col-lg-3">
            <div className="row g-4 h-100">
              {/* Top Right Banner */}
              <div className="col-12 col-md-6 col-lg-12">
                <Link
                  href={getLinkUrl(rightTwoBanner, "gaming")}
                  className="d-block h-100 position-relative overflow-hidden rounded-4 shadow-lg text-decoration-none"
                  style={{
                    minHeight: "210px",
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                >
                  <Image
                    src={getImageSrc(rightTwoBanner, controller)}
                    alt={rightTwoBanner?.title || "Gaming Banner"}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                    quality={90}
                  />
                  <div className="position-absolute top-0 start-0 w-100 h-100 bg-gradient-to-br from-transparent via-black/10 to-black/30 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Text overlay for banner content */}
                  {rightTwoBanner && (
                    <div className="position-absolute bottom-0 start-0 p-3 text-white">
                      <h3 className="h5 mb-1 fw-bold">
                        {rightTwoBanner.title}
                      </h3>
                      {rightTwoBanner.subtitle && (
                        <p className="small mb-0 opacity-90">
                          {rightTwoBanner.subtitle}
                        </p>
                      )}
                    </div>
                  )}
                </Link>
              </div>

              {/* Bottom Right Banner */}
              <div className="col-12 col-md-6 col-lg-12">
                <Link
                  href={getLinkUrl(rightThreeBanner, "audio")}
                  className="d-block h-100 position-relative overflow-hidden rounded-4 shadow-lg text-decoration-none"
                  style={{
                    minHeight: "210px",
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                >
                  <Image
                    src={getImageSrc(rightThreeBanner, headphone)}
                    alt={rightThreeBanner?.title || "Audio Banner"}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                    quality={90}
                  />
                  <div className="position-absolute top-0 start-0 w-100 h-100 bg-gradient-to-br from-transparent via-black/10 to-black/30 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Text overlay for banner content */}
                  {rightThreeBanner && (
                    <div className="position-absolute bottom-0 start-0 p-3 text-white">
                      <h3 className="h5 mb-1 fw-bold">
                        {rightThreeBanner.title}
                      </h3>
                      {rightThreeBanner.subtitle && (
                        <p className="small mb-0 opacity-90">
                          {rightThreeBanner.subtitle}
                        </p>
                      )}
                    </div>
                  )}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
