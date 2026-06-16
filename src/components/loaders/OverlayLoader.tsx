import { cn } from "@/lib/utils";
import { VscLoading } from "react-icons/vsc";

interface IOverlayLoader {
  isLoading?: boolean;
  iconClassName?: string;
  className?: string;
  message?: string;
  blur?: boolean;
}

export function OverlayLoader({
  isLoading,
  iconClassName = "text-4xl",
  className,
  message,
  blur = true,
}: IOverlayLoader) {
  if (!isLoading) return null;
  return (
    <div
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      className={cn(
        `absolute inset-0 flex items-center justify-center z-100 p-4 pointer-events-none`,
        blur ? " backdrop-blur-[1px]" : "",
        className,
      )}
      style={{ zIndex: 100 }}
    >
      {message && (
        <span className="mb-2 text-sm font-medium text-muted-foreground">
          {message}
        </span>
      )}
      <VscLoading className={`animate-spin ${iconClassName}`} />
    </div>
  );
}
