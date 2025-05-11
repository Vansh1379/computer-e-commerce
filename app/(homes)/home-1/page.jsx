import Header1 from "@/components/headers/Header1";
import Topbar1 from "@/components/headers/Topbar1";

export const metadata = {
  title: "Home 02 || Onsus - Multipurpose React Nextjs eCommerce",
  description: "Onsus - Multipurpose React Nextjs eCommerce",
};

export default function page() {
  return (
    <>
      <Topbar1 parentClass="tf-topbar" />
      <Header1 />
    </>
  );
}
