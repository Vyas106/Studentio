// "use client"

// import { useEffect, useRef } from "react";
// import { Message } from "../../../types/user";
// import { ReplyIcon } from "lucide-react";

//   // components/chat/MessageList.tsx
//   export function MessageList({ messages, currentUserId, onReply }: {
//     messages: Message[];
//     currentUserId: string;
//     onReply: (message: Message) => void;
//   }) {
//     const messagesEndRef = useRef<HTMLDivElement>(null);
  
//     useEffect(() => {
//       messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//     }, [messages]);
  
//     return (
//       <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900">
//         {messages.map((message) => (
//           <div
//             key={message.id}
//             className={`flex ${
//               message.senderId === currentUserId ? 'justify-end' : 'justify-start'
//             }`}
//           >
//             <div
//               className={`max-w-[70%] p-3 rounded-lg ${
//                 message.senderId === currentUserId
//                   ? 'bg-blue-500 text-white ml-auto'
//                   : 'bg-white dark:bg-gray-800'
//               }`}
//             >
//               {message.replyTo && (
//                 <div className="text-sm opacity-75 p-2 rounded bg-gray-100 dark:bg-gray-700 mb-2">
//                   <p className="font-medium">{message.replyTo.senderName}</p>
//                   <p className="truncate">{message.replyTo.content}</p>
//                 </div>
//               )}
              
//               {message.mediaUrl && (
//                 <div className="mb-2">
//                   {message.mediaType === 'image' ? (
//                     <img
//                       src={message.mediaUrl}
//                       alt="Shared media"
//                       className="max-w-full rounded-lg"
//                     />
//                   ) : (
//                     <video
//                       src={message.mediaUrl}
//                       controls
//                       className="max-w-full rounded-lg"
//                     />
//                   )}
//                 </div>
//               )}
              
//               <p>{message.content}</p>
              
//               <div className="flex items-center justify-end mt-1 space-x-2">
//                 <span className="text-xs opacity-75">
//                   {new Date(message.timestamp).toLocaleTimeString()}
//                 </span>
//                 <span className="text-xs">
//                   {message.status === 'seen' ? '✓✓' : 
//                    message.status === 'delivered' ? '✓✓' : '✓'}
//                 </span>
//               </div>
//             </div>
            
//             <button
//               onClick={() => onReply(message)}
//               className="opacity-0 hover:opacity-100 ml-2"
//             >
//               <ReplyIcon className="w-4 h-4" />
//             </button>
//           </div>
//         ))}
//         <div ref={messagesEndRef} />
//       </div>
//     );
//   }
  

// components/chat/MessageList.tsx
import React from 'react';
import Message from './Message';
import { Message as MessageType } from '../../../types/user';
import { User } from 'firebase/auth';

interface MessageListProps {
  messages: MessageType[];
  currentUser: User | null;
  onReply: (message: MessageType) => void;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

const MessageList: React.FC<MessageListProps> = ({
  messages,
  currentUser,
  onReply,
  messagesEndRef,
}) => {
  return (
    <div className="p-4 space-y-4">
      {messages.map((message) => (
        <Message
          key={message.id}
          message={message}
          isOwn={message.senderId === currentUser?.uid}
          onReply={onReply}
        />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;