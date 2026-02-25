import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Home() {
  const [entries, setEntries] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [todayIncome, setTodayIncome] = useState(0);
  const [totalEntries, setTotalEntries] = useState(0);
  const [todayEntries, setTodayEntries] = useState(0);
  const [monthlyData, setMonthlyData] = useState({});
  const [filterDate, setFilterDate] = useState("");
  const [totalExpense, setTotalExpense] = useState(0);

  const API_URL = "http://localhost/dscms/backend/api/entries.php";
  const EXPENSE_API = "http://localhost/dscms/backend/api/expenses.php";

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setEntries(data);

        const total = data.reduce(
          (sum, entry) => sum + parseFloat(entry.price),
          0
        );

        const today = new Date().toLocaleDateString();

        const todayData = data.filter(
          (entry) =>
            new Date(entry.created_at).toLocaleDateString() === today
        );

        const todayTotal = todayData.reduce(
          (sum, entry) => sum + parseFloat(entry.price),
          0
        );

        // Monthly Income Calculation
        const monthlyMap = {};
        data.forEach((entry) => {
          const month = new Date(entry.created_at).toLocaleString("en-IN", {
            month: "short",
            year: "numeric",
          });

          if (!monthlyMap[month]) {
            monthlyMap[month] = 0;
          }

          monthlyMap[month] += parseFloat(entry.price);
        });

        setMonthlyData(monthlyMap);

        setTotalIncome(total);
        setTodayIncome(todayTotal);
        setTotalEntries(data.length);
        setTodayEntries(todayData.length);
      });

    fetch(EXPENSE_API)
      .then((res) => res.json())
      .then((data) => {
        const expenseTotal = data.reduce(
          (sum, exp) => sum + parseFloat(exp.amount),
          0
        );
        setTotalExpense(expenseTotal);
      });
  }, []);

  const chartData = {
    labels: Object.keys(monthlyData),
    datasets: [
      {
        label: "Monthly Income (₹)",
        data: Object.values(monthlyData),
        backgroundColor: "#3b82f6",
      },
    ],
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">
        Dashboard Overview
      </h1>

      {/* Date Filter
      <div className="mb-6">
        <input
          type="date"
          className="border p-2 rounded"
          onChange={(e) => setFilterDate(e.target.value)}
        />
      </div> */}

      <div className="grid md:grid-cols-4 gap-6 mb-8">

        <div className="bg-slate-900 text-white p-6 rounded-xl shadow-md">
          <h3 className="text-gray-400">Total Income</h3>
          <p className="text-3xl font-bold text-green-400 mt-2">
            ₹<CountUp end={totalIncome} duration={1.5} />
          </p>
        </div>

        <div className="bg-slate-900 text-white p-6 rounded-xl shadow-md">
          <h3 className="text-gray-400">Today's Income</h3>
          <p className="text-3xl font-bold text-blue-400 mt-2">
            ₹<CountUp end={todayIncome} duration={1.5} />
          </p>
        </div>

        <div className="bg-slate-900 text-white p-6 rounded-xl shadow-md">
          <h3 className="text-gray-400">Total Entries</h3>
          <p className="text-3xl font-bold text-yellow-400 mt-2">
            <CountUp end={totalEntries} duration={1.5} />
          </p>
        </div>

        {/* Total Expense */}
        <div className="bg-slate-900 text-white p-6 rounded-xl shadow-md">
          <h3 className="text-gray-400">Total Expense</h3>
          <p className="text-3xl font-bold text-red-400 mt-2">
            ₹<CountUp end={totalExpense} duration={1.5} />
          </p>
        </div>

        {/* Net Profit */}
        <div className="bg-slate-900 text-white p-6 rounded-xl shadow-md">
          <h3 className="text-gray-400">Net Profit</h3>
          <p className="text-3xl font-bold text-green-500 mt-2">
            ₹<CountUp end={totalIncome - totalExpense} duration={1.5} />
          </p>
        </div>

        <div className="bg-slate-900 text-white p-6 rounded-xl shadow-md">
          <h3 className="text-gray-400">Today's Entries</h3>
          <p className="text-3xl font-bold text-purple-400 mt-2">
            <CountUp end={todayEntries} duration={1.5} />
          </p>
        </div>
      </div>

      {/* Monthly Chart */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">
          Monthly Income Summary
        </h2>
        <Bar data={chartData} />
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md mt-8">
        <h2 className="text-xl font-semibold mb-4">
          Daily Closing Report
        </h2>

        <p><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
        <p><strong>Total Entries:</strong> {todayEntries}</p>
        <p><strong>Total Income:</strong> ₹{todayIncome}</p>
        <p><strong>Total Expense:</strong> ₹{totalExpense}</p>
        <p className="text-lg font-bold mt-2">
          Net Profit: ₹{todayIncome - totalExpense}
        </p>
      </div>
    </div>
  );
}

export default Home;