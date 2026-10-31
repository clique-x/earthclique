import { enquire, skills } from "@/content";

export function Skills() {
  return (
    <section className="skills" id="skills" aria-labelledby="skills-title" data-chapter="light" data-reveal-group>
      <p className="skills__para" data-reveal>
        <strong id="skills-title">{skills.heading}:</strong>{" "}
        {skills.names.map((n, i) => (
          <span key={n}>
            <a href={enquire(n)} target="_blank" rel="noopener">
              {n}
            </a>
            {i < skills.names.length - 1 ? ", " : "."}
          </span>
        ))}
      </p>
      <div className="skills__meta" data-reveal>
        <span>{skills.note}</span>
        <a href={skills.product.href} target="_blank" rel="noopener">
          {skills.product.name}, {skills.product.note}
        </a>
      </div>
    </section>
  );
}
