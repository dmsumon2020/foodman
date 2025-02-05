import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://assignment11-server-seven.vercel.app",
});

const useAxiosNonSecure = () => {
  return axiosInstance;
};

export default useAxiosNonSecure;
