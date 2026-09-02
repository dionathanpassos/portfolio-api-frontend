import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { getProject } from "../../services/porfolioService";
import GithubIcon from "../../components/ui/GitHubIcon";
import { ArrowLeft, ExternalLink } from "lucide-react";

export default function ProjectDetailsPage() {
  const [project, setProject] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function loadPortfolio() {
      try {
        const projectResponse = await getProject(slug);
        setProject(projectResponse);
      } catch (error) {
        console.log(error);
      }
    }

    loadPortfolio();
  }, [slug]);

  if (!project) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center font-sans">
        <span className="animate-pulse tracking-widest uppercase text-xs text-[#00f2fe]">
          Carregando...
        </span>
      </div>
    );
  }


  return (
    <div className="min-h-screen text-secondary-foreground font-sans antialiased selection:bg-background">
      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Botão Voltar */}
        <button
          onClick={() => navigate(-1)}
          className="group mb-6 flex items-center gap-2 text-xs uppercase tracking-wider text-foreground hover:text-primary transition-colors duration-200 cursor-pointer"
        >
          <span className="transform group-hover:-translate-x-1 transition-transform">
            <ArrowLeft size={20}/>
          </span>{" "}
          Voltar para projetos
        </button>

        {/* Card Principal */}
        <div className="relative rounded-2xl bg-surface-elevated border border-border p-8 md:p-10 shadow-2xl shadow-black/40 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-primary/60 to-transparent" />

          {/* Cabeçalho */}
          <header className="mb-8 border-b border-border pb-8">
            <div className="flex flex-col justify-between gap-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-primary mb-1 block">
                  // PROJETO
                </span>
                <h1 className="text-lg lg:text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                  {project.title}
                </h1>
              </div>
              <div>
                <span className="px-3 py-1 text-xs font-mono rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20 uppercase tracking-wider">
                  {project.status}
                </span>
              </div>
            </div>

            {/* Tecnologias */}
            <div className="flex flex-col gap-2 mt-6">
              <h2 className="text-xs font-bold uppercase tracking-widest text-primary my-6">
                // Tecnologias Utilizadas
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.skills?.map((skill) => (
                <span
                  key={skill.id}
                  className="w-fit px-2.5 py-1 text-sm font-mono rounded bg-surface text-muted-foreground border border-border truncate"
                >
                  {skill.name}{" "}
                </span>
              ))}
              </div>
            </div>
          </header>

          <div className="flex flex-wrap gap-4 mb-10">
            {project.repositoryUrl && (
              <a
                href={project.repositoryUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex gap-2 items-center text-foreground text-sm font-medium px-4 py-2 rounded-md border border-border hover:text-primary hover:border-primary transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
                Repositório
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex gap-2 items-center text-primary bg-primary/10 text-sm font-medium px-4 py-2 rounded-md border border-primary/30 transition-colors hover:bg-primary/20"
              >
                <ExternalLink className="w-4 h-4" />
                Demo
              </a>
            )}
          </div>

          <div className="space-y-10">
            {project.challenges && (
              <section className="p-6 rounded-xl bg-[#131924]/40 border border-gray-800/60">
                <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />{" "}
                  Desafios do Desenvolvimento
                </h2>
                <p className="text-sm leading-relaxed text-gray-400">
                  {project.challenges}
                </p>
              </section>
            )}

            {project.description && (
              <section className="border-t border-gray-800/80 pt-8">
                <h2 className="text-xs font-bold uppercase tracking-widest text-primary mb-6">
                  // Readme
                </h2>

                <ReactMarkdown
                  components={{
                    // Customização de títulos (# e ##)
                    h1: ({ children }) => (
                      <h3 className="text-xl font-bold text-foreground mt-8 mb-4 border-b border-border pb-2">
                        {children}
                      </h3>
                    ),
                    h2: ({ children }) => (
                      <h4 className="text-lg font-semibold text-foreground mt-6 mb-3 flex items-center gap-2">
                        {children}
                      </h4>
                    ),
                    // Parágrafos de texto comum
                    p: ({ children }) => (
                      <p className="text-sm leading-relaxed text-secondary-foreground mb-4">
                        {children}
                      </p>
                    ),
                    // Listas (como as de funcionalidades)
                    ul: ({ children }) => (
                      <ul className="list-none space-y-2 mb-6 font-mono text-sm pl-2">
                        {children}
                      </ul>
                    ),
                    li: ({ children }) => (
                      <li className="text-muted-foreground flex items-start gap-2 before:content-['▹'] before:text-primary">
                        {children}
                      </li>
                    ),
                    
                    // Linhas separadoras (---)
                    hr: () => <hr className="border-border my-6" />,

                    // Blocos de código de terminal (ex: docker compose)
                    code: ({ inline, children }) => {
                      return inline ? (
                        <code className="text-[#00f2fe] bg-[#131924] px-1.5 py-0.5 rounded font-mono text-xs">
                          {children}
                        </code>
                      ) : (
                        <pre className="bg-[#07090e] border border-border rounded-lg p-4 font-mono text-xs text-gray-300 overflow-x-auto my-4 shadow-inner">
                          <code>{children}</code>
                        </pre>
                      );
                    },
                  }}
                >
                  {project.description}
                </ReactMarkdown>
              </section>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
