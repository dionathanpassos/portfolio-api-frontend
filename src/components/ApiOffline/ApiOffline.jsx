import {
  Mail,  
  RefreshCw,
  ServerCrash,

} from "lucide-react";
import GithubIcon from "../ui/GitHubIcon";
import LinkedinIcon from "../ui/LinkedInIcon";

export default function ApiOffline() {
  return (
    <div class="mx-auto max-w-5xl px-6 py-24 md:py-32">
      <div class="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-8">
        <span class="inline-block h-1.5 w-1.5 rounded-full bg-destructive animate-pulse-dot"></span>
        <span>status: api unreachable</span>
        <span class="text-border">·</span>
        <span>GET /api/health → 503</span>
      </div>
      <div class="flex items-start gap-4">
        <span class="flex h-12 w-12 shrink-0 items-center justify-center rounded-md border border-border bg-secondary text-destructive/90">
          <ServerCrash className="h-6 w-6" />
        </span>
        <div>
          <h1 class="text-foreground text-3xl md:text-4xl font-semibold tracking-tight">
            Servidor temporariamente indisponível
          </h1>
          <p class="mt-3 text-muted-foreground leading-relaxed max-w-5xl">
            Não foi possível carregar os dados do portfólio agora. A API que
            alimenta o conteúdo está fora do ar ou passando por manutenção. Você
            ainda pode entrar em contato pelos canais abaixo.
          </p>
        </div>
      </div>
      <div class="mt-8 card-surface rounded-xl overflow-hidden"></div>
      
      <section class="mt-12">
        <p class="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-4">
          enquanto isso, me encontre em
        </p>
        <div class="grid gap-3 sm:grid-cols-3">
          <a
            href="https://github.com/dionathanpassos"
            target="_blank"
            rel="noreferrer"
            class="card-surface group flex items-center justify-between rounded-xl p-4 hover-lift"
          >
            <div class="flex items-center gap-3">
              <span class="flex h-9 w-9 items-center justify-center rounded-md bg-secondary text-primary">
                <GithubIcon className={"w-4 h-4"} />
              </span>
              <div>
                <p class="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                  GitHub
                </p>
                <p class="text-xs text-foreground">@dionathanpassos</p>
              </div>
            </div>
            <span class="text-muted-foreground group-hover:text-primary transition-colors">
              →
            </span>
          </a>
          <a
            href="https://linkedin.com/in/dionathanpassos"
            target="_blank"
            rel="noreferrer"
            class="card-surface group flex items-center justify-between rounded-xl p-4 hover-lift"
          >
            <div class="flex items-center gap-3">
              <span class="flex h-9 w-9 items-center justify-center rounded-md bg-secondary text-primary">
                <LinkedinIcon className={"w-4 h-4"} />
              </span>
              <div>
                <p class="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                  LinkedIn
                </p>
                <p class="text-xs text-foreground">in/dionathanpassos</p>
              </div>
            </div>
            <span class="text-muted-foreground group-hover:text-primary transition-colors">
              →
            </span>
          </a>
          <a
            href="mailto:devdionathanpassos@gmail.com"
            target="_blank"
            rel="noreferrer"
            class="card-surface group flex items-center justify-between rounded-xl p-4 hover-lift"
            data-tsd-source="/src/components/portfolio/ApiOffline.tsx:123:5"
          >
            <div
              class="flex items-center gap-3"
              data-tsd-source="/src/components/portfolio/ApiOffline.tsx:129:7"
            >
              <span
                class="flex h-9 w-9 items-center justify-center rounded-md bg-secondary text-primary"
                data-tsd-source="/src/components/portfolio/ApiOffline.tsx:130:9"
              >
                <Mail className="w-4 h-4" />
              </span>
              <div data-tsd-source="/src/components/portfolio/ApiOffline.tsx:133:9">
                <p
                  class="font-mono text-[11px] uppercase tracking-widest text-muted-foreground"
                >
                  Email
                </p>
                <p
                  class="text-xs text-foreground"
                >
                  devdionathanpassos@gmail.com
                </p>
              </div>
            </div>
            <span
              class="text-muted-foreground group-hover:text-primary transition-colors"
              data-tsd-source="/src/components/portfolio/ApiOffline.tsx:140:7"
            >
              →
            </span>
          </a>
        </div>
      </section>
      <p class="mt-10 font-mono text-[11px] text-muted-foreground">
        Dionathan Passos · Backend Developer · Java &amp; Spring Boot
      </p>
    </div>
  );
}
