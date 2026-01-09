import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import LandingPage from './LandingPage';

const Index = () => {
  const { isAuthenticated, role } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && role) {
      navigate(`/${role}`);
    }
  }, [isAuthenticated, role, navigate]);

  return <LandingPage />;
};

export default Index;
