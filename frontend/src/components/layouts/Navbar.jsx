import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../context/UserContext";

const Navbar = ({ activeMenu = "Dashboard" }) => {
  const { user } = useUser();

  const { userName, profilePhoto } = useMemo(() => {
    const fromContext = user || null;

    const savedUser = localStorage.getItem("user");
    let fromStorage = null;

    try {
      fromStorage = savedUser ? JSON.parse(savedUser) : null;
    } catch {
      fromStorage = null;
    }

    const resolvedUser = fromContext || fromStorage || {};
    const displayName =
      resolvedUser?.fullName ||
      resolvedUser?.name ||
      (resolvedUser?.email ? resolvedUser.email.split("@")[0] : null) ||
      "Guest";

    const avatar = resolvedUser?.profilePic || resolvedUser?.profileImage || "";

    return {
      userName: displayName,
      profilePhoto: avatar,
    };
  }, [user]);

  const userInitial = (userName?.[0] || "G").toUpperCase();

  return (
    <header className="w-full bg-white border-b border-slate-200 px-4 md:px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-wide text-slate-500">Finance Tracker</p>
          <h1 className="text-lg md:text-xl font-semibold text-slate-900 truncate">
            {activeMenu}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block text-right">
            <p className="text-sm font-medium text-slate-800 truncate max-w-[160px]">
              {userName}
            </p>
            <p className="text-xs text-slate-500">Welcome back</p>
          </div>

          {profilePhoto ? (
            <img
              src={profilePhoto}
              alt={userName}
              className="w-9 h-9 rounded-full object-cover border border-slate-200"
            />
          ) : (
            <div className="w-9 h-9 rounded-full bg-violet-100 text-violet-700 font-semibold flex items-center justify-center">
              {userInitial}
            </div>
          )}

          <div className="flex items-center">
            <Link
              to="/dashboard"
              className="text-sm px-3 py-2 rounded-md text-slate-700 hover:bg-slate-100"
            >
              Home
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;