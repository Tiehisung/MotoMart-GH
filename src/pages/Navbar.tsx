import { Link, useLocation, useNavigate } from "react-router-dom";
import { HiOutlinePlusCircle } from "react-icons/hi2";
import { useAppSelector } from "@/store/hooks/store";
import { UserMenu } from "../components/auth/UserMenu";
import HomeNav from "./home/HomeNav";
import { cn } from "@/lib/utils";
import { FaMotorcycle } from "react-icons/fa";
// import { GlobalSearch } from "@/components/searcher/Global";

const Navbar = () => {
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  if (pathname == "/") return <HomeNav />;

  return (
    <nav className="fixed top-0 w-full z-50 _glass">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <AppName />

        <div className="flex items-center gap-1">
          {isAuthenticated ? (
            <>
              {user?.role === "seller" && (
                <button
                  onClick={() => navigate("/dashboard/listings/create")}
                  className="flex items-center gap-1.5 px-4 py-2 bg-brand-500 text-primary rounded-2xl text-sm font-medium hover:bg-brand-600 transition-colors"
                >
                  <HiOutlinePlusCircle className="w-4 h-4" />
                  <span className="hidden sm:inline">Sell</span>
                </button>
              )}
            </>
          ) : (
            <>
              <Link
                to="/auth/register"
                className="px-4 py-2 bg-brand-500 text-brand rounded-2xl text-sm font-medium hover:bg-brand-600 transition-colors"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* <GlobalSearch/> */}

        <UserMenu />
      </div>
    </nav>
  );
};

export default Navbar;

export const AppName = ({ className }: { className?: string }) => {
  return (
    <div>
      <Link to={"/"} className="flex items-center gap-2 group">
        <FaMotorcycle className="w-8 h-8 text-primary" />
        <span className={cn("font-bold text-xl text-foreground", className)}>
          Moto<span className="text-primary">Mart</span>
          <span className="text-xs text-muted-foreground font-normal ml-1">
            GH
          </span>
        </span>
      </Link>
    </div>
  );
};
