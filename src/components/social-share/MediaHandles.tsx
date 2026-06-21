import { ENV } from "@/lib/env";
import { cn } from "@/lib/utils";
import { Facebook } from "lucide-react";
import { BsTiktok } from "react-icons/bs";
import { FaXTwitter } from "react-icons/fa6";
import { ImWhatsapp } from "react-icons/im";
import { PiTelegramLogoLight } from "react-icons/pi";

export const SocialMediaHandles = ({
  className,
}: {
  url?: string;
  className?: string;
}) => {
  const socialLinks = [
    {
      platform: "whatsapp",
      icon: <ImWhatsapp />,
      color: "bg-Green",
      url: ENV.SOCIAL.WHATSAPP,
    },
    {
      platform: "facebook",
      icon: <Facebook />,
      color: "bg-[#1877f2]",
      url: ENV.SOCIAL.FACEBOOK,
    },
    {
      platform: "twitter",
      icon: <FaXTwitter />,
      color: "bg-[#000000]",
      url: ENV.SOCIAL.TWITTER,
    },
    {
      platform: "telegram",
      icon: <PiTelegramLogoLight />,
      color: "bg-[#3390ec]",
      url: ENV.SOCIAL.TELEGRAM,
    },
    {
      platform: "tiktok",
      icon: <BsTiktok />,
      color: "bg-purple-500",
      url: ENV.SOCIAL.TIKTOK,
    },
  ];
  return (
    <div className="flex gap-4 pt-2">
      {socialLinks.map((social) => {
        if (social.url)
          return (
            <a
              key={social.platform}
              href={social.url}
              className={cn(
                `w-10 h-10 text-white/80 rounded-full flex items-center justify-center hover:text-white transition-all ${social.color}`,
                className,
              )}
            >
              {social.icon}
            </a>
          );
      })}
    </div>
  );
};
