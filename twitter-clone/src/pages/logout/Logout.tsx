import { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../../App';

const Logout = () => {
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    setUser(null);
    localStorage.removeItem('authId');
  }, []);

  return <Navigate to="/login" />;
}

export default Logout;
