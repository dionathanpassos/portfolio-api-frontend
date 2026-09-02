import { ExternalLink, Info, X } from "lucide-react"; // Importei o ícone X para fechar o modal
import GithubIcon from "../ui/GitHubIcon";
import { useEffect, useState } from "react";
import { getPortfilio } from "../../services/porfolioService";
import ReactMarkdown from "react-markdown";
import { useNavigate } from "react-router-dom";

export default function Project() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    getPortfilio().then((response) => {
      setProjects(response.data.projects);
    });
  }, []);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedProject]);

  const navigate = useNavigate();

  function handleOpenDetails(project) {
    navigate(`/project/${project.slug}`);
  }

  return (
    <section id="projects" className="overflow-hidden py-18">
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
              <div className="absolute top-0 right-0 h-0.5 w-24 bg-linear-to-l from-primary to-transparent"></div>

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
                <button
                  onClick={() => handleOpenDetails(project)}
                  className="inline-flex gap-2 items-center text-primary bg-primary/10 text-xs font-medium px-3 py-2 rounded-md border border-primary/30 transition-colors hover:bg-primary/20 cursor-pointer"
                >
                  <Info className="w-4 h-4" />
                  Detalhes
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-600/60 backdrop-blur-xs"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="relative w-full max-w-4xl rounded-xl border border-border bg-background shadow-2xl transition-all max-h-[85vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6 pb-4 border-b border-border">
              <p className="font-mono text-xs uppercase tracking-widest text-primary mb-1">
                Detalhes do Projeto
              </p>
              <h3 className="text-xl font-semibold tracking-tight text-foreground pr-6">
                {selectedProject.title}
              </h3>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin scrollbar-track-background scrollbar-thumb-border hover:scrollbar-thumb-primary/60">
            <h4 className="text-xs font-mono uppercase tracking-wider text-foreground mb-3">
                  Descricao
                </h4>
              <p className="text-muted-foreground leading-relaxed text-sm whitespace-pre-line">
                <ReactMarkdown>
                  {selectedProject.description}
                </ReactMarkdown>
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

              {selectedProject.challenges && (
                <div className="py-2">
                <h4 className="text-xs font-mono uppercase tracking-wider text-foreground mb-2">
                  Desafios técnicos
                </h4>
                <span className="text-muted-foreground leading-relaxed text-sm whitespace-pre-line">
                  
                  {selectedProject.challenges}
                </span>
              </div>
              )}

            </div>

            <div className="p-6 pt-4 border-t border-border flex items-center justify-end gap-3 bg-background rounded-b-xl">
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
