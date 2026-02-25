import React, { useState, useEffect } from "react";

function Expenses() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [expenses, setExpenses] = useState([]);

  const API = "http://localhost/dscms/backend/api/expenses.php";

  const fetchExpenses = () => {
    fetch(API)
      .then(res => res.json())
      .then(data => setExpenses(data));
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, amount })
    }).then(() => {
      setTitle("");
      setAmount("");
      fetchExpenses();
    });
  };

  const totalExpense = expenses.reduce(
    (sum, exp) => sum + parseFloat(exp.amount),
    0
  );

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Expense Management</h2>

      <form onSubmit={handleSubmit} className="mb-6">
        <input
          type="text"
          placeholder="Expense Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 mr-2"
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border p-2 mr-2"
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Add
        </button>
      </form>

      <h3 className="mb-3 font-semibold">
        Total Expense: ₹{totalExpense}
      </h3>

      {expenses.map((exp) => (
        <div key={exp.id} className="border p-3 mb-2">
          {exp.title} - ₹{exp.amount}
        </div>
      ))}
    </div>
  );
}

export default Expenses;