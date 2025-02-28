import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    navigate(token ? '/chat' : '/login');
  }, [navigate]);

  return null;
};

export default AuthRedirect;
