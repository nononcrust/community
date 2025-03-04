"use client";

import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { HTMLMotionProps, motion } from "motion/react";

type FabProps = HTMLMotionProps<"button"> &
  VariantProps<typeof fabVariants> & {
    asChild?: boolean;
    withLabel?: boolean;
  };

const fabVariants = cva(
  cn(
    "select-none flex items-center justify-center gap-2 rounded-full font-semibold transition-colors text-lg whitespace-nowrap shrink-0",
    "shadow-fab",
  ),
  {
    variants: {
      variant: {
        primary: "bg-primary text-white md:hover:bg-primary-dark",
        secondary: "bg-background text-main md:hover:bg-background-hover",
      },
      size: {
        small: "w-10 h-10",
        medium: "w-[48px] h-[48px]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "medium",
    },
  },
);

export const Fab = ({
  className,
  children,
  variant,
  size,
  withLabel = false,
  ...props
}: FabProps) => {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      className={cn(fabVariants({ variant, size, className }), withLabel && "w-fit px-5")}
      {...props}
    >
      {children}
    </motion.button>
  );
};

const FabContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="pointer-events-none fixed right-4 bottom-4 flex flex-col items-center gap-3 *:pointer-events-auto">
      {children}
    </div>
  );
};

Fab.Container = FabContainer;
