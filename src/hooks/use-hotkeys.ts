
import { useEffect } from "react";

type KeyHandler = (e: KeyboardEvent) => void;

export function useHotkeys(key: string, callback: KeyHandler) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Process the key string (e.g., "mod+k")
      const keys = key.toLowerCase().split("+");
      const modKey = keys[0];
      const mainKey = keys[keys.length - 1];

      // Check if the main key matches
      if (e.key.toLowerCase() !== mainKey) return;

      // Check for modifiers if needed
      if (modKey === "mod") {
        if (!(e.metaKey || e.ctrlKey)) return;
      } else if (modKey === "ctrl" && !e.ctrlKey) return;
      else if (modKey === "shift" && !e.shiftKey) return;
      else if (modKey === "alt" && !e.altKey) return;

      callback(e);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [key, callback]);
}
