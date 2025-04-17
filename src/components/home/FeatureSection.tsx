
import { 
  ShoppingBag, 
  FileDigit, 
  Graduation, 
  CreditCard, 
  Languages, 
  Truck, 
  Shield 
} from "lucide-react";

const features = [
  {
    icon: <ShoppingBag className="h-10 w-10 text-worldsell-orange-400" />,
    title: "Multi-vendor Marketplace",
    description: "Find products from thousands of sellers across Africa."
  },
  {
    icon: <FileDigit className="h-10 w-10 text-worldsell-blue-500" />,
    title: "Digital Products",
    description: "Instant delivery of software, templates, ebooks, and more."
  },
  {
    icon: <Graduation className="h-10 w-10 text-worldsell-orange-400" />,
    title: "Online Courses",
    description: "Learn valuable skills with our integrated learning platform."
  },
  {
    icon: <CreditCard className="h-10 w-10 text-worldsell-blue-500" />,
    title: "Local Payment Methods",
    description: "Pay with mobile money, bank transfers, and other local options."
  },
  {
    icon: <Languages className="h-10 w-10 text-worldsell-orange-400" />,
    title: "Multi-language Support",
    description: "Use the platform in English, French, Arabic, and local languages."
  },
  {
    icon: <Truck className="h-10 w-10 text-worldsell-blue-500" />,
    title: "Local Delivery",
    description: "Fast shipping options optimized for African locations."
  },
  {
    icon: <Shield className="h-10 w-10 text-worldsell-orange-400" />,
    title: "Buyer Protection",
    description: "Shop with confidence with our secure payment system."
  }
];

const FeatureSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose WorldSell</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The complete marketplace solution designed specifically for Africa's unique needs.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="feature-box bg-white"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
