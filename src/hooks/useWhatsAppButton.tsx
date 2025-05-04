
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface WhatsAppButtonConfig {
  phoneNumber: string;
  message: string;
  position: "bottom-right" | "bottom-left" | "middle-right" | "middle-left";
  size: "small" | "medium" | "large";
  showText: boolean;
  text: string;
  showOnPages: string[];
}

export const useWhatsAppButton = (config?: Partial<WhatsAppButtonConfig>) => {
  const [buttonConfig, setButtonConfig] = useState<WhatsAppButtonConfig>({
    phoneNumber: "",
    message: "Bonjour! J'ai une question concernant vos produits/services.",
    position: "bottom-right",
    size: "medium",
    showText: true,
    text: "Besoin d'aide? Discutons sur WhatsApp",
    showOnPages: ["product", "course", "home"]
  });
  
  const [showButton, setShowButton] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Load saved configuration from localStorage
    const savedConfig = localStorage.getItem('whatsAppButtonConfig');
    if (savedConfig) {
      try {
        const parsedConfig = JSON.parse(savedConfig);
        setButtonConfig(prev => ({ ...prev, ...parsedConfig }));
      } catch (e) {
        console.error("Error parsing WhatsApp button config:", e);
      }
    }
    
    // Override with any provided config
    if (config) {
      setButtonConfig(prev => ({ ...prev, ...config }));
    }
  }, [config]);

  useEffect(() => {
    // Determine if button should be shown based on current path
    const currentPath = location.pathname;
    
    const shouldShow = buttonConfig.phoneNumber && buttonConfig.showOnPages.some(page => {
      switch (page) {
        case 'home':
          return currentPath === '/';
        case 'product':
          return currentPath.includes('/product/');
        case 'course':
          return currentPath.includes('/course/');
        case 'checkout':
          return currentPath.includes('/checkout');
        default:
          return false;
      }
    });
    
    setShowButton(shouldShow);
  }, [location, buttonConfig]);

  const saveConfig = (newConfig: Partial<WhatsAppButtonConfig>) => {
    const updatedConfig = { ...buttonConfig, ...newConfig };
    setButtonConfig(updatedConfig);
    localStorage.setItem('whatsAppButtonConfig', JSON.stringify(updatedConfig));
    return updatedConfig;
  };

  return {
    buttonConfig,
    showButton,
    saveConfig
  };
};
