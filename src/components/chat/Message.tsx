// components/chat/MessageList.tsx
import React from 'react';
// import Message from './Message';
import { Message as MessageType } from '@/../../types/user';
import { User } from 'firebase/auth';
import { ChatRoom } from '../../../types/user';

// components/chat/Message.tsx
const Message: React.FC<{
  message: MessageType;
  isOwn: boolean;
  onReply: (message: MessageType) => void;
}> = ({ message, isOwn, onReply }) => {
  return (
    <div
      className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-[70%] rounded-lg p-3 ${
          isOwn ? 'bg-[#dcf8c6]' : 'bg-white'
        }`}
      >
        {message.replyTo && (
          <div className="mb-2 p-2 bg-gray-100 rounded border-l-4 border-blue-500">
            <p className="text-sm text-gray-600">{message.replyTo.content}</p>
          </div>
        )}
        
        {message.mediaUrl && (
          <div className="mb-2">
            <img
              src={message.mediaUrl}
              alt="Media"
              className="max-w-full rounded"
            />
          </div>
        )}
        
        <p className="break-words">{message.content}</p>
        
        <div className="flex items-center justify-end space-x-1 mt-1">
          <span className="text-xs text-gray-500">
            {new Date(message.timestamp).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit'
            })}
          </span>
          {isOwn && (
            <span className="text-blue-500">
              {message.status === 'seen' ? '✓✓' : '✓'}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;