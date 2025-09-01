import React from 'react';
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from '@/components/ui/input-otp';

interface OtpInputProps {
  value: string;
  onChange: (value: string) => void;
  length?: number;
}

const OtpInput: React.FC<OtpInputProps> = ({ value, onChange, length = 6 }) => {
  return (
    <InputOTP 
      maxLength={length} 
      value={value} 
      onChange={onChange}
      className="justify-center"
    >
      <InputOTPGroup>
        {Array.from({ length: Math.min(3, length) }).map((_, index) => (
          <InputOTPSlot key={index} index={index} />
        ))}
      </InputOTPGroup>
      {length > 3 && (
        <>
          <InputOTPSeparator />
          <InputOTPGroup>
            {Array.from({ length: length - 3 }).map((_, index) => (
              <InputOTPSlot key={index + 3} index={index + 3} />
            ))}
          </InputOTPGroup>
        </>
      )}
    </InputOTP>
  );
};

export default OtpInput;