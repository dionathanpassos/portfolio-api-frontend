import { useEffect, useState } from "react";
import { getPortfilio } from "../../services/porfolioService";
// Importação dos ícones do Lucide correspondentes à imagem
import { Server, Database, Cloud, Code, Wrench } from "lucide-react";

export default function Stack() {
  const [skills, setSkills] = useState([]);
  const [about, setAbout] = useState([]);

  useEffect(() => {
    getPortfilio().then((response) => {
      setSkills(response.data.skills);
      setAbout(response.data.about);
    });
  }, []);

  // Definição das categorias com cores temáticas e ícones do Lucide
  const categories = [
    { 
      id: "BACKEND", 
      label: "Backend", 
      icon: Server, 
      color: "text-teal-400 bg-teal-950/40 border-teal-800/40" 
    },
    { 
      id: "DATABASE", 
      label: "Database", 
      icon: Database, 
      color: "text-emerald-400 bg-emerald-950/40 border-emerald-800/40" 
    },
    { 
      id: "DEVOPS", 
      label: "DevOps", 
      icon: Cloud, 
      color: "text-sky-400 bg-sky-950/40 border-sky-800/40" 
    },
    { 
      id: "FRONTEND", 
      label: "Frontend", 
      icon: Code, 
      color: "text-violet-400 bg-violet-950/40 border-violet-800/40" 
    },
    { 
      id: "TOOLS", 
      label: "Tools", 
      icon: Wrench, 
      color: "text-amber-400 bg-amber-950/40 border-amber-800/40" 
    },
  ];

  // Função para gerar as iniciais idênticas à imagem (Ex: "Spring Boot" -> "SB")
  const getInitials = (name) => {
    if (!name) return "";
    
    // Tratamentos para strings específicas que possuem barras ou caracteres especiais
    if (name.includes("/")) {
      const parts = name.split("/");
      return (parts[0].trim().charAt(0) + parts[1].trim().charAt(0)).substring(0, 3);
    }
    
    const words = name.trim().split(/\s+/);
    if (words.length >= 2) {
      return (words[0].charAt(0) + words[1].charAt(0)).substring(0, 3);
    }
    return name.substring(0, 2);
  };

  return (
    <section id="stack" className="py-24 ">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-14 max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-widest text-primary mb-3">
            // STACK
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
            Tecnologias do dia a dia.
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Ferramentas que uso para construir sistemas seguros, escaláveis e bem arquitetados.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((category) => {
            const IconComponent = category.icon;
            const filteredSkills = skills
              .filter((skill) => skill.categorySkills === category.id)
              .sort((a, b) => a.name.localeCompare(b.name));

            return (
              <div 
                key={category.id} 
                className="flex flex-col bg-[#161920]/80 border border-zinc-800/60 rounded-2xl p-5 hover:border-zinc-700/80 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className={`p-2 rounded-lg border ${category.color}`}>
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <h3 className="text-zinc-200 font-semibold text-base tracking-wide">
                    {category.label}
                  </h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
                  {filteredSkills.length > 0 ? (
                    filteredSkills.map((skill) => (
                      <div 
                        key={skill.name} 
                        className="group flex items-center gap-3 py-0.5"
                      >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center border font-semibold text-[10px] tracking-tighter shrink-0 select-none ${category.color}`}>
                          {getInitials(skill.name)}
                        </div>
                        <span className="text-sm font-medium text-zinc-300 group-hover:text-white transition-colors duration-200">
                          {skill.name}
                        </span>
                      </div>
                    ))
                  ) : (
                    <span className="text-xs text-zinc-600 italic px-1">Nenhuma cadastrada</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
