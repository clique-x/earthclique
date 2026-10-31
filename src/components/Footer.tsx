import { footer, site } from "@/content";

export function Footer() {
  const [user, domain] = site.email.label.split("@");
  return (
    <footer className="footer" data-chapter="dark" data-reveal-group>
      <div className="footer__top">
        <div className="footer__notes">
          <div data-reveal>
            <strong>{site.name}</strong>
            {footer.description}
          </div>
          <div data-reveal>
            <strong>{site.owner.name}</strong>
            {site.owner.title}
          </div>
          <div data-reveal>
            <strong>{site.address.unit}</strong>
            {site.address.building}, Haridwar 249403 · {site.hours.label}
          </div>
        </div>
        <div className="footer__top-right">
          <a href="#top">Back to top</a>
        </div>
      </div>
      <div className="footer__line" data-reveal>
        <a href={site.email.href}>
          {user}
          <br />@{domain}
        </a>
      </div>
      <div className="footer__meta">
        <nav aria-label="Links">
          {footer.links.map((l) => (
            <a key={l.label} href={l.href} target={l.href.startsWith("http") ? "_blank" : undefined} rel="noopener">
              {l.label}
            </a>
          ))}
          <a href={site.phone2.tel}>{site.phone2.label}</a>
        </nav>
        <span>{footer.credits}</span>
        <span>Haridwar · {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
}
