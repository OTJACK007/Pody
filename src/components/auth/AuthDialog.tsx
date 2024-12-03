import React, { useEffect, useState } from 'react';
import { X, Mail } from 'lucide-react';
import EmailAuthForm from './EmailAuthForm';
import { AuthMode } from '../../types';

interface AuthDialogProps {
  onClose: () => void;
}

const AuthDialog = ({ onClose }: AuthDialogProps) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleEmailContinue = () => {
    setShowEmailForm(true);
  };

  return (
    <div 
      className="fixed inset-0 bg-black/90 z-[9999] flex items-center justify-center"
      style={{ 
        height: 'calc(100vh - 60px)', 
        top: '60px'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-md bg-background rounded-xl shadow-2xl transform transition-all duration-300 scale-95 hover:scale-100">
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors z-10"
        >
          <X className="w-6 h-6 text-white" />
        </button>
        
        <div className="p-8">
          {showEmailForm ? (
            <EmailAuthForm 
              mode={isSignUp ? 'signup' : 'signin'} 
              onBack={() => setShowEmailForm(false)}
            />
          ) : (
            <>
              <h2 className="text-2xl font-bold text-white mb-2">
                {isSignUp ? 'Create your account' : 'Welcome back'}
              </h2>
              <p className="text-gray-400 mb-8">
                {isSignUp 
                  ? 'Join our community of podcast enthusiasts'
                  : 'Sign in to access your personalized experience'
                }
              </p>

              <div className="space-y-4">
                <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-white hover:bg-gray-100 text-black rounded-lg transition-colors">
                  <img 
                    src="https://static.wixstatic.com/media/c67dd6_578c043e4fee43fc8c1ff1ec13369c17~mv2.png" 
                    alt="Google"
                    className="w-5 h-5"
                  />
                  <span>Continue with Google</span>
                </button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-700"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-background text-gray-400">or</span>
                  </div>
                </div>

                <button 
                  onClick={handleEmailContinue}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  <span>Continue with Email</span>
                </button>
              </div>

              <div className="mt-6 text-center text-sm text-gray-400">
                {isSignUp ? "Already have an account? " : "Don't have an account? "}
                <button 
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-primary hover:text-primary/80 transition-colors font-medium"
                >
                  {isSignUp ? 'Sign in' : 'Sign up'}
                </button>
              </div>

              <p className="mt-4 text-center text-xs text-gray-500">
                By continuing, you agree to our Terms of Service and Privacy Policy
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthDialog;