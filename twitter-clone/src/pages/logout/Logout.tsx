import { Navigate } from 'react-router-dom';

const Logout = () => {
  localStorage.removeItem('authId');

  return <Navigate to="/login" />;
}

export default Logout;
