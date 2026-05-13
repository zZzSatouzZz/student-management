import axios from "../api/axios.customize";

export const getStudentsApi = () => {
  return axios.get("/students");
};

export const createStudentApi = (data) => {
  return axios.post("/students", data);
};

export const deleteStudentApi = (id) => {
  return axios.delete(`/students/${id}`);
};
