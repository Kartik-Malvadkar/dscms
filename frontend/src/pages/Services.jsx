import React, { useEffect, useState } from "react";

function Services() {
  const [services, setServices] = useState([]);
  const [serviceName, setServiceName] = useState("");
  const [price, setPrice] = useState("");

  const API_URL = "http://localhost/dscms/backend/api/services.php";

  // Fetch Services
  const fetchServices = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setServices(data);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // Add Service
  const handleAdd = async (e) => {
    e.preventDefault();

    await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        service_name: serviceName,
        price: price,
      }),
    });

    setServiceName("");
    setPrice("");
    fetchServices();
  };

  // Delete Service
  const handleDelete = async (id) => {
    await fetch(`${API_URL}?id=${id}`, {
      method: "DELETE",
    });

    fetchServices();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Manage Services</h1>

      {/* Add Service Form */}
      <form
        onSubmit={handleAdd}
        className="bg-white p-6 rounded shadow-md mb-8 w-full max-w-lg"
      >
        <h2 className="text-lg font-semibold mb-4">Add New Service</h2>

        <input
          type="text"
          placeholder="Service Name (e.g., PAN Card)"
          value={serviceName}
          onChange={(e) => setServiceName(e.target.value)}
          className="w-full border p-2 rounded mb-4"
          required
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full border p-2 rounded mb-4"
          required
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Add Service
        </button>
      </form>

      {/* Services Table */}
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-lg font-semibold mb-4">Service List</h2>

        <table className="w-full border">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 border">Service</th>
              <th className="p-2 border">Price (₹)</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service.id}>
                <td className="p-2 border">{service.service_name}</td>
                <td className="p-2 border">{service.price}</td>
                <td className="p-2 border text-center">
                  <button
                    onClick={() => handleDelete(service.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {services.length === 0 && (
          <p className="text-gray-500 mt-4">No services added yet.</p>
        )}
      </div>
    </div>
  );
}

export default Services;