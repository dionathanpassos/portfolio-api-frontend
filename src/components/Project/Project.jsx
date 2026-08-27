import { ExternalLink, Info, X } from "lucide-react"; // Importei o ícone X para fechar o modal
import GithubIcon from "../ui/GitHubIcon";
import { useEffect, useState } from "react";
import { getPortfilio } from "../../services/porfolioService";

export default function Project() {
  const [projects, setProjects] = useState([]);
  // Estado para armazenar o projeto selecionado para o modal
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    getPortfilio().then((response) => {
      setProjects(response.data.projects);
    });
  }, []);

  return (
    <section id="projects" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-widest text-primary mb-3">
            // Projetos
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
            Sistemas que desenvolvi.
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Uma seleção de projetos backend com foco em arquitetura, segurança e
            escalabilidade.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {projects.map((project) => (
            <article
              key={project.id}
              className="flex flex-col relative group card-surface rounded-xl p-6 hover-lift overflow-hidden hover:border-primary/30 transition-colors "
            >
              <div className="absolute top-0 right-0 h-0.5 w-24 bg-gradient-to-l from-primary to-transparent"></div>

              {/* Ao clicar no título, também abre o modal */}
              <h3 
                onClick={() => setSelectedProject(project)}
                className="text-lg text-foreground font-semibold tracking-tight mb-2 transition-colors hover:text-primary hover:underline cursor-pointer"
              >
                {project.title}
              </h3>
              <p className="text-muted-foreground font-mono text-xs mb-5 line-clamp-2">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-5">
                {project.skills.map((skill) => (
                  <span
                    key={skill.id}
                    className="rounded border border-border bg-secondary/40 px-2 py-0.5 text-[11px] font-mono text-muted-foreground"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>

              <div className="mt-auto flex items-center gap-2">
                <a
                  href={`${project.repositoryUrl}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex gap-2 items-center text-foreground text-xs font-medium px-3 py-2 rounded-md border border-border hover:text-primary hover:border-primary transition-colors"
                >
                  <GithubIcon className="w-4 h-4" />
                  Código
                </a>
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex gap-2 items-center text-primary bg-primary/10 text-xs font-medium px-3 py-2 rounded-md border border-primary/30 transition-colors hover:bg-primary/20"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Demo
                  </a>
                )}
                {/* Botão configurado para abrir o modal salvando o projeto atual no estado */}
                <button
                  onClick={() => setSelectedProject(project)}
                  className="inline-flex gap-2 items-center text-primary bg-primary/10 text-xs font-medium px-3 py-2 rounded-md border border-primary/30 transition-colors hover:bg-primary/20 cursor-pointer"
                >
                  <Info className="w-4 h-4" />
                  Mais Detalhes
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Renderização Condicional do Modal */}
      {selectedProject && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setSelectedProject(null)}
        >
          <div 
            className="relative w-full max-w-2xl rounded-xl border border-border bg-background p-6 shadow-2xl transition-all max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()} 
          >
          
            <button 
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
     
            <div className="mb-4">
              <p className="font-mono text-xs uppercase tracking-widest text-primary mb-1">
                Detalhes do Projeto
              </p>
              <h3 className="text-2xl font-semibold tracking-tight text-foreground">
                {selectedProject.title}
              </h3>
            </div>

            <div className="space-y-4">
              <p className="text-muted-foreground leading-relaxed text-sm whitespace-pre-line ">
                {selectedProject.description}
              </p>

              <div className="py-2">
                <h4 className="text-xs font-mono uppercase tracking-wider text-foreground mb-3">
                  Tecnologias Utilizadas
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.skills.map((skill) => (
                    <span
                      key={skill.id}
                      className="rounded border border-border bg-secondary/40 px-2 py-1 text-xs font-mono text-muted-foreground"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
               <div className="py-2">
                <h4 className="text-xs font-mono uppercase tracking-wider text-foreground mb-2">
                  Desafios técnicos
                </h4>
                <span className="text-muted-foreground leading-relaxed text-sm whitespace-pre-line">
                  implementação de multi-tenancy, controle de transições de status das ordens de serviço, 
                  validação das regras de pagamento, controle financeiro e organização do domínio para facilitar a evolução do sistema.
                </span>

              </div>
            </div>
            <div className="mt-8 pt-4 border-t border-border flex items-center justify-end gap-3">
              <a
                href={selectedProject.repositoryUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex gap-2 items-center text-foreground text-sm font-medium px-4 py-2 rounded-md border border-border hover:text-primary hover:border-primary transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
                Repositório
              </a>
              {selectedProject.demoUrl && (
                <a
                  href={selectedProject.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex gap-2 items-center text-primary bg-primary/10 text-sm font-medium px-4 py-2 rounded-md border border-primary/30 transition-colors hover:bg-primary/20"
                >
                  <ExternalLink className="w-4 h-4" />
                  Acessar Demo
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
