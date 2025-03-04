import { cn } from "@/lib/utils";

type CardProps = React.ComponentPropsWithRef<"div">;

export const Card = ({ className, children, ...props }: CardProps) => {
  return (
    <div
      className={cn(
        "border-border bg-background flex flex-col rounded-[12px] border p-6 shadow-xs",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};
