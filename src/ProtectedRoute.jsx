import { Navigate } from 'react-router-dom';
import { getCurrentUser } from './Auth';

const ProtectedRoute = ({ children }) => {
  const user = getCurrentUser();

  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
