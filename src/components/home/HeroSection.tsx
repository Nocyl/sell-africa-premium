
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="hero-gradient relative overflow-hidden py-16 md:py-24">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Africa's Premium Marketplace
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-md">
              Buy and sell digital products, physical goods, and online courses
              with localized payment solutions across Africa.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-worldsell-orange-400 hover:bg-worldsell-orange-500">
                <Link to="/products">Shop Now</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-worldsell-blue-500 text-worldsell-blue-500 hover:bg-worldsell-blue-50">
                <Link to="/sell">Start Selling</Link>
              </Button>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-green-500"></div>
                <span>Secure Payments</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                <span>Fast Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-orange-500"></div>
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
          <div className="relative hidden lg:block">
            <div className="absolute -top-16 -right-16 w-64 h-64 bg-worldsell-orange-400/10 rounded-full"></div>
            <div className="absolute bottom-0 -left-8 w-40 h-40 bg-worldsell-blue-500/10 rounded-full"></div>
            <div className="relative z-10 grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-white rounded-lg shadow-lg p-4 transform translate-y-8 product-card">
                  <div className="bg-gray-100 rounded aspect-square mb-3"></div>
                  <h3 className="font-medium">Digital Products</h3>
                  <p className="text-sm text-muted-foreground">Instant delivery</p>
                </div>
                <div className="bg-white rounded-lg shadow-lg p-4 transform translate-x-4 product-card">
                  <div className="bg-gray-100 rounded aspect-square mb-3"></div>
                  <h3 className="font-medium">Online Courses</h3>
                  <p className="text-sm text-muted-foreground">Learn new skills</p>
                </div>
              </div>
              <div className="space-y-4 pt-12">
                <div className="bg-white rounded-lg shadow-lg p-4 product-card">
                  <div className="bg-gray-100 rounded aspect-square mb-3"></div>
                  <h3 className="font-medium">Physical Goods</h3>
                  <p className="text-sm text-muted-foreground">Across Africa</p>
                </div>
                <div className="bg-white rounded-lg shadow-lg p-4 transform translate-y-4 product-card">
                  <div className="bg-gray-100 rounded aspect-square mb-3"></div>
                  <h3 className="font-medium">Local Support</h3>
                  <p className="text-sm text-muted-foreground">24/7 assistance</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
