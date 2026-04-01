import React from "react";
import { LuCircleDollarSign, LuTrendingUp, LuTrendingDown } from "react-icons/lu";
import { formatCurrency } from "../utils/calculations";

const DashboardCards = ({ summary }) => {
  const cards = [
    {
      title: "Total Balance",
      value: summary.balance,
      icon: LuCircleDollarSign,
      iconBg: "bg-indigo-100",
      iconText: "text-indigo-600",
    },
    {
      title: "Total Income",
      value: summary.income,
      icon: LuTrendingUp,
      iconBg: "bg-teal-100",
      iconText: "text-teal-600",
    },
    {
      title: "Total Expenses",
      value: summary.expenses,
      icon: LuTrendingDown,
      iconBg: "bg-rose-100",
      iconText: "text-rose-600",
    },
  ];

  return (
    <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <article key={card.title} className="flex items-center gap-3 rounded-xl bg-white p-4 shadow-md">
            <div className={`rounded-xl p-3 ${card.iconBg} ${card.iconText}`}>
              <Icon size={18} />
            </div>
            <div>
              <p className="text-sm text-slate-500">{card.title}</p>
              <h3 className="text-2xl font-semibold text-slate-800">{formatCurrency(card.value)}</h3>
            </div>
          </article>
        );
      })}
    </section>
  );
};

export default DashboardCards;
