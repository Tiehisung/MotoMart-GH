import { Button } from "@/components/buttons/Button";
import { Input } from "@/components/form";
import Loader from "@/components/loaders/Loader";
import { ShareBtn } from "@/components/ShareButton";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/timeAndDate";
import {
  useCheckRequestStatusQuery,
  useRequestSellerCallMutation,
} from "@/services/listingsApi";
import { useAppSelector } from "@/store/hooks/store";
import { IListing } from "@/types/listing";
import { useState } from "react";
import {
  HiOutlineShieldCheck,
  HiOutlinePhone,
  HiOutlineCheckCircle,
  HiOutlineExclamationTriangle,
} from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface Props {
  listing: IListing;
}
export const ListingSellerCard = ({ listing }: Props) => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const {
    data: myRequest,
    isLoading: isCheckingRequest,
    refetch: refetchRequest,
  } = useCheckRequestStatusQuery(listing._id);

  const [showSafetyModal, setShowSafetyModal] = useState(false);

  // ============================================
  // REQUEST CALL STATE
  // ============================================
  const [requestCall, { isLoading: isRequesting }] =
    useRequestSellerCallMutation();
  const [buyerPhone, setBuyerPhone] = useState(user?.phoneNumber || "");

  // ============================================
  // HANDLERS
  // ============================================
  const handleRequestCallClick = () => {
    if (!isAuthenticated) {
      toast.error("Please sign in", {
        description: "You need an account to request a call",
      });
      navigate("/auth/signin", {
        state: { from: { pathname: `/listing/${listing._id}` } },
      });
      return;
    }
    // Show Modal
    setShowSafetyModal(true);
  };

  const handleSubmitRequest = async () => {
    if (!buyerPhone || buyerPhone.length < 10) {
      toast.error("Enter a valid phone number");
      return;
    }

    try {
      const result = await requestCall({
        listingId: listing._id!,
        buyerPhone,
      }).unwrap();

      toast.success(result.message || "Request sent!", {
        description: "The seller will call you shortly.",
      });
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to send request");
    } finally {
      setShowSafetyModal(false);
      refetchRequest();
    }
  };
  return (
    <div>
      <div className="space-y-4">
        <div className="bg-card border border-border rounded-2xl p-5 sticky top-20">
          <h3 className="text-sm font-medium text-muted-foreground mb-3">
            Seller
          </h3>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-lg">
              {listing?.seller && typeof listing?.seller === "object"
                ? listing?.seller?.fullName?.charAt(0)?.toUpperCase()
                : "?"}
            </div>
            <div>
              <p className="font-semibold text-foreground text-sm">
                {listing?.seller && typeof listing?.seller === "object"
                  ? listing?.seller?.fullName
                  : "Seller"}
              </p>
              <p className="text-xs text-muted-foreground">
                {listing?.seller &&
                typeof listing?.seller === "object" &&
                listing?.seller?.town
                  ? listing?.seller?.town
                  : listing?.location}
              </p>
            </div>
          </div>

          {listing?.seller &&
            typeof listing?.seller === "object" &&
            listing?.seller?.isVerified && (
              <div className="flex items-center gap-2 text-xs text-success bg-success/5 rounded-lg px-3 py-2 mb-4">
                <HiOutlineShieldCheck className="w-4 h-4" />
                Verified seller
              </div>
            )}

      
          {/* ============ REQUEST CALL SECTION ============ */}
          {isCheckingRequest ? (
            <Loader />
          ) : (
            <section>
              {!myRequest?.data ? (
                <div className="space-y-3">
                  <Input
                    type="tel"
                    placeholder="024XXXXXXX"
                    icon={
                      <HiOutlinePhone className=" w-4 h-4 text-muted-foreground" />
                    }
                    label="Your Phone Number"
                    value={buyerPhone}
                    onChange={(e) => setBuyerPhone(e.target.value)}
                  />

                  <button
                    onClick={handleRequestCallClick}
                    disabled={isRequesting}
                    className="w-full py-3 bg-primary text-primary-foreground rounded-xl text-sm font-medium
                        hover:opacity-90 active:scale-[0.98] transition-all
                        disabled:opacity-50 disabled:cursor-not-allowed
                        flex items-center justify-center gap-2"
                  >
                    <HiOutlinePhone className="w-4 h-4" />
                    {isRequesting ? "Sending..." : "Request a Call from Seller"}
                  </button>

                  <p className="text-[11px] text-muted-foreground text-center">
                    The seller will receive an SMS with your number and call you
                  </p>
                </div>
              ) : (
                <div className="bg-success/5 border border-success/20 rounded-xl p-4 text-center space-y-2">
                  <HiOutlineCheckCircle className="w-8 h-8 text-success mx-auto" />
                  <p className="text-sm font-medium text-success">
                    Request Sent!
                  </p>

                  <p className="text-xs text-muted-foreground">
                    {myRequest?.data?.status == "contacted"
                      ? `You were contacted by seller ${formatDate(myRequest?.data?.createdAt)}`
                      : `The seller will call you at ${buyerPhone} shortly.`}
                  </p>
                  {myRequest?.data?.status && (
                    <Badge
                      variant={
                        myRequest?.data?.status == "pending"
                          ? "destructive"
                          : "default"
                      }
                    >
                      Status: {myRequest?.data?.status}
                    </Badge>
                  )}
                </div>
              )}
            </section>
          )}

          {/* Share */}
          <ShareBtn
            title={`${listing?.brand} ${listing?.model} - GHS ${listing?.price?.toLocaleString()}`}
            files={[...(listing?.images?.slice(0, 2) || [])]}
            className="grow w-full rounded-xl mt-3"
            size="lg"
            variant="secondary"
            label="Share listing"
          />

          {/* Safety tip */}
          <div className="mt-4 flex items-start gap-2 text-xs text-warning bg-warning/5 rounded-xl p-3">
            <HiOutlineExclamationTriangle className="w-4 h-4 shrink-0 mt-0.5" />
            <p>
              Never pay via MoMo before seeing the bike in person and verifying
              documents. Meet in a safe, public place.
            </p>
          </div>
        </div>
      </div>
      {/* Safety Modal */}
      {showSafetyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-card rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl border border-border">
            <div className="w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center mx-auto">
              <HiOutlineShieldCheck className="w-6 h-6 text-warning" />
            </div>
            <h3 className="text-lg font-semibold text-foreground text-center">
              Safety First
            </h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>• Never send money via MoMo before seeing the bike</p>
              <p>• Meet in a public place during daytime</p>
              <p>• Verify all documents before payment</p>
              <p>• Bring a friend or mechanic if possible</p>
              <p>
                • Trust your instincts - if it seems too good, it probably is
              </p>
              <p className="pt-2 border-t border-border">
                Your phone number will be shared with the seller via SMS so they
                can call you.
              </p>
            </div>

            <Button
              onClick={handleSubmitRequest}
              disabled={isRequesting}
              className="w-full rounded-xl"
              variant="default"
              size="lg"
            >
              <HiOutlinePhone className="w-4 h-4" />
              {isRequesting ? "Sending..." : "I understand, continue"}
            </Button>
            <button
              onClick={() => setShowSafetyModal(false)}
              className="w-full py-2 text-sm text-muted-foreground hover:text-foreground"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
