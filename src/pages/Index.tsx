import React, { useState } from 'react';
import SignIn from '@/components/SignIn';
import Dashboard from '@/components/Dashboard';

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // TODO: Replace with actual authentication logic
  // This is just for demo purposes
  
  if (isAuthenticated) {
    return <Dashboard />;
  }
  
  return <SignIn />;
};

export default Index;
