import React from 'react';
import { X, Send, Variable, Eye, Type, LinkIcon, Image, User, Code } from 'lucide-react';

interface Email {
  fromEmail: string;
  toEmail: string;
  subject: string;
}

interface ReplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedEmail: Email | null;
  onSendReply: (content: string) => void;
  replyContent: string;
  setReplyContent: React.Dispatch<React.SetStateAction<string>>;
}

const ReplyModal: React.FC<ReplyModalProps> = ({
  isOpen,
  onClose,
  selectedEmail,
  onSendReply,
  replyContent,
  setReplyContent
}) => {
  if (!isOpen || !selectedEmail) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-[#1E1E1E] w-full max-w-3xl rounded-lg shadow-lg">
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h2 className="text-white text-lg font-semibold">Reply</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={20} />
          </button>
        </div>
        <div className="p-4">
          <div className="mb-4 text-sm">
            <p className="text-gray-400">To: <span className="text-white">jeanne@icloud.com</span></p>
            <p className="text-gray-400">From: <span className="text-white">peter@reachinbox.com</span></p>
            <p className="text-gray-400">Subject: <span className="text-white">Warmup Welcome</span></p>
          </div>
          <textarea
            className="w-full h-40 bg-[#2B2B2B] text-white rounded-md p-2 resize-none text-sm"
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            placeholder="Hi Jeanne,"
          />
        </div>
        <div className="flex justify-between items-center p-4 border-t border-gray-700">
          <div className="flex space-x-2">
            <button className="text-gray-400 hover:text-gray-300">
              <Variable size={20} />
            </button>
            <button className="text-gray-400 hover:text-gray-300">
              <Eye size={20} />
            </button>
            <button className="text-gray-400 hover:text-gray-300">
              <Type size={20} />
            </button>
            <button className="text-gray-400 hover:text-gray-300">
              <LinkIcon size={20} />
            </button>
            <button className="text-gray-400 hover:text-gray-300">
              <Image size={20} />
            </button>
            <button className="text-gray-400 hover:text-gray-300">
              <User size={20} />
            </button>
            <button className="text-gray-400 hover:text-gray-300">
              <Code size={20} />
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center justify-center hover:bg-blue-700"
              onClick={() => onSendReply(replyContent)}
            >
              Send
              <svg className="ml-2 h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button className="text-gray-400 hover:text-gray-300">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 9L12 16L5 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReplyModal;