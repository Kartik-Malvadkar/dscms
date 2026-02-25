import React, { useEffect, useState } from "react";

function NewEntry() {
  const [services, setServices] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [selectedServiceName, setSelectedServiceName] = useState("");
  const [price, setPrice] = useState("");

  const SERVICES_API = "http://localhost/dscms/backend/api/services.php";
  const ENTRIES_API = "http://localhost/dscms/backend/api/entries.php";

  useEffect(() => {
    fetch(SERVICES_API)
      .then(res => res.json())
      .then(data => setServices(data));
  }, []);

  const handleServiceChange = (id) => {
    const service = services.find(s => s.id == id);
    setSelectedService(id);
    setSelectedServiceName(service.service_name);
    setPrice(service.price);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch(ENTRIES_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customer_name: customerName,
        service_id: selectedService,
        price: price,
      }),
    });

    printReceipt();   // 👈 ADD THIS LINE

    setCustomerName("");
    setSelectedService("");
    setPrice("");

    alert("Entry Saved Successfully!");
  };

  const printReceipt = () => {
    const receiptWindow = window.open("", "", "width=600,height=600");

    receiptWindow.document.write(`
    <h2>Onkar Digital Seva Center</h2>
    <p>Customer: ${customerName}</p>
    <p>Service: ${selectedServiceName}</p>
    <p>Amount: ₹${price}</p>
    <p>Date: ${new Date().toLocaleString()}</p>
  `);

    receiptWindow.document.close();
    receiptWindow.print();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">New Service Entry</h1>

      <form className="bg-white p-6 rounded shadow-md max-w-lg" onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Customer Name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          className="w-full border p-2 rounded mb-4"
          required
        />

        <select
          value={selectedServiceName}
          onChange={(e) => handleServiceChange(e.target.value)}
          className="w-full border p-2 rounded mb-4"
          required
        >
          <option value="">Select Service</option>
          {services.map(service => (
            <option key={service.id} value={service.id}>
              {service.service_name}
            </option>
          ))}
        </select>

        <input
          type="number"
          value={price}
          readOnly
          className="w-full border p-2 rounded mb-4 bg-gray-100"
        />

        <button className="bg-green-600 text-white px-4 py-2 rounded w-full">
          Save Entry
        </button>

      </form>
    </div>
  );
}

export default NewEntry;