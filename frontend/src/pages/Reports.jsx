import React from "react";

function Reports() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">
        Reports Section
      </h1>

      <div className="bg-white p-6 rounded shadow-md">
        <p className="text-gray-600">
          This is the reports dashboard.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mt-6">

          <div className="bg-blue-100 p-4 rounded">
            <h3 className="font-semibold">Daily Report</h3>
            <p className="text-sm text-gray-600">
              View daily income & expenses
            </p>
          </div>

          <div className="bg-green-100 p-4 rounded">
            <h3 className="font-semibold">Monthly Report</h3>
            <p className="text-sm text-gray-600">
              View monthly analytics
            </p>
          </div>

          <div className="bg-yellow-100 p-4 rounded">
            <h3 className="font-semibold">Profit Summary</h3>
            <p className="text-sm text-gray-600">
              Net profit overview
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Reports;