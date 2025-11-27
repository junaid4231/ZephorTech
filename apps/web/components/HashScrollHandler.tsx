"use client";

import { useEffect } from "react";

export function HashScrollHandler() {
  useEffect(() => {
    // Check if there's a hash in the URL
    const hash = window.location.hash;
    
    if (hash) {
      // Remove the # symbol
      const id = hash.substring(1);
      
      // Wait for the page to fully render
      const scrollToElement = () => {
        const element = document.getElementById(id);
        if (element) {
          const headerOffset = 80; // Account for fixed header
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
          return true;
        }
        return false;
      };

      // Try immediately
      if (!scrollToElement()) {
        // If element not found, wait a bit and try again
        setTimeout(() => {
          if (!scrollToElement()) {
            // Try one more time after a longer delay
            setTimeout(scrollToElement, 500);
          }
        }, 100);
      }
    }
  }, []);

  return null;
}

