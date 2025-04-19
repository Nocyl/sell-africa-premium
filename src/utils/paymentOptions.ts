
// Types pour les options de paiement
export interface PaymentProvider {
  id: string;
  name: string;
  logo: string;
  supportedCountries: string[];
  supportedMethods: PaymentMethod[];
  primary?: boolean; // Indique si c'est le fournisseur principal pour un pays
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
    ],
    primary: true // Principal pour ces pays
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
    id: "paypal",
    name: "PayPal",
    logo: "/images/paypal.png",
    supportedCountries: countries.map(country => country.code),
    supportedMethods: [
      { id: "paypal", name: "PayPal", icon: "credit-card" }
    ]
  },
  {
    id: "pawapay",
    name: "PawaPay",
    logo: "/images/pawapay.png",
    supportedCountries: ["GH", "KE", "ZA", "NG"],
    supportedMethods: [
      { id: "mobile_money", name: "Mobile Money", icon: "mobile" }
    ],
    primary: true // Principal pour ces pays
  },
  {
    id: "monetbil",
    name: "Monetbil",
    logo: "/images/monetbil.png",
    supportedCountries: ["CM", "CD", "CG", "GA", "GQ"],
    supportedMethods: [
      { id: "mobile_money", name: "Mobile Money", icon: "mobile" }
    ],
    primary: true // Principal pour ces pays
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
    id: "moneygram",
    name: "MoneyGram",
    logo: "/images/moneygram.png",
    supportedCountries: countries.map(country => country.code),
    supportedMethods: [
      { id: "cash_pickup", name: "Retrait en espèces", icon: "cash" }
    ]
  }
];

// Fonction pour obtenir le fournisseur principal pour un pays
export const getPrimaryProvider = (countryCode: string, method: PaymentType): PaymentProvider | null => {
  // Chercher d'abord un fournisseur marqué comme primaire
  const primaryProvider = paymentProviders.find(provider => 
    provider.supportedCountries.includes(countryCode) && 
    provider.primary &&
    provider.supportedMethods.some(m => {
      if (method === "mobile") {
        return m.id.includes("mobile") || m.id.includes("momo") || m.id.includes("money");
      } else if (method === "bank") {
        return m.id.includes("bank");
      } else if (method === "card") {
        return m.id.includes("card") || m.id === "paypal";
      } else if (method === "transfer") {
        return m.id.includes("transfer") || m.id.includes("cash");
      }
      return false;
    })
  );

  // Si aucun fournisseur primaire, prendre le premier disponible
  if (!primaryProvider) {
    const providers = getAvailableProviders(countryCode, method);
    return providers.length > 0 ? providers[0] : null;
  }

  return primaryProvider;
};

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
        return m.id.includes("card") || m.id === "paypal";
      } else if (method === "transfer") {
        return m.id.includes("transfer") || m.id.includes("cash");
      }
      return false;
    })
  );
};
