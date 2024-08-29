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
} from "lucide-react";

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
  if (!isOpen || !selectedEmail) return null;

  return (
    <div
      className="bg-[#1E1E1E] rounded-md shadow-lg overflow-hidden border border-[#41464B]"
      style={{ height: "70vh" }}
    >
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-center p-3 border-b border-[#34383D]">
          <h2 className="text-white text-sm font-semibold">Reply</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={16} />
          </button>
        </div>
        <div className="flex-grow p-3 overflow-hidden">
          <div className="mb-3 text-xs">
            <p className="text-gray-400 pb-2 border-b border-[#34383D]">
              To: <span className="text-white">{selectedEmail.toEmail}</span>
            </p>
            <p className="text-gray-400 py-2 border-b border-[#34383D]">
              From: <span className="text-white">{selectedEmail.fromEmail}</span>
            </p>
            <p className="text-gray-400 pt-2">
              Subject: <span className="text-white">{selectedEmail.subject}</span>
            </p>
          </div>
          <textarea
            className="w-full h-[calc(100%-80px)] bg-[#2B2B2B] text-white rounded-md p-2 resize-none text-sm mt-3"
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            placeholder="Hi Jeanne,"
          />
        </div>
        <div className="flex justify-between items-center p-3 border-t border-[#34383D]">
          <button
            className="px-4 py-2 text-white text-sm rounded-md flex items-center justify-center"
            onClick={() => onSendReply(replyContent)}
            style={{
              background:
                "linear-gradient(91.73deg, #4B63DD -2.99%, rgba(5, 36, 191, 0.99) 95.8%)",
            }}
          >
            Send
          </button>
          <div className="flex space-x-2">
            <button className="text-gray-400 hover:text-gray-300">
              <Variable size={16} />
            </button>
            <button className="text-gray-400 hover:text-gray-300">
              <Eye size={16} />
            </button>
            <button className="text-gray-400 hover:text-gray-300">
              <Type size={16} />
            </button>
            <button className="text-gray-400 hover:text-gray-300">
              <Link size={16} />
            </button>
            <button className="text-gray-400 hover:text-gray-300">
              <Image size={16} />
            </button>
            <button className="text-gray-400 hover:text-gray-300">
              <UserPlus size={16} />
            </button>
            <button className="text-gray-400 hover:text-gray-300">
              <Code size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReplyModal;