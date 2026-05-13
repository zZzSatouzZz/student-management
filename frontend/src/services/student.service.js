import instance from "../api/axios.customize";

export const getStudentsApi = () => {
  return instance.get("/students");
};

export const createStudentApi = (data) => {
  return instance.post("/students", data);
};

export const updateStudentApi = (id, data) => {
  return instance.put(`/students/${id}`, data);
};

export const deleteStudentApi = (id) => {
  return instance.delete(`/students/${id}`);
};

export const getOneStudentApi = (id) => {
  return instance.get(`/students/${id}`);
};