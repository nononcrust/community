import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, VariantProps } from "class-variance-authority";
import React from "react";

export type ButtonProps = React.ComponentPropsWithRef<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

export const buttonVariant = {
  primary: "bg-primary text-white hover:bg-primary-dark",
  primaryLow:
    "bg-primary-lighter text-primary hover:bg-primary-lighter-hover dark:bg-primary-darker dark:text-white dark:hover:bg-primary-darker-hover",
  primaryOutlined: "border-border text-primary hover:bg-background-hover",
  primaryLowOutlined:
    "border-primary text-primary bg-primary-lighter hover:bg-primary-lighter-hover dark:bg-primary-darker dark:text-white dark:border-primary-dark dark:hover:bg-primary-darker-hover",
  secondary: "bg-secondary text-main hover:bg-secondary-dark",
  contained: "bg-neutral text-background hover:bg-neutral-dark",
  outlined: "border-border text-main hover:bg-background-hover",
  ghost: "hover:bg-background-hover",
  error: "bg-error text-white hover:bg-error-dark",
};

const buttonVariants = cva(
  cn(
    "inline-flex justify-center items-center gap-2 font-semibold outline-hidden border border-transparent rounded-[8px] whitespace-nowrap text-foreground transition-colors",
    "disabled:opacity-50 disabled:pointer-events-none",
  ),
  {
    variants: {
      variant: buttonVariant,
      size: {
        small: "px-[10px] min-h-8 text-xs",
        medium: "px-[12px] min-h-9 text-sm",
        large: "px-[14px] min-h-10 text-[15px]",
        xlarge: "px-[20px] min-h-[56px] rounded-xl text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "medium",
    },
  },
);

export const Button = ({
  className,
  variant,
  size,
  children,
  asChild = false,
  disabled,
  ...props
}: ButtonProps) => {
  const Component = asChild ? Slot : "button";

  return (
    <Component
      type="button"
      className={cn(buttonVariants({ size, variant, className }))}
      disabled={disabled}
      aria-disabled={disabled}
      {...props}
    >
      {children}
    </Component>
  );
};
