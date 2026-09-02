import { Check, ChevronDown, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function MultiSelect({
  name,
  options,
  value,
  onChange,
  placeholder = "Selecione...",
  label
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function toggleOption(option) {
    const values = value.includes(option.id)
      ? value.filter((id) => id !== option.id)
      : [...value, option.id];

    onChange({
      target: {
        name,
        value: values,
      },
    });
  }

  function remove(id) {
    onChange({
      target: {
        name,
        value: value.filter((item) => item !== id),
      },
    });
  }

  return (
    <div className="relative" ref={ref}>
      <span className="text-xs text-muted-foreground mb-1.5">{label}</span>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex min-h-11 w-full flex-wrap items-center gap-2 rounded-md border border-border bg-background/60 px-3 py-2 text-left focus:ring-1 focus:ring-primary focus:outline-none"
      >
        {value.length === 0 ? (
          <span className="text-muted-foreground">{placeholder}</span>
        ) : (
          value.map((id) => {
            const option = options.find((item) => item.id === id);

            return (
              <span
                key={id}
                className="flex items-center gap-1 rounded-md bg-primary/20 px-2 py-1 text-xs text-primary"
              >
                {option?.name}

                <X
                  size={14}
                  onClick={(e) => {
                    e.stopPropagation();
                    remove(id);
                  }}
                />
              </span>
            );
          })
        )}

        <ChevronDown size={18} className="ml-auto text-muted-foreground" />
      </button>

      {open && (
        <div className="absolute z-50 mt-2 w-full rounded-md border border-border bg-surface shadow-lg ">
          {options.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => toggleOption(option)}
              className="flex w-full items-center justify-between px-4 py-2 transition-colors hover:bg-background"
            >
              <span>{option.name}</span>

              {value.includes(option.id) && (
                <Check size={16} className="text-primary" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
