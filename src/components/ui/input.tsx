import { cn } from "@/lib/utils";

type InputProps = React.ComponentPropsWithRef<"input">;

export const Input = ({ className, ["aria-invalid"]: ariaInvalid, ...props }: InputProps) => {
  return (
    <input
      className={cn(
        "border-border bg-background text-main flex h-9 w-full rounded-[8px] border px-3 text-sm shadow-xs",
        "focus-visible:focus-input-ring",
        "placeholder-placeholder",
        "disabled:pointer-events-none disabled:opacity-50",
        ariaInvalid && "focus-visible:focus-input-ring-error border-error",
        className,
      )}
      {...props}
    />
  );
};
