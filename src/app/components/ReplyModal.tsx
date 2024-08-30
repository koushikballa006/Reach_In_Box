import React from "react";
import {
  X,
  Variable,
  Eye,
  Type,
  Link,
  Image,
  UserPlus,
  Code,
  ChevronDown,
} from "lucide-react";
import { useTheme } from "../components/theme"; // Make sure this path is correct

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
  setReplyContent,
}) => {
  const { theme } = useTheme();

  if (!isOpen || !selectedEmail) return null;

  return (
    <div
      className={`${theme === 'dark' ? 'bg-[#1E1E1E]' : 'bg-white'} rounded-md shadow-lg overflow-hidden border ${theme === 'dark' ? 'border-[#41464B]' : 'border-gray-300'}`}
      style={{ height: "70vh" }}
    >
      <div className="flex flex-col h-full">
        <div
          className={`flex justify-between items-center p-3 border-b ${theme === 'dark' ? 'border-[#34383D] bg-[#23272C]' : 'border-gray-200 bg-gray-100'}`}
        >
          <h2 className={`${theme === 'dark' ? 'text-white' : 'text-black'} text-sm font-semibold`}>Reply</h2>
          <button onClick={onClose} className={`${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'}`}>
            <X size={16} />
          </button>
        </div>
        <div className="flex-grow p-3 overflow-hidden">
          <div className="mb-3 text-xs">
            <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} pb-2 border-b ${theme === 'dark' ? 'border-[#34383D]' : 'border-gray-200'}`}>
              To: <span className={theme === 'dark' ? 'text-white' : 'text-black'}>{selectedEmail.toEmail}</span>
            </p>
            <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} py-2 border-b ${theme === 'dark' ? 'border-[#34383D]' : 'border-gray-200'}`}>
              From: <span className={theme === 'dark' ? 'text-white' : 'text-black'}>{selectedEmail.fromEmail}</span>
            </p>
            <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} pt-2 border-b ${theme === 'dark' ? 'border-[#34383D]' : 'border-gray-200'}`}>
              Subject: <span className={theme === 'dark' ? 'text-white' : 'text-black'}>{selectedEmail.subject}</span>
            </p>
          </div>
          <textarea
            className={`w-full h-[calc(100%-80px)] ${theme === 'dark' ? 'bg-[#1E1E1E] text-white' : 'bg-white text-black'} p-2 resize-none text-sm mt-3 border-none`}
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            placeholder="Hi Jeanne,"
          />
        </div>
        <div className={`flex justify-between items-center p-3 border-t ${theme === 'dark' ? 'border-[#34383D]' : 'border-gray-200'}`}>
          <button
            className="px-4 py-2 text-white text-sm rounded-md flex items-center justify-center"
            onClick={() => onSendReply(replyContent)}
            style={{
              background:
                "linear-gradient(91.73deg, #4B63DD -2.99%, rgba(5, 36, 191, 0.99) 95.8%)",
            }}
          >
            Send
            <ChevronDown size={16} className="ml-1" />
          </button>
          <div className="flex space-x-2">
            {[Variable, Eye, Type, Link, Image, UserPlus, Code].map((Icon, index) => (
              <button key={index} className={`${theme === 'dark' ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-800'}`}>
                <Icon size={16} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReplyModal;