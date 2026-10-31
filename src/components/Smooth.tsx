"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Lenis smooth scroll on the GSAP ticker, section entrances, and the header ink that follows the chapters. */
export function Smooth() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let lenis: Lenis | null = null;
    if (!reduced) {
      lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
      lenis.on("scroll", ScrollTrigger.update);
      const tick = (time: number) => lenis?.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      // Anchor links scroll through Lenis.
      const onClick = (e: MouseEvent) => {
        const a = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null;
        if (!a) return;
        const target = document.querySelector(a.getAttribute("href") || "");
        if (!target) return;
        e.preventDefault();
        lenis?.scrollTo(target as HTMLElement, { offset: 0, duration: 1.2 });
      };
      document.addEventListener("click", onClick);
      return () => {
        document.removeEventListener("click", onClick);
        gsap.ticker.remove(tick);
        lenis?.destroy();
      };
    }
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      // Entrances: the parts of each section arrive in reading order, once.
      document.querySelectorAll<HTMLElement>("[data-reveal-group]").forEach((group) => {
        const parts = group.querySelectorAll<HTMLElement>("[data-reveal]");
        if (!parts.length) return;
        if (reduced) {
          parts.forEach((p) => (p.dataset.reveal = "done"));
          return;
        }
        gsap.to(parts, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "expo.out",
          stagger: 0.07,
          scrollTrigger: { trigger: group, start: "top 92%", once: true },
          onComplete: () => parts.forEach((p) => (p.dataset.reveal = "done")),
        });
      });
      // Header takes the ink of the chapter beneath it.
      document.querySelectorAll<HTMLElement>("[data-chapter]").forEach((el) => {
        ScrollTrigger.create({
          trigger: el,
          start: "top 40px",
          end: "bottom 40px",
          onToggle: (self) => {
            if (self.isActive) document.documentElement.style.setProperty("--header-ink", el.dataset.chapter === "light" ? "var(--deep)" : "var(--paper)");
          },
        });
      });
    });
    return () => ctx.revert();
  }, []);

  return null;
}
