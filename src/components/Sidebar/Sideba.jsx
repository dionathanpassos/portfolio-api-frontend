import {
  Folder,
  Layers,
  LayoutDashboard,
  Mail,
  Sparkles,
  Timeline,
  User,
} from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const menus = [
    { name: "Overview", path: "/admin", end: true, icon: LayoutDashboard },
    { name: "Hero", path: "/admin/hero", icon: Sparkles },
    { name: "Sobre", path: "/admin/sobre", icon: User },
    { name: "Stack", path: "/admin/stack", icon: Layers },
    { name: "Projetos", path: "/admin/projetos", icon: Folder },
    { name: "Timeline", path: "/admin/timeline", icon: Timeline },
    { name: "Contato", path: "/admin/contato", icon: Mail },
  ];

  return (
    <div className=" hidden lg:block">
      <aside className="relatative w-64">
        <a href="/admin" className="flex items-center gap-2 p-2 text-sm">
          <span className="inline-block h-2 w-2 rounded-full bg-accent animate-pulse-dot"></span>
          <span className="text-white-custom font-mono">dionathan</span>
          <span className="text-muted-foreground font-mono">.dev/admin</span>
        </a>
        <div className="mt-6 px-2">
          <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground/70 mb-3">
            Console
          </div>
        </div>
        <nav>
          {menus.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              className={({ isActive }) =>
                `group flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors  
              ${
                isActive
                  ? "bg-surface-elevated text-foreground"
                  : "hover:text-foreground hover:bg-surface text-muted-foreground"
              }`
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon
                    className={`w-5 ${
                      isActive
                        ? "text-primary"
                        : "text-muted-foreground group-hover:text-foreground"
                    }`}
                  />
                  <span>{item.name}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </aside>
    </div>
  );
}
