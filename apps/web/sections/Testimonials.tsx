"use client";

import React, { useCallback, useEffect, useMemo, useState, useRef } from "react";
import {
  Quote,
  Star,
  Linkedin,
  PauseCircle,
  PlayCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import type { AppTestimonial } from "@/lib/graphql/testimonial-transformer";

interface TestimonialsProps {
  testimonials: AppTestimonial[];
}

export function Testimonials({ testimonials }: TestimonialsProps) {
  const [isAutoPlayAllowed, setIsAutoPlayAllowed] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [itemsPerView, setItemsPerView] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(1); // Start at 1 because we duplicate first slide
  const [isTransitioning, setIsTransitioning] = useState(true);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const allowAutoPlay = !motionQuery.matches;
    setIsAutoPlayAllowed(allowAutoPlay);
    setIsPlaying(allowAutoPlay);

    const handleChange = (event: MediaQueryListEvent) => {
      const canAutoPlay = !event.matches;
      setIsAutoPlayAllowed(canAutoPlay);
      setIsPlaying(canAutoPlay);
    };

    motionQuery.addEventListener("change", handleChange);
    return () => {
      motionQuery.removeEventListener("change", handleChange);
    };
  }, []);

  useEffect(() => {
    const determineItemsPerView = () => {
      if (typeof window === "undefined") return;
      const width = window.innerWidth;
      if (width >= 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(1);
      }
    };

    determineItemsPerView();
    window.addEventListener("resize", determineItemsPerView);
    return () => window.removeEventListener("resize", determineItemsPerView);
  }, []);

  // Create infinite loop by duplicating slides
  const duplicatedTestimonials = useMemo(() => {
    if (testimonials.length === 0) return [];
    // Add last slide at beginning and first slide at end for seamless loop
    return [
      testimonials[testimonials.length - 1],
      ...testimonials,
      testimonials[0],
    ];
  }, [testimonials]);

  const totalSlides = duplicatedTestimonials.length;
  const realTotalSlides = testimonials.length;
  const maxIndex = totalSlides - itemsPerView;

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => {
      const next = prev + 1;
      // If we've reached the duplicate at the end, seamlessly reset
      if (next >= maxIndex) {
        // After transition completes, reset without animation
        setTimeout(() => {
          if (sliderRef.current) {
            setIsTransitioning(false);
            setCurrentIndex(1);
            // Re-enable transition after a brief moment
            requestAnimationFrame(() => {
              setTimeout(() => setIsTransitioning(true), 10);
            });
          }
        }, 700);
        return next;
      }
      return next;
    });
  }, [maxIndex]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => {
      const next = prev - 1;
      // If we've reached the duplicate at the beginning, seamlessly reset
      if (next <= 0) {
        // After transition completes, reset without animation
        setTimeout(() => {
          if (sliderRef.current) {
            setIsTransitioning(false);
            setCurrentIndex(realTotalSlides);
            // Re-enable transition after a brief moment
            requestAnimationFrame(() => {
              setTimeout(() => setIsTransitioning(true), 10);
            });
          }
        }, 700);
        return next;
      }
      return next;
    });
  }, [realTotalSlides]);

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying || realTotalSlides <= itemsPerView) return;
    const interval = setInterval(handleNext, 5000);
    return () => clearInterval(interval);
  }, [handleNext, isPlaying, itemsPerView, realTotalSlides]);


  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        handleNext();
        setIsPlaying(false);
      }
      if (event.key === "ArrowLeft") {
        handlePrev();
        setIsPlaying(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev]);

  // Calculate dots based on real testimonials (not duplicated)
  const dotsCount = Math.max(realTotalSlides - itemsPerView + 1, 1);
  const shouldShowControls = realTotalSlides > itemsPerView;
  
  // Calculate display index for dots (map from duplicated index to real index)
  const displayIndex = useMemo(() => {
    if (currentIndex === 0) return dotsCount - 1;
    if (currentIndex >= maxIndex) return 0;
    return Math.max(0, currentIndex - 1);
  }, [currentIndex, maxIndex, dotsCount]);

  const sliderTransform = `translateX(-${(currentIndex * 100) / itemsPerView}%)`;

  return (
    <section
      className="relative overflow-hidden py-12 md:py-16"
      style={{
        background: "linear-gradient(180deg, #0A0A0A 0%, #0F1419 50%, #0A0A0A 100%)",
      }}
    >
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: "radial-gradient(circle at 50% 50%, #0076D1 2px, transparent 2px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="container-standard relative z-10">
        <div className="mb-6 text-center md:mb-8">
          <div className="mb-3 inline-flex items-center gap-2">
            <Quote className="h-5 w-5 text-[#0076D1] md:h-6 md:w-6" />
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0076D1] md:text-sm">
              Client Testimonials
            </p>
          </div>
          <h2 className="heading-2 mb-2">
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg, #004E8F 0%, #0076D1 50%, #00A8FF 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              What Clients Say
            </span>
          </h2>
        </div>

        <div
          className="relative"
          onMouseEnter={() => isAutoPlayAllowed && setIsPlaying(false)}
          onMouseLeave={() => isAutoPlayAllowed && setIsPlaying(true)}
        >
          <div className="overflow-hidden" style={{ width: "100%" }}>
            <div
              ref={sliderRef}
              className="flex"
              style={{
                gap: itemsPerView === 1 ? "0" : itemsPerView === 2 ? "1rem" : "1.25rem",
                transform: sliderTransform,
                transition: isTransitioning ? "transform 700ms cubic-bezier(0.4, 0, 0.2, 1)" : "none",
                willChange: "transform",
                width: "100%",
              }}
            >
              {duplicatedTestimonials.map((testimonial, index) => (
                <div
                  key={`${testimonial.id}-${index}`}
                  className="flex-shrink-0"
                  style={{
                    width: itemsPerView === 1 
                      ? "100%" 
                      : `calc(${100 / itemsPerView}% - ${itemsPerView === 2 ? '0.5rem' : '0.625rem'})`,
                    minWidth: 0,
                    maxWidth: itemsPerView === 1 ? "100%" : "none",
                    boxSizing: "border-box",
                    flexBasis: itemsPerView === 1 ? "100%" : "auto",
                  }}
                >
                  <article
                    className="h-full w-full rounded-xl border p-4 transition-all duration-300 hover:border-[#0076D1]/30 md:p-5"
                    style={{
                      background: "rgba(255, 255, 255, 0.03)",
                      backdropFilter: "blur(20px)",
                      borderColor: "rgba(255, 255, 255, 0.1)",
                      boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)",
                      maxWidth: "100%",
                      boxSizing: "border-box",
                    }}
                  >
                    <Quote
                      className="mb-3 h-5 w-5 text-[#0076D1] opacity-50 md:h-6 md:w-6"
                      aria-hidden="true"
                    />

                    <div className="mb-3 flex gap-0.5" aria-hidden="true">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={`${testimonial.id}-star-${i}`}
                          className="h-3.5 w-3.5"
                          style={{ fill: "#0076D1", color: "#0076D1" }}
                        />
                      ))}
                    </div>

                    <p className="mb-4 text-sm italic leading-relaxed text-gray-300 md:text-base">
                      "{testimonial.quote}"
                    </p>

                    <div className="flex items-center gap-3 border-t border-white/10 pt-3">
                      <div
                        className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full text-xs font-bold text-white"
                        style={{
                          background: "linear-gradient(135deg, #004E8F 0%, #0076D1 100%)",
                        }}
                        aria-hidden="true"
                      >
                        {testimonial.avatarUrl ? (
                          <img
                            src={testimonial.avatarUrl}
                            alt={testimonial.clientName}
                            className="h-full w-full object-cover"
                            loading="lazy"
                          />
                        ) : (
                          testimonial.initials
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-poppins mb-0.5 text-sm font-bold text-white">
                          {testimonial.clientName}
                        </h4>
                        <p className="text-xs text-gray-400">
                          {testimonial.role}, {testimonial.company}
                        </p>
                      </div>
                      <Linkedin className="h-4 w-4 text-[#0076D1]" aria-hidden="true" />
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>

          {shouldShowControls && (
            <div className="mt-5 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="hover:border-primary hover:bg-primary/10 focus:ring-primary flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition focus:outline-none focus:ring-2"
                  aria-label="Show previous testimonial"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="hover:border-primary hover:bg-primary/10 focus:ring-primary flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition focus:outline-none focus:ring-2"
                  aria-label="Show next testimonial"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsPlaying((prev) => !prev)}
                  className="hover:border-primary hover:bg-primary/10 focus:ring-primary ml-2 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white transition focus:outline-none focus:ring-2"
                  aria-pressed={!isPlaying}
                >
                  {isPlaying ? (
                    <>
                      <PauseCircle className="h-3.5 w-3.5" />
                      Pause
                    </>
                  ) : (
                    <>
                      <PlayCircle className="h-3.5 w-3.5" />
                      Play
                    </>
                  )}
                </button>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-2">
                {Array.from({ length: dotsCount }).map((_, index) => (
                  <button
                    key={`testimonial-dot-${index}`}
                    type="button"
                    aria-label={`View testimonial group ${index + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === displayIndex
                        ? "w-6 bg-[#0076D1]"
                        : "w-2 bg-white/20 hover:bg-[#0076D1]/60"
                    }`}
                    onClick={() => {
                      // Map dot index to duplicated array index
                      setCurrentIndex(index + 1);
                      setIsPlaying(false);
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
