import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import AuthLayout from './AuthLayout';

interface SignUpProps {
  onSwitchToSignIn: () => void;
}

const SignUp: React.FC<SignUpProps> = ({ onSwitchToSignIn }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement sign up logic
    console.log('Sign up:', { name, email, otp, keepLoggedIn });
  };

  return (
    <AuthLayout 
      title="Sign Up"
      subtitle="Please create an account to continue."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            type="text"
            placeholder="Jonas Kahnwald"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

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
          <Label htmlFor="otp">OTP</Label>
          <Input
            id="otp"
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
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

        <Button type="submit" className="w-full">
          Sign Up
        </Button>

        <div className="text-center">
          <span className="text-sm text-muted-foreground">Already have an account? </span>
          <Button 
            variant="link" 
            className="text-sm p-0 h-auto"
            onClick={onSwitchToSignIn}
            type="button"
          >
            Sign in
          </Button>
        </div>
      </form>
    </AuthLayout>
  );
};

export default SignUp;