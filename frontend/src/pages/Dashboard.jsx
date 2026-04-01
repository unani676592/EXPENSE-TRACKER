import React, { useEffect, useMemo, useState } from "react";
import Sidebar from "../components/Sidebar";
import DashboardCards from "../components/DashboardCards";
import Transactions from "../components/Transactions";
import Chart from "../components/Chart";
import { calculateSummary } from "../utils/calculations";

const STORAGE_KEY_PREFIX = "et_minimal_dashboard";

const defaultUser = {
  id: "default-user",
  name: "Ishan",
  profileImage:
    "https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&w=160&q=80",
};

const defaultTransactions = [
  { id: "t1", title: "Salary", amount: 91500, type: "income", date: "2026-03-12" },
  { id: "t2", title: "Shopping", amount: 430, type: "expense", date: "2026-03-17" },
  { id: "t3", title: "Travel", amount: 670, type: "expense", date: "2026-03-13" },
  { id: "t4", title: "Electricity Bill", amount: 200, type: "expense", date: "2026-03-11" },
  { id: "t5", title: "Loan Repayment", amount: 600, type: "expense", date: "2026-03-10" },
];

const getLoggedInUser = () => {
  const possibleKeys = ["expense_tracker_user", "user", "et_user", "loggedInUser"];

  for (const key of possibleKeys) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) {
        continue;
      }

      const parsed = JSON.parse(raw);
      if (parsed && (parsed.name || parsed.fullName || parsed.username)) {
        return {
          id: parsed.id || parsed._id || parsed.email || "default-user",
          name: parsed.name || parsed.fullName || parsed.username,
          profileImage: parsed.profileImage || parsed.profilePic || defaultUser.profileImage,
        };
      }
    } catch {
      // Ignore malformed localStorage data and continue.
    }
  }

  return defaultUser;
};

const Dashboard = () => {
  const [user] = useState(() => getLoggedInUser());
  const userStorageKey = `${STORAGE_KEY_PREFIX}_${user.id}`;

  const [transactions] = useState(() => {
    try {
      const saved = localStorage.getItem(userStorageKey);
      return saved ? JSON.parse(saved) : defaultTransactions;
    } catch {
      return defaultTransactions;
    }
  });
  const [activeNav, setActiveNav] = useState("Dashboard");

  useEffect(() => {
    localStorage.setItem(userStorageKey, JSON.stringify(transactions));
  }, [transactions, userStorageKey]);

  const summary = useMemo(() => calculateSummary(transactions), [transactions]);

  const handleNavChange = (navItem) => {
    setActiveNav(navItem);
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 lg:grid-cols-[240px_1fr]">
        <Sidebar user={user} activeNav={activeNav} onNavChange={handleNavChange} />

        <main className="space-y-4">
          <DashboardCards summary={summary} />

          <section className="grid grid-cols-1 gap-4 xl:grid-cols-[1.7fr_1fr]">
            <Transactions transactions={transactions} activeNav={activeNav} />
            <Chart summary={summary} />
          </section>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
