// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import { Link } from "react-router-dom";
import { useGetListingsQuery } from "@/services/listingsApi";
import {
  HiOutlineShieldCheck,
  HiOutlineRocketLaunch,
  HiOutlineMapPin,
  HiOutlineArrowRight,
  HiOutlineStar,
} from "react-icons/hi2";
import { FaMotorcycle } from "react-icons/fa6";

export default function HeroCarousel() {
  const queryParams: Record<string, any> = {
    page: 1,
    limit: 6,
    sort: "-createdAt",
  };

  const { data ,isLoading} = useGetListingsQuery(queryParams);
  const listings = data?.data || [];

  // If no listings, show static image only (no carousel)
  if (listings.length === 0&&isLoading) {
    return (
      <div className="relative w-full max-w-lg mx-auto lg:mx-0">
        <div className="absolute inset-0 bg-linear-to-br from-primary/20 via-primary/5 to-transparent rounded-full blur-3xl transform scale-150" />
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&q=80"
            alt="Motorbike in Ghana"
            className="relative z-10 w-full rounded-3xl object-cover aspect-4/3 shadow-2xl"
            loading="eager"
          />
          <FloatingBadge
            position="top-4 -left-4"
            icon={HiOutlineShieldCheck}
            iconColor="text-success"
            iconBg="bg-success/10"
            title="Verified"
            subtitle="100% Trusted"
          />
          <FloatingBadge
            position="bottom-8 -right-4"
            icon={HiOutlineStar}
            iconColor="text-warning"
            iconBg="bg-warning/10"
            title="Best Deals"
            subtitle="Fair Prices"
          />
          <FloatingBadge
            position="top-1/2 -right-6"
            icon={HiOutlineRocketLaunch}
            iconColor="text-info"
            iconBg="bg-info/10"
            title="Fast Sale"
            subtitle="Quick Deals"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-lg mx-auto lg:mx-0">
      {/* Background glow */}
      <div className="absolute inset-0 bg-linear-to-br from-primary/20 via-primary/5 to-transparent rounded-full blur-3xl transform scale-150" />

      <Swiper
        direction="vertical"
        slidesPerView={1}
        spaceBetween={0}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        modules={[Autoplay, Pagination]}
        className="hero-swiper"
        // ✅ Only loop if more than 1 listing
        loop={listings.length > 1}
        // ✅ Set a fixed height
        style={{ height: "420px" }}
      >
        {listings.map((listing) => (
          <SwiperSlide key={listing._id}>
            <Link
              to={`/listing/${listing._id}`}
              className="block relative group cursor-pointer h-full"
            >
              <div className="relative overflow-hidden rounded-3xl shadow-2xl h-full">
                {listing.images?.[0] ? (
                  <img
                    src={listing.images[0]}
                    alt={`${listing.brand} ${listing.model || ""}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full bg-muted flex items-center justify-center">
                    <FaMotorcycle className="w-20 h-20 text-muted-foreground/30" />
                  </div>
                )}

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

                {/* Listing info overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="flex items-center gap-2 mb-2">
                    {listing.isBoosted && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-warning text-warning-foreground text-[10px] font-bold rounded-full">
                        <HiOutlineRocketLaunch className="w-3 h-3" />
                        Boosted
                      </span>
                    )}
                    {listing.isPhysicallyVerified && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-success text-white text-[10px] font-bold rounded-full">
                        <HiOutlineShieldCheck className="w-3 h-3" />
                        Verified
                      </span>
                    )}
                    {listing.listingType === "premium" && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full">
                        <HiOutlineStar className="w-3 h-3" />
                        Premium
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold truncate">
                    {listing.brand} {listing.model}{" "}
                    {listing.year && `(${listing.year})`}
                  </h3>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xl font-bold text-primary">
                      GHS {listing.price.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-white/70">
                      <HiOutlineMapPin className="w-3 h-3" />
                      {listing.location}
                    </span>
                  </div>
                </div>

                {/* "View Deal" hover button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full text-sm font-bold shadow-lg">
                    View Deal
                    <HiOutlineArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Styles */}
      <style>{`
        .hero-swiper {
          width: 100%;
          border-radius: 1.5rem;
          overflow: hidden;
        }

        .hero-swiper .swiper-pagination {
          bottom: 10px !important;
        }

        .hero-swiper .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: rgba(255, 255, 255, 0.5);
          opacity: 1;
          transition: all 0.3s ease;
        }

        .hero-swiper .swiper-pagination-bullet-active {
          width: 24px;
          border-radius: 4px;
          background: white;
        }
      `}</style>
    </div>
  );
}

// ============================================
// FLOATING BADGE COMPONENT
// ============================================
function FloatingBadge({
  position,
  icon: Icon,
  iconColor,
  iconBg,
  title,
  subtitle,
  animation = "",
}: {
  position: string;
  icon: any;
  iconColor: string;
  iconBg: string;
  title: string;
  subtitle: string;
  animation?: string;
}) {
  return (
    <div className={`absolute ${position}`}>
      <div
        className={`bg-card border border-border rounded-2xl p-3 shadow-lg ${animation}`}
      >
        <div className="flex items-center gap-2">
          <div
            className={`w-8 h-8 rounded-full ${iconBg} flex items-center justify-center`}
          >
            <Icon className={`w-4 h-4 ${iconColor}`} />
          </div>
          <div>
            <p className="text-xs font-bold text-foreground whitespace-nowrap">
              {title}
            </p>
            <p className="text-[10px] text-muted-foreground whitespace-nowrap">
              {subtitle}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
