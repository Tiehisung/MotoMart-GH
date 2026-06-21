import { DIALOG } from "@/components/Dialog";
import { ENV } from "@/lib/env";
import {
  HiOutlineMapPin,
  HiOutlinePhone,
  HiOutlineDevicePhoneMobile,
  HiOutlineEnvelope,
  HiOutlineShieldCheck,
} from "react-icons/hi2";

export function ContactInfo() {
  console.log(encodeURI("?q=Central Market, Wa, Ghana"));
  const contactCardClasses = `
    bg-muted/50 rounded-2xl p-5
    border border-border/50
    hover:border-border transition-colors duration-200
  `;

  const iconContainerClasses = `
    w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0
  `;
  return (
    <div className="md:col-span-2 space-y-4">
      {/* Office */}
      <DIALOG
        trigger={
          <div className={"grow " + contactCardClasses}>
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 text-left">
              Our Office - Tap to view
            </h3>
            <div className="flex items-start gap-3">
              <div className={iconContainerClasses}>
                <HiOutlineMapPin className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">
                  Wa, Upper West Region
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Near Wa Central Market
                </p>
              </div>
            </div>
          </div>
        }
        triggerStyles="p-0 grow w-full justify-start"
        title={`Office | ${ENV.CONTACT.OFFICE_LOCATION}`}
      >
        <iframe
          title="Location Map"
          width="100%"
          height="400"
          style={{ border: 0, marginTop: "1rem" }}
          loading="lazy"
          allowFullScreen
          src={`https://maps.google.com/maps?q=${encodeURIComponent(ENV.CONTACT.OFFICE_LOCATION ?? "Central Market,Wa,Ghana")}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
        />
      </DIALOG>

      {/* Phone */}
      <a
        href={`tel:${ENV.CONTACT.PHONE}`}
        className="text-sm font-medium text-foreground hover:text-primary transition-colors"
      >
        <div className={contactCardClasses}>
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Phone
          </h3>

          <div className="flex items-start gap-3 text-primary">
            <div className={iconContainerClasses}>
              <HiOutlinePhone className="w-5 h-5" />
            </div>
            <div>
              Tap to place a call
              <p className="text-xs text-muted-foreground mt-1">
                Mon-Sat, 8AM-6PM
              </p>
            </div>
          </div>
        </div>
      </a>

      <div />

      {/* WhatsApp */}
      <a
        href={`https://wa.me/${ENV.CONTACT.PHONE || "233055952000x"}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm font-medium text-foreground hover:text-success transition-colors "
      >
        <div className={contactCardClasses}>
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            WhatsApp
          </h3>
          <div className="flex items-start gap-3 text-success">
            <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center shrink-0">
              <HiOutlineDevicePhoneMobile className="w-5 h-5" />
            </div>
            <div>
              Tap to chat on WhatsApp
              <p className="text-xs text-muted-foreground mt-1">
                Fastest response
              </p>
            </div>
          </div>
        </div>
      </a>

      <div />

      {/* Email */}
      <a
        href={`mailto:${ENV.CONTACT.EMAIL || "hello@motomartgh.com"}?subject="I need to make enquiry"`}
        className="text-sm font-medium text-foreground hover:text-primary transition-colors"
      >
        <div className={contactCardClasses}>
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Email
          </h3>

          <div className="flex items-start gap-3 text-primary">
            <div className={iconContainerClasses}>
              <HiOutlineEnvelope className="w-5 h-5" />
            </div>
            <div>
              Tap to send us a Mail
              <p className="text-xs text-muted-foreground mt-1">
                We reply within 24hrs
              </p>
            </div>
          </div>
        </div>
      </a>

      <iframe
        title="Location Map"
        width="100%"
        height="400"
        style={{ border: 0, marginTop: "1rem" }}
        loading="lazy"
        allowFullScreen
        src="https://maps.google.com/maps?q=CentralMarket,Wa,Ghana&t=&z=13&ie=UTF8&iwloc=&output=embed"
      />
      {/* Trust badge */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2">
        <HiOutlineShieldCheck className="w-4 h-4 text-success" />
        <span>Your information is secure and private</span>
      </div>
    </div>
  );
}
