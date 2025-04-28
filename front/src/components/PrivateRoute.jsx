import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return null; 
  }

  if (!user) return <Navigate to='/mainpage' />;

  return children;
};

export default PrivateRoute;
