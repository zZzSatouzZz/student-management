import axios from "axios";

const instance = axios.create({
  baseURL:
    "http://localhost:8080/api/v1",
});

instance.interceptors.request.use(
  function (config) {

    const token =
      localStorage.getItem(
        "token"
      );

    if (token) {
      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  },

  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => response,

  (error) => {

    if (
      error.response?.status === 401
    ) {

      localStorage.removeItem(
        "token"
      );

      window.location.href = "/";
    }

    return Promise.reject(error);
  }
);

export default instance;