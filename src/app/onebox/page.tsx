'use client';

import React, { useState, useEffect } from 'react';
import { Mail, Home, Users, Send, List, BarChart2, Inbox, Search, MoreHorizontal, ChevronDown, RefreshCw, ArrowLeft } from 'lucide-react';
import Image from 'next/image';

interface Email {
  id: number;
  threadId: number;
  fromName: string;
  fromEmail: string;
  toName: string;
  toEmail: string;
  cc: string;
  subject: string;
  body: string;
  sentAt: string;
  status: string;
  messageId: string;
  references: string[];
  inReplyTo: string;
}

const OneboxPage = () => {
  const [emails, setEmails] = useState<Email[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [replyContent, setReplyContent] = useState('');

  useEffect(() => {
    fetchEmails();
  }, []);

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

  const resetInbox = async () => {
    try {
      await fetch('https://hiring.reachinbox.xyz/api/v1/onebox/reset', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      fetchEmails();
      setSelectedEmail(null);
    } catch (error) {
      console.error('Error resetting inbox:', error);
    }
  };

  const replyToEmail = async () => {
    if (!selectedEmail) return;

    try {
      const response = await fetch(`https://hiring.reachinbox.xyz/api/v1/onebox/reply/${selectedEmail.threadId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          toName: selectedEmail.fromName,
          to: selectedEmail.fromEmail,
          from: selectedEmail.toEmail,
          fromName: selectedEmail.toName,
          subject: `Re: ${selectedEmail.subject}`,
          body: `<p>${replyContent}</p>`,
          references: [...(selectedEmail.references || []), selectedEmail.messageId],
          inReplyTo: selectedEmail.messageId,
        }),
      });

      if (response.ok) {
        setReplyContent('');
        fetchEmailThread(selectedEmail.threadId);
      } else {
        console.error('Failed to send reply');
      }
    } catch (error) {
      console.error('Error sending reply:', error);
    }
  };

  return (
    <div className="flex h-screen bg-black text-white">
      {/* Sidebar */}
      <aside className="w-20 bg-black flex flex-col items-center py-6 border-r border-gray-800">
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-black font-bold text-xl mb-8">
          M
        </div>
        <nav className="flex-1 flex flex-col space-y-8">
          <Home size={24} color="#4B5563" />
          <Users size={24} color="#4B5563" />
          <Mail size={24} color="#4B5563" />
          <Send size={24} color="#4B5563" />
          <List size={24} color="#4B5563" />
          <Inbox size={24} color="#FFFFFF" />
          <BarChart2 size={24} color="#4B5563" />
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
            <button onClick={resetInbox} className="p-2 hover:bg-gray-800 rounded-full">
              <RefreshCw size={20} color="#4B5563" />
            </button>
            <div className="flex items-center space-x-2 bg-gray-800 rounded-full px-2 py-1">
              <span className="w-4 h-4 bg-gray-600 rounded-full"></span>
              <span className="text-sm text-gray-400">Tim's Workspace</span>
              <ChevronDown size={16} color="#4B5563" />
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 flex bg-black">
          {/* Email list */}
          <div className="w-1/4 border-r border-gray-800">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-blue-400">All Inbox(s)</h2>
                <div className="flex items-center">
                  <ArrowLeft size={16} color="#4B5563" />
                  <span className="text-sm text-gray-400 ml-2">25/25 Inboxes selected</span>
                </div>
              </div>
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full bg-gray-800 text-white pl-10 pr-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
                <span>26 New Replies</span>
                <span>Newest</span>
              </div>
            </div>
            <div className="overflow-y-auto h-[calc(100vh-220px)]">
              {emails.map((email) => (
                <div
                  key={email.id}
                  className={`p-4 border-b border-gray-800 cursor-pointer hover:bg-gray-900 ${selectedEmail?.id === email.id ? 'bg-gray-900' : ''}`}
                  onClick={() => fetchEmailThread(email.threadId)}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-semibold">{email.fromEmail}</span>
                    <span className="text-xs text-gray-400">{new Date(email.sentAt).toLocaleString('en-US', { month: 'short', day: 'numeric' })}</span>
                  </div>
                  <div className="text-sm text-gray-400 truncate mb-2">{email.subject}</div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${email.status === 'Interested' ? 'bg-green-900 text-green-300' : 'bg-gray-700 text-gray-300'}`}>
                      {email.status}
                    </span>
                    <span className="text-xs text-gray-500">Campaign Name</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Email content */}
          <div className="flex-1 flex flex-col">
            {selectedEmail ? (
              <>
                <div className="p-6 border-b border-gray-800">
                  <h2 className="text-2xl font-semibold mb-2">{selectedEmail.subject}</h2>
                  <div className="flex justify-between items-center text-sm text-gray-400">
                    <div>
                      <p>from: {selectedEmail.fromName} &lt;{selectedEmail.fromEmail}&gt;</p>
                      <p>cc: {selectedEmail.cc}</p>
                      <p>to: {selectedEmail.toName} &lt;{selectedEmail.toEmail}&gt;</p>
                    </div>
                    <span>{new Date(selectedEmail.sentAt).toLocaleString()}</span>
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto p-6">
                  <div dangerouslySetInnerHTML={{ __html: selectedEmail.body }} />
                </div>
                <div className="p-6 border-t border-gray-800">
                  <textarea
                    className="w-full bg-gray-800 text-white p-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={4}
                    placeholder="Type your reply here..."
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                  ></textarea>
                  <button
                    className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={replyToEmail}
                  >
                    Reply
                  </button>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500">
                Select an email to view its content
              </div>
            )}
          </div>

          {/* Lead Details */}
          {selectedEmail && (
            <div className="w-1/4 border-l border-gray-800 p-6">
              <h3 className="text-lg font-semibold mb-4">Lead Details</h3>
              <div className="space-y-4">
                <div>
                  <span className="text-gray-400">Name</span>
                  <p>{selectedEmail.fromName}</p>
                </div>
                <div>
                  <span className="text-gray-400">Contact No</span>
                  <p>+54-9062827869</p>
                </div>
                <div>
                  <span className="text-gray-400">Email ID</span>
                  <p>{selectedEmail.fromEmail}</p>
                </div>
                <div>
                  <span className="text-gray-400">LinkedIn</span>
                  <p>linkedin.com/in/timvadde/</p>
                </div>
                <div>
                  <span className="text-gray-400">Company Name</span>
                  <p>Reachinbox</p>
                </div>
              </div>
              <h3 className="text-lg font-semibold mt-8 mb-4">Activities</h3>
              <div className="space-y-4">
                <p className="text-gray-400">Campaign Name</p>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                      <Mail size={16} color="#FFFFFF" />
                    </div>
                    <div className="absolute left-4 top-8 w-0.5 h-12 bg-gray-700"></div>
                  </div>
                  <div>
                    <p className="font-semibold">Step 1: Email</p>
                    <p className="text-sm text-gray-400">Sent 3rd, Feb</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                      <Mail size={16} color="#FFFFFF" />
                    </div>
                    <div className="absolute left-4 top-8 w-0.5 h-12 bg-gray-700"></div>
                  </div>
                  <div>
                    <p className="font-semibold">Step 2: Email</p>
                    <p className="text-sm text-gray-400">Opened 5th, Feb</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                    <Mail size={16} color="#FFFFFF" />
                  </div>
                  <div>
                    <p className="font-semibold">Step 3: Email</p>
                    <p className="text-sm text-gray-400">Opened 5th, Feb</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default OneboxPage;