import { Activity, ArrowUpRight, ChartColumn, Clock, FolderGit2, GitBranch, Layers, Mail, Sparkle, Sparkles, User } from "lucide-react";
import CardSection from "../../../components/CardSection/CardSection";
import TitleSection from "../../../components/TitleSection/TitleSection";

export default function OverviewPage() {
  return (
    <div className="space-y-6 animate-fade-up">
      <TitleSection
        title={"Visão geral"}
        subtitle={
          "Edite cada seção do portfolio. Todas as alterações são publicadas via API."
        }
      />
      <div className="grid lg:grid-cols-2 gap-4">
        <CardSection>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                Última publicação
              </span>
              <span className="bg-primary/15 p-1.5 rounded-md">
                <Clock className="w-5 h-5 text-primary" />
              </span>
            </div>
            <span className="text-2xl font-semibold">há 2h</span>
          </div>
        </CardSection>
        <CardSection>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">API status</span>
              <span className="bg-primary/15 p-1.5 rounded-md">
                <Activity className="w-5 h-5 text-primary" />
              </span>
            </div>
            <div className="flex items-center">
              <span className="text-2xl font-semibold mr-4">healthy</span>
              <span className="inline-block h-2 w-2 rounded-full bg-accent animate-pulse-dot"></span>
              <span className="text-xs text-accent font-mono ml-2">200</span>
            </div>
          </div>
        </CardSection>
      </div>
      <CardSection
        title={"Seções editáveis"}
        subtitle={"Selecione uma seção para gerenciar seu conteúdo."}
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 ">
          <a
            href="/admin/hero"
            className="group card-surface rounded-lg p-4 flex items-start gap-3 hover:border-primary/30"
          >
            <div className="h-9 w-9 rounded-md bg-surface-elevated grid place-items-center text-primary group-hover:bg-primary/10 transition-colors">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">Hero</span>
                <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <p className="mt-0.5 text-xs text-muted-foreground truncate">
                headline, subheadline, CTA
              </p>
              <div className="mt-2 inline-flex items-center gap-1 rounded border border-border bg-background/40 px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground">
                1 registro
              </div>
            </div>
          </a>

          <a
            href="/admin/sobre"
            className="group card-surface rounded-lg p-4 flex items-start gap-3 hover:border-primary/30"
          >
            <div className="h-9 w-9 rounded-md bg-surface-elevated grid place-items-center text-primary group-hover:bg-primary/10 transition-colors">
            <User className="h-4 w-4"/>
             
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">Sobre</span>
                <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <p className="mt-0.5 text-xs text-muted-foreground truncate">
                bio, foto, highlights
              </p>
              <div className="mt-2 inline-flex items-center gap-1 rounded border border-border bg-background/40 px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground">
                1 registro
              </div>
            </div>
          </a>

          <a
            href="/admin/stack"
            className="group card-surface rounded-lg p-4 flex items-start gap-3 hover:border-primary/30"
          >
            <div className="h-9 w-9 rounded-md bg-surface-elevated grid place-items-center text-primary group-hover:bg-primary/10 transition-colors">
            <Layers className="h-4 w-4" />              
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">Stack</span>
                <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <p className="mt-0.5 text-xs text-muted-foreground truncate">
                tecnologias e níveis
              </p>
              <div className="mt-2 inline-flex items-center gap-1 rounded border border-border bg-background/40 px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground">
                12 registros
              </div>
            </div>
          </a>

          <a
            href="/admin/projetos"
            className="group card-surface rounded-lg p-4 flex items-start gap-3 hover:border-primary/30"
          >
            <div className="h-9 w-9 rounded-md bg-surface-elevated grid place-items-center text-primary group-hover:bg-primary/10 transition-colors">
              <FolderGit2 className="h-4 w-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">
                  Projetos
                </span>
                <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <p className="mt-0.5 text-xs text-muted-foreground truncate">
                case studies, arquitetura
              </p>
              <div className="mt-2 inline-flex items-center gap-1 rounded border border-border bg-background/40 px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground">
                6 registros
              </div>
            </div>
          </a>

          <a
            href="/admin/timeline"
            className="group card-surface rounded-lg p-4 flex items-start gap-3 hover:border-primary/30"
          >
            <div className="h-9 w-9 rounded-md bg-surface-elevated grid place-items-center text-primary group-hover:bg-primary/10 transition-colors">
              <GitBranch className="h-4 w-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">
                  Timeline
                </span>
                <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <p className="mt-0.5 text-xs text-muted-foreground truncate">
                experiência profissional
              </p>
              <div className="mt-2 inline-flex items-center gap-1 rounded border border-border bg-background/40 px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground">
                4 registros
              </div>
            </div>
          </a>

          <a
            href="/admin/contato"
            className="group card-surface rounded-lg p-4 flex items-start gap-3 hover:border-primary/30"
          >
            <div className="h-9 w-9 rounded-md bg-surface-elevated grid place-items-center text-primary group-hover:bg-primary/10 transition-colors">
              <Mail className="h-4 w-4"/>
              
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">Contato</span>
                <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <p className="mt-0.5 text-xs text-muted-foreground truncate">
                email, social, formulário
              </p>
              <div className="mt-2 inline-flex items-center gap-1 rounded border border-border bg-background/40 px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground">
                1 registro
              </div>
            </div>
          </a>
        </div>
      </CardSection>
    </div>
  );
}
