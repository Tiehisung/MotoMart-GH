import { Facebook, Linkedin } from "lucide-react";
import { ImWhatsapp } from "react-icons/im";
import { PiTelegramLogoLight } from "react-icons/pi";
import { FaXTwitter, FaTiktok } from "react-icons/fa6";
import { Button } from "../ui/button";
import { share, ShareOptions } from "@/components/social-share";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

// Types
interface IProps extends ShareOptions {
  className?: string;
  wrapperStyles?: string;
  label?: ReactNode;
  onShare?: () => void;
  platforms?: SocialPlatform[];
  size?: "sm" | "default" | "lg" | "icon";
  variant?: "outline" | "default" | "ghost";
  showLabels?: boolean;
}

type SocialPlatform =
  | "facebook"
  | "twitter"
  | "whatsapp"
  | "linkedin"
  | "telegram"
  | "tiktok";

// Social Media Configuration
const SOCIAL_CONFIG: Record<
  SocialPlatform,
  {
    icon: ReactNode;
    color: string;
    hoverColor: string;
    label: string;
  }
> = {
  facebook: {
    icon: <Facebook className="h-4 w-4" />,
    color: "bg-[#1877f2]",
    hoverColor: "hover:bg-[#1877f2]/90",
    label: "Facebook",
  },
  whatsapp: {
    icon: <ImWhatsapp className="h-4 w-4" />,
    color: "bg-[#25D366]",
    hoverColor: "hover:bg-[#25D366]/90",
    label: "WhatsApp",
  },
  tiktok: {
    icon: <FaTiktok className="h-4 w-4" />,
    color: "bg-[#000000]",
    hoverColor: "hover:bg-[#000000]/90",
    label: "TikTok",
  },
  linkedin: {
    icon: <Linkedin className="h-4 w-4" />,
    color: "bg-[#0A66C2]",
    hoverColor: "hover:bg-[#0A66C2]/90",
    label: "LinkedIn",
  },
  twitter: {
    icon: <FaXTwitter className="h-4 w-4" />,
    color: "bg-[#000000]",
    hoverColor: "hover:bg-[#000000]/90",
    label: "Twitter",
  },
  telegram: {
    icon: <PiTelegramLogoLight className="h-4 w-4" />,
    color: "bg-[#3390ec]",
    hoverColor: "hover:bg-[#3390ec]/90",
    label: "Telegram",
  },
};

// Default platforms (excluding TikTok by default)
const DEFAULT_PLATFORMS: SocialPlatform[] = [
  "whatsapp",
  "tiktok",
  "facebook",
  "twitter",
  "telegram",
  "linkedin",
];

export const SharePage = ({
  text,
  title,
  url,
  files = [],
  className,
  wrapperStyles,
  label,
  onShare,
  platforms = DEFAULT_PLATFORMS,
  size = "icon",
  variant = "default",
  showLabels = false,
}: IProps) => {
  const handleShare = async (platform: SocialPlatform) => {
    try {
      const result = await share.toSocial(platform, {
        title,
        text,
        url,
        files,
      });
      if (result.success) {
        onShare?.();
      }
    } catch (error) {
      console.error(`Failed to share on ${platform}:`, error);
    }
  };

  const getButtonSize = () => {
    if (showLabels) return "default" as const;
    return size;
  };

  return (
    <div className={cn("flex flex-wrap gap-1", wrapperStyles)}>
      {label && (
        <h3 className="text-sm font-medium text-muted-foreground w-full">{label}</h3>
      )}

      <div className="flex flex-wrap gap-2">
        {platforms.map((platform) => {
          const config = SOCIAL_CONFIG[platform];
          const isColored = variant === "default";

          return (
            <Button
              key={platform}
              size={getButtonSize()}
              variant={variant === "default" ? "default" : "outline"}
              className={cn(
                "gap-2 transition-all duration-200 hover:scale-105",
                isColored &&
                  `${config.color} ${config.hoverColor} text-white hover:text-white`,
                !isColored && "hover:bg-muted",
                showLabels && "px-4",
                className,
              )}
              onClick={() => handleShare(platform)}
            >
              <span
                className={cn(
                  !isColored && config.color.replace("bg-", "text-"),
                )}
              >
                {config.icon}
              </span>
              {showLabels && <span>{config.label}</span>}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

// Convenience exports for different use cases
export const SharePageCompact = (props: IProps) => (
  <SharePage {...props} size="sm" showLabels={false} />
);

export const SharePageWithLabels = (props: IProps) => (
  <SharePage {...props} showLabels={true} variant="outline" />
);

export const SharePageMinimal = (props: IProps) => (
  <SharePage {...props} size="sm" variant="ghost" showLabels={false} />
);

// TikTok-specific share component
export const SharePageWithTikTok = (props: IProps) => (
  <SharePage
    {...props}
    platforms={["tiktok", "whatsapp", "facebook", "twitter", "telegram"]}
  />
);

export default SharePage;
