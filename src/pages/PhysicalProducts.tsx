
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/shared/PageHeader";
import ProductGrid from "@/components/products/ProductGrid";
import ProductFilters from "@/components/products/ProductFilters";
import NewsletterSection from "@/components/home/NewsletterSection";

const PhysicalProducts = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <PageHeader 
          title="Physical Products" 
          description="Explorez notre catalogue de produits physiques - livrés rapidement partout en Afrique."
          bgColor="bg-worldsell-orange-50"
        />
        <div className="container py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <ProductFilters type="physical" />
            </div>
            <div className="lg:col-span-3">
              <ProductGrid type="physical" />
            </div>
          </div>
        </div>
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
};

export default PhysicalProducts;
