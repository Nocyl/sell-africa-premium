
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/shared/PageHeader";
import ProductGrid from "@/components/products/ProductGrid";
import ProductFilters from "@/components/products/ProductFilters";
import NewsletterSection from "@/components/home/NewsletterSection";

const DigitalProducts = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <PageHeader 
          title="Digital Products" 
          description="Découvrez notre sélection de produits numériques, templates, logiciels et plus encore - livraison instantanée."
          bgColor="bg-worldsell-blue-50"
        />
        <div className="container py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <ProductFilters type="digital" />
            </div>
            <div className="lg:col-span-3">
              <ProductGrid type="digital" />
            </div>
          </div>
        </div>
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
};

export default DigitalProducts;
