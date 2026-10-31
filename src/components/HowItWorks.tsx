"use client";

import { useState } from "react";
import { how } from "@/content";

export function HowItWorks() {
  const [open, setOpen] = useState(0);
  return (
    <section className="how" id="how" aria-labelledby="how-title" data-chapter="light" data-reveal-group>
      <div className="how__intro">
        <h2 className="h2" id="how-title" data-reveal>
          {how.heading}
        </h2>
        <p data-reveal>{how.intro}</p>
      </div>
      <div className="acc" data-reveal>
        {how.stages.map((s, i) => (
          <button
            key={s.name}
            className="acc__stage"
            data-i={i}
            data-open={open === i}
            aria-expanded={open === i}
            onClick={() => setOpen(i)}
            onFocus={() => setOpen(i)}
          >
            <span className="acc__pic" aria-hidden="true">
              <img src={s.picture.src} alt="" width={1200} height={1000} loading="lazy" decoding="async" />
            </span>
            <span className="acc__name">{s.name}</span>
            <span className="acc__text">{s.text}</span>
            <span className="acc__side" aria-hidden="true">
              {s.name}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
