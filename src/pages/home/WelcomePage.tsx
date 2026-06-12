import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useGetListingsQuery } from "@/services/listingsApi";
import { useGetBrandsQuery } from "@/services/brandApi";
import {
  HiOutlineArrowRight,
  HiOutlineShieldCheck,
  HiOutlineStar,
  HiOutlineMapPin,
  HiOutlineEnvelope,
} from "react-icons/hi2";
import { FaMotorcycle } from "react-icons/fa6";
import { useAppSelector } from "@/store/hooks/store";
import { ContactSection } from "../Contact/ContactForm";

// ============================================
// SCROLL REVEAL HOOK
// ============================================
const useScrollReveal = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          }
        });
      },
      { threshold: 0.15 },
    );

    document.querySelectorAll(".reveal-on-scroll").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);
};

// ============================================
// SCROLL PROGRESS
// ============================================
const useScrollProgress = () => {
  useEffect(() => {
    const handleScroll = () => {
      const winScroll =
        document.body.scrollTop || document.documentElement.scrollTop;
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      const bar = document.getElementById("scroll-progress");
      if (bar) {
        bar.style.transform = `scaleX(${scrolled / 100})`;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
};

// ============================================
// COMPONENT
// ============================================
const LandingPage = () => {
  useScrollReveal();
  useScrollProgress();
  const { user } = useAppSelector((s) => s.auth);
  const { data: listingsData } = useGetListingsQuery({ limit: 6 });
  const { data: brandsData } = useGetBrandsQuery();
  const popularBrands = brandsData?.data?.filter((b) => b.isPopular) || [];

  const featuredListings = listingsData?.data || [];

  return (
    <div className="bg-[#0a0a0a] text-zinc-300 overflow-x-hidden min-h-screen relative selection:bg-brand/30 selection:text-white">
      {/* ============ SCROLL PROGRESS ============ */}
      <div
        id="scroll-progress"
        className="fixed top-0 left-0 h-[2px] w-full z-[70] bg-gradient-to-r from-transparent via-brand to-brand-light pointer-events-none"
        style={{ transformOrigin: "left center", transform: "scaleX(0)" }}
      />

      {/* ============ NAVBAR ============ */}
      <header className="fixed top-6 left-0 right-0 z-[100] flex justify-center px-4 md:px-6 w-full pointer-events-none">
        <nav className="pointer-events-auto w-full max-w-[1280px] border border-brand/30 bg-black/60 backdrop-blur-2xl rounded-full transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
          <div className="flex w-full px-6 md:px-12 py-4 items-center justify-between">
            <Link to="/" className="flex items-center gap-2 group">
              <FaMotorcycle className="w-8 h-8 text-brand" />
              <span className="font-bold text-xl text-white">
                Moto<span className="text-brand">Mart</span>
                <span className="text-xs text-zinc-500 font-normal ml-1">
                  GH
                </span>
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              {["Browse", "How It Works", "About"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-xs font-medium uppercase tracking-widest text-white/60 hover:text-brand transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <Link
                hidden={!!user}
                to="/auth/signin"
                className="text-xs font-medium text-white/60 hover:text-white transition-colors hidden sm:block"
              >
                Sign In
              </Link>
              <Link
                to={
                  user?.role === "seller"
                    ? "/dashboard/listings/create"
                    : "/auth/register?role=seller"
                }
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider bg-brand text-black px-5 py-2.5 rounded-full hover:bg-brand-light transition-all duration-300 shadow-[0_0_20px_rgba(249,115,22,0.3)]"
              >
                Start Selling
                <HiOutlineArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* ============ HERO ============ */}
      <section className="relative w-full min-h-[100svh] flex items-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-[#0a0a0a]">
          <div className="absolute inset-0 bg-radial-glow" />
          <div className="absolute inset-0 cinematic-vignette" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#0a0a0a]" />
        </div>

        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 mt-20">
          <div className="max-w-4xl">
            {/* Label */}
            <div className="flex items-center gap-4 mb-8 animate-fade-in">
              <span className="w-12 h-[1px] bg-brand" />
              <span className="text-xs font-semibold tracking-widest text-brand uppercase">
                Ghana's Trusted Motorbike Marketplace
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight mb-6 animate-fade-in-up">
              Buy & Sell
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-brand-light">
                Motorbikes Safely
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base md:text-lg text-zinc-400 font-light max-w-xl leading-relaxed mb-10 animate-fade-in-up-delayed">
              Verified sellers, inspected bikes, trusted deals. The smarter way
              to find your next motorbike in Wa, Lawra, Tumu, and across Upper
              West.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-4 animate-fade-in-up-delayed-more">
              <Link
                to="/browse"
                className="group inline-flex items-center justify-center gap-3 bg-brand text-black font-semibold text-sm uppercase tracking-wider px-8 py-4 rounded-full transition-all duration-300 hover:bg-brand-light hover:scale-[1.02] shadow-[0_0_30px_rgba(249,115,22,0.3)] w-full sm:w-auto"
              >
                Browse Bikes
                <HiOutlineArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to={
                  user?.role === "seller"
                    ? "/dashboard/listings/create"
                    : "/auth/register?role=seller"
                }
                className="group inline-flex items-center justify-center gap-3 border border-white/20 text-white font-semibold text-sm uppercase tracking-wider px-8 py-4 rounded-full transition-all duration-300 hover:bg-white/10 w-full sm:w-auto"
              >
                List Your Bike
              </Link>
            </div>

            {/* Trust stats */}
            <div className="flex items-center gap-6 mt-12 text-sm animate-fade-in-up-delayed-more">
              <div className="flex items-center gap-2">
                <HiOutlineShieldCheck className="w-5 h-5 text-brand" />
                <span className="text-white/80">100% Verified</span>
              </div>
              <span className="text-white/20">|</span>
              <div className="flex items-center gap-2">
                <HiOutlineMapPin className="w-5 h-5 text-brand" />
                <span className="text-white/80">Upper West</span>
              </div>
              <span className="text-white/20">|</span>
              <div className="flex items-center gap-2">
                <HiOutlineStar className="w-5 h-5 text-brand" />
                <span className="text-white/80">Trusted</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-4">
          <span className="text-[10px] font-medium tracking-widest uppercase text-zinc-500">
            Scroll
          </span>
          <div className="w-[1px] h-16 bg-gradient-to-b from-zinc-500 to-transparent" />
        </div>
      </section>

      {/* ============ TRUST STRIP ============ */}
      <section className="relative bg-[#0a0a0a] border-b border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10 py-10">
            {[
              {
                icon: HiOutlineShieldCheck,
                title: "Verified Sellers",
                desc: "Identity checked & approved",
              },
              {
                icon: FaMotorcycle,
                title: `${featuredListings.length}+ Listings`,
                desc: "Across Upper West Region",
              },
              {
                icon: HiOutlineStar,
                title: "Trusted Platform",
                desc: "Safe transactions guaranteed",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex flex-col items-center justify-center text-center reveal-on-scroll py-6 md:py-0"
                style={{ "--reveal-delay": `${i * 100}ms` } as any}
              >
                <item.icon className="w-8 h-8 text-brand mb-3" />
                <h4 className="font-bold text-xl text-white mb-1">
                  {item.title}
                </h4>
                <span className="text-xs uppercase tracking-widest text-zinc-500">
                  {item.desc}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ HOW IT WORKS ============ */}
      <section
        id="how-it-works"
        className="relative py-24 bg-gradient-to-b from-[#1a120b] to-[#0a0a0a]"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <div className="text-center mb-16 reveal-on-scroll">
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="w-12 h-[1px] bg-brand" />
              <span className="text-xs font-semibold tracking-widest text-brand uppercase">
                How It Works
              </span>
              <span className="w-12 h-[1px] bg-brand" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white">
              Three Simple Steps
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 relative">
            <div className="hidden md:block absolute top-[40px] left-[15%] right-[15%] h-[1px] bg-white/5 z-0" />

            {[
              {
                step: "01",
                title: "Create Listing",
                desc: "Post your motorbike with photos, price, and details. Choose standard or premium listing.",
              },
              {
                step: "02",
                title: "Get Verified",
                desc: "Our team reviews your listing and verifies your identity for buyer confidence.",
                highlighted: true,
              },
              {
                step: "03",
                title: "Sell Safely",
                desc: "Connect with verified buyers. Meet in person, inspect the bike, and close the deal.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="relative z-10 reveal-on-scroll text-center group"
                style={{ "--reveal-delay": `${i * 100}ms` } as any}
              >
                <div
                  className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 transition-all duration-500 ${
                    item.highlighted
                      ? "bg-brand/10 border border-brand shadow-[0_0_30px_rgba(249,115,22,0.2)]"
                      : "bg-white/5 border border-white/10 group-hover:border-brand/50"
                  }`}
                >
                  <span
                    className={`font-bold text-2xl ${
                      item.highlighted
                        ? "text-brand"
                        : "text-white group-hover:text-brand"
                    } transition-colors`}
                  >
                    {item.step}
                  </span>
                </div>
                <h3 className="font-bold text-lg text-white uppercase tracking-tight mb-3">
                  {item.title}
                </h3>
                <p className="text-sm font-light text-zinc-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FEATURED LISTINGS ============ */}
      <section
        id="browse"
        className="relative py-24 bg-[#0a0a0a] border-t border-white/5"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 reveal-on-scroll">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <span className="w-12 h-[1px] bg-brand" />
                <span className="text-xs font-semibold tracking-widest text-brand uppercase">
                  Latest Bikes
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-white">
                Featured Listings
              </h2>
            </div>
            <Link
              to="/browse"
              className="hidden md:inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-zinc-400 hover:text-white transition-colors pb-2 border-b border-white/10 hover:border-white"
            >
              View All Bikes
              <HiOutlineArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredListings.slice(0, 6).map((listing, i) => (
              <Link
                key={listing._id}
                to={`/listing/${listing._id}`}
                className="group relative overflow-hidden rounded-[2rem] aspect-[4/3] reveal-on-scroll block"
                style={{ "--reveal-delay": `${i * 100}ms` } as any}
              >
                {listing.images?.[0] ? (
                  <img
                    src={listing.images[0]}
                    alt={`${listing.brand} ${listing.model || ""}`}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
                    loading="lazy"
                  />
                ) : (
                  <div className="absolute inset-0 bg-surface-800 flex items-center justify-center">
                    <FaMotorcycle className="w-16 h-16 text-zinc-700" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent opacity-90 group-hover:opacity-80 transition-opacity" />
                <div className="absolute inset-0 p-6 flex flex-col justify-end z-10">
                  <span className="text-xs uppercase text-brand font-semibold tracking-widest mb-2">
                    {listing.condition}
                  </span>
                  <h3 className="text-xl font-bold text-white">
                    {listing.brand} {listing.model}{" "}
                    {listing.year && `(${listing.year})`}
                  </h3>
                  <p className="text-lg font-bold text-brand mt-1">
                    GHS {listing.price.toLocaleString()}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-zinc-400 mt-1">
                    <HiOutlineMapPin className="w-3 h-3" />
                    {listing.location}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10 text-center md:hidden">
            <Link
              to="/browse"
              className="inline-flex items-center justify-center gap-3 border border-white/20 text-white font-semibold text-sm uppercase tracking-wider px-8 py-4 rounded-full transition-all hover:bg-white/10 w-full"
            >
              View All Bikes
            </Link>
          </div>
        </div>
      </section>

      {/* ============ POPULAR BRANDS ============ */}
      <section className="relative py-24 bg-gradient-to-b from-[#1a120b] to-[#0a0a0a]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <div className="text-center mb-12 reveal-on-scroll">
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="w-12 h-[1px] bg-brand" />
              <span className="text-xs font-semibold tracking-widest text-brand uppercase">
                Popular Brands
              </span>
              <span className="w-12 h-[1px] bg-brand" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Trusted Manufacturers
            </h2>
          </div>

          <div className="flex flex-wrap justify-center gap-4 reveal-on-scroll">
            {popularBrands.map((brand) => (
              <Link
                key={brand._id}
                to={`/browse?brand=${brand.name}`}
                className="px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white font-semibold text-sm hover:border-brand/50 hover:bg-brand/5 transition-all duration-300 hover:scale-105"
              >
                {brand.name}
              </Link>
            ))}
            <Link
              to="/browse"
              className="px-6 py-4 bg-brand/10 border border-brand/30 rounded-2xl text-brand font-semibold text-sm hover:bg-brand/20 transition-all duration-300 hover:scale-105"
            >
              View All Brands →
            </Link>
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-b from-[#1a0e04] to-[#0a0501] border-t border-white/5">
        <div className="absolute inset-0 bg-radial-glow opacity-50" />

        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 relative z-10">
          <div className="max-w-3xl mx-auto text-center reveal-on-scroll">
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="w-12 h-[1px] bg-brand" />
              <span className="text-xs font-semibold tracking-widest text-brand uppercase">
                Ready to Ride?
              </span>
              <span className="w-12 h-[1px] bg-brand" />
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-[1.1]">
              Find Your Perfect
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-brand-light">
                Motorbike Today
              </span>
            </h2>
            <p className="text-zinc-400 font-light leading-relaxed mb-10 text-lg max-w-xl mx-auto">
              Join hundreds of buyers and sellers across Upper West. The trusted
              way to buy and sell motorbikes in Ghana.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/browse"
                className="group inline-flex items-center justify-center gap-3 bg-brand text-black font-semibold text-sm uppercase tracking-wider px-10 py-5 rounded-full transition-all duration-300 hover:bg-brand-light hover:scale-[1.02] shadow-[0_0_40px_rgba(249,115,22,0.3)] w-full sm:w-auto"
              >
                Browse Bikes Now
                <HiOutlineArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/auth/register"
                className="group inline-flex items-center justify-center gap-3 border border-white/20 text-white font-semibold text-sm uppercase tracking-wider px-10 py-5 rounded-full transition-all duration-300 hover:bg-white/10 w-full sm:w-auto"
              >
                Start Selling
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ContactSection/>

      {/* ============ FOOTER ============ */}
      <footer className="bg-black pt-20 pb-10 px-6 md:px-12 lg:px-24 relative z-20">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-16 mb-16">
            <div className="md:col-span-2">
              <Link
                to="/"
                className="inline-flex items-center gap-2 mb-6 group"
              >
                <FaMotorcycle className="w-8 h-8 text-brand" />
                <span className="font-bold text-xl text-white">
                  Moto<span className="text-brand">Mart</span>
                  <span className="text-xs text-zinc-500 font-normal ml-1">
                    GH
                  </span>
                </span>
              </Link>
              <p className="text-zinc-500 font-light text-sm max-w-sm mb-8 leading-relaxed">
                Ghana's trusted motorbike marketplace. Buy and sell with
                confidence across Upper West and beyond.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-xs text-zinc-600 uppercase tracking-widest mb-6">
                Quick Links
              </h4>
              <ul className="space-y-3">
                {[
                  { to: "/browse", label: "Browse Bikes" },
                  { to: "/auth/register", label: "Start Selling" },
                  { to: "/auth/signin", label: "Sign In" },
                ].map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-zinc-400 hover:text-white transition-colors text-sm font-light"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-xs text-zinc-600 uppercase tracking-widest mb-6">
                Contact
              </h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-zinc-400 text-sm font-light">
                  <HiOutlineMapPin className="w-4 h-4 text-brand" />
                  Wa, Upper West Region
                </li>
                <li className="flex items-center gap-2 text-zinc-400 text-sm font-light">
                  <HiOutlineEnvelope className="w-4 h-4 text-brand" />
                  hello@motomartgh.com
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-zinc-600 text-xs font-medium uppercase tracking-widest">
              © {new Date().getFullYear()} MotoMartGH. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link
                to="/terms"
                className="text-zinc-600 hover:text-white text-xs font-medium uppercase tracking-widest transition-colors"
              >
                Terms
              </Link>
              <Link
                to="/privacy"
                className="text-zinc-600 hover:text-white text-xs font-medium uppercase tracking-widest transition-colors"
              >
                Privacy
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* ============ ANIMATION STYLES ============ */}
      <style>{`
        .reveal-on-scroll {
          opacity: 0;
          transform: translate3d(0, 40px, 0);
          transition: opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1);
          transition-delay: var(--reveal-delay, 0ms);
          will-change: transform, opacity;
        }
        .reveal-on-scroll.in-view {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }
        
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-fade-in-up-delayed {
          opacity: 0;
          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards;
        }
        .animate-fade-in-up-delayed-more {
          opacity: 0;
          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s forwards;
        }
        
        .bg-radial-glow {
          background: radial-gradient(circle at 50% 0%, rgba(249,115,22,0.06) 0%, transparent 60%),
                      radial-gradient(circle at 100% 50%, rgba(249,115,22,0.03) 0%, transparent 40%);
        }
        .cinematic-vignette {
          background: radial-gradient(circle, transparent 40%, rgba(10,10,10,0.95) 100%);
        }
        
        @media (prefers-reduced-motion: reduce) {
          .reveal-on-scroll {
            animation: none !important;
            transition: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
