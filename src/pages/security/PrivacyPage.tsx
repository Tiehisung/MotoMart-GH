import { Link } from "react-router-dom";
import { HiOutlineArrowLeft, HiOutlineShieldCheck } from "react-icons/hi2";
import { ENV } from "@/lib/env";
import { scrollToElement } from "@/lib/dom";
import { Mail, MapPin, Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { ExternalLink } from "@/components/Link";

const PrivacyPage = () => {
  const styles = {
    title: "text-xl font-semibold text-foreground mb-3",
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-6 _page">
      {/* Back */}
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
      >
        <HiOutlineArrowLeft className="w-4 h-4" />
        Back to Home
      </Link>

      <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
        Privacy Policy
      </h1>
      <p className="text-sm text-muted-foreground mb-10">
        Last updated:{" "}
        {new Date().toLocaleDateString("en-GH", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>

      <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8">
        <section>
          <h2 className={styles.title}>1. Introduction</h2>
          <p className="text-muted-foreground leading-relaxed">
            <ExternalLink to={ENV.APP_URL} content={ENV.APP_NAME} /> ("we,"
            "our," or "us") is committed to protecting your privacy. This
            Privacy Policy explains how we collect, use, disclose, and safeguard
            your information when you use our platform.
          </p>
        </section>

        <section>
          <h2 className={styles.title}>2. Information We Collect</h2>

          <h3 className="text-lg font-medium text-foreground mt-4 mb-2">
            2.1 Information You Provide
          </h3>
          <ul className="space-y-2 text-muted-foreground leading-relaxed list-disc pl-5">
            <li>
              <strong>Account Information:</strong> Full name, phone number,
              password.
            </li>
            <li>
              <strong>Identity Verification:</strong> Ghana Card images, selfie
              with card, card number.
            </li>
            <li>
              <strong>Listing Information:</strong> Motorbike details, photos,
              price, location.
            </li>
            <li>
              <strong>Communication:</strong> Messages sent through our contact
              form or lead requests.
            </li>
            <li>
              <strong>Payment Information:</strong> Mobile Money number
              (payments processed by Paystack).
            </li>
          </ul>

          <h3 className="text-lg font-medium text-foreground mt-4 mb-2">
            2.2 Information Collected Automatically
          </h3>
          <ul className="space-y-2 text-muted-foreground leading-relaxed list-disc pl-5">
            <li>
              <strong>Usage Data:</strong> Pages visited, listings viewed,
              searches performed.
            </li>
            <li>
              <strong>Device Information:</strong> Browser type, device type,
              operating system.
            </li>
            <li>
              <strong>Log Data:</strong> IP address, access times, referring
              URLs.
            </li>
          </ul>
        </section>

        <section>
          <h2 className={styles.title}>3. How We Use Your Information</h2>
          <ul className="space-y-2 text-muted-foreground leading-relaxed list-disc pl-5">
            <li>To create and manage your account.</li>
            <li>To verify your identity for seller verification.</li>
            <li>To display your listings to potential buyers.</li>
            <li>To facilitate communication between buyers and sellers.</li>
            <li>To process payments for listing fees and services.</li>
            <li>
              To send SMS and email notifications about leads and inquiries.
            </li>
            <li>To improve and optimize the Platform.</li>
            <li>To comply with legal obligations.</li>
          </ul>
        </section>

        <section>
          <h2 className={styles.title}>4. Sharing Your Information</h2>
          <p className="text-muted-foreground leading-relaxed mb-2">
            We do not sell your personal information. We may share your
            information with:
          </p>
          <ul className="space-y-2 text-muted-foreground leading-relaxed list-disc pl-5">
            <li>
              <strong>Other Users:</strong> Your name, phone number (when you
              request a call), and listing details are shared with
              buyers/sellers as part of the marketplace functionality.
            </li>
            <li>
              <strong>Service Providers:</strong> Paystack (payments), Africa's
              Talking (SMS), Cloudinary (image hosting).
            </li>
            <li>
              <strong>Legal Requirements:</strong> If required by law, court
              order, or government regulation.
            </li>
          </ul>
        </section>

        <section>
          <h2 className={styles.title}>5. Data Security</h2>
          <p className="text-muted-foreground leading-relaxed">
            We implement appropriate technical and organizational security
            measures to protect your personal information. Passwords are
            encrypted. Payments are processed securely through Paystack.
            However, no method of transmission over the Internet is 100% secure.
          </p>
        </section>

        <section>
          <h2 className={styles.title}>6. Data Retention</h2>
          <p className="text-muted-foreground leading-relaxed">
            We retain your personal information for as long as your account is
            active or as needed to provide you services. Identity verification
            documents are stored securely and may be deleted upon request after
            account closure. Listing data is retained for platform analytics.
          </p>
        </section>

        <section>
          <h2 className={styles.title}>7. Your Rights</h2>
          <p className="text-muted-foreground leading-relaxed mb-2">
            Under Ghana's Data Protection Act, you have the right to:
          </p>
          <ul className="space-y-2 text-muted-foreground leading-relaxed list-disc pl-5">
            <li>Access the personal data we hold about you.</li>
            <li>Request correction of inaccurate data.</li>
            <li>Request deletion of your data.</li>
            <li>Object to processing of your data.</li>
            <li>Withdraw consent at any time.</li>
          </ul>
          <p className="text-muted-foreground leading-relaxed mt-2">
            To exercise any of these rights, contact us at hello@motomartgh.com.
          </p>
        </section>

        <section>
          <h2 className={styles.title}>8. Cookies</h2>
          <p className="text-muted-foreground leading-relaxed">
            We use essential cookies for authentication and platform
            functionality. We do not use tracking cookies for advertising
            purposes. You can disable cookies in your browser settings, but this
            may affect platform functionality.
          </p>
        </section>

        <section>
          <h2 className={styles.title}>9. Third-Party Services</h2>
          <p className="text-muted-foreground leading-relaxed">
            Our Platform integrates with third-party services:
          </p>
          <ul className="space-y-2 text-muted-foreground leading-relaxed list-disc pl-5 mt-2">
            <li>
              <strong>Paystack:</strong> Processes all payments. View their{" "}
              <ExternalLink to="https://paystack.com/terms">
                Privacy Policy
              </ExternalLink>
              .
            </li>
            <li>
              <strong>Africa's Talking:</strong> Sends SMS notifications. View
              their{" "}
              <ExternalLink to="https://africastalking.com/privacy">
                Privacy Policy
              </ExternalLink>
              .
            </li>
            <li>
              <strong>Cloudinary:</strong> Hosts and optimizes images. View
              their{" "}
              <ExternalLink
                to="https://cloudinary.com/privacy"
                content={"Privacy Policy"}
              />
              .
            </li>
          </ul>
        </section>

        <section>
          <h2 className={styles.title}>10. Children's Privacy</h2>
          <p className="text-muted-foreground leading-relaxed">
            Our Platform is not intended for users under 18 years of age. We do
            not knowingly collect personal information from children.
          </p>
        </section>

        <section>
          <h2 className={styles.title}>11. Changes to This Policy</h2>
          <p className="text-muted-foreground leading-relaxed">
            We may update this Privacy Policy from time to time. Users will be
            notified of significant changes. Continued use after changes
            constitutes acceptance.
          </p>
        </section>

        <section>
          <h2 className={styles.title}>12. Contact Us</h2>
          <p className="text-muted-foreground leading-relaxed">
            If you have questions about this Privacy Policy or our data
            practices, contact us:
          </p>
          <ul className="mt-2 space-y-1 text-muted-foreground leading-relaxed">
            <li className=" flex items-center gap-2 pl-2">
              <Mail className="w-4 h-4" />
              <Link
                to={"/#contact"}
                onClick={() => {
                  setTimeout(() => {
                    scrollToElement("contact");
                  }, 500);
                }}
                className="text-brand"
              >
                Email Us
              </Link>
            </li>
            <li className="flex items-center gap-2 pl-2">
              <Phone className="w-4 h-4" />

              <ExternalLink to={`${ENV.CONTACT.PHONE}`} type="tel">
                Call
              </ExternalLink>
            </li>
            <li className="flex items-center gap-2 pl-2">
              <FaWhatsapp className="w-4 h-4" />
              <ExternalLink
                to={`http://wa.me/${ENV.CONTACT.PHONE}`}
                content="Chat Us"
              />
            </li>

            <li className=" flex items-center gap-2 pl-2">
              <MapPin className="w-4 h-4" /> Wa, Upper West Region, Ghana
            </li>
          </ul>
        </section>

        {/* Trust badge */}
        <div className="flex items-center gap-3 bg-success/5 border border-success/20 rounded-2xl p-5 mt-8">
          <HiOutlineShieldCheck className="w-8 h-8 text-success shrink-0" />
          <div>
            <p className="text-sm font-semibold text-foreground">
              Your Privacy Matters
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              We never sell your personal data. Your identity documents are
              encrypted and stored securely.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
