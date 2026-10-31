import { contact, MAP, site } from "@/content";

export function Contact() {
  return (
    <section className="contact" id="contact" aria-label="Address and contact" data-chapter="light" data-reveal-group>
      <p className="row row--first" data-reveal>
        <span>{site.address.building}</span>
        <img className="row__pic" src="/pictures/peak-night.webp" alt="The peak at night, from the site's own 3D scene" width={96} height={96} loading="lazy" decoding="async" />
      </p>
      <p className="row" data-reveal>
        <a href={MAP} target="_blank" rel="noopener">
          {site.address.unit}
        </a>
      </p>
      <p className="row" data-reveal>
        <span>{site.address.city}</span>
      </p>
      <p className="row" data-reveal>
        <span>{site.hours.label}</span>
      </p>
      <p className="row" data-reveal>
        <a href={site.phone.tel}>{site.phone.label}</a>
      </p>
      <p className="row row--greet" data-reveal>
        <span>{contact.greeting}</span>
        <a className="row__btn" href={contact.action.href} target="_blank" rel="noopener" aria-label={contact.action.label}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        </a>
      </p>
    </section>
  );
}
