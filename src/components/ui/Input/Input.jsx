export default function Input({
  name,
  disabled,
  value,
  onChange,
  type,
  label,
  error,
  icon
}) {
  return (
    <div className="flex flex-col">
      <span className="text-xs text-muted-foreground mb-1.5 flex gap-2 items-center">
        {icon && (icon)}
        {label}
      </span>
      <input
        disabled={disabled}
        onChange={onChange}
        name={name}
        value={value}
        type={type}
        className={`w-full border bg-background/60 rounded-md px-3 py-2 text-sm text-foreground 
              transition-color disabled:text-muted-foreground disabled:border-border disabled:cursor-not-alloweddisabled:opacity-70autofill:bg-transparent
              ${error ? "border-destructive focus:outline-none focus:border-destructive focus:ring-1 focus:ring-destructive" 
                : "border-border focus:ring-1 focus:ring-primary/30 focus:border-primary focus:outline-none"}
              `}
      ></input>
      {error && <span className="text-xs text-destructive mt-1">{error}</span>}
    </div>
  );
}
