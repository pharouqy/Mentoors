import { Navigate } from "react-router-dom";
import PropTypes from 'prop-types';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("token"); // ou votre logique d'authentification

  return isAuthenticated ? children : <Navigate to="/signin" />;
};
PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
