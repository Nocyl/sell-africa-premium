
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    content: "WorldSell transformed my business. I now sell my digital marketing courses to students across Africa with zero technical hassle.",
    author: "Grace Okafor",
    role: "Digital Course Creator",
    country: "Nigeria",
    avatar: "GO",
    rating: 5
  },
  {
    id: 2,
    content: "The mobile money integration allowed me to reach customers I never could before. My handcrafted jewelry business has grown 300% in a year.",
    author: "Kwame Mensah",
    role: "Artisan Seller",
    country: "Ghana",
    avatar: "KM",
    rating: 5
  },
  {
    id: 3,
    content: "The logistics network is impressive. I'm selling physical products to customers in rural areas that were previously impossible to reach.",
    author: "Sarah Mahmoud",
    role: "Fashion Retailer",
    country: "Egypt",
    avatar: "SM",
    rating: 4
  }
];

const TestimonialCard = ({ testimonial }: { testimonial: typeof testimonials[0] }) => {
  return (
    <Card className="h-full">
      <CardContent className="p-6 flex flex-col h-full">
        <div className="flex mb-4">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              className={`h-4 w-4 ${i < testimonial.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} 
            />
          ))}
        </div>
        
        <p className="flex-grow mb-6 text-muted-foreground">"{testimonial.content}"</p>
        
        <div className="flex items-center">
          <Avatar className="h-10 w-10 mr-3">
            <AvatarFallback className="bg-worldsell-orange-100 text-worldsell-orange-500">{testimonial.avatar}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-sm">{testimonial.author}</p>
            <p className="text-xs text-muted-foreground">{testimonial.role}, {testimonial.country}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const TestimonialSection = () => {
  return (
    <section className="py-16">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Trusted by Sellers Across Africa</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See what entrepreneurs and creators say about selling on WorldSell.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
