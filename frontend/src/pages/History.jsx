import React, { useEffect, useState } from "react";

function History() {

  const [entries, setEntries] = useState([]);
  const [total, setTotal] = useState(0);

  const API_URL = "http://localhost/dscms/backend/api/entries.php";

  useEffect(() => {

    fetch(API_URL)
      .then(res => res.json())
      .then(data => {

        const today = new Date().toLocaleDateString("en-CA"); 
        // format YYYY-MM-DD

        const todayEntries = data.filter(entry =>
          entry.created_at.startsWith(today)
        );

        setEntries(todayEntries);

        const totalAmount = todayEntries.reduce(
          (sum, entry) => sum + parseFloat(entry.price),
          0
        );

        setTotal(totalAmount);

      });

  }, []);

  return (

    <div>

      <h1 className="text-2xl font-bold mb-6">
        Today's Work History
      </h1>


      {/* Total Earnings Card */}

      <div className="bg-green-100 p-4 rounded mb-6">

        <h2 className="text-lg font-semibold">

          Today's Earnings: ₹{total}

        </h2>

      </div>


      {/* History Table */}

      <div className="bg-white p-6 rounded shadow-md">

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

            {entries.map(entry => (

              <tr key={entry.id}>

                <td className="p-2 border">
                  {entry.customer_name}
                </td>

                <td className="p-2 border">
                  {entry.service_name}
                </td>

                <td className="p-2 border">
                  ₹{entry.price}
                </td>

                <td className="p-2 border">
                  {new Date(entry.created_at).toLocaleString("en-IN", {
                    dateStyle: "medium",
                    timeStyle: "short"
                  })}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

        {entries.length === 0 && (
          <p className="text-gray-500 mt-4">
            No work records for today.
          </p>
        )}

      </div>

    </div>

  );

}

export default History;