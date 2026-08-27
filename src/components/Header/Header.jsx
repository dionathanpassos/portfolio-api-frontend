import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react"; // Importei os ícones Menu e X (Fechar)

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  // Estado para controlar a abertura do menu mobile
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Fecha o menu móvel automaticamente ao clicar em um link
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 text-sm ${
        scrolled || isOpen
          ? "backdrop-blur-xl bg-background/70 border-b border-border"
          : ""
      }`}
    >
      <nav className="h-16 max-w-6xl mx-auto px-6 flex justify-between items-center relative z-50">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-2" onClick={handleLinkClick}>
          <span className="inline-block h-2 w-2 rounded-full bg-accent animate-pulse-dot"></span>
          <span className="text-white-custom font-mono">dionathan</span>
          <span className="text-muted-foreground font-mono">.dev</span>
        </a>

        {/* Links para Desktop (Escondidos em telas pequenas: md:flex) */}
        <div className="hidden md:flex gap-8">
          <a href="#about" className="text-muted-foreground hover:text-white-custom transition-colors">Sobre</a>
          <a href="#stack" className="text-muted-foreground hover:text-white-custom transition-colors">Stack</a>
          <a href="#timeline" className="text-muted-foreground hover:text-white-custom transition-colors">Trajetória</a>
          <a href="#projects" className="text-muted-foreground hover:text-white-custom transition-colors">Projetos</a>
        </div>

        {/* Botão de Contato Desktop (Escondido em telas pequenas: md:inline-flex) */}
        <a
          href="#contact"
          className="hidden md:inline-flex text-xs font-mono text-foreground border p-2 rounded-md px-3 py-1.5 border-border hover:border-primary/60 hover:text-primary transition-colors"
        >
          contact()
        </a>

        {/* Botão do Menu Hambúrguer (Apenas Mobile: md:hidden) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-muted-foreground hover:text-white-custom transition-colors focus:outline-none"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Menu Lateral/Vertical Mobile (Apenas Mobile: md:hidden) */}
      <div
        className={`fixed inset-x-0 top-16 bg-background/95 backdrop-blur-xl border-b border-border p-6 flex flex-col gap-6 md:hidden transition-all duration-300 shadow-xl ${
          isOpen 
            ? "opacity-100 translate-y-0 pointer-events-auto" 
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <a href="#about" onClick={handleLinkClick} className="text-base text-muted-foreground hover:text-white-custom transition-colors py-1">Sobre</a>
        <a href="#stack" onClick={handleLinkClick} className="text-base text-muted-foreground hover:text-white-custom transition-colors py-1">Stack</a>
        <a href="#timeline" onClick={handleLinkClick} className="text-base text-muted-foreground hover:text-white-custom transition-colors py-1">Trajetória</a>
        <a href="#projects" onClick={handleLinkClick} className="text-base text-muted-foreground hover:text-white-custom transition-colors py-1">Projetos</a>
        
        <div className="pt-4 border-t border-border">
          <a
            href="#contact"
            onClick={handleLinkClick}
            className="w-full justify-center inline-flex text-xs font-mono text-foreground border p-2 rounded-md px-3 py-2 border-border hover:border-primary/60 hover:text-primary transition-colors"
          >
            contact()
          </a>
        </div>
      </div>
    </header>
  );
}
