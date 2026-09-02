import { ChevronDown } from "lucide-react";

export default function Select({
  error,
  label,
  name,
  onChange,
  options = [],
  value,
}) {
  return (
    <div className="flex flex-col">
      {label && (
        <span className="text-xs text-muted-foreground mb-1.5">{label}</span>
      )}

      <div
        className={`
          relative flex items-center border rounded-lg
          ${error ? "border-destructive focus:outline-none focus:border-destructive focus:ring-1 focus:ring-destructive" : "border-border focus:ring-2 focus:ring-foreground"}
          `}
      >
        <select
          name={name}
          onChange={onChange}
          value={value ?? ""}
          className={`
                     bg-background/60 rounded-md border border-border px-2 py-2 text-foreground text-sm focus:border-primary focus:outline-none w-full
                `}
        >
          {options.map((option) => {
            return (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            );
          })}
        </select>

        
      </div>
    </div>
  );
}
