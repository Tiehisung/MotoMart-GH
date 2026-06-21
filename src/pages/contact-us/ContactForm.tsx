import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import {
  HiOutlinePhone,
  HiOutlineEnvelope,
  HiOutlineShieldCheck,
  HiOutlineUser,
} from "react-icons/hi2";
import { Input, Select, Textarea } from "@/components/form";
import { Button } from "@/components/buttons/Button";
import { useAppSelector } from "@/store/hooks/store";
import { useSubmitContactMutation } from "@/services/contactApi";

const contactSchema = z.object({
  fullName: z.string().min(2, "Name is required"),
  phoneNumber: z
    .string()
    .min(10, "Enter a valid phone number")
    .regex(
      /^0[0-9]{9}$/,
      "Enter a valid Ghana phone number (e.g., 024XXXXXXX)",
    ),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  inquiryType: z.string().min(1, "Please select an inquiry type"),
  message: z.string().optional().or(z.literal("")),
});

type ContactFormData = z.infer<typeof contactSchema>;

const INQUIRY_OPTIONS = [
  { value: "", label: "Select inquiry type" },
  { value: "buying", label: "I want to buy a motorbike" },
  { value: "selling", label: "I want to sell my motorbike" },
  { value: "verification", label: "Identity verification help" },
  { value: "payment", label: "Payment issue" },
  { value: "listing", label: "Help with my listing" },
  { value: "partnership", label: "Partnership / Business inquiry" },
  { value: "other", label: "Other" },
];

export function ContactForm() {
  const { user } = useAppSelector((s) => s.auth);
  const [submitContact, { isLoading: isSubmitting }] =
    useSubmitContactMutation();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
    watch,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: user?.fullName || "",
      phoneNumber: user?.phoneNumber || "",
      email: "",
      inquiryType: "",
      message: "",
    },
  });

  const form = watch();

  const onSubmit = async (data: ContactFormData) => {
    try {
      const result = await submitContact(data).unwrap();
      toast.success(result.message || "Message sent successfully!");
      reset();
    } catch (err: any) {
      toast.error("Failed to send message", {
        description: err?.data?.message || "Please try again.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Full Name */}
      <Input
        label="Full Name"
        required
        placeholder="e.g., Ibrahim Musah"
        icon={<HiOutlineUser className="w-5 h-5" />}
        error={errors.fullName?.message}
        {...register("fullName")}
      />

      {/* Phone Number */}
      <Input
        label="Phone Number"
        required
        type="tel"
        placeholder="e.g., 024XXXXXXX"
        icon={<HiOutlinePhone className="w-5 h-5" />}
        error={errors.phoneNumber?.message}
        {...register("phoneNumber")}
      />

      {/* Email */}
      <Input
        label="Email Address"
        type="email"
        placeholder={`e.g., ${user?.fullName?.replaceAll(" ", "")?.toLowerCase() || "ibrahim"}@email.com`}
        icon={<HiOutlineEnvelope className="w-5 h-5" />}
        error={errors.email?.message}
        {...register("email")}
      />

      {/* Inquiry Type */}
      <Controller
        control={control}
        name="inquiryType"
        render={({ field }) => (
          <Select
            label="What do you need help with?"
            required
            options={INQUIRY_OPTIONS}
            error={errors.inquiryType?.message}
            {...field}
          />
        )}
      />

      {/* Message */}
      <div className="relative">
        <Textarea
          label="Your Message"
          placeholder="Tell us more about what you need. If it's about a specific bike, include the brand and model..."
          error={errors.message?.message}
          rows={4}
          {...register("message")}
          maxLength={800}
        />
        {form.message && (
          <p className="absolute right-2 top-1 text-xs font-normal text-muted-foreground">{`${form.message?.length} of ${800}`}</p>
        )}
      </div>

      {/* Submit */}
      <Button
        type="submit"
        loading={isSubmitting}
        text={"Send Message"}
        loadingText="Sending..."
        size={"lg"}
        variant="default"
        className="rounded-xl h-12 w-full "
      >
        <HiOutlineEnvelope className="w-4 h-4" />
      </Button>

      {/* Footer note */}
      <p className="text-center text-[11px] text-muted-foreground flex items-center justify-center gap-1.5">
        <HiOutlineShieldCheck className="w-3.5 h-3.5 text-success" />
        Secure communication • We respect your privacy
      </p>
    </form>
  );
}
