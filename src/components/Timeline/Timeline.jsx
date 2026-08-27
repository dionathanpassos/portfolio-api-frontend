import { useEffect, useState } from "react";
import { getPortfilio } from "../../services/porfolioService";

export default function Timeline() {
  const [timelines, setTimelines] = useState([]);

  useEffect(() => {
    getPortfilio().then((response) => {
      setTimelines(response.data.timelines);
    });
  });
  return (
    <section id="timeline" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-widest text-primary mb-3">
            // Trajetória
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
            Evolução como desenvolvedor.
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Marcos da minha jornada estudando e construindo software.
          </p>
        </div>

        <ol className="relative pl-8 border-l border-border space-y-10">
          {timelines.map((timeline) => (
            <li className="relative" key={timeline.id}>
              <span className="flex justify-center absolute -left-10 top-0 h-4 w-4 items-center rounded-full border border-primary/40 bg-background">
                <span className="w-2 h-2 rounded-full bg-primary"></span>
              </span>
              <p className="font-mono text-primary text-xs">
                {timeline.startDate} à {timeline.endDate ?? "Atualmente"}
              </p>
              <h3 className="text-foreground text-lg mt-1">{timeline.title}</h3>
              <p className="text-muted-foreground text-sm">
                {timeline.subtitle.toUpperCase()}
              </p>
              <p className="text-muted-foreground text-sm">
                {timeline.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
