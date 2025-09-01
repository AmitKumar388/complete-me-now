import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">HD</span>
              </div>
            </div>
            <h1 className="text-2xl font-semibold text-foreground mb-2">{title}</h1>
            {subtitle && (
              <p className="text-muted-foreground text-sm">{subtitle}</p>
            )}
          </div>
          {children}
        </div>
      </div>

      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-900/40"></div>
        <div className="relative">
          <div className="w-96 h-96 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full opacity-80 animate-pulse"></div>
            <div className="absolute inset-4 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full opacity-60"></div>
            <div className="absolute inset-8 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full opacity-40"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;