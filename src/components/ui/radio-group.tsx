"use client";

import { createContext } from "@/lib/context";
import { cn } from "@/lib/utils";
import * as RadioGroupPrimitives from "@radix-ui/react-radio-group";
import React, { useId } from "react";
import { Label } from "./label";

const DEFAULT_SIZE: RadioGroupSize = "medium";

type RadioGroupSize = "small" | "medium" | "large";

type RadioGroupProps = Omit<RadioGroupPrimitives.RadioGroupProps, "onValueChange" | "onChange"> & {
  size?: RadioGroupSize;
  onChange?: (value: string) => void;
};

export const RadioGroup = ({
  className,
  children,
  ["aria-invalid"]: ariaInvalid,
  size = DEFAULT_SIZE,
  onChange,
  ...props
}: RadioGroupProps) => {
  const styleBySize = {
    small: "gap-2",
    medium: "gap-3",
    large: "gap-4",
  };

  return (
    <RadioGroupContext value={{ ariaInvalid, size }}>
      <RadioGroupPrimitives.Root
        className={cn("grid", styleBySize[size], className)}
        onValueChange={onChange}
        {...props}
      >
        {children}
      </RadioGroupPrimitives.Root>
    </RadioGroupContext>
  );
};

type RadioGroupItemProps = React.ComponentPropsWithRef<typeof RadioGroupPrimitives.Item>;

const RadioGroupItem = ({ className, ...props }: RadioGroupItemProps) => {
  const id = useId();
  const { ariaInvalid, size } = useRadioGroupContext();

  const styleBySize = {
    small: "size-4",
    medium: "size-5",
    large: "size-6",
  };

  const indicatorSize = {
    small: "6",
    medium: "8",
    large: "10",
  };

  return (
    <RadioGroupPrimitives.Item
      id={id}
      className={cn(
        "aspect-sqaure border-border size-4 shrink-0 rounded-full border shadow-xs outline-hidden",
        "data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-white",
        "disabled:pointer-events-none disabled:opacity-50",
        ariaInvalid &&
          "border-error focus-visible:ring-ring-error data-[state=checked]:bg-error data-[state=checked]:border-error",
        styleBySize[size],
        className,
      )}
      {...props}
    >
      <RadioGroupPrimitives.Indicator className="flex items-center justify-center">
        <svg
          width={indicatorSize[size]}
          height={indicatorSize[size]}
          viewBox="0 0 6 6"
          fill="currentcolor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="3" cy="3" r="3" />
        </svg>
      </RadioGroupPrimitives.Indicator>
    </RadioGroupPrimitives.Item>
  );
};

const RadioGroupLabel = ({
  className,
  children,
  ...props
}: React.ComponentPropsWithRef<"label">) => {
  const { size } = useRadioGroupContext();

  const styleBySize = {
    small: "text-sm",
    medium: "text-base",
    large: "text-base w-full",
  };

  return (
    <Label className={cn(styleBySize[size], className)} {...props}>
      {children}
    </Label>
  );
};

type RadioGroupOptionProps = RadioGroupItemProps;

const RadioGroupOption = ({ className, children, ...props }: RadioGroupOptionProps) => {
  const { size } = useRadioGroupContext();
  const id = useId();

  const styleBySize = {
    small: "gap-2",
    medium: "gap-3",
    large: "gap-3",
  };

  return (
    <div className={cn("flex items-center", styleBySize[size], className)}>
      <RadioGroupItem id={id} {...props} />
      <RadioGroupLabel htmlFor={id}>{children}</RadioGroupLabel>
    </div>
  );
};

RadioGroup.Item = RadioGroupItem;
RadioGroup.Option = RadioGroupOption;

type RadioGroupContextValue = {
  ariaInvalid?: boolean | "true" | "false" | "grammar" | "spelling" | undefined;
  size: RadioGroupSize;
};

const [RadioGroupContext, useRadioGroupContext] =
  createContext<RadioGroupContextValue>("RadioGroup");
