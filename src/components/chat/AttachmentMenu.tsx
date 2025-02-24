// components/chat/AttachmentMenu.tsx
import React from 'react';
import { Camera, Image, File, Mic,  Contact } from 'lucide-react';
import { Poller_One } from 'next/font/google';

interface AttachmentMenuProps {
  onFileSelect: (files: File[]) => void;
  onClose: () => void;
}

const AttachmentMenu: React.FC<AttachmentMenuProps> = ({ onFileSelect, onClose }) => {
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files);
      if (type === 'image') {
        const imageFiles = fileArray.filter(file => file.type.startsWith('image/'));
        onFileSelect(imageFiles);
      } else if (type === 'document') {
        onFileSelect(fileArray);
      }
    }
    onClose();
  };

  const attachmentOptions = [
    {
      icon: <Camera className="w-6 h-6" />,
      label: 'Camera',
      color: 'bg-purple-500',
      action: () => {/* Implement camera access */}
    },
    {
      icon: <Image className="w-6 h-6" />,
      label: 'Photos & Videos',
      color: 'bg-pink-500',
      input: 'image/*'
    },
    {
      icon: <File className="w-6 h-6" />,
      label: 'Documents',
      color: 'bg-blue-500',
      input: '*/*'
    },
    {
      icon: <Contact className="w-6 h-6" />,
      label: 'Contact',
      color: 'bg-teal-500',
      action: () => {/* Implement contact sharing */}
    },
    {
    //   icon: <Poll className="w-6 h-6" />,
      label: 'Poll',
      color: 'bg-orange-500',
      action: () => {/* Implement poll creation */}
    }
  ];

  return (
    <div className="fixed bottom-20 left-0 w-full bg-white rounded-t-xl shadow-lg p-4 animate-slide-up">
      <div className="grid grid-cols-3 gap-4">
        {attachmentOptions.map((option, index) => (
          <div key={index} className="flex flex-col items-center">
            {option.input ? (
              <label className="flex flex-col items-center cursor-pointer">
                <div className={`${option.color} p-3 rounded-full text-white mb-2`}>
                  {option.icon}
                </div>
                <span className="text-sm text-gray-600">{option.label}</span>
                <input
                  type="file"
                  accept={option.input}
                  className="hidden"
                  multiple
                  onChange={(e) => handleFileInput(e, option.label.toLowerCase())}
                />
              </label>
            ) : (
              <button
                className="flex flex-col items-center"
                onClick={option.action}
              >
                <div className={`${option.color} p-3 rounded-full text-white mb-2`}>
                  {option.icon}
                </div>
                <span className="text-sm text-gray-600">{option.label}</span>
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AttachmentMenu;
