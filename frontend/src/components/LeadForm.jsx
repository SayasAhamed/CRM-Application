import { useState, useEffect } from "react";

export default function LeadForm({ onSubmit, selected }) {
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    source: "",
    salesperson: "",
    status: "New",
    deal_value: 0,
  });

  // Load selected lead into form (for edit)
  useEffect(() => {
    if (selected) setForm(selected);
  }, [selected]);

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-6">
      <h2 className="text-lg font-semibold mb-3">
        {selected ? "Edit Lead" : "Add Lead"}
      </h2>

      {/* GRID LAYOUT */}
      <div className="grid grid-cols-2 gap-3">
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} className="border p-2" />
        <input name="company" placeholder="Company" value={form.company} onChange={handleChange} className="border p-2" />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} className="border p-2" />
        <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} className="border p-2" />
        <input name="source" placeholder="Source" value={form.source} onChange={handleChange} className="border p-2" />
        <input name="salesperson" placeholder="Salesperson" value={form.salesperson} onChange={handleChange} className="border p-2" />

        {/* Status dropdown */}
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="border p-2"
        >
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Qualified">Qualified</option>
          <option value="Proposal Sent">Proposal Sent</option>
          <option value="Won">Won</option>
          <option value="Lost">Lost</option>
        </select>

        {/* Deal value */}
        <input
          name="deal_value"
          type="number"
          placeholder="Deal Value"
          value={form.deal_value}
          onChange={handleChange}
          className="border p-2"
        />
      </div>

      {/* Save Button */}
      <button
        onClick={() => onSubmit(form)}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded w-full"
      >
        Save
      </button>
    </div>
  );
}