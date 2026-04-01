import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { formatCurrency } from "../utils/calculations";

const COLORS = ["#6f5ef9", "#f59f0a", "#ef4444"];

const Chart = ({ summary }) => {
  const data = [
    { name: "Total Balance", value: Math.max(summary.balance, 0) },
    { name: "Total Income", value: summary.income },
    { name: "Total Expenses", value: summary.expenses },
  ];

  return (
    <section className="rounded-xl bg-white p-4 shadow-md">
      <div className="mb-3">
        <h3 className="text-lg font-semibold text-slate-800">Financial Overview</h3>
      </div>

      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={100}
              paddingAngle={3}
            >
              {data.map((entry, index) => (
                <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => formatCurrency(value)} />
            <Legend iconType="circle" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default Chart;
