"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { services, type Sheet } from "@/content";

gsap.registerPlugin(ScrollTrigger);

/** Stacking colour sheets: each sheet is sticky and the one behind shrinks slightly as the next slides over it (the Skiper UI card-stack pattern, driven by GSAP). */
export function Services() {
  const stack = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const sheets = gsap.utils.toArray<HTMLElement>(".sheet");
      sheets.forEach((sheet, i) => {
        if (i === sheets.length - 1) return;
        gsap.to(sheet, {
          scale: 1 - (sheets.length - 1 - i) * 0.04,
          ease: "none",
          scrollTrigger: { trigger: sheets[i + 1], start: "top bottom", end: "top top", scrub: true },
        });
      });
    }, stack);
    return () => ctx.revert();
  }, []);

  return (
    <section className="services" id="services" aria-labelledby="services-title" data-chapter="light">
      <div className="services__head" data-reveal-group>
        <h2 className="h2" id="services-title" data-reveal>
          Nine services, one shop
        </h2>
      </div>
      <div ref={stack}>
        {services.map((sheet, i) => (
          <SheetCard key={sheet.id} sheet={sheet} i={i} />
        ))}
      </div>
    </section>
  );
}

function SheetCard({ sheet, i }: { sheet: Sheet; i: number }) {
  return (
    <article className="sheet" data-tone={sheet.tone} data-chapter={sheet.tone === "mist" ? "light" : "dark"} style={{ "--i": i } as React.CSSProperties} aria-labelledby={`sheet-${sheet.id}`}>
      <div className="sheet__band">
        <h3 id={`sheet-${sheet.id}`}>{sheet.title}</h3>
      </div>
      <div className="sheet__pic">
        <img src={sheet.picture.src} alt={sheet.picture.alt} width={1200} height={1000} loading={i === 0 ? "eager" : "lazy"} decoding="async" />
      </div>
      <div className="sheet__body">
        <p>{sheet.intro}</p>
        <div className="sheet__list">
          {sheet.items.map((it) => (
            <a key={it.name} href={it.href} target="_blank" rel="noopener">
              <span>{it.name}</span>
              {it.note && <small>{it.note}</small>}
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}
