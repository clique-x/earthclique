"use client";

import { useEffect, useState } from "react";
import { hero, site } from "@/content";
import { formatHour, haridwarHour, openStatus } from "@/lib/time";
import { HeroMark } from "./HeroMark";

function Title({ className }: { className: string }) {
  return (
    <span className={className} aria-hidden={className.includes("copy") ? true : undefined}>
      {hero.lines.map((l) => (
        <span className="line" key={l}>
          {l}
        </span>
      ))}
    </span>
  );
}

export function Hero() {
  const [status, setStatus] = useState<{ open: boolean; line: string; time: string } | null>(null);
  useEffect(() => {
    const update = () => {
      const h = haridwarHour();
      const s = openStatus(h, site.hours.open, site.hours.close);
      setStatus({ ...s, time: formatHour(h) });
    };
    update();
    const id = setInterval(update, 30000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero__field hero__field--paper" data-chapter="light" />
      <div className="hero__field hero__field--teal" data-chapter="dark" />
      <div className="hero__inner">
        <div className="hero__markwrap">
          <HeroMark />
        </div>
        <div className="hero__text">
          <div className="hero__stack">
            <h1 id="hero-title" className="hero__title hero__title--ink">
              <Title className="hero__title-ink" />
              <Title className="hero__title-copy" />
            </h1>
          </div>
          <div className="hero__support">
            <p>{hero.support}</p>
            <p lang="hi" style={{ fontSize: "var(--step-small)" }}>
              {site.hindi}
            </p>
            <div className="hero__status" data-open={status?.open ?? true} aria-live="polite">
              <i aria-hidden="true" />
              <span>{status ? `${status.line} · ${status.time} in Haridwar` : site.hours.label}</span>
            </div>
            <div className="hero__actions">
              <a className="btn" href={hero.action.href} target="_blank" rel="noopener">
                {hero.action.label}
              </a>
              <a className="btn btn--ghost" href={hero.secondary.href}>
                {hero.secondary.label}
              </a>
            </div>
          </div>
          <p className="hero__hint">Drag the peak to turn it. The sun follows the real time in Haridwar.</p>
        </div>
      </div>
    </section>
  );
}
