import React from "react";
import Link from "next/link";
import Image from "next/image";
// Fallback images
import intel from "../../../public/images/hero/hero1.jpg";
import controller from "../../../public/images/hero/controller.jpg";
import headphone from "../../../public/images/hero/headphone.jpg";

export default function Hero({
  leftBanners = [],
  rightTwoBanners = [],
  rightThreeBanners = [],
}) {
  // Get the first banner from each position, or use fallback data
  const leftBanner = leftBanners[0];
  const rightTwoBanner = rightTwoBanners[0];
  const rightThreeBanner = rightThreeBanners[0];

  // Helper function to get image source
  const getImageSrc = (banner, fallbackImage) => {
    if (banner?.imageUrl) {
      return banner.imageUrl.startsWith("/")
        ? `${
            process.env.NEXT_PUBLIC_API_URL?.replace("/api", "") ||
            "http://localhost:4000"
          }${banner.imageUrl}`
        : banner.imageUrl;
    }
    return fallbackImage;
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
              href={`/category/${leftBanner?.category?.slug || "processors"}`}
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
            </Link>
          </div>

          {/* Right Side Banners - 4 columns */}
          <div className="col-12 col-lg-3">
            <div className="row g-4 h-100">
              {/* Top Right Banner */}
              <div className="col-12 col-md-6 col-lg-12">
                <Link
                  href={`/category/${
                    rightTwoBanner?.category?.slug || "gaming"
                  }`}
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
                </Link>
              </div>

              {/* Bottom Right Banner */}
              <div className="col-12 col-md-6 col-lg-12">
                <Link
                  href={`/category/${
                    rightThreeBanner?.category?.slug || "audio"
                  }`}
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
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
