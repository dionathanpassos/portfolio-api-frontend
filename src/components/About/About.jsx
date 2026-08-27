import { useEffect, useState } from "react";
import { getPortfilio } from "../../services/porfolioService";

export default function About() {

  const [skills, setSkills] = useState([]);
  const [about, setAbout] = useState([]);

  useEffect(() => {
    getPortfilio().then(response => {
      setSkills(response.data.skills)
      setAbout(response.data.about)
    });
  }, []);

  return (
    <section id="about" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-widest text-primary mb-3">
            // Sobre
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
            {about.title}
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed"></p>
        </div>

        <div className="grid gap-10 md:grid-cols-5">
          <div className="md:col-span-3 space-y-5 text-muted-foreground leading-relaxed">
            <p>              
              {about.paragraphOne}
            </p>
            <p
            dangerouslySetInnerHTML={{__html: about.paragraphTwo}}
            >
              
            </p>
            <p>
              {about.paragraphThree}
            </p>
          </div>
          <div className="md:col-span-2">
            <div className="card-surface rounded-xl p-6">
              <p className="font-mono text-xs text-muted-foreground mb-4">
                // expertise
              </p>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span key={skill.id} className="rounded-md border border-border bg-secondary/40 px-2.5 py-1 text-xs font-mono text-foreground">
                  {skill.name}
                </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
