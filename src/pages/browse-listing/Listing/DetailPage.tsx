import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useGetListingQuery } from "@/services/listingsApi";
import {
  HiOutlineMapPin,
  HiOutlineShieldCheck,
  HiOutlineCalendarDays,
  HiOutlineEye,
  HiOutlineArrowLeft,
  HiOutlineExclamationTriangle,
  HiOutlineCheckBadge,
  HiOutlineDocumentText,
} from "react-icons/hi2";
import { FaMotorcycle } from "react-icons/fa6";
import { ListingSellerCard } from "./SellerCard";

const ListingDetailPage = () => {
  const { listingId } = useParams<{ listingId: string }>();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetListingQuery(listingId!);

  const [selectedImage, setSelectedImage] = useState(0);

  const listing = data?.data;

  // ============================================
  // LOADING STATE
  // ============================================
  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-4 space-y-6">
        <div className="aspect-video _shimmer rounded-3xl" />
        <div className="space-y-3">
          <div className="h-8 w-2/3 _shimmer rounded-lg" />
          <div className="h-6 w-1/3 _shimmer rounded-lg" />
          <div className="h-4 w-full _shimmer rounded-lg" />
          <div className="h-4 w-3/4 _shimmer rounded-lg" />
        </div>
      </div>
    );
  }

  // ============================================
  // ERROR STATE
  // ============================================
  if (isError || !listing) {
    return (
      <div className="text-center py-20">
        <HiOutlineExclamationTriangle className="w-16 h-16 text-muted-foreground/20 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-foreground">
          Listing not found
        </h2>
        <p className="text-muted-foreground mt-1">
          This listing may have been removed
        </p>
        <Link
          to="/browse"
          className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-medium"
        >
          <HiOutlineArrowLeft className="w-4 h-4" />
          Browse listings
        </Link>
      </div>
    );
  }

  // ============================================
  // RENDER
  // ============================================
  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12 _page">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <HiOutlineArrowLeft className="w-4 h-4" />
        Back
      </button>

      {/* Image Gallery */}
      <div className="space-y-3">
        <div className="aspect-video md:aspect-2/1 bg-muted rounded-3xl overflow-hidden relative">
          {listing.images?.[selectedImage] ? (
            <img
              src={listing.images[selectedImage]}
              alt={`${listing.brand} ${listing.model}`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <FaMotorcycle className="w-20 h-20 text-muted-foreground/30" />
            </div>
          )}
          <div className="absolute top-4 left-4 flex gap-2">
            {listing.listingType === "premium" && (
              <span className="inline-flex items-center px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                Featured
              </span>
            )}
            {listing.isPhysicallyVerified && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-success text-success-foreground text-xs font-medium rounded-full">
                <HiOutlineShieldCheck className="w-3.5 h-3.5" />
                Verified
              </span>
            )}
          </div>
        </div>

        {listing.images?.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1">
            {listing.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                  idx === selectedImage
                    ? "border-primary"
                    : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left - Details */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              {listing.brand} {listing.model}{" "}
              {listing.year && `(${listing.year})`}
            </h1>
            <div className="mt-2 text-3xl font-bold text-primary">
              GHS {listing.price.toLocaleString()}
            </div>
            {listing.priceNegotiable && (
              <span className="text-sm text-muted-foreground">
                Price is negotiable
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              {
                label: "Condition",
                value: listing.condition,
                icon: HiOutlineCheckBadge,
              },
              {
                label: "Location",
                value: listing.location,
                icon: HiOutlineMapPin,
              },
              {
                label: "Year",
                value: listing.year || "N/A",
                icon: HiOutlineCalendarDays,
              },
              {
                label: "Mileage",
                value: listing.mileage
                  ? `${listing.mileage.toLocaleString()} km`
                  : "N/A",
                icon: FaMotorcycle,
              },
              {
                label: "Engine",
                value: listing.engineCapacity
                  ? `${listing.engineCapacity}cc`
                  : "N/A",
                icon: FaMotorcycle,
              },
              { label: "Views", value: listing.viewCount, icon: HiOutlineEye },
            ].map((spec) => (
              <div key={spec.label} className="bg-muted rounded-xl p-3">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
                  <spec.icon className="w-3.5 h-3.5" />
                  {spec.label}
                </div>
                <div className="text-sm font-semibold text-foreground capitalize">
                  {spec.value}
                </div>
              </div>
            ))}
          </div>

          {listing.description && (
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Description
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {listing.description}
              </p>
            </div>
          )}

          {listing.reasonForSelling && (
            <div className="bg-muted rounded-2xl p-4">
              <h4 className="text-sm font-medium text-foreground mb-1">
                Why selling
              </h4>
              <p className="text-sm text-muted-foreground">
                {listing.reasonForSelling}
              </p>
            </div>
          )}

          {listing.hasDocuments && (
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Documents
              </h3>
              <div className="flex items-center gap-3 bg-muted rounded-xl p-3">
                <HiOutlineDocumentText className="w-8 h-8 text-success" />
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {listing.documentType || "Documents available"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Original documents available with the bike
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right - Seller Card */}
        <ListingSellerCard listing={listing} />
      </div>

      {/* Safety Modal */}
    </div>
  );
};

export default ListingDetailPage;
