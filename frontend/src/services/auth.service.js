import axios from "../api/axios.customize";

export const loginApi = (data) => {
  return axios.post("/auth/login", data);
};

export const registerApi = (data) => {
  return axios.post("/auth/register", data);
};