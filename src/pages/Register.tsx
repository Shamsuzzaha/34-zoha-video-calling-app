
import React, { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '@/components/auth/RegisterForm';

const Register: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (currentUser) {
      navigate('/dashboard');
    }
  }, [currentUser, navigate]);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-telezyne-blue to-telezyne-purple flex flex-col items-center justify-center p-4">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-white shadow-lg mb-4">
          <div className="text-xl font-bold bg-gradient-to-r from-telezyne-blue to-telezyne-purple text-transparent bg-clip-text">
            T
          </div>
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Telezyne</h1>
        <p className="text-white/80">Create an account to get started</p>
      </div>
      
      <RegisterForm />
    </div>
  );
};

export default Register;
