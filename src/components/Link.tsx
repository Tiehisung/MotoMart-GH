import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface Props {
  children?: ReactNode;
  content?: ReactNode;
  className?: string;
  to: string;
  type?: "link" | "mail" | "tel" | "blank";
}

export const ExternalLink = ({
  children,
  content,
  className,
  to,
  type = "link",
}: Props) => {
  // Build the href with proper prefix
  let refinedHref = to;

  // Only add prefix if not already present
  if (type === "mail" && !to.startsWith("mailto:")) {
    refinedHref = `mailto:${to}`;
  } else if (type === "tel" && !to.startsWith("tel:")) {
    refinedHref = `tel:${to}`;
  } else if (
    type === "link" &&
    !to.startsWith("http://") &&
    !to.startsWith("https://")
  ) {
    refinedHref = `https://${to}`;
  }
  // For "blank", let the href be as-is (could be a full URL or path)

  const isBlank = type === "blank" || type == "tel";

  return (
    <a
      href={refinedHref}
      target={isBlank ? "_blank" : undefined}
      rel={isBlank ? "noopener noreferrer" : undefined}
      className={cn(
        "text-primary hover:underline transition-colors",
        className,
      )}
    >
      {children ?? content}
    </a>
  );
};
