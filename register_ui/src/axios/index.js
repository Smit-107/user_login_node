import axios from "axios";

const axiosApi = axios.create({
  baseURL: "http://localhost:5000",
});

axiosApi.interceptors.request.use(
  (config) => {
    // TODO: Attach the access token to the request headers
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = accessToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");

        const response = await axios.post(
          "http://localhost:5000/refreshToken",
          {
            refreshToken,
          }
        );

        const { accessToken } = response.data;

        localStorage.setItem("accessToken", accessToken);

        originalRequest.headers.Authorization = accessToken;
        return axios(originalRequest);
      } catch (error) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      }
    }

    return Promise.reject(error);
  }
);

export default axiosApi;
