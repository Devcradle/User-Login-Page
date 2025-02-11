import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { tokenCheck } from '../../utils/Api';

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const data = await tokenCheck('check');
        setIsAuthenticated(data.data.code === 200);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    checkToken();
  }, []);

  if (isAuthenticated === null) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
