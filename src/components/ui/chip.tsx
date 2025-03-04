import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

const chipVariants = cva(
  "inline-flex items-center justify-center rounded-full border border-transparent font-medium transition-colors",
  {
    variants: {
      variant: {
        primary: "border-transparent bg-primary text-white",
        secondary: "border-transparent bg-secondary text-main",
        primaryLowOutlined:
          "border-primary text-primary bg-primary-lighter hover:bg-primary-lighter-hover dark:bg-primary-darker dark:text-white dark:border-primary-dark dark:hover:bg-primary-darker-hover",
      },
      size: {
        xsmall: "h-6 gap-0.5 px-2 text-[12px]",
        small: "h-7 gap-0.5 px-2.5 text-[12px]",
        medium: "h-8 gap-1 px-3 text-[13px]",
        large: "h-9 gap-1.5 px-3.5 text-sm",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "medium",
    },
  },
);

type ChipProps = React.ComponentPropsWithRef<"span"> & VariantProps<typeof chipVariants>;

export const Chip = ({ className, variant, size, children, ...props }: ChipProps) => {
  return (
    <span className={cn(chipVariants({ variant, size, className }))} {...props}>
      {children}
    </span>
  );
};
