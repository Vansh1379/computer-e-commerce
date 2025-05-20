import Banner2 from "@/components/common/Banner2";
import Features from "@/components/common/Features";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Topbar1 from "@/components/headers/Topbar1";
import Hero from "@/components/homes/home-3/Hero";
import Products1 from "@/components/homes/home-3/Products1";
import Products from "@/components/homes/home-4/Products";
import Products5 from "@/components/homes/home-3/Products5";
import Products6 from "@/components/homes/home-3/LeftSideBannerProduct";

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
      <Products1 />
      <Banner2 />
      <Products />
      <Banner2 />
      <Products6 />
      <Products5 />
      <Features />
      <Footer1 />
    </>
  );
}
