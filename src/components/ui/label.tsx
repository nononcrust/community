import { cn } from "@/lib/utils";
import * as LabelPrimitives from "@radix-ui/react-label";

type LabelProps = React.ComponentPropsWithRef<typeof LabelPrimitives.Root>;

export const Label = ({ className, children, ...props }: LabelProps) => {
  return (
    <LabelPrimitives.Root className={cn("w-fit text-sm font-medium", className)} {...props}>
      {children}
    </LabelPrimitives.Root>
  );
};
