
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductsHeader from "@/components/products/ProductsHeader";
import ProductGrid from "@/components/products/ProductGrid";
import ProductFilters from "@/components/products/ProductFilters";
import ProductCategoryNav from "@/components/products/ProductCategoryNav";
import NewsletterSection from "@/components/home/NewsletterSection";

const Products = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <ProductsHeader />
        <div className="container py-8">
          <ProductCategoryNav />
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8">
            <div className="lg:col-span-1">
              <ProductFilters />
            </div>
            <div className="lg:col-span-3">
              <ProductGrid />
            </div>
          </div>
        </div>
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
};

export default Products;
