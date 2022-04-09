import axios from "axios";

const axiosClient = axios.create();
axiosClient.defaults.baseURL =
  "https://merntestserver.herokuapp.com/merntest/api/v1";

axiosClient.defaults.headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
  "Access-Control-Allow-Origin": "*",
};

axiosClient.defaults.timeout = 7000;
axiosClient.interceptors.request.use((config) => {
  let jwtToken = localStorage.getItem("jwt");
  config.headers["Authorization"] = "Bearer " + jwtToken;
  return config;
});
axiosClient.defaults.withCredentials = true;

export default axiosClient;
