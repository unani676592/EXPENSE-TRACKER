export const calculateSummary = (transactions = []) => {
  const totals = transactions.reduce(
    (acc, txn) => {
      const amount = Number(txn.amount) || 0;
      if (txn.type === "income") {
        acc.income += amount;
      } else {
        acc.expenses += amount;
      }
      return acc;
    },
    { income: 0, expenses: 0 }
  );

  return {
    income: totals.income,
    expenses: totals.expenses,
    balance: totals.income - totals.expenses,
  };
};

export const formatCurrency = (value = 0) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(value) || 0);
};

export const getGreeting = (name = "User") => {
  return `Good Evening, ${name}`;
};

export const getRecentTransactions = (transactions = [], limit = 8) => {
  return [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, limit);
};

export const groupByCategory = (transactions = [], type = "expense") => {
  const grouped = transactions
    .filter((txn) => txn.type === type)
    .reduce((acc, txn) => {
      const key = txn.category || "Other";
      acc[key] = (acc[key] || 0) + (Number(txn.amount) || 0);
      return acc;
    }, {});

  return Object.entries(grouped)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
};

export const getLastNDaysTransactions = (transactions = [], days = 30, type = "expense") => {
  const now = new Date();
  const threshold = new Date(now);
  threshold.setDate(now.getDate() - days);

  return transactions.filter((txn) => {
    const txnDate = new Date(txn.date);
    return txn.type === type && txnDate >= threshold && txnDate <= now;
  });
};

export const getDailyExpenseTrend = (transactions = [], days = 30) => {
  const points = [];
  const now = new Date();

  for (let i = days - 1; i >= 0; i -= 1) {
    const date = new Date(now);
    date.setDate(now.getDate() - i);
    const dateKey = date.toISOString().slice(0, 10);
    points.push({
      date: dateKey,
      short: `${date.getDate()}/${date.getMonth() + 1}`,
      expense: 0,
    });
  }

  const map = Object.fromEntries(points.map((item) => [item.date, item]));

  transactions
    .filter((txn) => txn.type === "expense")
    .forEach((txn) => {
      const key = new Date(txn.date).toISOString().slice(0, 10);
      if (map[key]) {
        map[key].expense += Number(txn.amount) || 0;
      }
    });

  return points;
};
