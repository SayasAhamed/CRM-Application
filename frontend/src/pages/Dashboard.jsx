import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";

import { getLeads } from "../api/api";

export default function Dashboard() {

  const [leads, setLeads] = useState([]);

  // =========================================
  // FETCH LEADS
  // =========================================

  useEffect(() => {

    fetchLeads();

  }, []);

  const fetchLeads = async () => {

    try {

      const data = await getLeads();

      console.log("LEADS DATA:", data);

      setLeads(data);

    } catch (err) {

      console.log(err);

    }
  };

  // =========================================
  // DASHBOARD COUNTS
  // =========================================

  const totalLeads = leads.length;

  const newLeads = leads.filter(
    (lead) => lead.status === "New"
  ).length;

  const contactedLeads = leads.filter(
    (lead) => lead.status === "Contacted"
  ).length;

  const qualifiedLeads = leads.filter(
    (lead) => lead.status === "Qualified"
  ).length;

  const proposalSentLeads = leads.filter(
    (lead) => lead.status === "Proposal Sent"
  ).length;

  const wonLeads = leads.filter(
    (lead) => lead.status === "Won"
  ).length;

  const lostLeads = leads.filter(
    (lead) => lead.status === "Lost"
  ).length;

  // =========================================
  // REVENUE CALCULATIONS
  // =========================================

  const totalDealValue = leads.reduce(

    (sum, lead) =>

      sum + Number(lead.estimated_value || 0),

    0
  );

  const wonDealValue = leads
    .filter((lead) => lead.status === "Won")

    .reduce(

      (sum, lead) =>

        sum + Number(lead.estimated_value || 0),

      0
    );

  // =========================================
  // PERCENTAGES
  // =========================================

  const winRate =
    totalLeads > 0
      ? Math.round((wonLeads / totalLeads) * 100)
      : 0;

  const lostRate =
    totalLeads > 0
      ? Math.round((lostLeads / totalLeads) * 100)
      : 0;

  // =========================================
  // DASHBOARD CARDS
  // =========================================

  const cards = [

    {
      title: "Total Leads",
      value: totalLeads,
      bg: "bg-blue-50",
      text: "text-blue-600",
    },

    {
      title: "New Leads",
      value: newLeads,
      bg: "bg-cyan-50",
      text: "text-cyan-600",
    },

    {
      title: "Contacted Leads",
      value: contactedLeads,
      bg: "bg-indigo-50",
      text: "text-indigo-600",
    },

    {
      title: "Qualified Leads",
      value: qualifiedLeads,
      bg: "bg-purple-50",
      text: "text-purple-600",
    },

    {
      title: "Proposal Sent",
      value: proposalSentLeads,
      bg: "bg-pink-50",
      text: "text-pink-600",
    },

    {
      title: "Won Leads",
      value: wonLeads,
      bg: "bg-green-50",
      text: "text-green-600",
    },

    {
      title: "Lost Leads",
      value: lostLeads,
      bg: "bg-red-50",
      text: "text-red-600",
    },

    {
      title: "Total Deal Value",
      value: `Rs. ${totalDealValue.toLocaleString()}`,
      bg: "bg-orange-50",
      text: "text-orange-600",
    },

    {
      title: "Won Deal Value",
      value: `Rs. ${wonDealValue.toLocaleString()}`,
      bg: "bg-emerald-50",
      text: "text-emerald-700",
    },
  ];

  return (

    <div className="w-full min-h-screen px-10 py-10">

      <Navbar />

      <div className="w-full min-h-screen px-10 py-10">

        {/* ========================================= */}
        {/* HEADER */}
        {/* ========================================= */}

        <div className="mb-10 text-center">

          <h1 className="text-5xl font-extrabold text-gray-900">
            CRM Dashboard
          </h1>

          <p className="mt-2 text-gray-500">
            Real-time lead analytics and revenue insights
          </p>

        </div>

        {/* ========================================= */}
        {/* CARDS */}
        {/* ========================================= */}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

          {cards.map((card, index) => (

            <div
              key={index}
              className={`${card.bg} rounded-3xl shadow-sm border border-gray-100 p-8 hover:shadow-lg transition`}
            >

              <h2 className="mb-6 text-2xl font-semibold text-center text-gray-800">
                {card.title}
              </h2>

              <div
                className={`text-6xl font-extrabold text-center ${card.text}`}
              >
                {card.value}
              </div>

            </div>
          ))}

        </div>

        {/* ========================================= */}
        {/* EXTRA ANALYTICS */}
        {/* ========================================= */}

        <div className="grid grid-cols-1 gap-6 mt-10 lg:grid-cols-2">

          {/* PERFORMANCE */}

          <div className="p-8 bg-white shadow-sm rounded-3xl">

            <h2 className="mb-8 text-4xl font-bold text-center text-gray-900">
              Lead Performance
            </h2>

            {/* WIN RATE */}

            <div className="mb-8">

              <div className="flex items-center justify-between mb-2">

                <span className="font-medium text-gray-700">
                  Won Rate
                </span>

                <span className="font-bold text-green-600">
                  {winRate}%
                </span>

              </div>

              <div className="w-full h-4 bg-gray-200 rounded-full">

                <div
                  className="h-4 bg-green-500 rounded-full"
                  style={{
                    width: `${winRate}%`,
                  }}
                ></div>

              </div>

            </div>

            {/* LOST RATE */}

            <div>

              <div className="flex items-center justify-between mb-2">

                <span className="font-medium text-gray-700">
                  Lost Rate
                </span>

                <span className="font-bold text-red-500">
                  {lostRate}%
                </span>

              </div>

              <div className="w-full h-4 bg-gray-200 rounded-full">

                <div
                  className="h-4 bg-red-400 rounded-full"
                  style={{
                    width: `${lostRate}%`,
                  }}
                ></div>

              </div>

            </div>

          </div>

          {/* REVENUE OVERVIEW */}

          <div className="p-8 bg-white shadow-sm rounded-3xl">

            <h2 className="mb-10 text-4xl font-bold text-center text-gray-900">
              Revenue Overview
            </h2>

            <div className="space-y-10">

              <div className="text-center">

                <div className="mb-3 text-xl text-gray-500">
                  Total Pipeline Value
                </div>

                <div className="text-6xl font-extrabold text-orange-600">
                  Rs. {totalDealValue.toLocaleString()}
                </div>

              </div>

              <div className="text-center">

                <div className="mb-3 text-xl text-gray-500">
                  Closed Won Revenue
                </div>

                <div className="text-6xl font-extrabold text-green-600">
                  Rs. {wonDealValue.toLocaleString()}
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}