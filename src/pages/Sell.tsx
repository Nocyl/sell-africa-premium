
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/shared/PageHeader";
import SellerFeatures from "@/components/seller/SellerFeatures";
import SellerPricing from "@/components/seller/SellerPricing";
import SellerTestimonials from "@/components/seller/SellerTestimonials";
import SellerRegisterCTA from "@/components/seller/SellerRegisterCTA";
import SellerFAQ from "@/components/seller/SellerFAQ";

const Sell = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <PageHeader 
          title="Vendez sur WorldSell" 
          description="Lancez votre business en ligne et atteignez des millions de clients à travers l'Afrique."
          bgColor="bg-gradient-to-r from-worldsell-orange-400/20 to-worldsell-blue-500/20"
          showButton
          buttonText="Commencer maintenant"
          buttonLink="#register"
        />
        <SellerFeatures />
        <SellerPricing />
        <SellerTestimonials />
        <SellerRegisterCTA />
        <SellerFAQ />
      </main>
      <Footer />
    </div>
  );
};

export default Sell;
