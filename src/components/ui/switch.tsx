import { cn } from "@/lib/utils";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { cva, VariantProps } from "class-variance-authority";

type SwitchProps = Omit<SwitchPrimitives.SwitchProps, "onChange" | "onCheckedChange"> &
  VariantProps<typeof switchVariants> & {
    onChange?: (checked: boolean) => void;
  };

const DEFAULT_SIZE = "medium";

const switchVariants = cva(
  cn(
    "peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-100",
    "data-[state=unchecked]:bg-border",
    "data-[state=checked]:border-primary data-[state=checked]:bg-primary",
    "disabled:pointer-events-none disabled:opacity-50",
  ),
  {
    variants: {
      size: {
        small: "h-5 w-8",
        medium: "h-6 w-10",
      },
    },
    defaultVariants: {
      size: DEFAULT_SIZE,
    },
  },
);

const switchThumbVariants = cva(
  cn(
    "pointer-events-none block rounded-full bg-white shadow-xs",
    "data-[state=unchecked]:translate-x-0",
    "transition-transform duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]",
  ),
  {
    variants: {
      size: {
        small: "size-4 data-[state=checked]:translate-x-3",
        medium: "size-5 data-[state=checked]:translate-x-4",
      },
    },
    defaultVariants: {
      size: DEFAULT_SIZE,
    },
  },
);

export const Switch = ({ className, onChange, size, ...props }: SwitchProps) => {
  return (
    <SwitchPrimitives.Root
      className={cn(switchVariants({ size, className }))}
      onCheckedChange={onChange}
      {...props}
    >
      <SwitchPrimitives.Thumb className={cn(switchThumbVariants({ size }))} />
    </SwitchPrimitives.Root>
  );
};
