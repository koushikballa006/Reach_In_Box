'use client'
import React from "react";
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();

  const handleGoogleLogin = () => {
    const frontendUrl = 'http://localhost:3000/onebox'; // Update this to your actual frontend URL in production
    const googleLoginUrl = `https://hiring.reachinbox.xyz/api/v1/auth/google-login?redirect_to=${encodeURIComponent(frontendUrl)}`;
    router.replace(googleLoginUrl);
  };

  return (
    <div className="flex flex-col min-h-screen bg-black">
      <header className="flex items-center justify-center py-6 border-b border-gray-600">
        <img src="/reachinboxlogo.png" alt="ReachInbox Logo" className="h-8 mr-2" />
      </header>
      <div className="flex items-center justify-center flex-grow">
        <div className="bg-[#1c1c1c] rounded-lg p-8 max-w-md w-full text-center">
          <h1 className="text-white text-2xl mb-6">Create a new account</h1>
          <button
            onClick={handleGoogleLogin}
            className="flex items-center justify-center w-full py-3 mb-8 text-white bg-[#2a2a2a] rounded-md hover:bg-[#333] focus:outline-none"
          >
            <img src="/google.png" alt="Google Icon" className="h-6 w-6 mr-2" />
            Sign Up with Google
          </button>
          <button
            className="w-1/2 py-3 mb-4 text-white rounded-md hover:bg-blue-700"
            style={{ background: 'linear-gradient(91.73deg, #4B63DD -2.99%, rgba(5, 36, 191, 0.99) 95.8%)' }}
          >
            Create an Account
          </button>
          <p className="text-gray-400">
            Already have an account? <a href="#" className="text-white">Sign In</a>
          </p>
        </div>
      </div>
      <footer className="flex items-center justify-center py-4 text-gray-500 text-sm" style={{ background: '#121212', borderTop: '1px solid #25262B' }}>
        &copy; 2023 ReachInbox. All rights reserved.
      </footer>
    </div>
  );
}
