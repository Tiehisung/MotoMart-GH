import { Link } from "react-router-dom";
import { HiOutlineArrowLeft } from "react-icons/hi2";
import { ENV } from "@/lib/env";
import { scrollToElement } from "@/lib/dom";
import { Mail, MapPin, Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { ExternalLink } from "@/components/Link";

const TermsPage = () => {
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
        Terms of Service
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
          <h2 className="text-xl font-semibold text-foreground mb-3">
            1. Acceptance of Terms
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            By accessing or using{" "}
            <ExternalLink to={ENV.APP_URL} content={ENV.APP_NAME} /> ("the
            Platform"), you agree to be bound by these Terms of Service. If you
            do not agree with any part of these terms, you may not use the
            Platform.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">
            2. Description of Service
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            <ExternalLink to={ENV.APP_URL} content={ENV.APP_NAME} /> is an
            online marketplace that connects motorbike buyers and sellers in
            Ghana. The Platform provides listing services, verification
            services, and communication tools.{" "}
            <ExternalLink to={ENV.APP_URL} content={ENV.APP_NAME} /> does not
            buy, sell, or own any motorbikes listed on the Platform.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">
            3. User Accounts
          </h2>
          <ul className="space-y-2 text-muted-foreground leading-relaxed list-disc pl-5">
            <li>
              You must provide accurate and complete information when creating
              an account.
            </li>
            <li>
              You are responsible for maintaining the confidentiality of your
              login credentials.
            </li>
            <li>You must be at least 18 years old to use the Platform.</li>
            <li>One person may only maintain one account unless authorized.</li>
            <li>
              You may not share your account with others or transfer your
              account.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">
            4. Seller Obligations
          </h2>
          <ul className="space-y-2 text-muted-foreground leading-relaxed list-disc pl-5">
            <li>
              All listings must accurately describe the motorbike being sold.
            </li>
            <li>Photos must be of the actual motorbike being sold.</li>
            <li>
              Sellers must have legal ownership or authorization to sell the
              motorbike.
            </li>
            <li>
              Listing fees are non-refundable once a listing is approved and
              published.
            </li>
            <li>Sellers must respond to buyer inquiries in a timely manner.</li>
            <li>
              Sellers must not list stolen, encumbered, or illegal vehicles.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">
            5. Buyer Obligations
          </h2>
          <ul className="space-y-2 text-muted-foreground leading-relaxed list-disc pl-5">
            <li>
              Buyers are responsible for inspecting the motorbike before
              purchase.
            </li>
            <li>Buyers should verify all documents before making payment.</li>
            <li>
              Buyers should never send money before seeing the motorbike in
              person.
            </li>
            <li>Buyers should meet sellers in safe, public locations.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">
            6. Listing Fees & Payments
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Listing fees are displayed at the time of posting and are subject to
            change. All payments are processed through Paystack.{" "}
            <ExternalLink to={ENV.APP_URL} content={ENV.APP_NAME} />
            is not responsible for payment disputes between buyers and sellers.
            Listing fees must be paid before a listing is published.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">
            7. Prohibited Activities
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-2">
            Users may not:
          </p>
          <ul className="space-y-2 text-muted-foreground leading-relaxed list-disc pl-5">
            <li>Post false, misleading, or fraudulent listings.</li>
            <li>Use the Platform for any illegal activity.</li>
            <li>Harass, threaten, or abuse other users.</li>
            <li>Post spam, advertisements, or unrelated content.</li>
            <li>Attempt to manipulate listings, reviews, or search results.</li>
            <li>
              Scrape, crawl, or data-mine the Platform without permission.
            </li>
            <li>Use multiple accounts to circumvent restrictions.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">
            8. Verification Services
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            <ExternalLink to={ENV.APP_URL} content={ENV.APP_NAME} /> offers
            optional physical verification services. A verified badge indicates
            that our team has physically inspected the motorbike. Verification
            does not guarantee the mechanical condition, roadworthiness, or
            legal status of the motorbike. Buyers should still conduct their own
            inspection.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">
            9. Limitation of Liability
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            <ExternalLink to={ENV.APP_URL} content={ENV.APP_NAME} /> is a
            marketplace platform only. We are not a party to any transaction
            between buyers and sellers. We do not guarantee the quality, safety,
            or legality of listed items. Users transact at their own risk.{" "}
            <ExternalLink to={ENV.APP_URL} content={ENV.APP_NAME} /> shall not
            be liable for any damages arising from the use of the Platform.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">
            10. Termination
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            <ExternalLink to={ENV.APP_URL} content={ENV.APP_NAME} /> reserves
            the right to suspend or terminate any account that violates these
            terms. Users may delete their accounts at any time. Upon
            termination, all active listings will be removed.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">
            11. Changes to Terms
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            We may update these terms from time to time. Users will be notified
            of significant changes. Continued use of the Platform after changes
            constitutes acceptance of the new terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">
            12. Governing Law
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            These terms are governed by the laws of the Republic of Ghana. Any
            disputes shall be resolved in the courts of Ghana.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">
            13. Contact
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            For questions about these Terms, contact us at:
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
              <a href={`tel:${ENV.CONTACT.PHONE}`} className="text-brand">
                Call
              </a>
            </li>
            <li className="flex items-center gap-2 pl-2">
              <FaWhatsapp className="w-4 h-4" />
              <a
                href={`http://wa.me/${ENV.CONTACT.PHONE}`}
                className="text-brand"
              >
                Chat Us
              </a>
            </li>

            <li className=" flex items-center gap-2 pl-2">
              <MapPin className="w-4 h-4" /> Wa, Upper West Region, Ghana
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default TermsPage;
