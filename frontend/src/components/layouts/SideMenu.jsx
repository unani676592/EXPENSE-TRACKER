import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";

const SideMenu = ({ activeMenu = "Dashboard" }) => {
  const navigate = useNavigate();
  const { clearUser } = useUser();

  const menuItems = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Expense", path: "/expense" },
    { label: "Income", path: "/income" },
  ];

  const onLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    clearUser();
    navigate("/login");
  };

  return (
    <aside className="h-full bg-white border-r border-slate-200 p-4 flex flex-col">
      <div className="mb-6">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Menu
        </h2>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => {
          const isActive = activeMenu === item.label;

          return (
            <Link
              key={item.label}
              to={item.path}
              className={`block rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-violet-100 text-violet-700"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <button
        type="button"
        onClick={onLogout}
        className="w-full mt-4 rounded-lg bg-slate-900 text-white py-2 text-sm font-medium hover:bg-slate-800"
      >
        Logout
      </button>
    </aside>
  );
};

export default SideMenu;