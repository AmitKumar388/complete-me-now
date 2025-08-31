import React, { useState, useEffect } from 'react';
import SignIn from '@/components/SignIn';
import SignUp from '@/components/SignUp';
import Dashboard from '@/components/Dashboard';
import { isAuthenticated } from '@/lib/api';

const Index = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = () => {
      setIsAuth(isAuthenticated());
      setIsLoading(false);
    };
    
    checkAuth();
  }, []);
  
  const handleSignIn = () => {
    setIsAuth(true);
  };

  const handleSignOut = () => {
    setIsAuth(false);
    setShowSignUp(false);
  };

  const handleSwitchToSignUp = () => {
    setShowSignUp(true);
  };

  const handleSwitchToSignIn = () => {
    setShowSignUp(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }
  
  if (isAuth) {
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
