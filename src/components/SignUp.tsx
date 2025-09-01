import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { authAPI } from '@/lib/api';
import OtpInput from '@/components/OtpInput';
import AuthLayout from './AuthLayout';

interface SignUpProps {
  onSwitchToSignIn: () => void;
  onSignUp: () => void;
}

const SignUp: React.FC<SignUpProps> = ({ onSwitchToSignIn, onSignUp }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!showOtp) {
      // First step: validate form data
      if (password !== confirmPassword) {
        toast({
          title: "Error",
          description: "Passwords do not match",
          variant: "destructive",
        });
        return;
      }

      if (password.length < 6) {
        toast({
          title: "Error",
          description: "Password must be at least 6 characters long",
          variant: "destructive",
        });
        return;
      }

      setIsLoading(true);
      
      try {
        // Show OTP step
        setShowOtp(true);
        toast({
          title: "OTP Sent!",
          description: "Please enter the OTP sent to your email to verify your account.",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to send OTP. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    } else {
      // Second step: verify OTP and create account
      setIsLoading(true);

      try {
        const response = await authAPI.register({ name, email, password });
        
        toast({
          title: "Success",
          description: "Account created successfully!",
        });
        
        onSignUp();
      } catch (error) {
        toast({
          title: "Error",
          description: error instanceof Error ? error.message : "Failed to create account",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <AuthLayout 
      title="Sign up"
      subtitle="Sign up to enjoy the feature of HD"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Your Name</Label>
          <Input
            id="name"
            type="text"
            placeholder="Jonas Khanwald"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            minLength={6}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            minLength={6}
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

        {showOtp && (
          <div className="space-y-2">
            <Label htmlFor="otp" className="text-sm font-medium">
              Enter OTP
            </Label>
            <div className="flex justify-center">
              <OtpInput
                value={otp}
                onChange={setOtp}
                length={6}
              />
            </div>
            <p className="text-xs text-muted-foreground text-center">
              Please enter the 6-digit code sent to your email
            </p>
          </div>
        )}

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Processing..." : showOtp ? "Verify OTP & Create Account" : "Sign Up"}
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