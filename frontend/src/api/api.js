import axios from "axios";

const API = "http://127.0.0.1:8000";


// ======================================
// AUTH
// ======================================

export const login = async (data) => {

  const response = await axios.post(
    `${API}/auth/login`,
    data
  );

  return response.data;
};


// ======================================
// LEADS
// ======================================

export const getLeads = async () => {

  const response = await axios.get(
    `${API}/leads/`
  );

  return response.data;
};


export const createLead = async (data) => {

  const response = await axios.post(
    `${API}/leads/`,
    data
  );

  return response.data;
};


export const updateLead = async (
  id,
  data
) => {

  const response = await axios.put(
    `${API}/leads/${id}`,
    data
  );

  return response.data;
};


export const deleteLead = async (id) => {

  const response = await axios.delete(
    `${API}/leads/${id}`
  );

  return response.data;
};


// ======================================
// NOTES
// ======================================

export const getNotes = async (
  leadId
) => {

  const response = await axios.get(
    `${API}/notes/${leadId}`
  );

  return response.data;
};


export const addNote = async (
  data
) => {

  const response = await axios.post(
    `${API}/notes/`,
    data
  );

  return response.data;
};


export const updateNote = async (
  id,
  data
) => {

  const response = await axios.put(
    `${API}/notes/${id}`,
    data
  );

  return response.data;
};


export const deleteNote = async (
  id
) => {

  const response = await axios.delete(
    `${API}/notes/${id}`
  );

  return response.data;
};

export const downloadCSV = () => {
  window.open("http://127.0.0.1:8000/export/csv");
};

export const downloadExcel = () => {
  window.open("http://127.0.0.1:8000/export/excel");
};

export const getDashboardStats = async () => {  // New function to fetch dashboard stats

  const response = await axios.get(
    `${API}/leads/dashboard/stats`
  );

  return response.data;
};