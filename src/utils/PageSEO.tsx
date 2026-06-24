import { ENV } from "@/lib/env";
import { Helmet } from "react-helmet-async";

// TYPES
interface IPageSEOProps {
  page?: keyof typeof pageConfig;
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  listingData?: {
    brand?: string;
    model?: string;
    year?: number;
    price?: number;
    condition?: string;
    location?: string;
    images?: string[];
    mileage?: number;
    engineCapacity?: number;
  };
}

// APP CONSTANTS
const APP = {
  NAME: ENV.APP_NAME,
  URL: ENV.APP_URL,
  DEFAULT_IMAGE: `${ENV.HERO_IMAGE}`,
  LOGO: `${ENV.LOGO_URL}`,
  DESCRIPTION:
    "Ghana's trusted motorbike marketplace. Buy and sell motorbikes safely across Ghana.",
  KEYWORDS: [
    "motorbikes",
    "motorcycles",
    "buy bikes Ghana",
    "sell bikes Ghana",
    "Upper West",
    "Wa",
    "Lawra",
    "Tumu",
    "motorbike marketplace",
    ENV.APP_NAME,
  ],
};

// PAGE CONFIGURATIONS
const pageConfig = {
  home: {
    title: "Buy & Sell Motorbikes Safely in Ghana",
    description: APP.DESCRIPTION,
    keywords: [...APP.KEYWORDS, "home", "landing"],
  },
  browse: {
    title: "Browse Motorbikes for Sale",
    description:
      "Browse verified motorbike listings across Upper West Region. Filter by brand, price, location, and condition.",
    keywords: [...APP.KEYWORDS, "browse", "search", "listings", "filter"],
  },
  listing: {
    title: "Motorbike Details",
    description: "View detailed motorbike listing on MotoMartGH.",
    keywords: [...APP.KEYWORDS, "listing", "details", "bike info"],
  },
  about: {
    title: "About Us",
    description:
      "Learn about MotoMartGH — Ghana's trusted motorbike marketplace built in Wa, Upper West Region.",
    keywords: [...APP.KEYWORDS, "about", "mission", "story"],
  },
  contact: {
    title: "Contact Us",
    description:
      "Get in touch with MotoMartGH. We're based in Wa, Upper West Region, Ghana.",
    keywords: [...APP.KEYWORDS, "contact", "support", "help", "email"],
  },
  terms: {
    title: "Terms of Service",
    description: "MotoMartGH terms of service and conditions of use.",
    keywords: ["terms", "conditions", "legal"],
  },
  privacy: {
    title: "Privacy Policy",
    description:
      "MotoMartGH privacy policy — how we collect and use your data.",
    keywords: ["privacy", "data", "policy", "legal"],
  },
  dashboard: {
    title: "Dashboard",
    description: "Manage your listings, leads, and profile on MotoMartGH.",
    keywords: [...APP.KEYWORDS, "dashboard", "manage", "account"],
  },
  "create-listing": {
    title: "Create Listing",
    description:
      "Post your motorbike for sale on MotoMartGH. Choose standard or premium listing.",
    keywords: [...APP.KEYWORDS, "sell", "post", "create listing"],
  },
  login: {
    title: "Sign In",
    description: "Sign in to your MotoMartGH account.",
    keywords: ["sign in", "login", "account"],
  },
  register: {
    title: "Create Account",
    description: "Join MotoMartGH and start buying or selling motorbikes.",
    keywords: ["register", "sign up", "create account", "join"],
  },
};

// COMPONENT
export const PageSEO = ({
  page = "home",
  title: customTitle,
  description: customDescription,
  image,
  url = APP.URL,
  listingData,
}: IPageSEOProps) => {
  // Get page config
  const config = pageConfig[page as keyof typeof pageConfig];

  // Build title
  let title: string;
  let description: string;

  if (page === "listing" && listingData) {
    // Dynamic listing page
    const bikeTitle = [listingData.brand, listingData.model]
      .filter(Boolean)
      .join(" ");
    const year = listingData.year ? `(${listingData.year})` : "";
    const price = listingData.price
      ? `GHS ${listingData.price.toLocaleString()}`
      : "";
    title = `${bikeTitle} ${year} - ${price}`.trim();

    const parts = [
      listingData.condition,
      listingData.mileage ? `${listingData.mileage.toLocaleString()}km` : null,
      listingData.engineCapacity ? `${listingData.engineCapacity}cc` : null,
      listingData.location ? `${listingData.location}, Ghana` : "Ghana",
    ].filter(Boolean);
    description = parts.join(" | ");
  } else {
    title = customTitle || config?.title || APP.NAME;
    description = customDescription || config?.description || APP.DESCRIPTION;
  }

  const fullTitle = `${title} | ${APP.NAME}`;
  const ogImage = image || listingData?.images?.[0] || APP.DEFAULT_IMAGE;

  return (
    <Helmet>
      {/* Basic */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={config?.keywords?.join(", ")} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={APP.NAME} />
      <meta property="og:url" content={url} />
      <meta
        property="og:type"
        content={page === "listing" ? "product" : "website"}
      />

      {/* Product specific (for listing pages) */}
      {page === "listing" && listingData?.price && (
        <>
          <meta
            property="product:price:amount"
            content={String(listingData.price)}
          />
          <meta property="product:price:currency" content="GHS" />
          <meta
            property="product:condition"
            content={listingData.condition?.toLowerCase() || "used"}
          />
        </>
      )}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Canonical */}
      <link rel="canonical" href={url} />
    </Helmet>
  );
};
