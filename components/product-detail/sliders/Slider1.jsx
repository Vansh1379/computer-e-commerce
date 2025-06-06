"use client";
import React, { useState } from "react";
import Image from "next/image";

export default function Slider1({ firstImage, images = [] }) {
  const [currentImage, setCurrentImage] = useState(0);

  // Use provided images array, or fallback to firstImage
  const imageList = images.length > 0 ? images : [firstImage];

  const handleImageError = (e) => {
    e.target.src = "/images/products/default-product.jpg";
  };

  return (
    <div className="tf-product-media-thumbs">
      {/* Main Image Display */}
      <div className="tf-product-media-main">
        <Image
          className="img-main lazyload"
          src={imageList[currentImage] || firstImage}
          alt="product-image"
          width={600}
          height={600}
          onError={handleImageError}
          priority
        />
      </div>

      {/* Thumbnail Navigation - Only show if multiple images */}
      {imageList.length > 1 && (
        <div className="tf-product-media-thumbs-list">
          {imageList.map((image, index) => (
            <div
              key={index}
              className={`tf-product-media-thumbs-item ${
                currentImage === index ? "active" : ""
              }`}
              onClick={() => setCurrentImage(index)}
            >
              <Image
                src={image}
                alt={`product-thumbnail-${index}`}
                width={120}
                height={120}
                onError={handleImageError}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
