import React from "react";
import { LuLayoutDashboard, LuWallet, LuBadgeIndianRupee, LuLogOut } from "react-icons/lu";

const navItems = [
  { label: "Dashboard", icon: LuLayoutDashboard },
  { label: "Income", icon: LuWallet },
  { label: "Expense", icon: LuBadgeIndianRupee },
  { label: "Logout", icon: LuLogOut },
];

const Sidebar = ({ user, activeNav, onNavChange }) => {
  const initial = (user?.name?.[0] || "U").toUpperCase();

  return (
    <aside className="flex h-full w-full flex-col rounded-xl bg-white p-4 shadow-md">
      <h2 className="text-lg font-semibold text-slate-800">Expense Tracker</h2>

      <div className="mt-6 flex flex-col items-center gap-2 rounded-xl bg-slate-50 p-4">
        {user?.profileImage ? (
          <img
            src={user.profileImage}
            alt={user.name}
            className="h-16 w-16 rounded-full object-cover ring-2 ring-indigo-100"
          />
        ) : (
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 text-xl font-semibold text-indigo-700">
            {initial}
          </div>
        )}
        <p className="text-sm font-medium text-slate-700">{user?.name || "Guest User"}</p>
      </div>

      <nav className="mt-6 flex flex-1 flex-col gap-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeNav === item.label;

          return (
            <button
              key={item.label}
              type="button"
              onClick={() => onNavChange(item.label)}
              className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-indigo-500 text-white"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-800"
              }`}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
