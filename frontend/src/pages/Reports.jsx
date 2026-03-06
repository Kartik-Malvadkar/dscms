import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function Reports() {

  const [entries, setEntries] = useState([]);

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedWeek, setSelectedWeek] = useState("");

  const API_URL = "http://localhost/dscms/backend/api/entries.php";

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setEntries(data));
  }, []);

  const exportExcel = (data, filename) => {

    const formatted = data.map(e => ({
      Customer: e.customer_name,
      Service: e.service_name,
      Price: e.price,
      Date: new Date(e.created_at).toLocaleString("en-IN")
    }));

    const worksheet = XLSX.utils.json_to_sheet(formatted);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Report");

    const buffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array"
    });

    const blob = new Blob([buffer], {
      type: "application/octet-stream"
    });

    saveAs(blob, filename);

  };


  // DAILY REPORT
  const generateDaily = () => {

    const filtered = entries.filter(e =>
      e.created_at.startsWith(selectedDate)
    );

    exportExcel(filtered, "Daily_Report.xlsx");

  };


  // MONTHLY REPORT
  const generateMonthly = () => {

    const filtered = entries.filter(e =>
      e.created_at.startsWith(selectedMonth)
    );

    exportExcel(filtered, "Monthly_Report.xlsx");

  };


  // WEEKLY REPORT
  const generateWeekly = () => {

    const weekStart = new Date(selectedWeek);
    const weekEnd = new Date(selectedWeek);

    weekEnd.setDate(weekEnd.getDate() + 6);

    const filtered = entries.filter(e => {

      const d = new Date(e.created_at);

      return d >= weekStart && d <= weekEnd;

    });

    exportExcel(filtered, "Weekly_Report.xlsx");

  };


  return (

    <div>

      <h1 className="text-2xl font-bold mb-6">
        Reports Section
      </h1>


      <div className="grid md:grid-cols-3 gap-6">

        {/* DAILY REPORT */}

        <div className="bg-blue-100 p-6 rounded shadow">

          <h2 className="font-bold mb-3">Daily Report</h2>

          <input
            type="date"
            className="border p-2 rounded w-full mb-3"
            onChange={(e) => setSelectedDate(e.target.value)}
          />

          <button
            onClick={generateDaily}
            className="bg-blue-600 text-white px-4 py-2 rounded w-full"
          >
            Download Excel
          </button>

        </div>


        {/* WEEKLY REPORT */}

        <div className="bg-green-100 p-6 rounded shadow">

          <h2 className="font-bold mb-3">Weekly Report</h2>

          <input
            type="date"
            className="border p-2 rounded w-full mb-3"
            onChange={(e) => setSelectedWeek(e.target.value)}
          />

          <button
            onClick={generateWeekly}
            className="bg-green-600 text-white px-4 py-2 rounded w-full"
          >
            Download Excel
          </button>

        </div>


        {/* MONTHLY REPORT */}

        <div className="bg-yellow-100 p-6 rounded shadow">

          <h2 className="font-bold mb-3">Monthly Report</h2>

          <input
            type="month"
            className="border p-2 rounded w-full mb-3"
            onChange={(e) => setSelectedMonth(e.target.value)}
          />

          <button
            onClick={generateMonthly}
            className="bg-yellow-600 text-white px-4 py-2 rounded w-full"
          >
            Download Excel
          </button>

        </div>

      </div>

    </div>

  );

}

export default Reports;