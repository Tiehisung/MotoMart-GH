// client/components/ShareButton.tsx
import { useState } from "react";
import { Check } from "lucide-react";
import { toast } from "sonner";
import { ENV } from "@/lib/env";
import { Button } from "./buttons/Button";
import { TButtonSize, TButtonVariant } from "./ui/button";
import { cn } from "@/lib/utils";
import { HiOutlineShare } from "react-icons/hi2";

interface ShareButtonProps {
  shareUrl: string;
  title: string;
  text?: string;
}

export function ShareButton({ shareUrl, title, text }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: text || `Check out this ${title} on Bunyeni FC!`,
          url: shareUrl,
        });
      } catch (err) {
        console.log("Share cancelled");
      }
    } else {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast.success("Link copied! Share it anywhere for a beautiful preview.");
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <button
      onClick={handleShare}
      className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
    >
      {copied ? <Check size={18} /> : <HiOutlineShare size={18} />}
      {copied ? "Copied!" : "Share"}
    </button>
  );
}

interface IShareBtnProps {
  shareUrl?: string;
  title: string;
  text?: string;
  files?: string[];
  className?: string;
  variant?: TButtonVariant;
  size?: TButtonSize;
  label?: string;
}

export function ShareBtn({
  shareUrl = window.location.href,
  title,
  text,
  files,
  className,
  variant,
  size,
  label = "Share",
}: IShareBtnProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: text || `${title} | ${ENV.APP_NAME}`,
          url: shareUrl,
          files: files
            ? await Promise.all(
                files.map(async (file) => {
                  const response = await fetch(file);
                  const blob = await response.blob();
                  const fileName = file.split("/").pop() || "file";
                  return new File([blob], fileName, { type: blob.type });
                }),
              )
            : undefined,
        });
      } catch (err) {
        console.log("Share cancelled");
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
      }
    } else {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast.success("Link copied! Share it anywhere for a beautiful preview.");
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <Button
      onClick={handleShare}
      size={size}
      variant={variant}
      className={cn(`transition`, className)}
    >
      {copied ? <Check size={18} /> : <HiOutlineShare size={18} />}
      {copied ? "Copied!" : label}
    </Button>
  );
}

 

 