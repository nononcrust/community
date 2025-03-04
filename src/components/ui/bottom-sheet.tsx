"use client";

import { createContext } from "@/lib/context";
import { cn } from "@/lib/utils";
import * as DialogPrimitives from "@radix-ui/react-dialog";
import { CheckIcon, XIcon } from "lucide-react";
import { IconButton } from "./icon-button";

type BottomSheetProps = Omit<DialogPrimitives.DialogProps, "open"> & {
  isOpen?: boolean;
};

export const BottomSheet = ({ children, isOpen, ...props }: BottomSheetProps) => {
  return (
    <DialogPrimitives.Root open={isOpen} {...props}>
      {children}
    </DialogPrimitives.Root>
  );
};

type BottomSheetOverlayProps = React.ComponentPropsWithRef<typeof DialogPrimitives.Overlay>;

const BottomSheetOverlay = ({ className, children, ...props }: BottomSheetOverlayProps) => {
  return (
    <DialogPrimitives.Overlay
      className={cn(
        "fixed inset-0 z-50 bg-black/50",
        "data-[state=open]:animate-in data-[state=open]:fade-in",
        className,
      )}
      {...props}
    >
      {children}
    </DialogPrimitives.Overlay>
  );
};

type DialogContentProps = React.ComponentPropsWithRef<typeof DialogPrimitives.Content>;

const BottomSheetContent = ({ className, children, ...props }: DialogContentProps) => {
  return (
    <DialogPrimitives.Portal>
      <BottomSheetOverlay />
      <DialogPrimitives.Content
        className={cn(
          "fixed right-0 bottom-0 left-0 z-50 mx-auto",
          "flex max-h-[calc(100%-4rem)] w-full max-w-[560px] flex-col",
          "bg-background rounded-t-[32px] outline-hidden",
          "data-[state=open]:animate-in data-[state=open]:slide-in-from-bottom",
          "duration-500!",
          "ease-out-quint",
          className,
        )}
        {...props}
      >
        {children}
        <DialogPrimitives.Close className="absolute top-8 right-4" asChild>
          <IconButton variant="ghost" aria-label="닫기">
            <XIcon size={24} />
          </IconButton>
        </DialogPrimitives.Close>
      </DialogPrimitives.Content>
    </DialogPrimitives.Portal>
  );
};

type BottomSheetHeaderProps = React.ComponentPropsWithRef<"div">;

const BottomSheetHeader = ({ className, children, ...props }: BottomSheetHeaderProps) => {
  return (
    <div className="relative flex flex-col">
      <div className={cn("flex flex-col gap-1.5 p-5 pb-1", className)} {...props}>
        {children}
      </div>
      <div className="to-background absolute right-2 -bottom-5 left-2 h-5 bg-linear-to-t from-transparent" />
    </div>
  );
};

type BottomSheetBodyProps = React.ComponentPropsWithRef<"div">;

const BottomSheetBody = ({ className, children, ...props }: BottomSheetBodyProps) => {
  return (
    <div className={cn("flex flex-col gap-1.5 overflow-y-auto p-5", className)} {...props}>
      {children}
    </div>
  );
};

type BottomSheetFooterProps = React.ComponentPropsWithRef<"div">;

const BottomSheetFooter = ({ className, children, ...props }: BottomSheetFooterProps) => {
  return (
    <div className="relative flex flex-col">
      <div className="from-background absolute -top-5 right-2 left-2 h-5 bg-linear-to-t to-transparent" />
      <div className={cn("flex p-5 pt-1", className)} {...props}>
        {children}
      </div>
    </div>
  );
};

type BottomSheetTitleProps = React.ComponentPropsWithRef<typeof DialogPrimitives.Title>;

const BottomSheetTitle = ({ className, children, ...props }: BottomSheetTitleProps) => {
  return (
    <DialogPrimitives.Title className={cn("mt-3 text-[22px] font-semibold", className)} {...props}>
      {children}
    </DialogPrimitives.Title>
  );
};

type BottomSheetDescriptionProps = React.ComponentPropsWithRef<typeof DialogPrimitives.Description>;

const BottomSheetDescription = ({ className, children, ...props }: BottomSheetDescriptionProps) => {
  return (
    <DialogPrimitives.Description
      className={cn("text-sub text-lg font-medium", className)}
      {...props}
    >
      {children}
    </DialogPrimitives.Description>
  );
};

type BottomSheetSelectContextValue = {
  value: string;
  onChange: (value: string) => void;
};

const [BottomSheetSelectContext, useBottomSheetSelectContext] =
  createContext<BottomSheetSelectContextValue>("BottomSheetSelect");

type BottomSheetSelectGroupProps = Omit<React.ComponentPropsWithRef<"ul">, "value" | "onChange"> & {
  value: string;
  onChange: (value: string) => void;
};

const BottomSheetSelectGroup = ({
  className,
  children,
  value,
  onChange,
  ...props
}: BottomSheetSelectGroupProps) => {
  return (
    <BottomSheetSelectContext value={{ value, onChange }}>
      <ul className={cn("flex flex-col", className)} {...props}>
        {children}
      </ul>
    </BottomSheetSelectContext>
  );
};

type BottomSheetSelectItemProps = React.ComponentPropsWithRef<typeof DialogPrimitives.Close> & {
  value: string;
};

const BottomSheetSelectItem = ({
  className,
  children,
  value,
  ...props
}: BottomSheetSelectItemProps) => {
  const { value: selectedValue, onChange } = useBottomSheetSelectContext();

  const isSelected = selectedValue === value;

  return (
    <li>
      <DialogPrimitives.Close
        className={cn(
          "flex w-full items-center justify-between py-4 text-start text-lg font-medium",
          "md:hover:text-primary",
          className,
        )}
        onClick={() => onChange(value)}
        {...props}
      >
        {children}
        {isSelected && <CheckIcon className="text-primary" />}
      </DialogPrimitives.Close>
    </li>
  );
};

BottomSheet.Trigger = DialogPrimitives.Trigger;
BottomSheet.Close = DialogPrimitives.Close;
BottomSheet.Title = BottomSheetTitle;
BottomSheet.Description = BottomSheetDescription;
BottomSheet.Content = BottomSheetContent;
BottomSheet.SelectGroup = BottomSheetSelectGroup;
BottomSheet.SelectItem = BottomSheetSelectItem;
BottomSheet.Header = BottomSheetHeader;
BottomSheet.Body = BottomSheetBody;
BottomSheet.Footer = BottomSheetFooter;
