
// Types pour les options de paiement
export interface PaymentProvider {
  id: string;
  name: string;
  logo: string;
  supportedCountries: string[];
  supportedMethods: PaymentMethod[];
}

export interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
}

// Types de paiement disponibles
export type PaymentType = "mobile" | "bank" | "card" | "transfer";

// Liste des pays avec leurs codes
export const countries = [
  { code: "SN", name: "Sénégal" },
  { code: "CI", name: "Côte d'Ivoire" },
  { code: "CM", name: "Cameroun" },
  { code: "BJ", name: "Bénin" },
  { code: "BF", name: "Burkina Faso" },
  { code: "TG", name: "Togo" },
  { code: "ML", name: "Mali" },
  { code: "GN", name: "Guinée" },
  { code: "NE", name: "Niger" },
  { code: "CD", name: "RD Congo" },
  { code: "CG", name: "Congo" },
  { code: "GA", name: "Gabon" },
  { code: "GQ", name: "Guinée Équatoriale" },
  { code: "NG", name: "Nigeria" },
  { code: "GH", name: "Ghana" },
  { code: "KE", name: "Kenya" },
  { code: "ZA", name: "Afrique du Sud" },
  { code: "MA", name: "Maroc" },
  { code: "DZ", name: "Algérie" },
  { code: "TN", name: "Tunisie" },
  { code: "EG", name: "Égypte" },
];

// Options de paiement par fournisseur
export const paymentProviders: PaymentProvider[] = [
  {
    id: "fedapay",
    name: "FedaPay",
    logo: "/images/fedapay.png",
    supportedCountries: ["BJ", "CI", "SN", "TG", "BF"],
    supportedMethods: [
      { id: "mobile_money", name: "Mobile Money", icon: "mobile" },
      { id: "card", name: "Carte bancaire", icon: "credit-card" }
    ]
  },
  {
    id: "paydunya",
    name: "PayDunya",
    logo: "/images/paydunya.png",
    supportedCountries: ["SN", "CI", "BJ", "TG", "ML", "GN"],
    supportedMethods: [
      { id: "mobile_money", name: "Mobile Money", icon: "mobile" },
      { id: "card", name: "Carte bancaire", icon: "credit-card" },
      { id: "bank_transfer", name: "Virement bancaire", icon: "bank" }
    ]
  },
  {
    id: "pawapay",
    name: "PawaPay",
    logo: "/images/pawapay.png",
    supportedCountries: ["GH", "KE", "ZA", "NG", "TZ", "UG"],
    supportedMethods: [
      { id: "mobile_money", name: "Mobile Money", icon: "mobile" }
    ]
  },
  {
    id: "monetbil",
    name: "Monetbil",
    logo: "/images/monetbil.png",
    supportedCountries: ["CM", "CD", "CG", "GA", "GQ"],
    supportedMethods: [
      { id: "mobile_money", name: "Mobile Money", icon: "mobile" },
      { id: "orange_money", name: "Orange Money", icon: "mobile" },
      { id: "mtn_momo", name: "MTN MoMo", icon: "mobile" }
    ]
  },
  {
    id: "flutterwave",
    name: "Flutterwave",
    logo: "/images/flutterwave.png",
    supportedCountries: ["NG", "GH", "KE", "ZA", "EG", "MA", "TZ"],
    supportedMethods: [
      { id: "mobile_money", name: "Mobile Money", icon: "mobile" },
      { id: "card", name: "Carte bancaire", icon: "credit-card" },
      { id: "bank_transfer", name: "Virement bancaire", icon: "bank" }
    ]
  },
  {
    id: "mtn_momo",
    name: "MTN Mobile Money",
    logo: "/images/mtn.png",
    supportedCountries: ["CI", "CM", "GH", "UG", "ZM", "RW", "SL"],
    supportedMethods: [
      { id: "mtn_momo", name: "MTN MoMo", icon: "mobile" }
    ]
  },
  {
    id: "orange_money",
    name: "Orange Money",
    logo: "/images/orange.png",
    supportedCountries: ["SN", "CI", "ML", "BF", "GN", "CM", "NE", "MG"],
    supportedMethods: [
      { id: "orange_money", name: "Orange Money", icon: "mobile" }
    ]
  },
  {
    id: "western_union",
    name: "Western Union",
    logo: "/images/western_union.png",
    supportedCountries: countries.map(country => country.code),
    supportedMethods: [
      { id: "cash_pickup", name: "Retrait en espèces", icon: "cash" },
      { id: "bank_transfer", name: "Virement bancaire", icon: "bank" }
    ]
  },
  {
    id: "express_cash",
    name: "Express Cash",
    logo: "/images/express_cash.png",
    supportedCountries: countries.map(country => country.code),
    supportedMethods: [
      { id: "cash_pickup", name: "Retrait en espèces", icon: "cash" }
    ]
  }
];

// Fonction pour obtenir les fournisseurs de paiement disponibles par pays et méthode
export const getAvailableProviders = (countryCode: string, method: PaymentType): PaymentProvider[] => {
  return paymentProviders.filter(provider => 
    provider.supportedCountries.includes(countryCode) && 
    provider.supportedMethods.some(m => {
      if (method === "mobile") {
        return m.id.includes("mobile") || m.id.includes("momo") || m.id.includes("money");
      } else if (method === "bank") {
        return m.id.includes("bank");
      } else if (method === "card") {
        return m.id.includes("card");
      } else if (method === "transfer") {
        return m.id.includes("transfer");
      }
      return false;
    })
  );
};
