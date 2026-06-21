import { useEffect, useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { ENV } from "@/lib/env";
import { Button } from "../buttons/Button";
import { TButtonSize, TButtonVariant } from "../ui/button";
import { cn } from "@/lib/utils";
import { HiOutlineShare } from "react-icons/hi2";
import { SharePage } from "./SocialShare";

interface IShareBtnProps {
  shareUrl?: string;
  title: string;
  text?: string;
  files?: string[]; // Must be already fetched or local URLs
  className?: string;
  variant?: TButtonVariant;
  size?: TButtonSize;
  label?: string;
}

export function ShareButton({
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
  const [isLoading, setIsLoading] = useState(false);

  // Pre-fetch files on mount or when files change
  const [prefetchedFiles, setPrefetchedFiles] = useState<File[]>([]);
  const [isFallback, setIsFallback] = useState(false);

  useEffect(() => {
    if (!files) {
      setPrefetchedFiles([]);
      return;
    }

    const fetchFiles = async () => {
      try {
        const filePromises = files.map(async (fileUrl) => {
          const response = await fetch(fileUrl);
          if (!response.ok) throw new Error(`Failed to fetch ${fileUrl}`);
          const blob = await response.blob();
          const fileName = fileUrl.split("/").pop() || "file";
          return new File([blob], fileName, { type: blob.type });
        });
        const fetched = await Promise.all(filePromises);
        setPrefetchedFiles(fetched);
      } catch (error) {
        setPrefetchedFiles([]);
      }
    };

    fetchFiles();
  }, [files]);

  const handleShare = async () => {
    setIsLoading(true);

    try {
      // Check if Web Share API is supported
      if (navigator.share) {
        const shareData: ShareData = {
          title,
          text: text || `${title} | ${ENV.APP_NAME}`,
          url: shareUrl,
        };

        // Only add files if they exist and are prefetched
        if (prefetchedFiles.length > 0) {
          shareData.files = prefetchedFiles;
        }

        await navigator.share(shareData);
      } else {
        // Fallback: copy to clipboard
        await copyToClipboard();
        toast("Listing url copied!");

        setIsFallback(true);
      }
    } catch (err) {
      // User cancelled or error occurred
      if (err instanceof Error && err.name !== "AbortError") {
        // Fallback to clipboard
        await copyToClipboard();
        setIsFallback(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast.success("Link copied! Share it anywhere for a beautiful preview.");
      setTimeout(() => setCopied(false), 3000);
    } catch (error) {
      toast.error("Failed to copy link. Please try again.");
    }
  };

  return (
    <>
      <Button
        onClick={handleShare}
        size={size}
        variant={variant}
        className={cn("transition", className)}
        disabled={isLoading}
      >
        {isLoading ? (
          <Loader2 size={18} className="animate-spin" />
        ) : copied ? (
          <Check size={18} />
        ) : (
          <HiOutlineShare size={18} />
        )}
        {copied ? "Copied!" : label}
      </Button>

      {isFallback && <SharePage label="Share on:" wrapperStyles="mt-4" />}
    </>
  );
}
