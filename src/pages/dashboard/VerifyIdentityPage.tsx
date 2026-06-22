import { useState, useRef } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import {
  HiOutlineShieldCheck,
  HiOutlineIdentification,
  HiOutlineCamera,
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineXMark,
  HiOutlineArrowUpTray,
} from "react-icons/hi2";
import { useAppSelector, useAppDispatch } from "@/store/hooks/store";
import {
  useGetMyProfileQuery,
  useSubmitVerificationMutation,
} from "@/services/authApi";
import { updateVerificationStatus } from "@/store/slices/auth.slice";

const VerifyIdentityPage = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { data: myProfile } = useGetMyProfileQuery();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [ghanaCard, setGhanaCard] = useState<File | null>(null);
  const [ghanaCardPreview, setGhanaCardPreview] = useState<string | null>(
    myProfile?.user?.ghanaCardSelfie ?? null,
  );
  const [selfie, setSelfie] = useState<File | null>(null);
  const [selfiePreview, setSelfiePreview] = useState<string | null>(
    myProfile?.user?.ghanaCardImage ?? null,
  );
  const [cardNumber, setCardNumber] = useState(
    myProfile?.user?.ghanaCardNumber ?? "",
  );
  const [cardNumberError, setCardNumberError] = useState("");

  const cardInputRef = useRef<HTMLInputElement>(null);
  const selfieInputRef = useRef<HTMLInputElement>(null);

  const [submitVerification, { isLoading: isSubmitting }] =
    useSubmitVerificationMutation();

  // HANDLERS
  const handleCardUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      toast.error("Invalid format", { description: "Use JPEG, PNG, or WebP" });
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File too large", { description: "Max 5MB" });
      return;
    }

    setGhanaCard(file);
    setGhanaCardPreview(URL.createObjectURL(file));
  };

  const handleSelfieUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      toast.error("Invalid format", { description: "Use JPEG, PNG, or WebP" });
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File too large", { description: "Max 5MB" });
      return;
    }

    setSelfie(file);
    setSelfiePreview(URL.createObjectURL(file));
  };

  const validateCardNumber = (value: string): boolean => {
    const regex = /^GHA-\d{9}-\d{1}$/;
    if (!value) {
      setCardNumberError("Card number is required");
      return false;
    }
    if (!regex.test(value.toUpperCase())) {
      setCardNumberError("Format: GHA-123456789-0");
      return false;
    }
    setCardNumberError("");
    return true;
  };

  const handleSubmit = async () => {
    // Validate
    if (!cardNumber || !validateCardNumber(cardNumber)) return;
    if (!ghanaCard) {
      toast.error("Missing document", {
        description: "Upload your Ghana Card photo",
      });
      return;
    }
    if (!selfie) {
      toast.error("Missing selfie", {
        description: "Upload a selfie with your Ghana Card",
      });
      return;
    }

    try {
      const formData = new FormData();
      formData.append("ghanaCardImage", ghanaCard);
      formData.append("ghanaCardSelfie", selfie);
      formData.append("ghanaCardNumber", cardNumber.toUpperCase());

      const result = await submitVerification(formData).unwrap();

      // Update Redux store
      dispatch(
        updateVerificationStatus({
          isVerified: result.user?.isVerified || false,
        }),
      );

      toast.success("Verification submitted!", {
        description:
          "Your documents are under review. This usually takes 24-48 hours.",
      });

      navigate("/dashboard");
    } catch (err: any) {
      toast.error("Submission failed", {
        description: err?.data?.message || "Please try again",
      });
    }
  };

  // ALREADY VERIFIED
  if (user?.isVerified) {
    return (
      <div className="max-w-md mx-auto text-center py-16 space-y-4">
        <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto">
          <HiOutlineCheckCircle className="w-10 h-10 text-success" />
        </div>
        <h1 className="text-2xl font-bold text-foreground">You're Verified!</h1>
        <p className="text-muted-foreground">
          Your identity has been verified. You can now post listings and
          transact with confidence.
        </p>
        {user.ghanaCardNumber && (
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground bg-muted rounded-xl p-3 max-w-xs mx-auto">
            <HiOutlineIdentification className="w-4 h-4 shrink-0" />
            <span>Card: {user.ghanaCardNumber}</span>
          </div>
        )}
      </div>
    );
  }

  // VERIFICATION FORM
  return (
    <div className="max-w-xl space-y-6 pb-12">
      <div>
        <h1 className="text-xl font-bold text-foreground">
          Verify Your Identity
        </h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Submit your Ghana Card to get verified and start selling
        </p>
      </div>

      <div className="space-y-5 bg-card border border-border rounded-2xl p-5">
        {/* Info Banner */}
        <div className="flex items-start gap-3 bg-info/5 rounded-xl p-4">
          <HiOutlineShieldCheck className="w-5 h-5 text-info shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-foreground">Why verify?</p>
            <ul className="text-xs text-muted-foreground mt-1 space-y-0.5">
              <li>• Builds trust with buyers</li>
              <li>• Required to post listings as a seller</li>
              <li>• Your information is encrypted and secure</li>
            </ul>
          </div>
        </div>

        {/* Card Number */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">
            Ghana Card Number <span className="text-destructive">*</span>
          </label>
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => {
              setCardNumber(e.target.value.toUpperCase());
              if (cardNumberError) validateCardNumber(e.target.value);
            }}
            onBlur={() => validateCardNumber(cardNumber)}
            placeholder="GHA-123456789-0"
            className={`w-full px-4 py-2.5 bg-muted border rounded-xl text-sm font-mono tracking-wider
              placeholder:text-muted-foreground/50
              focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary
              ${cardNumberError ? "border-destructive" : "border-border"}`}
          />
          {cardNumberError && (
            <p className="text-xs text-destructive mt-1">{cardNumberError}</p>
          )}
        </div>

        {/* Upload Ghana Card */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">
            Ghana Card Photo <span className="text-destructive">*</span>
          </label>
          <input
            ref={cardInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleCardUpload}
            className="hidden"
            disabled={user?.isVerified}
          />
          {ghanaCardPreview ? (
            <div className="relative rounded-xl overflow-hidden border border-border group">
              <img
                src={ghanaCardPreview}
                alt="Ghana Card"
                className="w-full h-48 object-cover"
              />
              <button
                type="button"
                disabled={user?.isVerified}
                onClick={() => {
                  setGhanaCard(null);
                  setGhanaCardPreview(null);
                  if (cardInputRef.current) cardInputRef.current.value = "";
                }}
                className="absolute top-2 right-2 p-1.5 bg-destructive text-white rounded-full transition-opacity"
              >
                <HiOutlineXMark className="w-4 h-4" />
              </button>
              <span className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-0.5 rounded-md">
                Front of card
              </span>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => cardInputRef.current?.click()}
              className="w-full border-2 border-dashed border-border rounded-xl p-8 text-center
                hover:border-primary/50 hover:bg-primary/5 transition-all"
            >
              <HiOutlineArrowUpTray className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">
                Upload front of your Ghana Card
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                JPEG, PNG, or WebP • Max 5MB
              </p>
            </button>
          )}
        </div>

        {/* Upload Selfie */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">
            Selfie with Ghana Card <span className="text-destructive">*</span>
          </label>
          <input
            ref={selfieInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            capture="user"
            onChange={handleSelfieUpload}
            className="hidden"
          />
          {selfiePreview ? (
            <div className="relative rounded-xl overflow-hidden border border-border group">
              <img
                src={selfiePreview}
                alt="Selfie with card"
                className="w-full h-48 object-cover"
              />
              <button
                type="button"
                disabled={user?.isVerified}
                onClick={() => {
                  setSelfie(null);
                  setSelfiePreview(null);
                  if (selfieInputRef.current) selfieInputRef.current.value = "";
                }}
                className="absolute top-2 right-2 p-1.5 bg-destructive text-white rounded-full transition-opacity"
              >
                <HiOutlineXMark className="w-4 h-4" />
              </button>
              <span className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-0.5 rounded-md">
                Selfie holding card
              </span>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => selfieInputRef.current?.click()}
              className="w-full border-2 border-dashed border-border rounded-xl p-8 text-center
                hover:border-primary/50 hover:bg-primary/5 transition-all"
            >
              <HiOutlineCamera className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">
                Take a selfie holding your Ghana Card next to your face
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Make sure your face and card are clearly visible
              </p>
            </button>
          )}
        </div>

        {/* Timeline */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2 border-t border-border">
          <HiOutlineClock className="w-4 h-4" />
          <span>Verification usually takes 24-48 hours after submission</span>
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={isSubmitting || !ghanaCard || !selfie || !cardNumber}
          className="w-full py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium
            hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed
            flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <HiOutlineShieldCheck className="w-4 h-4" />
              Submit for Verification
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default VerifyIdentityPage;
