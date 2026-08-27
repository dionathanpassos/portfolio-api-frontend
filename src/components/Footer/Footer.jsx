import { ArrowUp, Mail } from "lucide-react";
import LinkedInIcon from "../ui/LinkedInIcon";
import GithubIcon from "../ui/GitHubIcon";
import { useEffect, useState } from "react";
import { getPortfilio } from "../../services/porfolioService";

export default function Footer() {
  const [social, setSocial] = useState([]);
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

   useEffect(() => {
      getPortfilio().then(response => {
        setSocial(response?.data.social)
      });
    }, []);

  return (
    <footer className="border-t border-border bg-background text-sm">
      <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Lado Esquerdo: Branding & Copyright */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <a href="#hero" className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-accent animate-pulse-dot"></span>
            <span className="text-white-custom font-mono">dionathan</span>
            <span className="text-muted-foreground font-mono">.dev</span>
          </a>
          <p className="text-xs text-muted-foreground font-mono">
            &copy; {currentYear} // Todos os direitos reservados.
          </p>
        </div>

        {/* Centro: Links de Navegação Rápida */}
        <div className="flex flex-wrap justify-center gap-6 text-xs font-mono">
          <a
            href="#about"
            className="text-muted-foreground hover:text-white-custom transition-colors"
          >
            ./sobre
          </a>
          <a
            href="#stack"
            className="text-muted-foreground hover:text-white-custom transition-colors"
          >
            ./stack
          </a>
          <a
            href="#timeline"
            className="text-muted-foreground hover:text-white-custom transition-colors"
          >
            ./trajetória
          </a>
          <a
            href="#projects"
            className="text-muted-foreground hover:text-white-custom transition-colors"
          >
            ./projetos
          </a>
        </div>

        {/* Lado Direito: Redes Sociais & Voltar ao Topo */}
        <div className="flex items-center gap-6">
          <div className="flex gap-4">
            <a
              href={`${social?.githubUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-white-custom transition-colors"
              aria-label="GitHub"
            >
              <GithubIcon className="w-5 h-5" />
            </a>
            <a
              href={`${social?.linkedinUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-white-custom transition-colors"
              aria-label="LinkedIn"
            >
              <LinkedInIcon className="w-5 h-5" />
            </a>
            <a
              href={`mailto:${social.email}`}
              className="text-muted-foreground hover:text-white-custom transition-colors"
              aria-label="E-mail"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>

          <span className="h-4 w-px bg-border hidden md:inline"></span>

          <button
            onClick={scrollToTop}
            className="p-2 border border-border rounded-md hover:border-primary/60 hover:text-primary text-muted-foreground transition-colors group"
            aria-label="Voltar ao topo"
          >
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
