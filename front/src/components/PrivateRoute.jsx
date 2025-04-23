import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return null; 
  }

  if (!user) return <Navigate to='/mainpage' />;
  if (user.role !== "appruved_user") {
  }
  
  if (user.role !== "manager") {
  }
  
  if (user.role !== "admin") {
  }

  return children;
};

export default PrivateRoute;
