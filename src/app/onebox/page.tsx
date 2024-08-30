"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Mail, Search, ChevronDown, RefreshCw, ArrowLeft } from "lucide-react";

import HomeIcon from "../components/icons/HomeIcon";
import UserIcon from "../components/icons/UsersIcon";
import EmailIcon from "../components/icons/EmailIcon";
import SendIcon from "../components/icons/SendIcon";
import ListIcon from "../components/icons/ListIcon";
import InboxIcon from "../components/icons/InboxIcon";
import BarChartIcon from "../components/icons/BarchartIcon";
import EmailContent from "../components/EmailContent";
import ReplyModal from "../components/ReplyModal";
import { useTheme } from "../components/theme";


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
  const [currentView, setCurrentView] = useState<"home" | "inbox">("home");
  const [emails, setEmails] = useState<Email[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
  const searchParams = useSearchParams();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const token = searchParams.get("token") ?? "";
    sessionStorage.setItem("bearer", token);
    fetchEmails();
  }, [searchParams]);

  const fetchEmails = async () => {
    try {
      const response = await fetch(
        "https://hiring.reachinbox.xyz/api/v1/onebox/list",
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("bearer")}`,
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
            Authorization: `Bearer ${sessionStorage.getItem("bearer")}`,
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

  const sendReply = async (content: string) => {
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
            body: `<p>${content}</p>`,
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
        setIsReplyModalOpen(false);
      } else {
        console.error("Failed to send reply");
      }
    } catch (error) {
      console.error("Error sending reply:", error);
    }
  };

  const handleEmailDeleted = async () => {
    if (!selectedEmail) return;

    try {
      const token = sessionStorage.getItem("bearer");
      if (!token) {
        console.error("No Bearer Token found.");
        return;
      }

      const response = await fetch(`https://hiring.reachinbox.xyz/api/v1/onebox/messages/${selectedEmail.threadId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();
      console.log('Email thread deleted successfully:', result);

      setSelectedEmail(null);
      fetchEmails();
    } catch (error) {
      console.error("Failed to delete email thread:", error);
    }
  };

  const renderSidebar = () => (
    <aside className={`w-20 ${theme === 'dark' ? 'bg-black' : 'bg-white'} flex flex-col items-center py-6 border-r ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'}`}>
      <div className={`w-8 h-8 ${theme === 'dark' ? 'bg-white' : 'bg-gray-200'} rounded-full flex items-center justify-center mb-8`}>
        <img
          src="/reachinbox.jpg"
          alt="Logo"
          className="w-full h-full object-cover"
        />
      </div>
      <nav className="flex-1 flex flex-col space-y-8 pt-8">
        <button
          className="flex items-center justify-center"
          onClick={() => setCurrentView("home")}
          aria-label="Home"
        >
          <HomeIcon
            className={`w-8 h-8 ${
              currentView === "home" 
                ? theme === 'dark' ? "text-white" : "text-black"
                : theme === 'dark' ? "text-gray-500" : "text-gray-400"
            }`}
          />
        </button>
        <button className="flex items-center justify-center" aria-label="Users">
          <UserIcon className={`w-8 h-8 ${theme === 'dark' ? "text-gray-500" : "text-gray-400"}`} />
        </button>
        <button className="flex items-center justify-center" aria-label="Mail">
          <EmailIcon className={`w-8 h-8 ${theme === 'dark' ? "text-gray-500" : "text-gray-400"}`} />
        </button>
        <button className="flex items-center justify-center" aria-label="Send">
          <SendIcon className={`w-8 h-8 ${theme === 'dark' ? "text-gray-500" : "text-gray-400"}`} />
        </button>
        <button className="flex items-center justify-center" aria-label="List">
          <ListIcon className={`w-8 h-8 ${theme === 'dark' ? "text-gray-500" : "text-gray-400"}`} />
        </button>
        <button
          className="flex items-center justify-center"
          onClick={() => setCurrentView("inbox")}
          aria-label="Inbox"
        >
          <InboxIcon
            className={`w-8 h-8 ${
              currentView === "inbox"
                ? theme === 'dark' ? "text-white" : "text-black"
                : theme === 'dark' ? "text-gray-500" : "text-gray-400"
            }`}
          />
        </button>
        <button className="flex items-center justify-center" aria-label="Chart">
          <BarChartIcon className={`w-8 h-8 ${theme === 'dark' ? "text-gray-500" : "text-gray-400"}`} />
        </button>
      </nav>
      <div className="mt-auto">
        <div className={`w-12 h-12 ${theme === 'dark' ? 'bg-green-700' : 'bg-green-500'} rounded-full flex items-center justify-center text-sm font-semibold ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
          AS
        </div>
      </div>
    </aside>
  );

  const renderTopBar = () => {
    return (
      <header className="h-16 bg-gray-100 dark:bg-gray-900 flex items-center justify-between px-6 border-b border-gray-200 dark:border-gray-800">
        <h1 className="text-xl font-semibold text-black dark:text-white">Onebox</h1>
        <div className="flex items-center space-x-3">
          <div className="flex items-center">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                onChange={toggleTheme}
                checked={theme === 'dark'}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div className="flex items-center space-x-2 bg-gray-200 dark:bg-gray-800 rounded-full px-2 py-1">
            <span className="w-4 h-4 bg-gray-400 dark:bg-gray-600 rounded-full"></span>
            <span className="text-sm text-gray-600 dark:text-gray-400">Tim's Workspace</span>
            <ChevronDown size={16} className="text-gray-500 dark:text-gray-400" />
          </div>
        </div>
      </header>
    );
  };

  const renderHomeView = () => (
    <div className="flex-1 flex flex-col items-center justify-center bg-white dark:bg-black text-black dark:text-white">
      <div
        className="w-64 h-64 bg-contain bg-center mb-8"
        style={{
          backgroundImage: `url('/home.png')`,
          backgroundRepeat: "no-repeat",
          borderRadius: "8px",
        }}
      />
      <h2 className="text-2xl font-bold mb-4">
        It's the beginning of a legendary sales pipeline
      </h2>
      <p className="text-gray-600 dark:text-gray-400 text-center">
        When you have inbound E-mails
        <br />
        you'll see them here
      </p>
    </div>
  );

  const renderEmailList = () => (
    <div className="w-1/4 border-r border-gray-200 dark:border-gray-800 overflow-y-auto bg-white dark:bg-black">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-blue-600 dark:text-blue-400">
              All Inbox(s)
              <ChevronDown size={16} className="inline ml-1" />
            </h2>
            <div className="text-sm font-semibold text-black dark:text-white">
              25/25 Inboxes selected
            </div>
          </div>
          <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
            <button
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
              onClick={resetInbox}
            >
              <RefreshCw size={20} />
            </button>
          </div>
        </div>
        <div className="relative mb-4">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-gray-100 dark:bg-gray-800 text-black dark:text-white pl-10 pr-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-2">
          <span>26 New Replies</span>
          <span>
            Newest <ChevronDown size={16} className="inline ml-1" />
          </span>
        </div>
      </div>
      {emails.map((email) => (
        <div
          key={email.id}
          className={`p-4 border-b border-gray-200 dark:border-gray-800 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-900 ${
            selectedEmail?.id === email.id ? "bg-gray-100 dark:bg-gray-900" : ""
          }`}
          onClick={() => fetchEmailThread(email.threadId)}
        >
          <div className="flex justify-between items-center mb-1">
            <span className="font-semibold text-black dark:text-white">{email.fromEmail}</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {new Date(email.sentAt).toLocaleString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400 truncate mb-2">
            {email.subject}
          </div>
          <div className="flex items-center space-x-2">
            <div className="px-2 py-1 rounded-full bg-[#222426] text-emerald-400 text-xs flex items-center space-x-1">
              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
              <span>Interested</span>
            </div>
            <div className="px-2 py-1 rounded-full bg-[#222426] text-gray-400 text-xs flex items-center space-x-1">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-gray-400"
              >
                <path
                  d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Campaign Name</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderEmailContent = () => (
    <div className="flex-1 flex flex-col bg-white dark:bg-black text-black dark:text-white">
      {selectedEmail ? (
        <EmailContent
          selectedEmail={selectedEmail}
          onEmailDeleted={handleEmailDeleted}
          refreshEmailList={fetchEmails}
        />
      ) : (
        <div className="flex-1 flex items-center justify-center text-gray-500 dark:text-gray-400">
          Select an email to view its content
        </div>
      )}
    </div>
  );

  const renderLeadDetails = () => (
    <div className="w-1/4 border-l border-gray-200 dark:border-gray-800 p-6 bg-white dark:bg-black">
      <h3 className="text-lg font-semibold text-black dark:text-white mb-4">
        <span className="bg-gray-100 dark:bg-gray-800 block w-full px-2 py-1 rounded">
          Lead Details
        </span>
      </h3>
      <div className="space-y-4">
        <div className="flex justify-between text-black dark:text-white">
          <span>Name</span>
          <p className="text-gray-600 dark:text-gray-400">{selectedEmail?.fromName}</p>
        </div>
        <div className="flex justify-between text-black dark:text-white">
          <span>Contact No</span>
          <p className="text-gray-600 dark:text-gray-400">+54-9062827869</p>
        </div>
        <div className="flex justify-between text-black dark:text-white">
          <span>Email ID</span>
          <p className="text-gray-600 dark:text-gray-400">{selectedEmail?.fromEmail}</p>
        </div>
        <div className="flex justify-between text-black dark:text-white">
          <span>LinkedIn</span>
          <p className="text-gray-600 dark:text-gray-400">linkedin.com/in/timvadde/</p>
        </div>
        <div className="flex justify-between text-black dark:text-white">
          <span>Company Name</span>
          <p className="text-gray-600 dark:text-gray-400">Reachinbox</p>
        </div>
      </div>
      <h3 className="text-lg font-semibold text-black dark:text-white mt-8 mb-4">
        <span className="bg-gray-100 dark:bg-gray-800 block w-full px-2 py-1 rounded">
          Activities
        </span>
      </h3>
      <div className="space-y-4">
        <p className="text-black dark:text-white">Campaign Name</p>
        <div className="flex items-center justify-between text-sm text-black dark:text-white">
          <span>3 Steps</span>
          <span>5 Days in Sequence</span>
        </div>
        <div className="space-y-6 relative before:absolute before:left-4 before:top-0 before:bottom-0 before:w-0.5 before:bg-gray-300 dark:before:bg-gray-700">
          {["Step 1: Email", "Step 2: Email", "Step 3: Email"].map(
            (step, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-gray-300 dark:bg-gray-700 rounded-full flex items-center justify-center z-10">
                  <Mail size={16} className="text-black dark:text-white" />
                </div>
                <div>
                  <p className="font-semibold text-black dark:text-white">{step}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {index === 0 ? "Sent 3rd, Feb" : "Opened 5th, Feb"}
                  </p>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-white dark:bg-black text-black dark:text-white">
      {renderSidebar()}
      <div className="flex-1 flex flex-col">
        {renderTopBar()}
        <main className="flex-1 flex bg-white dark:bg-black">
          {currentView === "home" ? (
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
      <ReplyModal
        isOpen={isReplyModalOpen}
        onClose={() => setIsReplyModalOpen(false)}
        selectedEmail={selectedEmail}
        onSendReply={sendReply}
        replyContent={replyContent}
        setReplyContent={setReplyContent}
      />
    </div>
  )};

export default OneboxPage;
