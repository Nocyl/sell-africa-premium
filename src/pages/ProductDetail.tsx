
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  ShoppingCart, Heart, Share2, Star, ArrowLeft,
  Truck, Shield, CheckCircle, Clock, Package
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import NewsletterSection from "@/components/home/NewsletterSection";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useCart } from "@/contexts/CartContext";
import CartPopup from "@/components/cart/CartPopup";

// Types pour les produits
interface Product {
  id: number;
  name: string;
  price: number;
  currency: string;
  type: "digital" | "physical" | "course";
  rating: number;
  reviews: number;
  image: string;
  seller: string;
  description: string;
  features: string[];
}

// Mock data pour les produits
const mockProducts: Product[] = [
  {
    id: 1,
    name: "Advanced Digital Marketing Course",
    price: 129.99,
    currency: "USD",
    type: "course",
    rating: 4.8,
    reviews: 245,
    image: "bg-worldsell-blue-100",
    seller: "DigitalPros Academy",
    description: "Cette formation complète vous apprendra les stratégies avancées du marketing digital adaptées au marché africain. De l'optimisation SEO à la gestion des campagnes publicitaires, en passant par le marketing des réseaux sociaux, vous acquerrez toutes les compétences nécessaires pour exceller dans ce domaine en pleine expansion.",
    features: [
      "42 heures de contenu vidéo",
      "15 projets pratiques",
      "Certification reconnue",
      "Accès à vie",
      "Support communautaire"
    ]
  },
  {
    id: 2,
    name: "Handcrafted African Leather Bag",
    price: 89.99,
    currency: "USD",
    type: "physical",
    rating: 4.9,
    reviews: 129,
    image: "bg-worldsell-orange-100",
    seller: "LeatherCraft Nigeria",
    description: "Sac en cuir authentique fait à la main par des artisans nigérians qualifiés. Chaque pièce est unique et reflète le riche patrimoine artisanal africain. Le cuir de première qualité garantit durabilité et élégance, tandis que les motifs traditionnels ajoutent une touche culturelle distinctive.",
    features: [
      "Cuir véritable",
      "Fabrication artisanale",
      "Doublure résistante",
      "Poches multiples",
      "Livraison internationale"
    ]
  },
  {
    id: 3,
    name: "E-commerce Website Templates Bundle",
    price: 49.99,
    currency: "USD",
    type: "digital",
    rating: 4.7,
    reviews: 78,
    image: "bg-worldsell-earth-100",
    seller: "WebDesigns Kenya",
    description: "Une collection complète de modèles de sites e-commerce optimisés pour les entreprises africaines. Ces templates sont conçus pour une intégration facile avec les passerelles de paiement locales et internationales, et offrent une expérience utilisateur adaptée aux comportements d'achat locaux.",
    features: [
      "10 designs différents",
      "Compatible mobile",
      "Intégration M-Pesa & PayPal",
      "Support technique 6 mois",
      "Documentation complète"
    ]
  },
  {
    id: 4,
    name: "Photography Masterclass",
    price: 79.99,
    currency: "USD",
    type: "course",
    rating: 4.9,
    reviews: 312,
    image: "bg-green-100",
    seller: "CreativeEye South Africa",
    description: "Maîtrisez l'art de la photographie avec cette masterclass complète. Apprenez à capturer la beauté unique des paysages africains, la richesse des cultures locales et les portraits expressifs. Des techniques de base aux méthodes avancées de post-production, cette formation vous guidera à chaque étape.",
    features: [
      "36 heures de contenu HD",
      "Techniques de photographie de paysage",
      "Édition professionnelle avec Lightroom",
      "Sessions de critique personnalisées",
      "Certificat d'accomplissement"
    ]
  },
  {
    id: 5,
    name: "Premium African Coffee Beans",
    price: 24.99,
    currency: "USD",
    type: "physical",
    rating: 4.8,
    reviews: 183,
    image: "bg-worldsell-earth-200",
    seller: "CoffeeFarms Ethiopia",
    description: "Grains de café arabica cultivés en altitude dans les montagnes éthiopiennes. Ces grains torréfiés avec soin offrent un profil aromatique exceptionnel avec des notes d'agrumes, de fleurs et une finale douce. Issus d'une agriculture durable, ils soutiennent les communautés locales.",
    features: [
      "Café 100% arabica",
      "Culture en altitude (1800m)",
      "Torréfaction artisanale",
      "Commerce équitable",
      "Emballage sous vide"
    ]
  },
  {
    id: 6,
    name: "Social Media Management Templates",
    price: 19.99,
    currency: "USD",
    type: "digital",
    rating: 4.6,
    reviews: 92,
    image: "bg-worldsell-blue-200",
    seller: "MarketingPro Ghana",
    description: "Une collection de templates professionnels pour gérer efficacement vos réseaux sociaux. Conçus pour mettre en valeur les entreprises africaines, ces modèles sont facilement personnalisables et vous aideront à maintenir une présence cohérente et attrayante sur toutes les plateformes.",
    features: [
      "50+ templates Instagram",
      "25 designs pour Facebook",
      "Calendrier éditorial",
      "Formats Canva & Photoshop",
      "Guide des meilleures pratiques"
    ]
  }
];

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const { addToCart, cartCount, showCartPopup, closeCartPopup } = useCart();

  useEffect(() => {
    // Simuler une requête API
    const foundProduct = mockProducts.find(p => p.id === Number(id));
    
    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      // Rediriger si le produit n'existe pas
      navigate("/products");
    }
  }, [id, navigate]);

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        category: product.type === 'digital' ? 'Digital' : 
                product.type === 'course' ? 'Formation' : 'Physique',
        quantity: quantity,
        image: `https://source.unsplash.com/random/300x300/?${product.type}`,
        type: product.type
      });
      toast.success(`${product?.name} ajouté au panier`);
    }
  };

  const handleBuyNow = () => {
    if (product) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        category: product.type === 'digital' ? 'Digital' : 
                product.type === 'course' ? 'Formation' : 'Physique',
        quantity: quantity,
        image: `https://source.unsplash.com/random/300x300/?${product.type}`,
        type: product.type
      });
      toast.success(`Achat immédiat pour ${product?.name}`);
      navigate("/checkout");
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="animate-pulse text-xl">Chargement du produit...</div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <div className="container py-8">
          <Button 
            variant="ghost" 
            className="mb-4" 
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour
          </Button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Image du produit */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className={`${product.image} aspect-square rounded-lg relative`}
            >
              <Badge 
                variant="outline" 
                className="absolute top-4 left-4 bg-white"
              >
                {product.type === 'digital' ? 'Digital' : 
                product.type === 'course' ? 'Formation' : 'Physique'}
              </Badge>
            </motion.div>

            {/* Détails du produit */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="mb-2 text-sm text-muted-foreground">{product.seller}</div>
              <h1 className="text-2xl md:text-3xl font-bold mb-3">{product.name}</h1>
              
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i}
                      className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} 
                    />
                  ))}
                </div>
                <span className="text-sm font-medium">{product.rating}</span>
                <span className="text-sm text-muted-foreground">({product.reviews} avis)</span>
              </div>
              
              <p className="text-lg md:text-xl font-bold mb-4">
                {product.currency} {product.price.toFixed(2)}
              </p>

              <p className="text-muted-foreground mb-6">
                {product.description}
              </p>

              {product.type === "physical" && (
                <div className="mb-4">
                  <label htmlFor="quantity" className="block mb-2 text-sm font-medium">
                    Quantité
                  </label>
                  <div className="flex items-center w-32">
                    <button 
                      className="border h-10 w-10 flex items-center justify-center rounded-l-md"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      -
                    </button>
                    <input 
                      id="quantity"
                      type="number" 
                      min="1" 
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="h-10 w-full border-y text-center" 
                    />
                    <button 
                      className="border h-10 w-10 flex items-center justify-center rounded-r-md"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <Button 
                  className="bg-worldsell-orange-400 hover:bg-worldsell-orange-500 flex-1" 
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Ajouter au panier
                </Button>
                <Button 
                  className="flex-1 bg-worldsell-blue-500 hover:bg-worldsell-blue-600" 
                  onClick={handleBuyNow}
                >
                  Acheter maintenant
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={() => {
                    setIsFavorite(!isFavorite);
                    toast.success(isFavorite ? "Retiré des favoris" : "Ajouté aux favoris");
                  }}
                >
                  <Heart className={`h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => {
                    toast.success("Lien de partage copié !");
                  }}
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>

              {product.type === "physical" && (
                <div className="flex flex-col gap-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Truck className="h-4 w-4 text-worldsell-blue-500" />
                    <span>Livraison disponible dans toute l'Afrique</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-worldsell-blue-500" />
                    <span>Garantie satisfait ou remboursé pendant 30 jours</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-worldsell-blue-500" />
                    <span>Produit authentique vérifié</span>
                  </div>
                </div>
              )}

              {product.type === "digital" && (
                <div className="flex flex-col gap-2 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-worldsell-blue-500" />
                    <span>Téléchargement immédiat après achat</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-worldsell-blue-500" />
                    <span>Garantie satisfait ou remboursé pendant 14 jours</span>
                  </div>
                </div>
              )}

              {product.type === "course" && (
                <div className="flex flex-col gap-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-worldsell-blue-500" />
                    <span>Accès à vie au contenu</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-worldsell-blue-500" />
                    <span>Garantie satisfait ou remboursé pendant 30 jours</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-worldsell-blue-500" />
                    <span>Certificat de réussite inclus</span>
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          <Tabs defaultValue="features" className="mb-12">
            <TabsList className="w-full sm:w-auto border-b">
              <TabsTrigger value="features">Caractéristiques</TabsTrigger>
              <TabsTrigger value="reviews">Avis</TabsTrigger>
              <TabsTrigger value="seller">Vendeur</TabsTrigger>
            </TabsList>
            
            <TabsContent value="features" className="py-4">
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-worldsell-blue-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </TabsContent>
            
            <TabsContent value="reviews" className="py-4">
              <div className="p-6 bg-muted/40 rounded-lg text-center">
                <p className="mb-2">Ces avis seront bientôt disponibles.</p>
                <p className="text-sm text-muted-foreground">
                  Soyez le premier à laisser un avis pour ce produit !
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="seller" className="py-4">
              <div className="p-6 bg-muted/40 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">{product.seller}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Vendeur vérifié sur WorldSell avec une excellente réputation.
                </p>
                <Button variant="outline" size="sm">
                  Voir tous les produits du vendeur
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <NewsletterSection />
      </main>
      
      <CartPopup 
        isOpen={showCartPopup} 
        onClose={closeCartPopup} 
        itemCount={cartCount} 
      />
      <Footer />
    </div>
  );
};

export default ProductDetail;
