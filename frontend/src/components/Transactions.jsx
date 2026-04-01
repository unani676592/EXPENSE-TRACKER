import React, { useMemo } from "react";
import { getRecentTransactions, formatCurrency } from "../utils/calculations";

const Transactions = ({ transactions, activeNav }) => {
  const visibleTransactions = useMemo(() => {
    const recent = getRecentTransactions(transactions, 6);

    if (activeNav === "Income") {
      return recent.filter((txn) => txn.type === "income");
    }

    if (activeNav === "Expense") {
      return recent.filter((txn) => txn.type === "expense");
    }

    return recent;
  }, [transactions, activeNav]);

  return (
    <section className="rounded-xl bg-white p-4 shadow-md">
      <div className="mb-3">
        <h3 className="text-lg font-semibold text-slate-800">Recent Transactions</h3>
      </div>

      <div className="space-y-2">
        {visibleTransactions.length === 0 ? (
          <p className="rounded-lg bg-slate-50 p-3 text-sm text-slate-500">No transactions found.</p>
        ) : (
          visibleTransactions.map((txn) => (
            <article
              key={txn.id}
              className="flex items-center justify-between rounded-lg border border-slate-100 p-3"
            >
              <div>
                <h4 className="text-sm font-medium text-slate-700">{txn.title}</h4>
                <p className="text-xs text-slate-400">{new Date(txn.date).toLocaleDateString("en-IN")}</p>
              </div>

              <span
                className={`text-sm font-semibold ${
                  txn.type === "income" ? "text-green-600" : "text-red-500"
                }`}
              >
                {txn.type === "income" ? "+" : "-"}
                {formatCurrency(Math.abs(txn.amount))}
              </span>
            </article>
          ))
        )}
      </div>
    </section>
  );
};

export default Transactions;
