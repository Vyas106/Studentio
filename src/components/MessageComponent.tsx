// import React, { useState, useRef, useEffect } from 'react';
// import { Menu } from '@headlessui/react';
// import { Avatar } from './ui/avatar';
// import {
//   MoreVertical,
//   Edit2,
//   Trash2,
//   Reply,
//   Forward,
//   Check,
//   Clock
// } from 'lucide-react';
// import { formatDistanceToNow } from 'date-fns';
// import type { User } from 'firebase/auth';
// import type { Message } from '../../types/user';

// interface MessageComponentProps {
//   message: Message;
//   currentUser: User | null;
//   onEdit: (messageId: string, newContent: string) => Promise<void>;
//   onDelete: (messageId: string) => Promise<void>;
//   onReaction: (messageId: string, emoji: string) => Promise<void>;
//   onReply: (message: Message) => void;
//   onForward: (message: Message, targetChatId: string) => Promise<void>;
// }

// const MessageComponent = ({
//   message,
//   currentUser,
//   onEdit,
//   onDelete,
//   onReaction,
//   onReply,
//   onForward
// }: MessageComponentProps) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [editedContent, setEditedContent] = useState(message.content);
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
//   const [showForwardDialog, setShowForwardDialog] = useState(false);
//   const [selectedChat, setSelectedChat] = useState('');
//   const editInputRef = useRef<HTMLInputElement>(null);
//   const menuRef = useRef<HTMLDivElement>(null);

//   const isOwnMessage = currentUser?.uid === message.senderId;
//   const messageTime = formatDistanceToNow(message.timestamp, { addSuffix: true });

//   useEffect(() => {
//     if (isEditing && editInputRef.current) {
//       editInputRef.current.focus();
//     }
//   }, [isEditing]);

//   const handleEditSubmit = async () => {
//     if (editedContent.trim() !== message.content) {
//       await onEdit(message.id, editedContent);
//     }
//     setIsEditing(false);
//   };

//   const handleKeyPress = (e: React.KeyboardEvent) => {
//     if (e.key === 'Enter') {
//       handleEditSubmit();
//     } else if (e.key === 'Escape') {
//       setIsEditing(false);
//       setEditedContent(message.content);
//     }
//   };

//   const handleForwardSubmit = async () => {
//     if (selectedChat) {
//       await onForward(message, selectedChat);
//       setShowForwardDialog(false);
//       setSelectedChat('');
//     }
//   };

//   return (
//     <div className={`flex mb-4 ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
//       <div className={`max-w-[70%] ${isOwnMessage ? 'bg-blue-500 text-white' : 'bg-gray-100'} rounded-lg p-3`}>
//         {!isOwnMessage && (
//           <div className="flex items-center mb-1">
//             <Avatar 
//               src={message.senderAvatar} 
//               alt={message.senderName}
//               className="w-6 h-6 mr-2"
//             />
//             <span className="font-medium text-sm">{message.senderName}</span>
//           </div>
//         )}

//         {message.replyTo && (
//           <div className={`text-sm mb-2 p-2 rounded ${isOwnMessage ? 'bg-blue-600' : 'bg-gray-200'}`}>
//             <div className="font-medium">Reply to:</div>
//             <div className="truncate">{message.replyTo.content}</div>
//           </div>
//         )}

//         {isEditing ? (
//           <div className="flex items-center">
//             <input
//               ref={editInputRef}
//               type="text"
//               value={editedContent}
//               onChange={(e) => setEditedContent(e.target.value)}
//               onKeyDown={handleKeyPress}
//               className="flex-1 p-1 mr-2 rounded border text-black"
//             />
//             <button
//               onClick={handleEditSubmit}
//               className="p-1 bg-green-500 rounded"
//             >
//               <Check size={16} />
//             </button>
//           </div>
//         ) : (
//           <div className="mb-1">{message.content}</div>
//         )}

//         <div className="flex items-center justify-between mt-1 text-xs">
//           <div className="flex items-center space-x-2">
//             <span>{messageTime}</span>
//             {message.edited && <span>(edited)</span>}
//             {message.status === 'sent' && <Clock size={12} />}
//             {message.status === 'seen' && <Check size={12} className="text-green-500" />}
//           </div>

//           {isOwnMessage && (
//             <div ref={menuRef} className="relative">
//               <button
//                 onClick={() => menuRef.current?.focus()}
//                 className="p-1 hover:bg-black hover:bg-opacity-10 rounded"
//               >
//                 <MoreVertical size={16} />
//               </button>

//               <Menu>
//                 <Menu.Item icon={<Edit2 size={16} />} onClick={() => setIsEditing(true)}>
//                   Edit
//                 </Menu.Item>
//                 <Menu.Item icon={<Reply size={16} />} onClick={() => onReply(message)}>
//                   Reply
//                 </Menu.Item>
//                 <Menu.Item icon={<Forward size={16} />} onClick={() => setShowForwardDialog(true)}>
//                   Forward
//                 </Menu.Item>
//                 <Menu.Item 
//                   icon={<Trash2 size={16} />} 
//                   onClick={() => onDelete(message.id)}
//                   className="text-red-500"
//                 >
//                   Delete
//                 </Menu.Item>
//               </Menu>
//             </div>
//           )}
//         </div>

//         {message.reactions && (
//           <div className="flex flex-wrap gap-1 mt-2">
//             {Object.entries(message.reactions).map(([userId, emoji]) => (
//               <span
//                 key={userId}
//                 className="px-2 py-1 text-sm bg-black bg-opacity-5 rounded-full"
//               >
//                 {emoji}
//               </span>
//             ))}
//           </div>
//         )}
//       </div>

//       {showForwardDialog && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="bg-white p-4 rounded-lg w-96">
//             <h3 className="text-lg font-medium mb-4">Forward Message</h3>
//             <select
//               value={selectedChat}
//               onChange={(e) => setSelectedChat(e.target.value)}
//               className="w-full p-2 mb-4 border rounded"
//             >
//               <option value="">Select chat</option>
//               {/* Add your chat options here */}
//             </select>
//             <div className="flex justify-end space-x-2">
//               <button
//                 onClick={() => setShowForwardDialog(false)}
//                 className="px-4 py-2 text-gray-600"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleForwardSubmit}
//                 className="px-4 py-2 bg-blue-500 text-white rounded"
//                 disabled={!selectedChat}
//               >
//                 Forward
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MessageComponent;