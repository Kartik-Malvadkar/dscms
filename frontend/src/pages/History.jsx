import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function History() {
  const [entries, setEntries] = useState([]);
  const [allEntries, setAllEntries] = useState([]); // original data
  const [total, setTotal] = useState(0);

  const API_URL = "http://localhost/dscms/backend/api/entries.php";

  // Fetch Entries
  const fetchEntries = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();

    setEntries(data);
    setAllEntries(data);

    const totalAmount = data.reduce(
      (sum, entry) => sum + parseFloat(entry.price),
      0
    );

    setTotal(totalAmount);
  };

  // Export to Excel
  const exportToExcel = () => {
    const formattedData = entries.map((entry) => ({
      Customer: entry.customer_name,
      Service: entry.service_name,
      Price: entry.price,
      Date: new Date(entry.created_at).toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
      }),
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Work History");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const data = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });

    saveAs(data, "Onkar_Digital_Seva_History.xlsx");
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  // Handle Date Filter
  const handleDateFilter = (selectedDate) => {
    if (!selectedDate) {
      setEntries(allEntries);
      return;
    }

    const filtered = allEntries.filter((entry) =>
      entry.created_at.startsWith(selectedDate)
    );

    setEntries(filtered);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Work History</h1>

      {/* Total Income Card */}
      <div className="bg-green-100 p-4 rounded mb-6">
        <h2 className="text-lg font-semibold">
          Total Earnings: ₹{total}
        </h2>
      </div>

      <div className="bg-white p-6 rounded shadow-md">

        {/* Export Button */}
        <button
          onClick={exportToExcel}
          className="bg-green-600 text-white px-4 py-2 rounded mb-4"
        >
          Export to Excel
        </button>

        {/* Date Filter */}
        <input
          type="date"
          className="border p-2 rounded mb-4 ml-4"
          onChange={(e) => handleDateFilter(e.target.value)}
        />

        <table className="w-full border">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 border">Customer</th>
              <th className="p-2 border">Service</th>
              <th className="p-2 border">Price</th>
              <th className="p-2 border">Date & Time</th>
            </tr>
          </thead>

          <tbody>
            {entries.map((entry) => (
              <tr key={entry.id}>
                <td className="p-2 border">{entry.customer_name}</td>
                <td className="p-2 border">{entry.service_name}</td>
                <td className="p-2 border">₹{entry.price}</td>
                <td className="p-2 border">
                  {new Date(entry.created_at).toLocaleString("en-IN", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {entries.length === 0 && (
          <p className="text-gray-500 mt-4">No work records found.</p>
        )}
      </div>
    </div>
  );
}

export default History;