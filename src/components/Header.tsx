"use client";

import { useEffect, useState } from "react";
import { hero, nav, site } from "@/content";
import { TextRoll } from "./TextRoll";
import { Mark } from "./Mark";

export function Header() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    document.documentElement.classList.toggle("lenis-stopped", open);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header className="header" data-header>
        <a href="#top" className="header__mark" aria-label="EarthClique, back to top">
          <Mark />
          <span>EarthClique</span>
        </a>
        <nav className="header__links" aria-label="Sections">
          {nav.map((l) => (
            <a key={l.href} href={l.href}>
              <TextRoll>{l.label}</TextRoll>
            </a>
          ))}
        </nav>
        <div className="header__cta">
          <a className="btn" href={hero.action.href} target="_blank" rel="noopener">
            WhatsApp
          </a>
          <button className="header__menu" aria-expanded={open} aria-controls="menu" onClick={() => setOpen(true)}>
            Menu
          </button>
        </div>
      </header>
      <div id="menu" className="menu" data-open={open} aria-hidden={!open}>
        <div className="menu__top">
          <span className="header__mark">
            <Mark />
            <span>EarthClique</span>
          </span>
          <button onClick={() => setOpen(false)} style={{ fontWeight: 700, padding: "10px 4px" }}>
            Close
          </button>
        </div>
        <nav className="menu__links" aria-label="Sections">
          {nav.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
        </nav>
        <div className="menu__bottom">
          <a className="btn" href={hero.action.href} target="_blank" rel="noopener">
            {hero.action.label}
          </a>
          <a href={site.phone.tel}>{site.phone.label}</a>
          <span>{site.hours.label}</span>
        </div>
      </div>
    </>
  );
}
