import React from 'react';
import { Mail, Home, Users, Send, List, BarChart2, Inbox } from 'lucide-react';

const OneboxPage = () => {
  return (
    <div className="flex h-screen bg-black text-white">
      {/* Sidebar */}
      <aside className="w-20 bg-black flex flex-col items-center py-6">
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-black font-bold text-xl mb-8">
          M
        </div>
        <div className="flex-1 flex flex-col space-y-8">
          <Home size={28} color="#4B5563" />
          <Users size={28} color="#4B5563" />
          <Mail size={28} color="#4B5563" />
          <Send size={28} color="#4B5563" />
          <List size={28} color="#4B5563" />
          <Inbox size={28} color="#4B5563" />
          <BarChart2 size={28} color="#4B5563" />
        </div>
        <div className="mt-auto">
          <div className="w-12 h-12 bg-green-700 rounded-full flex items-center justify-center text-sm font-semibold">
            AS
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col">
        {/* Top bar */}
        <header className="h-16 bg-black flex items-center justify-between px-6 border-b border-gray-800">
          <h1 className="text-xl font-semibold">Onebox</h1>
          <div className="flex items-center space-x-3">
            <span className="w-5 h-5 bg-gray-600 rounded-full"></span>
            <span className="text-sm text-gray-400">Tim's Workspace</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 9L12 15L18 9" stroke="#4B5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 flex items-center justify-center bg-black">
          <div className="text-center">
            <div className="w-32 h-32 bg-blue-900/30 rounded-full mx-auto mb-8 flex items-center justify-center">
              <Mail size={64} color="#60A5FA" />
            </div>
            <h2 className="text-3xl font-bold mb-3">
              It's the beginning of a legendary sales pipeline
            </h2>
            <p className="text-gray-500 text-lg">
              When you have inbound E-mails you'll see them here
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default OneboxPage;