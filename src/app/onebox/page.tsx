"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Mail,
  Home,
  Users,
  Send,
  List,
  BarChart2,
  Inbox,
  Search,
  ChevronDown,
  RefreshCw,
  ArrowLeft,
  MoreHorizontal,
  MessageSquare,
  BarChartIcon,
} from 'lucide-react';

import HomeIcon from '../components/icons/HomeIcon';
import UserIcon from '../components/icons/UsersIcon';
import EmailIcon from '../components/icons/EmailIcon';
import SendIcon from '../components/icons/SendIcon';
import ListIcon from '../components/icons/ListIcon';
import InboxIcon from '../components/icons/InboxIcon';
import BarchartIcon from '../components/icons/BarchartIcon';

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
  replies?: Email[]; 
}

const OneboxPage: React.FC = () => {
  const [currentView, setCurrentView] = useState<'home' | 'inbox'>('inbox');
  const [emails, setEmails] = useState<Email[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token") ?? "";
    sessionStorage.setItem('bearer', token);
    fetchEmails();
  }, [searchParams]);

  const fetchEmails = async () => {
    try {
      const response = await fetch(
        "https://hiring.reachinbox.xyz/api/v1/onebox/list",
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('bearer')}`,
          },
        }
      );
      const data = await response.json();
      setEmails(data.data);
    } catch (error) {
      console.error("Error fetching emails:", error);
    }
  };

  const fetchEmailThread = async (threadId: number) => {
    try {
      const response = await fetch(
        `https://hiring.reachinbox.xyz/api/v1/onebox/messages/${threadId}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('bearer')}`,
          },
        }
      );
      const data = await response.json();
      setSelectedEmail(data.data[0]);
    } catch (error) {
      console.error("Error fetching email thread:", error);
    }
  };

  const resetInbox = async () => {
    try {
      await fetch("https://hiring.reachinbox.xyz/api/v1/onebox/reset", {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("bearer")}`,
        },
      });
      fetchEmails();
      setSelectedEmail(null);
    } catch (error) {
      console.error("Error resetting inbox:", error);
    }
  };

  const replyToEmail = async () => {
    if (!selectedEmail) return;

    try {
      const response = await fetch(
        `https://hiring.reachinbox.xyz/api/v1/onebox/reply/${selectedEmail.threadId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("bearer")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            toName: selectedEmail.fromName,
            to: selectedEmail.fromEmail,
            from: selectedEmail.toEmail,
            fromName: selectedEmail.toName,
            subject: `Re: ${selectedEmail.subject}`,
            body: `<p>${replyContent}</p>`,
            references: [
              ...(selectedEmail.references || []),
              selectedEmail.messageId,
            ],
            inReplyTo: selectedEmail.messageId,
          }),
        }
      );

      if (response.ok) {
        setReplyContent("");
        fetchEmailThread(selectedEmail.threadId);
      } else {
        console.error("Failed to send reply");
      }
    } catch (error) {
      console.error("Error sending reply:", error);
    }
  };

  const renderSidebar = () => (
    <aside className="w-20 bg-black flex flex-col items-center py-6 border-r border-gray-800">
      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mb-8">
      <img
        src="/reachinbox.jpg" 
        alt="Logo"
        className="w-full h-full object-cover"
      />
    </div>
      <nav className="flex-1 flex flex-col space-y-8 pt-8">
        <button
          className="flex items-center justify-center"
          onClick={() => setCurrentView('home')}
          aria-label="Home"
        >
          <HomeIcon className={`w-8 h-8 ${currentView === 'home' ? 'text-white' : 'text-gray-500'}`} />
        </button>
        <button
          className="flex items-center justify-center"
          aria-label="Users"
        >
          <UserIcon className="w-8 h-8 text-gray-500" />
        </button>
        <button
          className="flex items-center justify-center"
          aria-label="Mail"
        >
          <EmailIcon className="w-8 h-8 text-gray-500" />
        </button>
        <button
          className="flex items-center justify-center"
          aria-label="Send"
        >
          <SendIcon className="w-8 h-8 text-gray-500" />
        </button>
        <button
          className="flex items-center justify-center"
          aria-label="List"
        >
          <ListIcon className="w-8 h-8 text-gray-500" />
        </button>
        <button
          className="flex items-center justify-center"
          onClick={() => setCurrentView('inbox')}
          aria-label="Inbox"
        >
          <InboxIcon className={`w-8 h-8 ${currentView === 'inbox' ? 'text-white' : 'text-gray-500'}`} />
        </button>
        <button
          className="flex items-center justify-center"
          aria-label="Chart"
        >
          <BarChartIcon className="w-8 h-8 text-gray-500" />
        </button>
      </nav>
      <div className="mt-auto">
        <div className="w-12 h-12 bg-green-700 rounded-full flex items-center justify-center text-sm font-semibold">
          AS
        </div>
      </div>
    </aside>
  );
  
  const renderTopBar = () => (
    <header className="h-16 bg-black flex items-center justify-between px-6 border-b border-gray-800">
      <h1 className="text-xl font-semibold text-white">Onebox</h1>
      <div className="flex items-center space-x-3">
        <button className="p-2 hover:bg-gray-800 rounded-full" onClick={resetInbox}>
          <RefreshCw size={20} color="#4B5563" />
        </button>
        <div className="flex items-center space-x-2 bg-gray-800 rounded-full px-2 py-1">
          <span className="w-4 h-4 bg-gray-600 rounded-full"></span>
          <span className="text-sm text-gray-400">Tim's Workspace</span>
          <ChevronDown size={16} color="#4B5563" />
        </div>
      </div>
    </header>
  );

  const renderHomeView = () => (
    <div className="flex-1 flex flex-col items-center justify-center bg-black text-white">
      <div
        className="w-64 h-64 bg-contain bg-center mb-8"
        style={{ backgroundImage: `url('/home.png')`, backgroundRepeat: 'no-repeat', borderRadius: '8px' }}
      />
      <h2 className="text-2xl font-bold mb-4">It's the beginning of a legendary sales pipeline</h2>
      <p className="text-gray-400 text-center">
        When you have inbound E-mails<br />
        you'll see them here
      </p>
    </div>
  );
  

  const renderEmailList = () => (
    <div className="w-1/4 border-r border-gray-800 overflow-y-auto">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-blue-400">
            All Inbox(s)
            <ChevronDown size={16} className="inline ml-1" />
          </h2>
          <div className="flex items-center text-gray-400 text-sm">
            <ArrowLeft size={16} className="mr-1" />
            25/25 Inboxes selected
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
          <span>Newest <ChevronDown size={16} className="inline ml-1" /></span>
        </div>
      </div>
      {emails.map((email) => (
        <div
          key={email.id}
          className={`p-4 border-b border-gray-800 cursor-pointer hover:bg-gray-900 ${
            selectedEmail?.id === email.id ? 'bg-gray-900' : ''
          }`}
          onClick={() => fetchEmailThread(email.threadId)}
        >
          <div className="flex justify-between items-center mb-1">
            <span className="font-semibold text-white">{email.fromEmail}</span>
            <span className="text-xs text-gray-400">{new Date(email.sentAt).toLocaleString("en-US", {
              month: "short",
              day: "numeric",
            })}</span>
          </div>
          <div className="text-sm text-gray-400 truncate mb-2">{email.subject}</div>
          <div className="flex items-center space-x-2">
            <div className="px-2 py-1 rounded-full bg-[#222426] text-emerald-400 text-xs flex items-center space-x-1">
              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
              <span>Interested</span>
            </div>
            <div className="px-2 py-1 rounded-full bg-[#222426] text-gray-400 text-xs flex items-center space-x-1">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-400">
              <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
              <span>Campaign Name</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
  
  const renderEmailContent = () => (
    <div className="flex-1 flex flex-col bg-black text-white">
      {selectedEmail ? (
        <>
          <div className="p-6 border-b border-gray-800">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-2xl font-semibold text-white">{selectedEmail.fromName}</h2>
                <p className="text-sm text-gray-400">{selectedEmail.fromEmail}</p>
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 bg-gray-800 text-white rounded-md flex items-center">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2" />
                  Meeting Completed <ChevronDown size={16} className="ml-1" />
                </button>
                <button className="px-3 py-1 bg-gray-800 text-white rounded-md">
                  Move <ChevronDown size={16} className="inline ml-1" />
                </button>
                <button className="p-1 bg-gray-800 text-white rounded-md">
                  <MoreHorizontal size={20} />
                </button>
              </div>
            </div>
          </div>
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="bg-[#1A1A1A] rounded-lg p-4 mb-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold">{selectedEmail.subject}</h3>
                <span className="text-xs text-gray-400">{new Date(selectedEmail.sentAt).toLocaleString("en-US", {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                  hour12: true
                })}</span>
              </div>
              <div className="text-xs text-gray-400 mb-4">
                <p>from : {selectedEmail.fromEmail} cc : {selectedEmail.cc}</p>
                <p>to : {selectedEmail.toEmail}</p>
              </div>
              <div className="text-sm text-gray-200" dangerouslySetInnerHTML={{ __html: selectedEmail.body }} />
            </div>
            <div className="flex items-center justify-center mb-4">
              <div className="flex-grow h-px bg-gray-800"></div>
              <button className="mx-4 px-4 py-2 bg-[#222426] text-white rounded-md text-sm flex items-center">
                {/* Replace with your actual image */}
                <img src="/view4replies.png" alt="View replies" className="mr-2" width="12" height="12" />
                View all 4 replies
              </button>
              <div className="flex-grow h-px bg-gray-800"></div>
            </div>
          </div>
          <div className="px-6 py-4">
            <button
              className="px-4 py-2 text-white rounded-md flex items-center justify-center"
              style={{
                width: '100px',
                background: 'linear-gradient(91.73deg, #4B63DD -2.99%, rgba(5, 36, 191, 0.99) 95.8%)'
              }}
              onClick={replyToEmail}
            >
              {/* Replace with your actual image */}
              <img src="/replyarrow.png" alt="Reply" className="mr-2" width="16" height="16" />
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
  );

  const renderLeadDetails = () => (
    <div className="w-1/4 border-l border-gray-800 p-6">
      <h3 className="text-lg font-semibold text-white mb-4">
        <span className="bg-[#23272C] block w-full px-2 py-1 rounded">Lead Details</span>
      </h3>
      <div className="space-y-4 text-gray-400">
        <div>
          <span className="block">Name</span>
          <p className="text-white">{selectedEmail?.fromName}</p>
        </div>
        <div>
          <span className="block">Contact No</span>
          <p className="text-white">+54-9062827869</p>
        </div>
        <div>
          <span className="block">Email ID</span>
          <p className="text-white">{selectedEmail?.fromEmail}</p>
        </div>
        <div>
          <span className="block">LinkedIn</span>
          <p className="text-white">linkedin.com/in/timvadde/</p>
        </div>
        <div>
          <span className="block">Company Name</span>
          <p className="text-white">Reachinbox</p>
        </div>
      </div>
      <h3 className="text-lg font-semibold text-white mt-8 mb-4">
        <span className="bg-[#23272C] block w-full px-2 py-1 rounded">Activities</span>
      </h3>
      <div className="space-y-4">
        <p className="text-gray-400">Campaign Name</p>
        <div className="flex items-center justify-between text-sm text-gray-400">
          <span>3 Steps</span>
          <span>5 Days in Sequence</span>
        </div>
        <div className="space-y-6 relative before:absolute before:left-4 before:top-0 before:bottom-0 before:w-0.5 before:bg-gray-700">
          {['Step 1: Email', 'Step 2: Email', 'Step 3: Email'].map((step, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center z-10">
                <Mail size={16} color="#FFFFFF" />
              </div>
              <div>
                <p className="font-semibold text-white">{step}</p>
                <p className="text-sm text-gray-400">
                  {index === 0 ? 'Sent 3rd, Feb' : 'Opened 5th, Feb'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-black text-white">
      {renderSidebar()}
      <div className="flex-1 flex flex-col">
        {renderTopBar()}
        <main className="flex-1 flex bg-black">
          {currentView === 'home' ? (
            renderHomeView()
          ) : (
            <>
              {renderEmailList()}
              {renderEmailContent()}
              {selectedEmail && renderLeadDetails()}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default OneboxPage;