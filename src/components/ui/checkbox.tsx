"use client";

import { cn } from "@/lib/utils";
import * as CheckboxPrimitives from "@radix-ui/react-checkbox";
import { cva, VariantProps } from "class-variance-authority";
import { CheckIcon, MinusIcon } from "lucide-react";
import React from "react";

const DEFAULT_SIZE = "medium";

type CheckboxProps = Omit<CheckboxPrimitives.CheckboxProps, "onChange" | "onCheckedChange"> &
  VariantProps<typeof checkboxVariants> & {
    onChange?: (checked: boolean) => void;
  };

const checkboxVariants = cva("", {
  variants: {
    size: {
      small: "size-4 rounded-[4px]",
      medium: "size-5 rounded-[5px]",
      large: "size-6 rounded-[6px]",
    },
  },
  defaultVariants: {
    size: DEFAULT_SIZE,
  },
});

const iconSize: Record<NonNullable<CheckboxProps["size"]>, number> = {
  small: 12,
  medium: 14,
  large: 18,
};

const CheckboxImpl = React.forwardRef<
  React.ComponentRef<typeof CheckboxPrimitives.Root>,
  CheckboxProps
>(({ className, checked, ["aria-invalid"]: ariaInvalid, size, onChange, ...props }, ref) => {
  const sizeWithDefault = size ?? DEFAULT_SIZE;

  return (
    <CheckboxPrimitives.Root
      ref={ref}
      className={cn(
        "peer border-border size-4 shrink-0 border shadow-xs outline-hidden",
        "data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-white",
        "data-[state=indeterminate]:border-primary data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-white",
        "disabled:pointer-events-none disabled:opacity-50",
        checkboxVariants({ size }),
        ariaInvalid &&
          "border-error focus-visible:ring-ring-error data-[state=checked]:border-error data-[state=checked]:bg-error",
        className,
      )}
      checked={checked}
      aria-invalid={ariaInvalid}
      onCheckedChange={onChange}
      {...props}
    >
      <CheckboxPrimitives.Indicator className="flex items-center justify-center">
        {checked === "indeterminate" ? (
          <MinusIcon size={iconSize[sizeWithDefault]} strokeWidth={3} />
        ) : (
          <CheckIcon size={iconSize[sizeWithDefault]} strokeWidth={3} />
        )}
      </CheckboxPrimitives.Indicator>
    </CheckboxPrimitives.Root>
  );
});
CheckboxImpl.displayName = CheckboxPrimitives.Root.displayName;

type CheckboxGroupProps = React.ComponentPropsWithRef<"div">;

const CheckboxGroup = ({ children, ...props }: CheckboxGroupProps) => {
  return (
    <div role="group" {...props}>
      {children}
    </div>
  );
};

export const Checkbox = Object.assign(CheckboxImpl, {
  Group: CheckboxGroup,
});
