// components/contact/ContactSectionEn.tsx
import { useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import {
  HiOutlineMapPin,
  HiOutlinePhone,
  HiOutlineCreditCard,
  HiOutlineShieldCheck,
} from "react-icons/hi2";

interface ContactFormData {
  fullName: string;
  phoneNumber: string;
  email: string;
  service: string;
  vehicleDetails: string;
}

const SERVICE_OPTIONS = [
  { value: "", label: "Select a service" },
  { value: "full-wrap", label: "Full Wrap - Complete wrapping" },
  { value: "ppf", label: "PPF Film - Paint protection" },
  { value: "partial-wrap", label: "Partial Wrap" },
  { value: "ceramic-coating", label: "Ceramic Coating" },
  { value: "color-change", label: "Color Change" },
];

export function ContactSection() {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: "",
    phoneNumber: "",
    email: "",
    service: "",
    vehicleDetails: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // await submitContactForm(formData);
      console.log("Form submitted:", formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-surface-elevated rounded-3xl p-8 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-surface-foreground mb-2">
          TRANSFORM YOUR VEHICLE BEYOND RECOGNITION
        </h2>
        <p className="text-muted-foreground">
          Slots are filling up quickly. Interested in premium wrapping or PPF
          film? Fill out the form and reserve your time in our studio.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Left Column - Contact Info */}
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-surface-foreground mb-3">
              OUR STUDIO
            </h3>
            <div className="space-y-2 text-muted-foreground">
              <div className="flex items-start gap-2">
                <HiOutlineMapPin className="w-5 h-5 text-brand mt-0.5 flex-shrink-0" />
                <span>Na Šilbochu 2392/2, Prague 8</span>
              </div>
              <div className="flex items-center gap-2 text-amber-600 text-sm">
                <HiOutlineCreditCard className="w-4 h-4" />
                <span>⚠️ Card payment not available at the store.</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-surface-foreground mb-3">
              PHONE
            </h3>
            <div className="flex items-center gap-2">
              <HiOutlinePhone className="w-5 h-5 text-brand" />
              <a
                href="tel:+420608002608"
                className="text-muted-foreground hover:text-brand transition-colors"
              >
                +420 608 002 608
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-surface-foreground mb-3">
              EMAIL
            </h3>
            <div className="flex items-center gap-2">
              <AiOutlineMail className="w-5 h-5 text-brand" />
              <a
                href="mailto:obchod@foilwrap.cz"
                className="text-muted-foreground hover:text-brand transition-colors"
              >
                obchod@foilwrap.cz
              </a>
            </div>
          </div>

          <div className="pt-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <HiOutlineShieldCheck className="w-5 h-5 text-green-500" />
              <span>SECURE COMMUNICATION</span>
            </div>
          </div>
        </div>

        {/* Right Column - Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-surface-foreground mb-1">
              FULL NAME
            </label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
              placeholder="Jan Novak"
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-surface 
                focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand
                text-surface-foreground placeholder:text-muted-foreground"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-surface-foreground mb-1">
              PHONE NUMBER
            </label>
            <input
              type="tel"
              value={formData.phoneNumber}
              onChange={(e) =>
                setFormData({ ...formData, phoneNumber: e.target.value })
              }
              placeholder="+420 123 456 789"
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-surface 
                focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand
                text-surface-foreground placeholder:text-muted-foreground"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-surface-foreground mb-1">
              EMAIL ADDRESS
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="jan.novak@email.cz"
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-surface 
                focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand
                text-surface-foreground placeholder:text-muted-foreground"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-surface-foreground mb-1">
              SELECT SERVICE
            </label>
            <select
              value={formData.service}
              onChange={(e) =>
                setFormData({ ...formData, service: e.target.value })
              }
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-surface 
                focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand
                text-surface-foreground"
              required
            >
              {SERVICE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-surface-foreground mb-1">
              VEHICLE MAKE / YOUR IDEA
            </label>
            <textarea
              value={formData.vehicleDetails}
              onChange={(e) =>
                setFormData({ ...formData, vehicleDetails: e.target.value })
              }
              placeholder="E.g., BMW M3, I want matte PPF..."
              rows={3}
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-surface 
                focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand
                text-surface-foreground placeholder:text-muted-foreground resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-brand text-brand-foreground rounded-xl font-medium
              hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed
              flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                SENDING...
              </>
            ) : (
              "SEND REQUEST"
            )}
          </button>

          <p className="text-center text-xs text-muted-foreground">
            Secure communication • Privacy protection
          </p>
        </form>
      </div>
    </section>
  );
}
