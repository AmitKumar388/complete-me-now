import React, { useState } from 'react';
import SignIn from '@/components/SignIn';
import SignUp from '@/components/SignUp';
import Dashboard from '@/components/Dashboard';

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  
  const handleSignIn = () => {
    setIsAuthenticated(true);
  };

  const handleSwitchToSignUp = () => {
    setShowSignUp(true);
  };

  const handleSwitchToSignIn = () => {
    setShowSignUp(false);
  };
  
  if (isAuthenticated) {
    return <Dashboard />;
  }
  
  if (showSignUp) {
    return <SignUp onSwitchToSignIn={handleSwitchToSignIn} />;
  }
  
  return (
    <SignIn 
      onSwitchToSignUp={handleSwitchToSignUp}
      onSignIn={handleSignIn}
    />
  );
};

export default Index;
