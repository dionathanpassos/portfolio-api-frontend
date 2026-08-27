export default function CardSection({ title, subtitle, children }) {
  return (
    <section className="bg-surface-elevated rounded-xl p-6 animate-fade-up border border-border">
      {title ? (
        <header className="mb-5">
          <h2 className="text-sm font-semibold tracking-tight text-foreground">
            {title}
          </h2>
          <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>
        </header>
      ) : (
        ""
      )}
      {children}
    </section>
  );
}
