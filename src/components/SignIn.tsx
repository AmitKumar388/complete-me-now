import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { authAPI } from '@/lib/api';
import AuthLayout from './AuthLayout';

interface SignInProps {
  onSwitchToSignUp: () => void;
  onSignIn: () => void;
}

const SignIn: React.FC<SignInProps> = ({ onSwitchToSignUp, onSignIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await authAPI.login({ email, password });
      
      toast({
        title: "Success",
        description: "Successfully signed in!",
      });
      
      onSignIn();
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to sign in",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="Sign In"
      subtitle="Please sign in to continue to your account."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="jonas_kahnwald@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="keep-logged-in"
              checked={keepLoggedIn}
              onCheckedChange={(checked) => setKeepLoggedIn(checked as boolean)}
            />
            <Label htmlFor="keep-logged-in" className="text-sm">Keep me logged in</Label>
          </div>
          <Button variant="link" className="text-sm p-0 h-auto">
            Resend OTP
          </Button>
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Signing In..." : "Sign In"}
        </Button>

        <div className="text-center">
          <span className="text-sm text-muted-foreground">Need an account? </span>
          <Button 
            variant="link" 
            className="text-sm p-0 h-auto"
            onClick={onSwitchToSignUp}
            type="button"
          >
            Create one
          </Button>
        </div>
      </form>
    </AuthLayout>
  );
};

export default SignIn;