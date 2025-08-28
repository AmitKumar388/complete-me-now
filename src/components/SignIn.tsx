import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import AuthLayout from './AuthLayout';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement sign in logic
    console.log('Sign in:', { email, password, rememberMe });
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
            placeholder="anna.avetisyan@gmail.com"
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="remember"
              checked={rememberMe}
              onCheckedChange={(checked) => setRememberMe(checked as boolean)}
            />
            <Label htmlFor="remember" className="text-sm">Keep me logged in</Label>
          </div>
          <Button variant="link" className="text-sm p-0 h-auto">
            Forgot OTP
          </Button>
        </div>

        <Button type="submit" className="w-full">
          Sign In
        </Button>

        <div className="text-center">
          <span className="text-sm text-muted-foreground">New to account? </span>
          <Button variant="link" className="text-sm p-0 h-auto">
            Create one
          </Button>
        </div>
      </form>
    </AuthLayout>
  );
};

export default SignIn;