"use client";

import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when page is scrolled down 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-40 flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-dark shadow-lg group"
          style={{
            background: "linear-gradient(135deg, #004E8F 0%, #0076D1 100%)",
            boxShadow: "0 4px 20px rgba(0, 118, 209, 0.4)",
          }}
          aria-label="Back to top"
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = "0 6px 30px rgba(0, 118, 209, 0.6)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "0 4px 20px rgba(0, 118, 209, 0.4)";
          }}
        >
          <ArrowUp className="w-5 h-5 text-white transition-transform duration-300 group-hover:-translate-y-1" />
        </button>
      )}
    </>
  );
}

