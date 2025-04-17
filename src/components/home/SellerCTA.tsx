
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const SellerCTA = () => {
  return (
    <section className="py-16">
      <div className="container">
        <div className="rounded-xl overflow-hidden">
          <div className="bg-gradient-to-r from-worldsell-orange-400 to-worldsell-blue-500 p-8 md:p-12 lg:p-16 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full transform translate-x-1/3 -translate-y-1/3"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full transform -translate-x-1/3 translate-y-1/3"></div>
            
            <div className="relative max-w-3xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Start Selling on WorldSell Today</h2>
              <p className="text-lg md:text-xl mb-8 text-white/90 max-w-xl">
                Join thousands of successful entrepreneurs selling to millions of customers across Africa. Start your business with zero upfront costs.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 max-w-2xl">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-2xl font-bold">10M+</div>
                  <div className="text-white/90">Active Shoppers</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-2xl font-bold">50k+</div>
                  <div className="text-white/90">Successful Sellers</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-2xl font-bold">35+</div>
                  <div className="text-white/90">African Countries</div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="bg-white text-worldsell-orange-500 hover:bg-white/90">
                  <Link to="/sell">Start Selling</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  <Link to="/seller-guide">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SellerCTA;
