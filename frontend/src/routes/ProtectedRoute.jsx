import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ adminOnly = false }) => {
  const { user, authReady } = useAuth();

  if (!authReady) return null; // ← wait for auth to hydrate, show nothing briefly

  if (!user) return <Navigate to="/" />;

  if (adminOnly && user.role !== 'admin') {
    return <Navigate to="/" />;
  }

  return <Outlet />; // ← use Outlet since you're using nested routes in AppRoutes
};

export default ProtectedRoute;