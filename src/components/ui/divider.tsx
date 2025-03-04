import { cn } from "@/lib/utils";

type DividerProps = React.ComponentPropsWithoutRef<"hr">;

export const Divider = ({ className, ...props }: DividerProps) => {
  return <div className={cn("h-px bg-border", className)} {...props} />;
};
