import React, { useEffect, useState } from "react";

function NewEntry() {
  const [services, setServices] = useState([]);
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    address: "",
    service_id: "",
    quantity: 1
  });

  const SERVICES_API = "http://localhost/dscms/backend/api/services.php";
  const ENTRIES_API = "http://localhost/dscms/backend/api/entries.php";

  useEffect(() => {
    fetch(SERVICES_API)
      .then(res => res.json())
      .then(data => setServices(data));
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const selectedService = services.find(
    s => Number(s.id) === Number(form.service_id)
  );

  const total =
    selectedService
      ? selectedService.price * form.quantity
      : 0;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));

    const res = await fetch(ENTRIES_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        user_id: user.id
      })
    });

    const data = await res.json();

    if (data.status === "success") {
      alert("Entry Saved Successfully!");

      // Clear form after save
      setForm({
        name: "",
        mobile: "",
        email: "",
        address: "",
        service_id: "",
        quantity: 1
      });

    } else {
      alert("Failed to save entry");
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">

        <h2 className="text-xl font-bold mb-6">New Transaction</h2>

        <input
          name="name"
          placeholder="Customer Name"
          onChange={handleChange}
          className="w-full border p-2 mb-3 rounded"
          required
        />

        <input name="mobile" placeholder="Mobile Number (optional)"
          onChange={handleChange}
          className="w-full border p-2 mb-3 rounded" />

        <textarea name="address" placeholder="Address"
          onChange={handleChange}
          className="w-full border p-2 mb-3 rounded" />

        <select name="service_id"
          onChange={handleChange}
          className="w-full border p-2 mb-3 rounded" required>

          <option value="">Select Service</option>
          {services.map(service => (
            <option key={service.id} value={service.id}>
              {service.service_name}
            </option>
          ))}
        </select>

        <input type="number" name="quantity"
          min="1"
          value={form.quantity}
          onChange={handleChange}
          className="w-full border p-2 mb-4 rounded" />

        <button className="bg-green-600 text-white w-full py-2 rounded">
          Save Entry
        </button>
      </form>

      <div className="bg-slate-900 text-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Transaction Summary</h2>

        <p>Service: {selectedService?.service_name || "-"}</p>
        <p>Price: ₹{selectedService?.price || 0}</p>
        <p>Quantity: {form.quantity}</p>

        <hr className="my-4" />

        <p className="text-2xl font-bold text-green-400">
          Total: ₹{total}
        </p>
      </div>
    </div>
  );
}

export default NewEntry;