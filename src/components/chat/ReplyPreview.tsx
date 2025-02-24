// components/chat/ReplyPreview.tsx
import React from 'react';
import { X, Image, File, Mic } from 'lucide-react';
import { Message } from '@/types/chat';

interface ReplyPreviewProps {
  message: Message;
  onClose: () => void;
}

const ReplyPreview: React.FC<ReplyPreviewProps> = ({ message, onClose }) => {
  const getMessagePreview = () => {
    if (message.mediaUrl) {
      if (message.mediaUrl.match(/\.(jpg|jpeg|png|gif)$/i)) {
        return (
          <div className="flex items-center text-gray-600">
            <Image className="w-4 h-4 mr-1" />
            <span>Photo</span>
          </div>
        );
      } else if (message.mediaUrl.match(/\.(mp3|wav|ogg)$/i)) {
        return (
          <div className="flex items-center text-gray-600">
            <Mic className="w-4 h-4 mr-1" />
            <span>Voice message</span>
          </div>
        );
      } else {
        return (
          <div className="flex items-center text-gray-600">
            <File className="w-4 h-4 mr-1" />
            <span>Document</span>
          </div>
        );
      }
    }
    return message.content;
  };

  return (
    <div className="p-3 bg-gray-50 border-l-4 border-blue-500">
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2">
            <div className="h-4 w-1 bg-blue-500 rounded"></div>
            <span className="text-sm font-medium text-blue-600">
              Replying to {message.senderName}
            </span>
          </div>
          
          <div className="mt-1 text-sm text-gray-600 truncate">
            {getMessagePreview()}
          </div>

          {message.mediaUrl && message.mediaUrl.match(/\.(jpg|jpeg|png|gif)$/i) && (
            <div className="mt-2">
              <img
                src={message.mediaUrl}
                alt="Reply media"
                className="h-16 w-16 object-cover rounded"
              />
            </div>
          )}
        </div>

        <button
          onClick={onClose}
          className="ml-2 p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Close reply preview"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ReplyPreview;

// Usage example:
/*
import ReplyPreview from '@/components/chat/ReplyPreview';

// Inside your chat component:
const [replyTo, setReplyTo] = useState<Message | null>(null);

// In your JSX:
{replyTo && (
  <ReplyPreview
    message={replyTo}
    onClose={() => setReplyTo(null)}
  />
)}
*/