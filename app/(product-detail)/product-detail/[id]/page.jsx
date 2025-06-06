import Footer1 from "@/components/footers/Footer1";
import Header4 from "@/components/headers/Header4";
import Description from "@/components/product-detail/Description";
import Details1 from "@/components/product-detail/Details1";
import Relatedproducts from "@/components/product-detail/Relatedproducts";
import SimilerProducts from "@/components/product-detail/SimilerProducts";
import React from "react";
import Link from "next/link";

export const metadata = {
  title: "Product Details || Onsus - Multipurpose React Nextjs eCommerce",
  description: "Onsus - Multipurpose React Nextjs eCommerce",
};

// Function to fetch product details from API
async function fetchProductDetails(id) {
  try {
    const response = await fetch(
      `https://unique.rightinfoservice.com/api/products/id/${id}`,
      {
        cache: "no-store", // Ensure fresh data on each request
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.success && data.product) {
      const product = data.product;

      // Parse specifications
      let specifications = {};
      try {
        const specs = JSON.parse(product.specifications);
        specs.forEach((spec) => {
          specifications[spec.key] = spec.value;
        });
      } catch (e) {
        console.warn(
          `Failed to parse specifications for product ${product.id}:`,
          e
        );
      }

      // Calculate sale percentage
      const oldPrice = parseFloat(product.oldPrice);
      const newPrice = parseFloat(product.newPrice);
      const salePercentage =
        oldPrice > 0 ? Math.round(((oldPrice - newPrice) / oldPrice) * 100) : 0;

      // Transform API response to match component structure
      return {
        id: product.id,
        title: product.name,
        category: product.category?.name || "Electronics",
        price: newPrice,
        oldPrice: oldPrice,
        salePercentage: salePercentage,
        available: product.stock || 0,
        imgSrc:
          product.images && product.images[0]
            ? `https://unique.rightinfoservice.com${product.images[0]}`
            : "/images/products/default-product.jpg",
        images: product.images
          ? product.images.map(
              (img) => `https://unique.rightinfoservice.com${img}`
            )
          : ["/images/products/default-product.jpg"],
        brand: product.brand,
        sku: product.sku,
        shortDescription: product.shortDescription,
        longDescription: product.longDescription,
        specifications: specifications,
        width: 360,
        height: 360,
      };
    } else {
      throw new Error("Invalid API response structure");
    }
  } catch (error) {
    console.error("Error fetching product details:", error);
    return null;
  }
}

export default async function ProductDetailPage({ params }) {
  const { id } = await params;

  // Fetch product details from API
  const product = await fetchProductDetails(id);

  // If product not found, show error page or redirect
  if (!product) {
    return (
      <>
        <Header4 />
        <div className="tf-sp-1">
          <div className="container">
            <div className="text-center py-5">
              <h2>Product Not Found</h2>
              <p>
                The product you're looking for doesn't exist or has been
                removed.
              </p>
              <Link href="/" className="tf-btn">
                Go Back to Home
              </Link>
            </div>
          </div>
        </div>
        <Footer1 />
      </>
    );
  }

  return (
    <>
      <Header4 />
      <div className="tf-sp-1">
        <div className="container">
          <ul className="breakcrumbs">
            <li>
              <Link href={`/`} className="body-small link">
                Home
              </Link>
            </li>
            <li className="d-flex align-items-center">
              <i className="icon icon-arrow-right" />
            </li>
            <li>
              <Link href={`/product-grid`} className="body-small link">
                Shop
              </Link>
            </li>
            <li className="d-flex align-items-center">
              <i className="icon icon-arrow-right" />
            </li>
            <li>
              <span className="body-small">Product Detail</span>
            </li>
          </ul>
        </div>
      </div>
      <Details1 product={product} />
      <Description product={product} />
      <SimilerProducts />
      <Relatedproducts />
      <Footer1 />
    </>
  );
}
