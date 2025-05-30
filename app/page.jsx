'use client';

import { useState, useEffect } from 'react';
import Banner2 from "@/components/common/Banner2";
import BrandsSlider from "@/components/common/BrandsSlider";
import CatageoryHome from "@/components/common/Catageory-Home";
import Features from "@/components/common/Features";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Topbar1 from "@/components/headers/Topbar1";
import Hero from "@/components/homes/home-3/Hero";
import Products6 from "@/components/homes/home-3/LeftSideBannerProduct";
import Products1 from "@/components/homes/home-3/Products1";
import Products5 from "@/components/homes/home-3/Products5";
import Products7 from "@/components/homes/home-3/RightSideBannerProducts";
import Products from "@/components/homes/home-4/Products";
import BannerService, { getBannersByPosition } from "@/service/bannerService";

export default function Home() {
  const [allBanners, setAllBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const bannerResponse = await BannerService.getAllBanners({
          isActive: true,
          limit: 10
        });
        console.log("bannerResponse", bannerResponse);
        setAllBanners(bannerResponse.banners || []);
      } catch (error) {
        console.error('Error fetching banners:', error);
        setAllBanners([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Or your loading component
  }

  // Filter banners by position
  const leftBanners = getBannersByPosition(allBanners, 'home_left_one');
  const rightTwoBanners = getBannersByPosition(allBanners, 'home_right_two');
  const rightThreeBanners = getBannersByPosition(allBanners, 'home_right_three');
  const midOneBanners = getBannersByPosition(allBanners, 'home_mid_one');
  const midTwoBanners = getBannersByPosition(allBanners, 'home_mid_two');
  const lowMidOneBanners = getBannersByPosition(allBanners, 'home_low_mid_one');
  const lowMidTwoBanners = getBannersByPosition(allBanners, 'home_low_mid_two');
  const rightOneBanners = getBannersByPosition(allBanners, 'home_right_one');

  return (
    <>
      <Topbar1 parentClass="tf-topbar" />
      <Header1 />
      <Hero leftBanners={leftBanners} rightTwoBanners={rightTwoBanners} rightThreeBanners={rightThreeBanners} />
      <Products1 />
      <Banner2 banners={midOneBanners} />
      <Products />
      <Products6 banners={leftBanners} />
      <Banner2 banners={midTwoBanners} />
      <Products5 />
      <CatageoryHome />
      <Products7 />
      <Features />
      <BrandsSlider />
      <Footer1 />
    </>
  );
}