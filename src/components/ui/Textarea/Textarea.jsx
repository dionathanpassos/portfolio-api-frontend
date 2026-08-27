export default function Textarea({
  name,
  disabled,
  value,
  onChange,
  label,
}) {
  return (
    <div className="flex flex-col">
      <span className="text-xs text-muted-foreground mb-1.5">{label}</span>
      <textarea
        disabled={disabled}
        onChange={onChange}
        name={name}
        value={value}
        className="min-h-25 w-full border border-border bg-background/60 rounded-md px-3 py-2 text-sm text-foreground focus:border-primary
              focus:outline-none focus:ring-1 focus:ring-primary/30 transition-colors
              disabled:text-muted-foreground
              disabled:border-border
              disabled:cursor-not-allowed
              disabled:opacity-70"
      ></textarea>
    </div>
  );
}
