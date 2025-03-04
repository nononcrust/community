import { cn } from "@/lib/utils";
import * as AvatarPrimitives from "@radix-ui/react-avatar";

type AvatarProps = React.ComponentPropsWithRef<typeof AvatarPrimitives.Root>;

export const Avatar = ({ className, children, ...props }: AvatarProps) => {
  return (
    <AvatarPrimitives.Root
      className={cn("flex size-10 shrink-0 overflow-hidden rounded-full", className)}
      {...props}
    >
      {children}
    </AvatarPrimitives.Root>
  );
};

type AvatarImageProps = React.ComponentPropsWithRef<typeof AvatarPrimitives.Image>;

const AvatarImage = ({ className, ...props }: AvatarImageProps) => {
  return (
    <AvatarPrimitives.Image className={cn("aspect-square h-full w-full", className)} {...props} />
  );
};

type AvatarFallbackProps = React.ComponentPropsWithRef<typeof AvatarPrimitives.Fallback>;

const AvatarFallback = ({ className, ...props }: AvatarFallbackProps) => {
  return (
    <AvatarPrimitives.Fallback
      className={cn(
        "bg-background-100 text-main flex h-full w-full items-center justify-center rounded-[inherit]",
        className,
      )}
      {...props}
    />
  );
};

Avatar.Image = AvatarImage;
Avatar.Fallback = AvatarFallback;
