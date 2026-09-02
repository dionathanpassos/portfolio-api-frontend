export default function Textarea({
  name,
  disabled,
  value,
  onChange,
  label,
  error,
  className,
  height
}) {
  return (
    <div className="flex flex-col">
      <span className="text-xs text-muted-foreground mb-1.5">{label}</span>
      <textarea
        disabled={disabled}
        onChange={onChange}
        name={name}
        value={value}
        className={`
               w-full border bg-background/60 rounded-md px-3 py-2 text-sm text-foreground ${className} ${height ? height : "min-h-25"}
              transition-colors disabled:text-muted-foreground disabled:border-border disabled:cursor-not-alloweddisabled:opacity-70
              ${error ? "border-destructive focus:outline-none focus:border-destructive focus:ring-1 focus:ring-destructive" : "border-border focus:ring-1 focus:ring-primary focus:outline-none"}
          `}
      ></textarea>
      {error && <span className="text-xs text-destructive mt-1">{error}</span>}
    </div>
  );
}
