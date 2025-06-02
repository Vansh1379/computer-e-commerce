import Banner2 from "@/components/common/Banner2";
import Features from "@/components/common/Features";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Topbar1 from "@/components/headers/Topbar1";
import Hero from "@/components/homes/home-3/Hero";
import DealOfTheDay from "@/components/homes/home-3/DealOfTheDay";
import Products from "@/components/homes/home-4/Products";
import Products5 from "@/components/homes/home-3/Products5";
import Products6 from "@/components/homes/home-3/LeftSideBannerProduct";
import Products7 from "@/components/homes/home-3/RightSideBannerProducts";
import BrandsSlider from "@/components/common/BrandsSlider";
import CatageoryHome from "@/components/common/Catageory-Home";

export const metadata = {
  title: "Home || Onsus - Multipurpose React Nextjs eCommerce",
  description: "Onsus - Multipurpose React Nextjs eCommerce",
};
export default function Home() {
  return (
    <>
      <Topbar1 parentClass="tf-topbar" />
      <Header1 />
      <Hero />
      <DealOfTheDay />
      <Banner2 />
      <Products />
      <Products6 />
      <Banner2 />
      <Products5 />
      <CatageoryHome />
      <Products7 />
      <Features />
      <BrandsSlider />
      <Footer1 />
    </>
  );
}
