import { Navigate, useLocation } from "react-router-dom";

import useAuth from "../Hooks/useAuth";
import LottieLoader from "../Components/LottieLoader/LottieLoader";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LottieLoader />;
  }

  if (user) {
    return children;
  }

  return <Navigate state={location.pathname} to={"/login"} />;
};

export default PrivateRoute;
