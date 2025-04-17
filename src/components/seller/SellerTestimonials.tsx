
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    content: "WorldSell a transformé mon activité. Je vends maintenant mes cours de marketing digital à des étudiants dans toute l'Afrique sans aucun problème technique.",
    author: "Grace Okafor",
    role: "Créatrice de cours",
    country: "Nigeria",
    avatar: "GO",
    rating: 5
  },
  {
    id: 2,
    content: "L'intégration avec Mobile Money m'a permis d'atteindre des clients que je n'aurais jamais pu toucher auparavant. Mon entreprise de bijoux artisanaux a connu une croissance de 300% en un an.",
    author: "Kwame Mensah",
    role: "Artisan",
    country: "Ghana",
    avatar: "KM",
    rating: 5
  },
  {
    id: 3,
    content: "Le réseau logistique est impressionnant. Je vends des produits physiques à des clients dans des zones rurales qui étaient auparavant impossibles à atteindre.",
    author: "Sarah Mahmoud",
    role: "Détaillante de mode",
    country: "Égypte",
    avatar: "SM",
    rating: 4
  }
];

const SellerTestimonials = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Ce que disent nos vendeurs</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Découvrez comment des entrepreneurs et créateurs de toute l'Afrique réussissent sur WorldSell.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="h-full bg-white">
              <CardContent className="p-6 flex flex-col h-full">
                <Quote className="h-8 w-8 mb-4 text-worldsell-orange-300" />
                
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default SellerTestimonials;
