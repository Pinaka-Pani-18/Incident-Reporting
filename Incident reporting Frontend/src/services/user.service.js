import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/report/";

class UserService {
  getPublicContent() {
    return axios.get(API_URL);
  }

  getUserBoard() {
    return axios.get(API_URL + "reporting-page", { headers: authHeader() });
  }

  // getModeratorBoard() {
  //   return axios.get(API_URL + 'all', { headers: authHeader() });
  // }

  getAdminBoard() {
    return axios.get(API_URL + "department-head", { headers: authHeader() });
  }
}

export default new UserService();
