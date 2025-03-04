"use client";

import { cn } from "@/lib/utils";
import * as DropdownMenuPrimitives from "@radix-ui/react-dropdown-menu";

type DropdownMenuProps = Omit<DropdownMenuPrimitives.DropdownMenuProps, "open"> & {
  isOpen?: boolean;
};

export const DropdownMenu = ({ children, isOpen, ...props }: DropdownMenuProps) => {
  return (
    <DropdownMenuPrimitives.Root open={isOpen} {...props}>
      {children}
    </DropdownMenuPrimitives.Root>
  );
};

type DropdownMenuContentProps = React.ComponentPropsWithRef<typeof DropdownMenuPrimitives.Content>;

const DropdownMenuContent = ({
  className,
  sideOffset = 4,
  children,
  ...props
}: DropdownMenuContentProps) => {
  return (
    <DropdownMenuPrimitives.Portal>
      <DropdownMenuPrimitives.Content
        className={cn(
          "border-border bg-background text-main z-50 min-w-40 overflow-hidden rounded-[8px] border p-1 shadow-lg",
          "animate-in fade-in-0",
          "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          className,
        )}
        sideOffset={sideOffset}
        {...props}
      >
        {children}
      </DropdownMenuPrimitives.Content>
    </DropdownMenuPrimitives.Portal>
  );
};

type DropdownMenuItemProps = React.ComponentPropsWithRef<typeof DropdownMenuPrimitives.Item>;

const DropdownMenuItem = ({ className, children, ...props }: DropdownMenuItemProps) => {
  return (
    <DropdownMenuPrimitives.Item
      className={cn(
        "text-main relative flex cursor-pointer items-center gap-2 rounded-[6px] px-2 py-1.5 text-sm font-medium outline-hidden select-none",
        "focus:bg-background-hover",
        "data-disabled:pointer-events-none data-disabled:opacity-50",
        "[&_svg]:shrink-0",
        className,
      )}
      {...props}
    >
      {children}
    </DropdownMenuPrimitives.Item>
  );
};

type DropdownMenuLabelProps = React.ComponentPropsWithRef<typeof DropdownMenuPrimitives.Label>;

const DropdownMenuLabel = ({ className, children, ...props }: DropdownMenuLabelProps) => {
  return (
    <DropdownMenuPrimitives.Label
      className={cn("text-subtle px-2 py-1.5 text-xs font-medium", className)}
      {...props}
    >
      {children}
    </DropdownMenuPrimitives.Label>
  );
};

type DropdownMenuSeparatorProps = React.ComponentPropsWithRef<
  typeof DropdownMenuPrimitives.Separator
>;

const DropdownMenuSeparator = ({ className, ...props }: DropdownMenuSeparatorProps) => {
  return (
    <DropdownMenuPrimitives.Separator
      className={cn("bg-border -mx-1 my-1 h-px", className)}
      {...props}
    />
  );
};

DropdownMenu.Trigger = DropdownMenuPrimitives.Trigger;
DropdownMenu.Group = DropdownMenuPrimitives.Group;
DropdownMenu.Content = DropdownMenuContent;
DropdownMenu.Item = DropdownMenuItem;
DropdownMenu.Label = DropdownMenuLabel;
DropdownMenu.Separator = DropdownMenuSeparator;
