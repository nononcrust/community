import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

const badgeVariants = cva(
  "inline-flex justify-center items-center rounded-full border font-medium leading-normal transition-colors outline-hidden",
  {
    variants: {
      variant: {
        primary: "border-transparent bg-primary text-white",
        secondary: "border-transparent bg-secondary text-main",
      },
      size: {
        small: "min-h-4 min-w-4 text-[10px] px-1",
        medium: "min-h-5 min-w-5 text-xs px-1.5",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "medium",
    },
  },
);

type BadgeProps = React.ComponentPropsWithRef<"span"> & VariantProps<typeof badgeVariants>;

export const Badge = ({ className, variant, size, children, ...props }: BadgeProps) => {
  return (
    <span className={cn(badgeVariants({ variant, size }), className)} {...props}>
      {children}
    </span>
  );
};
