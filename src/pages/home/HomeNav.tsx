import { UserMenu } from "@/components/auth/UserMenu";
import { useAppSelector } from "@/store/hooks/store";
import { HiOutlineArrowRight } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { AppName } from "../Navbar";

const HomeNav = () => {
  const { user } = useAppSelector((s) => s.auth);
  return (
    <header className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 md:px-6 w-full pointer-events-none">
      <nav className="pointer-events-auto w-full max-w-7xl border border-border bg-card/80 backdrop-blur-2xl rounded-full transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
        <div className="flex w-full px-6 md:px-12 py-4 items-center justify-between">
           <AppName/>

          <div className="hidden md:flex items-center gap-8">
            {["Browse", "How It Works", 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                className="_cardLift py-1 text-xs font-medium uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
              >
                {item}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {(!user || user?.role == "seller") && (
              <Link
                to={"/dashboard/listings/create"}
                className="max-sm:hidden inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider bg-primary text-primary-foreground px-5 py-2.5 rounded-full hover:opacity-90 transition-all duration-300 shadow-[0_0_20px_rgba(249,115,22,0.2)] dark:shadow-[0_0_20px_rgba(249,115,22,0.3)]"
              >
                Start Selling
                <HiOutlineArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}
            <UserMenu />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default HomeNav;
