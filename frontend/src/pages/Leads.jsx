import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Notes from "../components/Notes";

import {
  getLeads,
  createLead,
  updateLead,
  deleteLead,
} from "../api/api";

import {
  FaEdit,
  FaTrash,
  FaEye,
} from "react-icons/fa";

export default function Leads() {

  const [leads, setLeads] = useState([]);

  const [selectedLead, setSelectedLead] =
    useState(null);

  const [editingLead, setEditingLead] =
    useState(null);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] =
    useState("");

  const [sourceFilter, setSourceFilter] =
    useState("");

  const [salespersonFilter,
    setSalespersonFilter] = useState("");

  const [formData, setFormData] =
    useState({

      name: "",

      company: "",

      email: "",

      phone: "",

      source: "",

      assigned_salesperson: "",

      status: "New",

      estimated_value: "",
    });

  useEffect(() => {

    fetchLeads();

  }, []);

  const fetchLeads = async () => {

    try {

      const data = await getLeads();

      setLeads(data);

    } catch (err) {

      console.log(err);
    }
  };

  const resetForm = () => {

    setFormData({

      name: "",

      company: "",

      email: "",

      phone: "",

      source: "",

      assigned_salesperson: "",

      status: "New",

      estimated_value: "",
    });

    setEditingLead(null);
  };

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      if (editingLead) {

        const confirmUpdate =
          window.confirm(
            "Are you sure you want to update this lead?"
          );

        if (!confirmUpdate) return;

        await updateLead(
          editingLead.id,
          formData
        );

        alert(
          "Lead updated successfully!"
        );

      } else {

        const confirmCreate =
          window.confirm(
            "Do you want to save this new lead?"
          );

        if (!confirmCreate) return;

        await createLead(formData);

        alert(
          "Lead created successfully!"
        );
      }

      fetchLeads();

      resetForm();

    } catch (err) {

      console.log(err);

      alert("Something went wrong");
    }
  };

  const handleEdit = (lead) => {

    setEditingLead(lead);

    setFormData({

      name: lead.name,

      company: lead.company,

      email: lead.email,

      phone: lead.phone,

      source: lead.source,

      assigned_salesperson:
        lead.assigned_salesperson,

      status: lead.status,

      estimated_value:
        lead.estimated_value,
    });

    window.scrollTo({

      top: 0,

      behavior: "smooth",
    });
  };

  const handleDelete = async (id) => {

    const confirmDelete =
      window.confirm(
        "Delete this lead?"
      );

    if (!confirmDelete) return;

    try {

      await deleteLead(id);

      fetchLeads();

    } catch (err) {

      console.log(err);
    }
  };

  const filteredLeads =
    leads.filter((lead) => {

      const matchesSearch =

        lead.name
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||

        lead.company
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||

        lead.email
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesStatus =
        statusFilter
          ? lead.status ===
            statusFilter
          : true;

      const matchesSource =
        sourceFilter
          ? lead.source ===
            sourceFilter
          : true;

      const matchesSalesperson =
        salespersonFilter
          ? lead.assigned_salesperson
              ?.toLowerCase()
              .includes(
                salespersonFilter.toLowerCase()
              )
          : true;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesSource &&
        matchesSalesperson
      );
    });

  const formatDate = (date) => {

    if (!date) return "-";

    return new Date(date)
      .toLocaleDateString();
  };

  // =========================================
// DOWNLOAD EXCEL
// =========================================

const downloadExcel = () => {

  window.open(
    "http://127.0.0.1:8000/export/excel",
    "_blank"
  );
};


  // =========================================
  // DOWNLOAD CSV
  // =========================================

  const downloadCSV = () => {

    window.open(
      "http://127.0.0.1:8000/export/csv",
      "_blank"
    );
  };

  return (

    <div className="w-full min-h-screen px-10 py-10">

      <Navbar />

      <div className="w-full min-h-screen px-10 py-10">

        {/* HEADER */}

        <div className="mb-10 text-center">

          <h1 className="text-4xl font-extrabold text-gray-900">

            Leads Management

          </h1>

          <p className="mt-2 text-gray-500">

            Manage sales pipeline and customer relationships

          </p>

        </div>

        {/* FORM */}

        <div className="p-8 mb-10 bg-white shadow-lg rounded-3xl">

          <h2 className="mb-8 text-3xl font-bold text-center text-gray-500">

            {editingLead
              ? "Update Lead"
              : "Add New Lead"}

          </h2>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 gap-6 md:grid-cols-2"
          >

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="p-5 text-white bg-gray-800 rounded-2xl"
            />

            <input
              type="text"
              name="company"
              placeholder="Company Name"
              value={formData.company}
              onChange={handleChange}
              required
              className="p-5 text-white bg-gray-800 rounded-2xl"
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="p-5 text-white bg-gray-800 rounded-2xl"
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
              className="p-5 text-white bg-gray-800 rounded-2xl"
            />

            <select
              name="source"
              value={formData.source}
              onChange={handleChange}
              required
              className="p-5 text-white bg-gray-800 rounded-2xl"
            >

              <option value="">
                Select Lead Source
              </option>

              <option value="Website">
                Website
              </option>

              <option value="Facebook">
                Facebook
              </option>

              <option value="Referral">
                Referral
              </option>

              <option value="Instagram">
                Instagram
              </option>

              <option value="Other">
                Other
              </option>

            </select>

            <input
              type="text"
              name="assigned_salesperson"
              placeholder="Assigned Salesperson"
              value={
                formData.assigned_salesperson
              }
              onChange={handleChange}
              required
              className="p-5 text-white bg-gray-800 rounded-2xl"
            />

            <input
              type="number"
              name="estimated_value"
              placeholder="Estimated Deal Value (Rs.)"
              value={
                formData.estimated_value
              }
              onChange={handleChange}
              required
              className="p-5 text-white bg-gray-800 rounded-2xl"
            />

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="p-5 text-white bg-gray-800 rounded-2xl"
            >

              <option value="New">
                New
              </option>

              <option value="Contacted">
                Contacted
              </option>

              <option value="Qualified">
                Qualified
              </option>

              <option value="Proposal Sent">
                Proposal Sent
              </option>

              <option value="Won">
                Won
              </option>

              <option value="Lost">
                Lost
              </option>

            </select>

            <button
              type="submit"
              className="px-8 py-4 text-lg font-bold text-white transition bg-blue-600 shadow-lg md:col-span-2 rounded-2xl hover:bg-blue-700"
            >

              {editingLead
                ? "Update Lead"
                : "Save Lead"}

            </button>

          </form>

        </div>

        {/* FILTERS */}

        <div className="grid grid-cols-1 gap-4 mb-8 md:grid-cols-4">

          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="p-4 text-sm text-white bg-gray-800 rounded-2xl"
          />

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
            className="p-4 text-sm text-white bg-gray-800 rounded-2xl"
          >

            <option value="">
              All Status
            </option>

            <option value="New">
              New
            </option>

            <option value="Contacted">
              Contacted
            </option>

            <option value="Qualified">
              Qualified
            </option>

            <option value="Proposal Sent">
              Proposal Sent
            </option>

            <option value="Won">
              Won
            </option>

            <option value="Lost">
              Lost
            </option>

          </select>

          <select
            value={sourceFilter}
            onChange={(e) =>
              setSourceFilter(
                e.target.value
              )
            }
            className="p-4 text-sm text-white bg-gray-800 rounded-2xl"
          >

            <option value="">
              All Sources
            </option>

            <option value="Website">
              Website
            </option>

            <option value="Facebook">
              Facebook
            </option>

            <option value="Referral">
              Referral
            </option>

            <option value="Instagram">
              Instagram
            </option>

            <option value="Other">
              Other
            </option>

          </select>

          <input
            type="text"
            placeholder="Salesperson"
            value={salespersonFilter}
            onChange={(e) =>
              setSalespersonFilter(
                e.target.value
              )
            }
            className="p-4 text-sm text-white bg-gray-800 rounded-2xl"
          />

        </div>
        

        {/* EXPORT BUTTONS - Download */}

        <div className="flex gap-4 mb-6">

          <button
            onClick={downloadExcel}
            className="px-6 py-3 font-semibold text-white transition bg-green-600 shadow rounded-xl hover:bg-green-700"
          >
            Download Excel
          </button>

          <button
            onClick={downloadCSV}
            className="px-6 py-3 font-semibold text-white transition bg-blue-600 shadow rounded-xl hover:bg-blue-700"
          >
            Download CSV
          </button>

        </div>
            
        
        {/* TABLE */}

        <div className="overflow-x-auto bg-white shadow-lg rounded-3xl">

          <table className="min-w-full text-sm">

            <thead className="text-gray-700 bg-gray-100">

              <tr>

                <th className="p-4">#</th>

                <th className="p-4">
                  Name
                </th>

                <th className="p-4">
                  Company
                </th>

                <th className="p-4">
                  Email
                </th>

                <th className="p-4">
                  Status
                </th>

                <th className="p-4">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredLeads.map(
                (lead, index) => (

                  <tr
                    key={lead.id}
                    className="border-b"
                  >

                    <td className="p-4 text-gray-700">
                      {index + 1}
                    </td>

                    <td className="p-4 font-semibold text-blue-600">

                      {lead.name}

                    </td>

                    <td className="p-4 text-gray-500">
                      {lead.company}
                    </td>

                    <td className="p-4 text-gray-500">
                      {lead.email}
                    </td>

                    <td className="p-4">

                      <span className="px-3 py-1 text-xs text-blue-700 bg-blue-100 rounded-full">

                        {lead.status}

                      </span>

                    </td>


                    
                    {/* Table icon Set for Edit, Quick view, and Update */}
                    <td className="p-4">

                      <div className="flex gap-2">

                        <button
                          onClick={() =>
                            setSelectedLead(
                              lead
                            )
                          }
                          className="flex items-center justify-center text-white bg-blue-600 w-9 h-9 rounded-xl"
                        >

                          <FaEye size={13} />

                        </button>

                        <button
                          onClick={() =>
                            handleEdit(lead)
                          }
                          className="flex items-center justify-center text-white bg-yellow-500 w-9 h-9 rounded-xl"
                        >

                          <FaEdit size={13} />

                        </button>

                        <button
                          onClick={() =>
                            handleDelete(
                              lead.id
                            )
                          }
                          className="flex items-center justify-center text-white bg-red-500 w-9 h-9 rounded-xl"
                        >

                          <FaTrash size={13} />

                        </button>

                      </div>

                    </td>

                  </tr>
                )
              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* QUICK VIEW tap on Lead Name*/}

      {selectedLead && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

          <div className="w-full max-w-5xl p-8 bg-white shadow-2xl rounded-3xl max-h-[90vh] overflow-y-auto">

            <div className="flex items-center justify-between mb-6">

              <h2 className="text-2xl font-bold text-green-400">

                Lead Details

              </h2>

              <button
                onClick={() =>
                  setSelectedLead(null)
                }
                className="flex items-center justify-center w-10 h-10 text-xl font-bold text-white bg-red-500 rounded-full"
              >

                ×

              </button>

            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">

              {/* LEFT SIDE */}

              <div className="space-y-6">

                <div>
                  <p className="text-sm text-gray-500">
                    Full Name
                  </p>

                  <h2 className="text-3xl font-bold text-black">
                    {selectedLead.name}
                  </h2>
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Email Address
                  </p>

                  <h2 className="text-2xl font-semibold text-black">
                    {selectedLead.email}
                  </h2>
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Lead Source
                  </p>

                  <h2 className="text-2xl font-semibold text-black">
                    {selectedLead.source}
                  </h2>
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Assigned Salesperson
                  </p>

                  <h2 className="text-2xl font-semibold text-black">
                    {selectedLead.assigned_salesperson}
                  </h2>
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Status
                  </p>

                  <span className="inline-block px-4 py-2 mt-1 text-sm font-semibold text-blue-700 bg-blue-100 rounded-full">
                    {selectedLead.status}
                  </span>
                </div>

              </div>

              {/* RIGHT SIDE */}

              <div className="space-y-6">

                <div>
                  <p className="text-sm text-gray-500">
                    Company Name
                  </p>

                  <h2 className="text-3xl font-bold text-black">
                    {selectedLead.company}
                  </h2>
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Phone Number
                  </p>

                  <h2 className="text-2xl font-semibold text-black">
                    {selectedLead.phone}
                  </h2>
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Estimated Deal Value
                  </p>

                  <h2 className="text-2xl font-bold text-green-600">
                    Rs. {selectedLead.estimated_value}
                  </h2>
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Created Date
                  </p>

                  <h2 className="text-xl font-semibold text-black">
                    {formatDate(selectedLead.created_at)}
                  </h2>
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Last Updated Date
                  </p>

                  <h2 className="text-xl font-semibold text-black">
                    {formatDate(selectedLead.updated_at)}
                  </h2>
                </div>

              </div>

            </div>

            <div className="mt-10 text-blue-500">

              <Notes
                leadId={selectedLead.id}
              />

            </div>

          </div>

        </div>

      )}

    </div>
  );
}