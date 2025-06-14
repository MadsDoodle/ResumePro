
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CreatePage = () => {
  const navigate = useNavigate();

  // Redirect to template selection when this page loads
  useEffect(() => {
    navigate('/templates');
  }, [navigate]);

  // This component will briefly show before redirecting
  return (
    <div className="min-h-screen bg-[#060315] flex items-center justify-center">
      <div className="text-purple-400">Redirecting to template selection...</div>
    </div>
  );
};

export default CreatePage;
