
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import FeatureSection from "@/components/home/FeatureSection";
import SellerCTA from "@/components/home/SellerCTA";
import TestimonialSection from "@/components/home/TestimonialSection";
import NewsletterSection from "@/components/home/NewsletterSection";
import { useEffect } from "react";
import { useWhatsAppButton } from "@/hooks/useWhatsAppButton";
import { toast } from "sonner";

const Index = () => {
  const { saveConfig } = useWhatsAppButton();

  // Initialisation de démonstration du bouton WhatsApp 
  // pour que les utilisateurs puissent le voir sur la page d'accueil
  useEffect(() => {
    const savedConfig = localStorage.getItem('whatsAppButtonConfig');
    
    if (!savedConfig) {
      // Configuration par défaut du bouton WhatsApp pour la démo si aucune config n'existe
      saveConfig({
        phoneNumber: "+33612345678", // Numéro de démo
        message: "Bonjour! Je suis intéressé par vos produits et souhaiterais en savoir plus.",
        position: "bottom-right",
        size: "medium",
        showText: true,
        text: "Besoin d'aide? Contactez-nous!",
        showOnPages: ["home", "product", "course"]
      });
      
      // Notification pour informer l'utilisateur qu'un bouton WhatsApp de démo est affiché
      setTimeout(() => {
        toast.info(
          "Un bouton WhatsApp de démonstration est affiché. Configurez-le dans le tableau de bord vendeur.",
          {
            duration: 8000,
            action: {
              label: "Essayer",
              onClick: () => {
                window.open("https://wa.me/33612345678?text=Bonjour!%20Je%20suis%20intéressé%20par%20vos%20produits%20et%20souhaiterais%20en%20savoir%20plus.");
              }
            }
          }
        );
      }, 2000);
    }
  }, [saveConfig]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <FeaturedProducts />
        <FeatureSection />
        <SellerCTA />
        <TestimonialSection />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
