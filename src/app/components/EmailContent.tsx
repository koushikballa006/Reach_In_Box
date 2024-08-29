import React, { useState, useRef } from 'react';
import { ChevronDown, MoreHorizontal } from 'lucide-react';
import ReplyModal from './ReplyModal';

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

interface EmailContentProps {
  selectedEmail: Email;
}

const EmailContent: React.FC<EmailContentProps> = ({ selectedEmail }) => {
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const replyButtonRef = useRef<HTMLButtonElement>(null);

  const openReplyModal = () => setIsReplyModalOpen(true);
  const closeReplyModal = () => setIsReplyModalOpen(false);

  const handleSendReply = (content: string) => {
    console.log('Sending reply:', content);
    closeReplyModal();
  };

  return (
    <div className="relative flex flex-col h-full bg-black">
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
            <h3 className="text-lg font-semibold text-white">{selectedEmail.subject}</h3>
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
            <img src="/view4replies.png" alt="View replies" className="mr-2" width="12" height="12" />
            View all 4 replies
          </button>
          <div className="flex-grow h-px bg-gray-800"></div>
        </div>
      </div>
      <div className="px-6 py-4 relative">
        <button
          ref={replyButtonRef}
          className="px-4 py-2 text-white rounded-md flex items-center justify-center"
          style={{
            width: '100px',
            background: 'linear-gradient(91.73deg, #4B63DD -2.99%, rgba(5, 36, 191, 0.99) 95.8%)'
          }}
          onClick={openReplyModal}
        >
          <img src="/replyarrow.png" alt="Reply" className="mr-2" width="16" height="16" />
          Reply
        </button>
        {isReplyModalOpen && (
          <div 
            className="absolute left-6 right-6"
            style={{
              bottom: replyButtonRef.current ? `calc(100% - ${replyButtonRef.current.offsetHeight}px)` : '100%'
            }}
          >
            <ReplyModal
              isOpen={isReplyModalOpen}
              onClose={closeReplyModal}
              selectedEmail={selectedEmail}
              onSendReply={handleSendReply}
              replyContent={replyContent}
              setReplyContent={setReplyContent}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailContent;