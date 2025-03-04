"use client";

import { createContext } from "@/lib/context";
import { cn } from "@/lib/utils";
import * as TabsPrimitives from "@radix-ui/react-tabs";
import { cva } from "class-variance-authority";

type TabsProps = Omit<TabsPrimitives.TabsProps, "onChange" | "onValueChange"> & {
  onChange?: (value: string) => void;
};

export const Tabs = ({ className, children, onChange, ...props }: TabsProps) => {
  return (
    <TabsPrimitives.Root className={cn("w-full", className)} onValueChange={onChange} {...props}>
      {children}
    </TabsPrimitives.Root>
  );
};

type TabsSize = "medium" | "large";

type TabsListProps = React.ComponentPropsWithRef<typeof TabsPrimitives.List> & {
  fullWidth?: boolean;
  size?: TabsSize;
};

const TabsList = ({
  className,
  children,
  fullWidth = false,
  size = "medium",
  ...props
}: TabsListProps) => {
  return (
    <TabsListContext value={{ fullWidth, size }}>
      <TabsPrimitives.List
        className={cn(
          "border-border bg-background inline-flex items-center justify-center border-b",
          fullWidth && "w-full",
          className,
        )}
        {...props}
      >
        {children}
      </TabsPrimitives.List>
    </TabsListContext>
  );
};

const tabsVariants = cva(
  cn(
    "text-subtle relative inline-flex items-center justify-center border-transparent font-semibold whitespace-nowrap",
    "disabled:pointer-events-none disabled:opacity-50",
    "data-[state=active]:after:bg-main after:absolute after:inset-x-0 after:bottom-0 after:h-[2px]",
    "data-[state=active]:text-main data-[state=active]:border-main",
    "data-[state=inactive]:hover:text-sub",
  ),
  {
    variants: {
      size: {
        medium: "h-10 text-sm px-3",
        large: "h-12 text-base px-5",
      },
    },
    defaultVariants: {
      size: "medium",
    },
  },
);

type TabsTriggerProps = React.ComponentPropsWithRef<typeof TabsPrimitives.Trigger>;

const TabsTrigger = ({ className, children, ...props }: TabsTriggerProps) => {
  const { fullWidth, size } = useTabsListContext();

  return (
    <TabsPrimitives.Trigger
      className={cn(tabsVariants({ size, className }), fullWidth && "w-full")}
      {...props}
    >
      {children}
    </TabsPrimitives.Trigger>
  );
};

type TabsContentProps = React.ComponentPropsWithRef<typeof TabsPrimitives.Content>;

const TabsContent = ({ className, children, ...props }: TabsContentProps) => {
  return (
    <TabsPrimitives.Content tabIndex={-1} className={cn("", className)} {...props}>
      {children}
    </TabsPrimitives.Content>
  );
};

Tabs.List = TabsList;
Tabs.Trigger = TabsTrigger;
Tabs.Content = TabsContent;

type TabsListContextValue = {
  fullWidth: boolean;
  size: TabsSize;
};

const [TabsListContext, useTabsListContext] = createContext<TabsListContextValue>("TabsList");
