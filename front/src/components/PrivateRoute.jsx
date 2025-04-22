import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return null; 
  }

  if (!user) return <Navigate to='/mainpage' />;
  if (user.role !== "appruved_user") {
    return <Navigate to='/signupsuccess' />;
  }
  
  if (user.role !== "manager") {
    return <Navigate to='/signupsuccess' />;
  }
  
  if (user.role !== "admin") {
    return <Navigate to='/signupsuccess' />;
  }

  return children;
};

export default PrivateRoute;
