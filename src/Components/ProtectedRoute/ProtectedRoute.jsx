import { Navigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
  const isAuthenticate = localStorage.getItem('ref');
  if (!isAuthenticate) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
