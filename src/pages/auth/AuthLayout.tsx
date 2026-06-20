import { Outlet } from "react-router-dom";
import { AppName } from "../Navbar";

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8 flex items-center +justify-center animate-pulse">
            <AppName />
        </div>
        <div className="bg-card rounded-3xl shadow-soft p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
