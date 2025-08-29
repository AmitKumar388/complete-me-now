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

  const handleSignOut = () => {
    setIsAuthenticated(false);
    setShowSignUp(false);
  };

  const handleSwitchToSignUp = () => {
    setShowSignUp(true);
  };

  const handleSwitchToSignIn = () => {
    setShowSignUp(false);
  };
  
  if (isAuthenticated) {
    return <Dashboard onSignOut={handleSignOut} />;
  }
  
  if (showSignUp) {
    return <SignUp onSwitchToSignIn={handleSwitchToSignIn} onSignUp={handleSignIn} />;
  }
  
  return (
    <SignIn 
      onSwitchToSignUp={handleSwitchToSignUp}
      onSignIn={handleSignIn}
    />
  );
};

export default Index;
