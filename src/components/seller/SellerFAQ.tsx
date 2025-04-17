
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Combien coûte la création d'une boutique sur WorldSell ?",
    answer: "La création d'une boutique sur WorldSell est totalement gratuite. Nous appliquons uniquement une commission sur les ventes réalisées. Vous ne payez que lorsque vous vendez."
  },
  {
    question: "Quels types de produits puis-je vendre ?",
    answer: "Vous pouvez vendre des produits physiques, des produits numériques (ebooks, templates, logiciels) et des cours en ligne. WorldSell s'adapte à tous types de business."
  },
  {
    question: "Comment sont gérés les paiements ?",
    answer: "WorldSell intègre diverses solutions de paiement adaptées au marché africain, notamment Mobile Money, cartes bancaires et transferts bancaires. Les fonds sont versés sur votre compte selon un calendrier régulier."
  },
  {
    question: "Comment fonctionne la livraison des produits physiques ?",
    answer: "Vous pouvez utiliser notre réseau de livraison partenaire ou gérer vous-même vos expéditions. Notre système vous permet de suivre les commandes et d'informer automatiquement vos clients."
  },
  {
    question: "Puis-je vendre dans plusieurs pays africains ?",
    answer: "Absolument ! WorldSell est conçu pour le marché panafricain. Vous pouvez vendre dans plus de 35 pays africains avec des options de paiement locales pour chaque région."
  },
  {
    question: "Comment fonctionne le support client ?",
    answer: "Nous offrons un support par email pour tous les vendeurs, et un support prioritaire par chat et téléphone pour les plans Pro et Business. Notre équipe est disponible pour vous aider à résoudre tout problème."
  }
];

const SellerFAQ = () => {
  return (
    <section className="py-16">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Questions fréquentes</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Vous avez des questions ? Nous avons des réponses.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          
          <div className="mt-8 text-center">
            <p className="text-muted-foreground mb-4">
              Vous ne trouvez pas la réponse à votre question ?
            </p>
            <a 
              href="#" 
              className="text-worldsell-blue-500 hover:text-worldsell-blue-600 font-medium"
            >
              Contactez notre équipe →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SellerFAQ;
