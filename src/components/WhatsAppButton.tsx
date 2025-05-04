
import React from "react";
import { MessageSquare } from "lucide-react";

interface WhatsAppButtonProps {
  phoneNumber: string;
  message: string;
  position: "bottom-right" | "bottom-left" | "middle-right" | "middle-left";
  size: "small" | "medium" | "large";
  showText: boolean;
  text: string;
}

export default function WhatsAppButton({
  phoneNumber,
  message,
  position,
  size,
  showText,
  text
}: WhatsAppButtonProps) {
  // Position CSS classes
  const positionClasses = {
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4", 
    "middle-right": "right-4 top-1/2 -translate-y-1/2",
    "middle-left": "left-4 top-1/2 -translate-y-1/2"
  };

  // Size CSS classes
  const sizeClasses = {
    small: "p-2 text-xs",
    medium: "p-3 text-sm",
    large: "p-4 text-base"
  };

  const iconSizeClasses = {
    small: "h-4 w-4",
    medium: "h-5 w-5",
    large: "h-6 w-6"
  };

  return (
    <div className={`fixed ${positionClasses[position]} z-50`}>
      <a 
        href={`https://wa.me/${phoneNumber.replace(/\+/g, '')}?text=${encodeURIComponent(message)}`}
        target="_blank"
        rel="noopener noreferrer"
        className={`flex items-center gap-2 bg-green-500 text-white rounded-full ${sizeClasses[size]} hover:bg-green-600 transition-colors shadow-lg`}
      >
        <MessageSquare className={iconSizeClasses[size]} />
        {showText && <span>{text}</span>}
      </a>
    </div>
  );
}
