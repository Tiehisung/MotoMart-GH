import HOVER from "@/components/ui/hover-card";
import { useGetPopularLocationsQuery } from "@/services/locationApi";
import { useAppSelector } from "@/store/hooks/store";
import {
  HiOutlineArrowRight,
  HiOutlineShieldCheck,
  HiOutlineMapPin,
  HiOutlineStar,
} from "react-icons/hi2";
import { Link } from "react-router-dom";
import HeroCarousel from "./HeroCarousel";

const Hero = ({ type = "primary" }: { type?: "primary" | "secondary" }) => {
  const { user } = useAppSelector((s) => s.auth);
  const { data } = useGetPopularLocationsQuery();

  const locations = data?.data;

  console.log(data);

  if (type == "primary")
    return (
      <section className="relative w-full min-h-svh flex items-center overflow-hidden bg-background">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-background to-primary/5" />
          <div className="absolute inset-0 bg-linear-to-b from-background/60 via-transparent to-background" />
        </div>

        <div className="relative z-10 w-full max-w-350 mx-auto px-6 md:px-12 lg:px-24 mt-20">
          <div className="max-w-4xl">
            {/* Label */}
            <div className="flex items-center gap-4 mb-8 animate-fade-in">
              <span className="w-12 h-px bg-primary" />
              <span className="text-xs font-semibold tracking-widest text-primary uppercase">
                Ghana's Trusted Motorbike Marketplace
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-[1.05] tracking-tight mb-6 animate-fade-in-up">
              Buy & Sell
              <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-primary/60">
                Motorbikes Safely
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base md:text-lg text-muted-foreground font-light max-w-xl leading-relaxed mb-10 animate-fade-in-up-delayed">
              Verified sellers, inspected bikes, trusted deals. The smarter way
              to find your next motorbike in Wa, Lawra, Tumu, and across Upper
              West.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-4 animate-fade-in-up-delayed-more">
              <Link
                to="/browse"
                className="group inline-flex items-center justify-center gap-3 bg-primary text-primary-foreground font-semibold text-sm uppercase tracking-wider px-8 py-4 rounded-full transition-all duration-300 hover:opacity-90 hover:scale-[1.02] shadow-[0_0_30px_rgba(249,115,22,0.2)] w-full sm:w-auto"
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
                className="group inline-flex items-center justify-center gap-3 border border-border text-foreground font-semibold text-sm uppercase tracking-wider px-8 py-4 rounded-full transition-all duration-300 hover:bg-muted w-full sm:w-auto"
              >
                List Your Bike
              </Link>
            </div>

            {/* Trust stats */}
            <div className="flex items-center gap-6 mt-12 text-sm animate-fade-in-up-delayed-more">
              <div className="flex items-center gap-2">
                <HiOutlineShieldCheck className="w-5 h-5 text-primary" />
                <span className="text-muted-foreground">100% Verified</span>
              </div>
              <span className="text-border">|</span>
              <div className="flex items-center gap-2">
                <HiOutlineMapPin className="w-5 h-5 text-primary" />
                <span className="text-muted-foreground">Upper West</span>
              </div>
              <span className="text-border">|</span>
              <div className="flex items-center gap-2">
                <HiOutlineStar className="w-5 h-5 text-primary" />
                <span className="text-muted-foreground">Trusted</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-4">
          <span className="text-[10px] font-medium tracking-widest uppercase text-muted-foreground">
            Scroll
          </span>
          <div className="w-px h-16 bg-linear-to-b from-muted-foreground/50 to-transparent" />
        </div>
      </section>
    );

  return (
    <section className="relative w-full min-h-[90svh] lg:min-h-svh flex items-center overflow-hidden bg-background">
      {/* Background gradients */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-background to-primary/5" />
        <div className="absolute inset-0 bg-linear-to-b from-background/60 via-transparent to-background" />
      </div>

      <div className="relative z-10 w-full max-w-350 mx-auto px-6 md:px-12 lg:px-24 pt-24 pb-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* LEFT - TEXT CONTENT */}
          <div className="max-w-xl">
            {/* Label */}
            <div className="flex items-center gap-4 mb-8 animate-fade-in">
              <span className="w-12 h-px bg-primary" />
              <span className="text-xs font-semibold tracking-widest text-primary uppercase ">
                Ghana's Trusted Motorbike Marketplace
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-[1.05] tracking-tight mb-6 animate-fade-in-up">
              Buy & Sell
              <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-primary/60">
                Motorbikes Safely
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base md:text-lg text-muted-foreground font-light max-w-xl leading-relaxed mb-10 animate-fade-in-up-delayed">
              Verified sellers, inspected bikes, trusted deals. The smarter way
              to find your next motorbike in{" "}
              {locations?.map((loc) => (
                <span key={loc.name}>
                  <HOVER
                    trigger={`${loc.name}, `}
                    triggerStyles="italic text-warning"
                  >
                    <span>
                      {`${loc.name} is a ${loc.type} in ${loc.region}`}
                    </span>
                  </HOVER>{" "}
                </span>
              ))}
              and across Ghana.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-4 animate-fade-in-up-delayed-more">
              <Link
                to="/browse"
                className="group inline-flex items-center justify-center gap-3 bg-primary text-primary-foreground font-semibold text-sm uppercase tracking-wider px-8 py-4 rounded-full transition-all duration-300 hover:opacity-90 hover:scale-[1.02] shadow-[0_0_30px_rgba(249,115,22,0.2)] w-full sm:w-auto"
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
                className="group inline-flex items-center justify-center gap-3 border border-border text-foreground font-semibold text-sm uppercase tracking-wider px-8 py-4 rounded-full transition-all duration-300 hover:bg-muted w-full sm:w-auto"
              >
                List Your Bike
              </Link>
            </div>
          </div>

          {/* RIGHT - HERO IMAGE */}
          <div className="relative hidden lg:block animate-fade-in-up-delayed ">
            {/* Glow behind the image */}
            <div className="absolute inset-0 bg-linear-to-br from-primary/20 via-primary/5 to-transparent rounded-full blur-3xl transform scale-150" />

            {/* Main image container */}
            <HeroCarousel />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-4">
        <span className="text-[10px] font-medium tracking-widest uppercase text-muted-foreground">
          Scroll
        </span>
        <div className="w-px h-16 bg-linear-to-b from-muted-foreground/50 to-transparent" />
      </div>
    </section>
  );
};

export default Hero;
