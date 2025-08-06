import { useSelector } from "react-redux";
import { Navigate } from "react-router";

const PrivateRoute = ({ children }) => {
  const token = useSelector((state) => state.user.token);
  return token ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;
