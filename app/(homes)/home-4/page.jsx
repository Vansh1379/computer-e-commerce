import BrandsSlider from "@/components/common/BrandsSlider";
import Features2 from "@/components/common/Features2";
import Product3 from "@/components/common/Product3";
import Products2 from "@/components/common/Products2";
import RecentProducts from "@/components/common/RecentProducts";
import Footer1 from "@/components/footers/Footer1";
import Header4 from "@/components/headers/Header4";
import Banner from "@/components/homes/home-4/Banner";
import Categories from "@/components/homes/home-4/Categories";
import Hero from "@/components/homes/home-4/Hero";
import Products from "@/components/homes/Home/TrendingProducts";
import Product2 from "@/components/homes/home-4/Products2";
import React from "react";

export const metadata = {
  title: "Home 04 || Onsus - Multipurpose React Nextjs eCommerce",
  description: "Onsus - Multipurpose React Nextjs eCommerce",
};
export default function page() {
  return (
    <>
      <Header4 />
      <Hero />
      <Categories />
      <BrandsSlider />
      <Products />
      <Product3 />
      <BrandsSlider typeClass="type-sp-2" fullWidth />
      <Product2 />

      <Banner />
      <Products2 parentClass="tf-sp-2" />
      <RecentProducts parentClass="tf-sp-2 pt-0" />
      <Features2 />
      <Footer1 />
    </>
  );
}
