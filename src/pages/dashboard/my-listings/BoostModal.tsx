import { useState } from "react";
import { toast } from "sonner";

import { usePricing } from "@/hooks/usePricing";
import {
  HiOutlineRocketLaunch,
  HiOutlineXMark,
  HiOutlineCheck,
  HiOutlineFire,
} from "react-icons/hi2";
import {
  useCheckBoostStatusQuery,
  useInitiateBoostMutation,
} from "@/services/services/boostApi";
import PaymentModal from "../payments/PaymentModal";

interface BoostModalProps {
  isOpen: boolean;
  onClose: () => void;
  listingId: string;
  listingTitle: string;
  onBoostApplied?: () => void;
}

const BoostModal = ({
  isOpen,
  onClose,
  listingId,
  listingTitle,
  onBoostApplied,
}: BoostModalProps) => {
  const { boost7DayPrice, boost30DayPrice } = usePricing();
  const [selectedBoost, setSelectedBoost] = useState<string | null>(null);
  const [showPayment, setShowPayment] = useState(false);
  const [boostAmount, setBoostAmount] = useState(0);

  const { data: boostStatus } = useCheckBoostStatusQuery(listingId, {
    skip: !isOpen,
  });

  const [initiateBoost, { isLoading }] = useInitiateBoostMutation();

  const isAlreadyBoosted = boostStatus?.data?.isBoosted;

  const boostOptions = [
    {
      key: "7day",
      label: "7-Day Boost",
      price: boost7DayPrice,
      duration: "7 days",
      description: "Top of search for a week",
      icon: HiOutlineFire,
    },
    {
      key: "30day",
      label: "30-Day Boost",
      price: boost30DayPrice,
      duration: "30 days",
      description: "Maximum exposure for a full month",
      icon: HiOutlineRocketLaunch,
      popular: true,
    },
  ];

  const handleBoostSelect = async (boostKey: string, amount: number) => {
    setSelectedBoost(boostKey);
    setBoostAmount(amount);

    try {
      const result = await initiateBoost({
        listingId,
        boostKey,
      }).unwrap();

      if (result.data) {
        setShowPayment(true);
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to initiate boost");
    }
  };

  const handlePaymentSuccess = () => {
    setShowPayment(false);
    toast.success("Boost applied! 🚀", {
      description: "Your listing is now at the top of search results.",
    });
    onBoostApplied?.();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <div className="bg-card rounded-3xl p-6 max-w-md w-full space-y-5 shadow-2xl border border-border">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <HiOutlineRocketLaunch className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-bold text-foreground">
                Boost Listing
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-muted rounded-lg"
            >
              <HiOutlineXMark className="w-5 h-5" />
            </button>
          </div>

          {/* Already boosted */}
          {isAlreadyBoosted && (
            <div className="bg-success/5 border border-success/20 rounded-xl p-4">
              <div className="flex items-center gap-2">
                <HiOutlineCheck className="w-5 h-5 text-success" />
                <span className="text-sm font-medium text-success">
                  Currently boosted • {boostStatus?.data?.remainingDays} days
                  remaining
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Expires{" "}
                {new Date(
                  boostStatus?.data?.expiresAt || "",
                ).toLocaleDateString()}
              </p>
            </div>
          )}

          {/* Listing info */}
          <div className="bg-muted rounded-xl p-4">
            <p className="text-xs text-muted-foreground">Boosting</p>
            <p className="font-semibold text-foreground">{listingTitle}</p>
          </div>

          {/* Boost options */}
          <div className="space-y-3">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Choose Duration
            </p>
            {boostOptions.map((option) => (
              <button
                key={option.key}
                onClick={() => handleBoostSelect(option.key, option.price)}
                disabled={isLoading || isAlreadyBoosted}
                className={`w-full text-left p-4 rounded-2xl border transition-all ${
                  selectedBoost === option.key
                    ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                    : "border-border hover:bg-muted"
                } ${option.popular ? "relative" : ""} disabled:opacity-50`}
              >
                {option.popular && (
                  <span className="absolute -top-2.5 right-4 px-2.5 py-0.5 bg-warning text-warning-foreground text-[10px] font-bold rounded-full">
                    BEST VALUE
                  </span>
                )}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <option.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-sm">
                        {option.label}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {option.description}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-primary">
                      GHS {option.price}
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      {option.duration}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Info */}
          <div className="flex items-start gap-2 text-xs text-muted-foreground bg-muted rounded-xl p-3">
            <HiOutlineRocketLaunch className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <p>
              Boosted listings appear at the very top of search results above
              all other listings. Your listing will be seen by more buyers.
            </p>
          </div>
        </div>
      </div>

      {/* Payment Modal */}

      <PaymentModal
        isOpen={showPayment}
        onClose={() => setShowPayment(false)}
        listingId={listingId}
        listingTitle={`Boost: ${listingTitle}`}
        amount={boostAmount}
        onSuccess={handlePaymentSuccess}
        //   onAbort={() => setShowPayment(false)}
        paymentType="premium_upgrade"
        metadata={{
          boostKey: selectedBoost, // ✅ '7day' or '30day'
        }}
      />
    </>
  );
};

export default BoostModal;
