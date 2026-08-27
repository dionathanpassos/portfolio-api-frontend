export default function TitleSection({ title, subtitle, section, children }) {
  return (
    <div className="flex justify-between border-b border-border pb-6">
      <div>
        <div className="flex items-center gap-2 text-[11px] font-mono text-muted-foreground">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent animate-pulse-dot"></span>
        PATCH /api/v1/sections{section}
      </div>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
        {title}
      </h1>
      <p className="mt-1 text-sm text-muted-foreground max-w-2xl">
        {subtitle}
      </p>
      </div>
      {children}
    </div>
  );
}
