import { IListing } from "@/types/listing";
import { FaMotorcycle } from "react-icons/fa6";
import { HiOutlineShieldCheck, HiOutlineMapPin, HiOutlineRocketLaunch } from "react-icons/hi2";
import { Link } from "react-router-dom";

export const BrowseListingCard = ({ listing }: { listing: IListing }) => (
  <Link
    key={listing?._id}
    to={`/listing/${listing?._id}`}
    className="group bg-surface-elevated rounded-2xl overflow-hidden border border-border 
        hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
  >
    {/* Image */}
    <div className="aspect-4/3 bg-surface-muted relative overflow-hidden">
      {listing?.images?.[0] ? (
        <img
          src={listing?.images[0]}
          alt={`${listing?.brand} ${listing?.model || ""}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <FaMotorcycle className="w-12 h-12 text-muted-foreground/30" />
        </div>
      )}

      {/* Badges */}
      <div className="absolute top-2 left-2 right-2 flex justify-between">
        <div className="flex gap-1.5">
          {listing?.listingType === "premium" && (
            <span className="inline-flex items-center px-2 py-0.5 bg-brand text-white text-[10px] font-medium rounded-full">
              Featured
            </span>
          )}
        </div>
        <div className="flex gap-1.5">
          {listing?.isPhysicallyVerified && (
            <span className="inline-flex items-center gap-0.5 px-2 py-0.5 bg-success text-white text-[10px] font-medium rounded-full">
              <HiOutlineShieldCheck className="w-3 h-3" />
              Verified
            </span>
          )}
        </div>
      </div>
    </div>

    {/* Info */}
    <div className="p-4">
      <h3 className="font-semibold text-surface-foreground truncate">
        {listing?.brand}
        {listing?.model && <span className="ml-1">{listing?.model}</span>}
        {listing?.year && (
          <span className="text-muted-foreground font-normal ml-1">
            ({listing?.year})
          </span>
        )}
      </h3>

      <div className="mt-1 text-xl font-bold text-brand">
        GHS {listing?.price.toLocaleString()}
      </div>

      <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
        <HiOutlineMapPin className="w-3 h-3 shrink-0" />
        <span className="truncate">{listing?.location}</span>
        <span className="shrink-0">·</span>
        <span className="capitalize shrink-0">{listing?.condition}</span>
        {/* Boosted */}
        {listing?.isBoosted && (
          <HiOutlineRocketLaunch className="w-3 h-3 text-primary animate-ping" />
        )}
      </div>

      {/* Seller info */}
      {listing?.seller && typeof listing?.seller === "object" && (
        <div className="mt-2 flex items-center gap-1.5 text-xs">
          <span className="text-muted-foreground">By</span>
          <span className="text-surface-foreground font-medium truncate">
            {listing?.seller.fullName}
          </span>
          {listing?.seller.isVerified && (
            <HiOutlineShieldCheck className="w-3 h-3 text-success shrink-0" />
          )}
        </div>
      )}
    </div>
  </Link>
);