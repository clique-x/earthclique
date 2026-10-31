import { clients } from "@/content";

export function Clients() {
  return (
    <section className="clients" id="clients" aria-labelledby="clients-title" data-chapter="light" data-reveal-group>
      <div className="tiles">
        <h2 className="tile tile--head" id="clients-title" data-reveal>
          {clients.heading}
        </h2>
        {clients.names.map((n) => (
          <div className="tile" key={n} data-reveal>
            {n}
          </div>
        ))}
      </div>
    </section>
  );
}
