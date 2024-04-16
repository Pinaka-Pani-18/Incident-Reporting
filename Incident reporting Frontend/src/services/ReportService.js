import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/report";

export const createReport = (report) => {
  return axios.post(REST_API_BASE_URL + "/save", report);
};

export const listAllTheReports = () => {
  return axios.get(REST_API_BASE_URL + "/all");
};

export const getReport = (reportId) => {
  return axios.get(REST_API_BASE_URL + "/" + reportId);
};

export const updateReport = (Id, report) => {
  return axios.put(REST_API_BASE_URL + "/" + Id, report);
};

export const deleteReport = (reportId) => {
  axios.delete(REST_API_BASE_URL + "/" + reportId);
};
