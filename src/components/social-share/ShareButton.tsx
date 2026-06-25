import { useState } from "react";
import { Button } from "../buttons/Button";
import { TButtonSize, TButtonVariant } from "../ui/button";
import { cn } from "@/lib/utils";
import { SharePage } from "./SocialShare";

interface IShareBtnProps {
  shareUrl?: string;
  title: string;
  text?: string;
  className?: string;
  variant?: TButtonVariant;
  size?: TButtonSize;
  label?: string;
}

export function ShareButton({
  shareUrl = window.location.origin,
  title,
  text,
  className,
  variant,
  size,
  label = "Share",
}: IShareBtnProps) {
  const [copied, setCopied] = useState(false);

  // Pre-fetch files on mount or when files change
  const [isSuccess, setIsSuccess] = useState(false);

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title,
          text,
          url: shareUrl,
        });
        return;
      }

      await copyToClipboard();
      setIsSuccess(true);
    } catch {
      await copyToClipboard();
      setIsSuccess(true);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {}
  };

  return (
    <>
      <Button
        onClick={handleShare}
        size={size}
        variant={variant}
        className={cn("transition", className)}
      >
        
        {copied ? "Copied!" : label}
      </Button>

      {isSuccess && <SharePage label="Share on:" wrapperStyles="mt-4" />}
    </>
  );
}
