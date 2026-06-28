import { useState } from "react";
import {
  HiOutlineCheck,
  HiOutlineMapPin,
  HiOutlineUser,
} from "react-icons/hi2";
import { FaMotorcycle } from "react-icons/fa6";
import { REJECTION_REASONS } from "@/data/motor";
import {
  useApproveListingMutation,
  useRejectListingMutation,
} from "@/services/adminApi";
import { toast } from "sonner";
import { IListing } from "@/types/listing";
import { Button } from "@/components/buttons/Button";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { shortText } from "@/lib";
import { Link } from "react-router-dom";

interface IProps {
  listing: IListing;
}

// COMPONENT

const AdminPendingListingCard = ({ listing }: IProps) => {
  const [showReject, setShowReject] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  const [approveListing, { isLoading: isApproving }] =
    useApproveListingMutation();
  const [rejectListing, { isLoading: isRejecting }] =
    useRejectListingMutation();

  const handleApprove = async () => {
    try {
      await approveListing(listing._id).unwrap();
      toast.success("Listing approved");
    } catch (err: any) {
      toast.error("Failed to approve", { description: err?.data?.message });
    }
  };

  const handleReject = async () => {
    try {
      await rejectListing({ id: listing._id, reason: rejectReason }).unwrap();
      toast.success("Listing rejected");
    } catch (err: any) {
      toast.error("Failed to reject", { description: err?.data?.message });
    }
  };

  return (
    <div className=" relative bg-card border border-border rounded-2xl p-5 space-y-4">
      {/*  LISTING HEADER  */}
      <Badge
        variant={listing.paymentStatus === "paid" ? "default" : "destructive"}
        className={` absolute top-0 right-0.5 px-2.5 py-0.5 rounded-full rounded-tl-none text-xs font-medium  `}
      >
        {listing.paymentStatus === "paid" ? "Paid" : "Unpaid"}
      </Badge>
      <header className="flex items-start gap-4">
        <div className="w-24 h-24 bg-muted rounded-xl overflow-hidden shrink-0">
          {listing.images?.[0] ? (
            <img
              src={listing.images[0]}
              alt={`${listing.brand} ${listing.model || ""}`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <FaMotorcycle className="w-8 h-8 text-muted-foreground/30" />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div>
              <Link to={`/admin/listings/${listing._id}`} className="font-semibold text-foreground _link">
                {listing.brand} {listing.model}{" "}
                {listing.year && `(${listing.year})`}
              </Link>
              <p className="text-primary font-bold mt-0.5">
                GHS {listing.price?.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <HiOutlineMapPin className="w-3 h-3" />
              {listing.location}
            </span>
            <span className="capitalize">{listing.condition}</span>
            <span className="capitalize">{listing.listingType}</span>
          </div>

          {/* Seller Info */}
          {listing.seller && (
            <div className="flex items-center flex-wrap gap-1.5 mt-2 text-xs">
              <HiOutlineUser className="w-3 h-3 text-muted-foreground" />
              <span className="text-muted-foreground">
                {listing.seller.fullName}
              </span>
              <span className="text-muted-foreground">·</span>
              <span className="text-muted-foreground">
                {listing.seller.phoneNumber}
              </span>
              {listing.seller.isVerified ? (
                <span className="text-success text-xs font-medium">
                  (Verified)
                </span>
              ) : (
                <span className="text-warning text-xs font-medium">
                  (Not verified)
                </span>
              )}
            </div>
          )}
        </div>
      </header>

      <main className="space-y-3">
        {/*  DESCRIPTION  */}
        {listing.description && (
          <p className="text-sm text-muted-foreground bg-muted rounded-xl p-3  ">
            {listing.description}
          </p>
        )}
        {/*  DOCUMENTS  */}
        {listing.hasDocuments && (
          <div className="text-xs text-muted-foreground flex items-center gap-1">
            📄 Documents: {listing.documentType || "Yes"}
            {listing.chassisNumber && ` · Chassis: ${listing.chassisNumber}`}
          </div>
        )}
      </main>

      {/*  ACTIONS  */}
      <footer className="  pt-2 border-t border-border">
        {listing.paymentStatus !== "paid" && (
          <p className="text-xs text-warning">
            ⚠️ Seller hasn't paid listing fee yet
          </p>
        )}

        <div className="flex items-center gap-3 mt-2.5">
          <button
            onClick={handleApprove}
            disabled={isApproving || listing.paymentStatus !== "paid"}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-success text-success-foreground rounded-xl text-sm font-medium
          hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
          >
            <HiOutlineCheck className="w-4 h-4" />
            Approve
          </button>
          <Button
            variant={"delete"}
            onClick={() => setShowReject((p) => !p)}
            className="rounded-xl"
          >
            <X className="w-4 h-4" />
            Reject
          </Button>
        </div>
      </footer>
      {/*  REJECT FORM  */}
      {showReject && (
        <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-4 space-y-3">
          <p className="text-sm font-medium text-destructive">
            Rejection reason (will be shown to seller):
          </p>

          {/* Quick reasons */}
          <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto ">
            {REJECTION_REASONS.slice(0, 10).map((reason) => (
              <Button
                key={reason}
                variant={rejectReason === reason ? "destructive" : "outline"}
                onClick={() => setRejectReason(reason)}
                size={"xs"}
                className="text-[11px] font-normal"
              >
                {shortText(reason, 50)}
              </Button>
            ))}
          </div>

          {/* Custom reason */}
          <textarea
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
            placeholder="Or type a custom reason..."
            rows={3}
            className="w-full px-3 py-2 bg-background border border-border rounded-xl text-sm
              focus:outline-none focus:ring-2 focus:ring-destructive/20 resize-none"
          />

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <Button
              onClick={handleReject}
              disabled={isRejecting || !rejectReason.trim()}
              className=" "
              variant={'delete'}
            >
              {isRejecting ? "Rejecting..." : "Confirm Reject"}
            </Button>
            <Button
              onClick={() => setShowReject(false)}
              className=""
              variant={'ghost'}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPendingListingCard;
