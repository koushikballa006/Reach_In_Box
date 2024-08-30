import React, { useState } from 'react';
import { MoreHorizontal, Trash2 } from 'lucide-react';
import { useTheme } from '../components/theme';

interface DeleteProps {
  threadId: number;
  onDelete: () => void;
}

const Delete: React.FC<DeleteProps> = ({ threadId, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useTheme();

  const handleDelete = async () => {
    const token = sessionStorage.getItem('bearer');
    if (!token) {
      console.error('No Bearer Token found.');
      return;
    }

    try {
      const response = await fetch(`https://hiring.reachinbox.xyz/api/v1/onebox/messages/${threadId}`, {
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
      onDelete();
    } catch (error) {
      console.error('Failed to delete email thread:', error);
    }

    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        className={`p-1 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'} rounded-md`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <MoreHorizontal size={20} />
      </button>
      {isOpen && (
        <div className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} ring-1 ring-black ring-opacity-5`}>
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <button
              className={`flex items-center w-full px-4 py-2 text-sm ${theme === 'dark' ? 'text-white hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}
              role="menuitem"
              onClick={handleDelete}
            >
              <Trash2 size={16} className="mr-2" />
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Delete;