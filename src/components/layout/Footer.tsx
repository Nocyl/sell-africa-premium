
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 pt-16 pb-12 border-t">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xl font-bold">
              <span className="text-worldsell-orange-400">World</span>
              <span className="text-worldsell-blue-500">Sell</span>
            </div>
            <p className="text-sm text-gray-600">
              The premium marketplace for Africa, connecting buyers with quality products
              and services across the continent.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-500 hover:text-worldsell-blue-500">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-worldsell-blue-500">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-worldsell-blue-500">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-worldsell-blue-500">
                <Youtube size={20} />
                <span className="sr-only">YouTube</span>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">Shop</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/digital" className="text-gray-600 hover:text-worldsell-orange-400">Digital Products</Link>
              </li>
              <li>
                <Link to="/physical" className="text-gray-600 hover:text-worldsell-orange-400">Physical Goods</Link>
              </li>
              <li>
                <Link to="/courses" className="text-gray-600 hover:text-worldsell-orange-400">Online Courses</Link>
              </li>
              <li>
                <Link to="/new" className="text-gray-600 hover:text-worldsell-orange-400">New Arrivals</Link>
              </li>
              <li>
                <Link to="/trending" className="text-gray-600 hover:text-worldsell-orange-400">Trending Products</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">Sell</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/sell" className="text-gray-600 hover:text-worldsell-orange-400">Start Selling</Link>
              </li>
              <li>
                <Link to="/seller-guide" className="text-gray-600 hover:text-worldsell-orange-400">Seller Guide</Link>
              </li>
              <li>
                <Link to="/sales-channels" className="text-gray-600 hover:text-worldsell-orange-400">Sales Channels</Link>
              </li>
              <li>
                <Link to="/seller-success" className="text-gray-600 hover:text-worldsell-orange-400">Success Stories</Link>
              </li>
              <li>
                <Link to="/fees" className="text-gray-600 hover:text-worldsell-orange-400">Fees & Pricing</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">Company</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/about" className="text-gray-600 hover:text-worldsell-orange-400">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-worldsell-orange-400">Contact</Link>
              </li>
              <li>
                <Link to="/careers" className="text-gray-600 hover:text-worldsell-orange-400">Careers</Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-worldsell-orange-400">Terms & Conditions</Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-worldsell-orange-400">Privacy Policy</Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} WorldSell. All rights reserved.
          </p>
          <p className="text-center text-xs text-gray-400 mt-2">
            Accessible across Africa: Available in Nigeria, Kenya, South Africa, Ghana, Cameroon, Ivory Coast, Senegal, and more.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
