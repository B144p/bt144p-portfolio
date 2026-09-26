import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type Props = { rows: number; className?: string };

export const SkeletonLines = ({ rows, className }: Props) => (
  <div className={cn("space-y-3", className)}>
    {Array.from({ length: rows }, (_, i) => (
      <Skeleton key={i} className="h-4 w-full" />
    ))}
  </div>
);
