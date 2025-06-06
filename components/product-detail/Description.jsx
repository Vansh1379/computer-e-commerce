"use client";

import React from "react";
import Image from "next/image";

export default function Description({ product }) {
  if (!product) {
    return null;
  }

  const {
    longDescription,
    shortDescription,
    specifications = {},
    brand,
    sku,
    category,
    stock,
    createdAt,
    reviewStats = {},
  } = product;

  const {
    totalReviews = 0,
    averageRating = 0,
    ratingDistribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
  } = reviewStats;

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Calculate rating percentages
  const calculateRatingPercentage = (rating) => {
    if (totalReviews === 0) return 0;
    return Math.round((ratingDistribution[rating] / totalReviews) * 100);
  };

  // Render stars based on rating
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <li key={i}>
          <i
            className={`icon-star ${
              i <= Math.floor(rating) ? "" : "text-main-4"
            }`}
          />
        </li>
      );
    }
    return stars;
  };

  // Handle scroll to review form
  const handleWriteReview = (e) => {
    e.preventDefault();
    // Scroll to review form or trigger form focus
    const reviewForm = document.querySelector(
      '.form-add-comment input[type="text"]'
    );
    if (reviewForm) {
      reviewForm.focus();
      reviewForm.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <section className="tf-sp-4">
      <div className="container">
        <div className="flat-animate-tab flat-title-tab-product-des">
          <div className="flat-title-tab text-center">
            <ul className="menu-tab-line" role="tablist">
              <li className="nav-tab-item" role="presentation">
                <a
                  href="#prd-des"
                  className="tab-link product-title fw-semibold active"
                  data-bs-toggle="tab"
                >
                  Description
                </a>
              </li>
              <li className="nav-tab-item" role="presentation">
                <a
                  href="#prd-infor"
                  className="tab-link product-title fw-semibold"
                  data-bs-toggle="tab"
                >
                  Product Information
                </a>
              </li>
              <li className="nav-tab-item" role="presentation">
                <a
                  href="#prd-review"
                  className="tab-link product-title fw-semibold"
                  data-bs-toggle="tab"
                >
                  Reviews ({totalReviews})
                </a>
              </li>
            </ul>
          </div>
          <div className="tab-content">
            {/* Description Tab */}
            <div className="tab-pane active show" id="prd-des" role="tabpanel">
              <div className="tab-main tab-des">
                {shortDescription && (
                  <p className="body-text-3 fw-semibold text-primary mb-3">
                    {shortDescription}
                  </p>
                )}

                {longDescription ? (
                  <div className="description-content">
                    {longDescription.split("\n").map(
                      (paragraph, index) =>
                        paragraph.trim() && (
                          <p key={index} className="body-text-3 mb-3">
                            {paragraph.trim()}
                          </p>
                        )
                    )}
                  </div>
                ) : (
                  <p className="body-text-3">
                    This high-quality product offers exceptional performance and
                    reliability. Designed with precision and built to last, it
                    delivers outstanding value for both professional and
                    personal use. Experience the difference with this premium
                    product that combines innovative technology with
                    user-friendly design.
                  </p>
                )}

                {/* Product images can be added here if available */}
                {product.images && product.images.length > 1 && (
                  <div className="product-gallery mt-4">
                    <div className="row">
                      {product.images.slice(1, 3).map((image, index) => (
                        <div key={index} className="col-md-6 mb-3">
                          <div className="image">
                            <Image
                              src={image}
                              alt={`${product.title} - Image ${index + 2}`}
                              className="lazyload w-100"
                              width={450}
                              height={300}
                              style={{ objectFit: "cover" }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Product Information Tab */}
            <div className="tab-pane" id="prd-infor" role="tabpanel">
              <div className="tab-main tab-info">
                <ul className="list-feature">
                  {brand && (
                    <li>
                      <p className="name-feature">Brand</p>
                      <p className="property">{brand}</p>
                    </li>
                  )}
                  {sku && (
                    <li>
                      <p className="name-feature">SKU</p>
                      <p className="property">{sku}</p>
                    </li>
                  )}
                  {category?.name && (
                    <li>
                      <p className="name-feature">Category</p>
                      <p className="property">{category.name}</p>
                    </li>
                  )}
                  {stock !== undefined && (
                    <li>
                      <p className="name-feature">Stock Available</p>
                      <p className="property">{stock} units</p>
                    </li>
                  )}

                  {/* Dynamic specifications */}
                  {Object.entries(specifications).map(([key, value]) => (
                    <li key={key}>
                      <p className="name-feature">{key}</p>
                      <p className="property">{value}</p>
                    </li>
                  ))}

                  {createdAt && (
                    <li>
                      <p className="name-feature">Date First Available</p>
                      <p className="property">{formatDate(createdAt)}</p>
                    </li>
                  )}

                  {totalReviews > 0 && (
                    <li>
                      <p className="name-feature">Customer Reviews</p>
                      <div className="w-100 star-review flex-wrap">
                        <ul className="list-star">
                          {renderStars(averageRating)}
                        </ul>
                        <p className="caption text-main-2">
                          {averageRating.toFixed(1)} out of 5 - Reviews (
                          {totalReviews})
                        </p>
                      </div>
                    </li>
                  )}
                </ul>
              </div>
            </div>

            {/* Reviews Tab */}
            <div className="tab-pane" id="prd-review" role="tabpanel">
              <div className="tab-main tab-review flex-lg-nowrap">
                <div className="tab-rating-wrap">
                  <div className="rating-percent">
                    <p className="rate-percent">
                      {averageRating.toFixed(1)} <span>/ 5</span>
                    </p>
                    <ul className="list-star justify-content-center">
                      {renderStars(averageRating)}
                    </ul>
                    <p className="text-cl-3">
                      {totalReviews > 0
                        ? `Based on ${totalReviews} review${
                            totalReviews !== 1 ? "s" : ""
                          }`
                        : "No reviews yet"}
                    </p>
                  </div>

                  {totalReviews > 0 && (
                    <ul className="rating-progress-list">
                      {[5, 4, 3, 2, 1].map((rating) => (
                        <li key={rating}>
                          <p className="start-number body-text-3">
                            {rating}
                            <i className="icon-star text-third" />
                          </p>
                          <div className="rating-progress">
                            <div
                              className="progress style-2"
                              role="progressbar"
                              aria-label={`${rating} star reviews`}
                              aria-valuenow={calculateRatingPercentage(rating)}
                              aria-valuemin={0}
                              aria-valuemax={100}
                            >
                              <div
                                className="progress-bar"
                                style={{
                                  width: `${calculateRatingPercentage(
                                    rating
                                  )}%`,
                                }}
                              />
                            </div>
                          </div>
                          <p className="count-review body-text-3">
                            {ratingDistribution[rating] || 0}
                          </p>
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="rating-filter-wrap">
                    <p className="title-sidebar fw-bold">Filter by</p>
                    <ul className="rating-filter-list">
                      <li>
                        <a href="#" className="active">
                          All
                        </a>
                      </li>
                      {[5, 4, 3, 2, 1].map(
                        (rating) =>
                          ratingDistribution[rating] > 0 && (
                            <li key={rating}>
                              <a href="#">
                                {rating} star ({ratingDistribution[rating]})
                              </a>
                            </li>
                          )
                      )}
                    </ul>
                  </div>

                  <div className="add-comment-wrap">
                    <h5 className="fw-semibold">Add your review</h5>
                    <div>
                      <form action="#" className="form-add-comment">
                        <fieldset className="rate">
                          <label>Rating:</label>
                          <ul className="list-star justify-content-start">
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
                        </fieldset>
                        <fieldset>
                          <label>Name:</label>
                          <input type="text" placeholder="Your name" required />
                        </fieldset>
                        <fieldset>
                          <label>Email:</label>
                          <input
                            type="email"
                            placeholder="Your email"
                            required
                          />
                        </fieldset>
                        <fieldset className="align-items-sm-start">
                          <label>Review:</label>
                          <textarea
                            placeholder="Write your review here..."
                            rows={4}
                            defaultValue=""
                          />
                        </fieldset>
                        <div className="btn-submit">
                          <button
                            type="submit"
                            className="tf-btn btn-gray btn-large-2"
                          >
                            <span className="text-white">Submit Review</span>
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>

                <div className="tab-review-wrap">
                  {totalReviews > 0 ? (
                    <ul className="review-list">
                      {/* Reviews will be populated here when available from API */}
                      <li className="text-center py-4">
                        <p className="body-text-3 text-main-2">
                          Reviews will be displayed here when available.
                        </p>
                      </li>
                    </ul>
                  ) : (
                    <div className="text-center py-5">
                      <h5 className="fw-semibold mb-3">No Reviews Yet</h5>
                      <p className="body-text-3 text-main-2 mb-4">
                        Be the first to review this product and help others make
                        informed decisions.
                      </p>
                      <a
                        href="#"
                        className="tf-btn btn-primary"
                        onClick={handleWriteReview}
                      >
                        Write First Review
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
