import axios from "axios";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../AuthProvider/AuthProvider";

const axiosInstance = axios.create({
  baseURL: "https://assignment11-server-seven.vercel.app",
  withCredentials: true,
});

const useAxiosSecure = () => {
  const { userLogOut } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const interceptor = axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        console.error("Error caught in Interceptor:", error);
        if (error.response?.status === 401 || error.response?.status === 403) {
          userLogOut()
            .then(() => {
              navigate("/login");
            })
            .catch((err) => {
              console.err("Error signing out user", err);
            });
        }

        return Promise.reject(error);
      }
    );

    // Cleanup function to eject the interceptor when the component unmounts
    return () => {
      axiosInstance.interceptors.response.eject(interceptor);
    };
  }, [userLogOut, navigate]); // Add dependencies

  return axiosInstance;
};

export default useAxiosSecure;
