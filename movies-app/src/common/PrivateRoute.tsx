import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../hooks/useAppSelector';

const PrivateRoute = () => {
  const isAuth = useAppSelector((state) => state.auth.isAuthenticated);
  return isAuth ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
