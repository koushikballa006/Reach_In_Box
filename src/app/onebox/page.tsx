'use client';

import React, { useState, useEffect } from 'react';
import { Mail, Home, Users, Send, List, BarChart2, Inbox, Search, MoreHorizontal, ChevronDown } from 'lucide-react';
import Image from 'next/image';

interface Email {
  id: number;
  threadId: number;
  fromName: string;
  fromEmail: string;
  subject: string;
  sentAt: string;
}

interface EmailThread extends Email {
  body: string;
}

const OneboxPage = () => {
  const [showInbox, setShowInbox] = useState(false);
  const [emails, setEmails] = useState<Email[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<EmailThread | null>(null);

  useEffect(() => {
    if (showInbox) {
      fetchEmails();
    }
  }, [showInbox]);

  const fetchEmails = async () => {
    try {
      const response = await fetch('https://hiring.reachinbox.xyz/api/v1/onebox/list', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      const data = await response.json();
      setEmails(data.data);
    } catch (error) {
      console.error('Error fetching emails:', error);
    }
  };

  const fetchEmailThread = async (threadId: number) => {
    try {
      const response = await fetch(`https://hiring.reachinbox.xyz/api/v1/onebox/messages/${threadId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      const data = await response.json();
      setSelectedEmail(data.data[0]);
    } catch (error) {
      console.error('Error fetching email thread:', error);
    }
  };

  return (
    <div className="flex h-screen bg-black text-white">
      {/* Sidebar */}
      <aside className="w-20 bg-black flex flex-col items-center py-6">
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-black font-bold text-xl mb-8">
          M
        </div>
        <nav className="flex-1 flex flex-col space-y-8">
          <Home size={28} color="#4B5563" />
          <Users size={28} color="#4B5563" />
          <Mail size={28} color="#4B5563" />
          <Send size={28} color="#4B5563" />
          <List size={28} color="#4B5563" />
          <Inbox 
            size={28} 
            color={showInbox ? "#FFFFFF" : "#4B5563"} 
            onClick={() => setShowInbox(!showInbox)} 
            className="cursor-pointer" 
          />
          <BarChart2 size={28} color="#4B5563" />
        </nav>
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
            <ChevronDown size={20} color="#4B5563" />
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 flex bg-black">
          {showInbox ? (
            <>
              {/* Email list */}
              <div className="w-1/3 border-r border-gray-800">
                <div className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold">All Inbox(s)</h2>
                    <span className="text-sm text-gray-400">{emails.length}/25 inboxes selected</span>
                  </div>
                  <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      placeholder="Search"
                      className="w-full bg-gray-800 text-white pl-10 pr-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div className="overflow-y-auto h-[calc(100vh-180px)]">
                  {emails.map((email) => (
                    <div
                      key={email.id}
                      className="p-4 border-b border-gray-800 cursor-pointer hover:bg-gray-900"
                      onClick={() => fetchEmailThread(email.threadId)}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold">{email.fromName}</span>
                        <span className="text-xs text-gray-400">{new Date(email.sentAt).toLocaleString()}</span>
                      </div>
                      <div className="text-sm text-gray-400 truncate">{email.subject}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Email content */}
              <div className="flex-1 p-6">
                {selectedEmail ? (
                  <>
                    <div className="mb-6">
                      <h2 className="text-2xl font-semibold mb-2">{selectedEmail.subject}</h2>
                      <div className="flex justify-between items-center text-sm text-gray-400">
                        <span>{selectedEmail.fromName} &lt;{selectedEmail.fromEmail}&gt;</span>
                        <span>{new Date(selectedEmail.sentAt).toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="bg-gray-900 p-6 rounded-lg">
                      <div dangerouslySetInnerHTML={{ __html: selectedEmail.body }} />
                    </div>
                  </>
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-500">
                    Select an email to view its content
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
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
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default OneboxPage;