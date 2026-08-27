import { ArrowUpRight } from "lucide-react";
import GithubIcon from "../ui/GitHubIcon";
import LinkedinIcon from "../ui/LinkedInIcon";
import { useEffect, useState } from "react";
import { getPortfilio } from "../../services/porfolioService";

export default function Hero() {

   
    const [hero, setHero] = useState({});
    const [social, setSocial] = useState({});
  
    useEffect(() => {
      getPortfilio().then(response => {
        setSocial(response?.data.social),
        setHero(response?.data.hero)
      });
    }, []);

  return (
    <section id="hero" className="relative overflow-hidden pt-32 pb-24 md:pt-44 md:pb-36">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-50 left-1/2 h-175 w-175 -translate-x-1/2 rounded-full bg-cyan-400/5 blur-3xl"></div>
      </div>
      <div className="mx-auto max-w-6xl px-6 items-center flex flex-col">
        <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground mb-6 animate-fade-up">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent animate-pulse-dot"></span>
          <span>status: disponível para projetos</span>
        </div>

        <h1 className="text-center text-4xl md:text-7xl text-foreground font-semibold tracking-tight leading-[1.05] animate-fade-up">
          {hero?.name}
          <span className="text-center block text-3xl md:text-7xl text-gradient font-semibold mt-2 pb-2">
            {hero.position  }
          </span>
        </h1>

        <p className="mt-6 text-muted-foreground text-sm md:text-md animate-fade-up tracking-tight">
          <span className="text-primary mr-1">$</span>
          {hero?.eyebrow}
        </p>

        <p className="text-muted-foreground mt-6 max-w-xl text-sm md:text-lg leading-relaxed animate-fade-up text-center">
          {hero?.introdution}
        </p>

        <div className="mt-10 flex flex-col items-center md:flex-row flex-wrap gap-3 animate-fade-up">
          <a
            href="#projects"
            className="group inline-flex w-fit items-center bg-primary text-primary-foreground px-5 py-3 text-sm font-medium gap-2 rounded-md hover:opacity-90 transition-all "
          >
            Ver projetos
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 " />
          </a>

          <div className="flex gap-4">
            <a
            href={`${social?.githubUrl}`}
            target="_blank"
            className="group inline-flex items-center border border-border text-foreground px-5 py-3 text-sm font-medium gap-2 rounded-md hover:text-primary hover:border-primary transition-all "
          >
            <GithubIcon className="w-4 h-4"/>
            GitHub
          </a>

          <a
            href={`${social?.linkedinUrl}`}
            target="_blank"
            className="group inline-flex items-center border border-border text-foreground px-5 py-3 text-sm font-medium gap-2 rounded-md hover:text-primary hover:border-primary transition-all "
          >
            <LinkedinIcon className="w-4 h-4"/>
            Linkedin
          </a>
          </div>
        </div>

        <div className="mt-16 max-w-lg card-surface glow-cyan rounded-lg p-4 font-mono text-xs animate-fade-up">
          <div className="flex items-center gap-1.5 mb-3">
            <span className="h-2.5 w-2.5 rounded-full bg-destructive/60"></span>
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/60"></span>
            <span className="h-2.5 w-2.5 rounded-full bg-accent/70"></span>

            <span className="ml-3 text-muted-foreground">~/api/hire-me</span>
          </div>
         

          <pre className="text-muted-foreground leading-relaxed overflow-x-auto">
            <code>
              <span className="text-primary">@GetMapping</span>(
              <span className="text-accent">"/status"</span>){"\n"}
              <span className="text-primary">public</span>{" "}
              ResponseEntity&lt;String&gt;{" "}
              <span className="text-foreground">status</span>()
              {" {"}
              {"\n"}
              {"  "}
              <span className="text-primary">return</span> ResponseEntity.ok(
              <span className="text-accent">"available for projects"</span>
              );
              {"\n"}
              {"}"}
            </code>
          </pre>
        </div>
      </div>
    </section>
  );
}
