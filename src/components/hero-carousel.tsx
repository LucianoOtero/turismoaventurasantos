"use client";

import { useEffect, useState } from "react";
import type { StaticImageData } from "next/image";
import { HeroPicture } from "@/components/hero-picture";

export type HeroSlide = {
  mobile: StaticImageData;
  desktop: StaticImageData;
  alt: string;
  /** CSS object-position para não cortar rostos (ex.: "25% 35%"). */
  objectPosition?: string;
};

type Props = {
  slides: HeroSlide[];
  className?: string;
  /** Intervalo entre slides, em ms. */
  intervalMs?: number;
};

export function HeroCarousel({
  slides,
  className,
  intervalMs = 5500,
}: Props) {
  const [index, setIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reduceMotion || slides.length < 2) return;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [intervalMs, reduceMotion, slides.length]);

  if (slides.length === 0) return null;

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      role="group"
      aria-roledescription="carrossel"
      aria-label="Fotos do voo"
    >
      {slides.map((slide, i) => {
        const active = i === index;
        return (
          <div
            key={`${slide.alt}-${i}`}
            className={`absolute inset-0 transition-opacity duration-1000 ease-out ${
              active ? "opacity-100" : "opacity-0"
            } ${reduceMotion ? "duration-0" : ""}`}
            aria-hidden={!active}
          >
            <HeroPicture
              mobile={slide.mobile}
              desktop={slide.desktop}
              alt={active ? slide.alt : ""}
              priority={i === 0}
              objectPosition={slide.objectPosition}
              className={className}
            />
          </div>
        );
      })}
    </div>
  );
}
