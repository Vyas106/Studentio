// // // // app/chatroom/[id]/page.tsx

// // // "use client";

// // // import { useEffect, useState, useRef } from 'react';
// // // import { useParams, useRouter } from 'next/navigation';
// // // import { doc, getDoc, updateDoc } from 'firebase/firestore';
// // // import { ref, onValue, push, set } from 'firebase/database';
// // // import { db, auth, realtimeDb } from '@/lib/firebase';
// // // import { Message, ChatRoom } from './../../../../types/user';
// // // import { useNotifications } from '../../../../utils/hooks/useNotifications';
// // // // import { EmojiPicker } from '@/components/chat/EmojiPicker';
// // // import { debounce } from 'lodash';
// // // import { onSnapshot } from 'firebase/firestore';
// // // import MessageComponent from '@/components/MessageComponent';


// // // export default function ChatRoomPage() {
// // //   const params = useParams();
// // //   const router = useRouter();
// // //   const [chatRoom, setChatRoom] = useState<ChatRoom | null>(null);
// // //   const [messages, setMessages] = useState<Message[]>([]);
// // //   const [newMessage, setNewMessage] = useState('');
// // //   const [replyTo, setReplyTo] = useState<Message | null>(null);
// // //   const [isTyping, setIsTyping] = useState(false);
// // //   const [editingMessage, setEditingMessage] = useState<Message | null>(null);
// // //   const messagesEndRef = useRef<HTMLDivElement>(null);
// // //   const currentUser = auth.currentUser;
// // //   const { sendNotification } = useNotifications();

// // //   const debouncedTypingUpdate = debounce((typing: boolean) => {
// // //     if (currentUser && chatRoom) {
// // //       updateTypingStatus(chatRoom.id, currentUser.uid, typing);
// // //     }
// // //   }, 500);

// // //   useEffect(() => {
// // //     if (!params.id || !currentUser) return;

// // //     // Subscribe to chat room details
// // //     const chatRoomRef = doc(db, 'chatRooms', params.id as string);
// // //     const unsubscribeChatRoom = onSnapshot(chatRoomRef, (doc) => {
// // //       if (doc.exists()) {
// // //         setChatRoom({ id: doc.id, ...doc.data() } as ChatRoom);
// // //       }
// // //     });

// // //     // Subscribe to messages
// // //     const messagesRef = ref(realtimeDb, `chats/${params.id}/messages`);
// // //     const unsubscribeMessages = onValue(messagesRef, (snapshot) => {
// // //       const data = snapshot.val();
// // //       if (data) {
// // //         const messageList = Object.entries(data).map(([id, msg]: [string, any]) => ({
// // //           id,
// // //           ...msg,
// // //         }));
// // //         setMessages(messageList.sort((a, b) => a.timestamp - b.timestamp));
        
// // //         // Store messages in local storage
// // //         localStorage.setItem(`chat_${params.id}`, JSON.stringify(messageList));
        
// // //         // Mark messages as seen
// // //         messageList.forEach(async (message) => {
// // //           if (message.senderId !== currentUser.uid && message.status !== 'seen') {
// // //             await markMessageAsSeen(params.id as string, message.id);
// // //           }
// // //         });
// // //       }
// // //     });

// // //     // Subscribe to typing indicators
// // //     const typingRef = ref(realtimeDb, `chats/${params.id}/typing`);
// // //     const unsubscribeTyping = onValue(typingRef, (snapshot) => {
// // //       const data = snapshot.val();
// // //       if (data) {
// // //         setIsTyping(!!data[otherParticipant?.id || '']);
// // //       }
// // //     });

// // //     // Load messages from local storage
// // //     const storedMessages = localStorage.getItem(`chat_${params.id}`);
// // //     if (storedMessages) {
// // //       setMessages(JSON.parse(storedMessages));
// // //     }

// // //     // Update online status
// // //     updateOnlineStatus(currentUser.uid, true);

// // //     return () => {
// // //       unsubscribeChatRoom();
// // //       unsubscribeMessages();
// // //       unsubscribeTyping();
// // //       updateOnlineStatus(currentUser.uid, false);
// // //     };
// // //   }, [params.id, currentUser]);

// // //   const handleSendMessage = async () => {
// // //     if (!newMessage.trim() || !currentUser || !chatRoom) return;
  
// // //     try {
// // //       const messageRef = ref(realtimeDb, `chats/${chatRoom.id}/messages`);
  
// // //       const mentions = extractMentions(newMessage) || []; // Ensure mentions is always an array
  
// // //       const newMessageData: Omit<Message, 'id'> = {
// // //         content: newMessage.trim(),
// // //         senderId: currentUser.uid,
// // //         senderName: currentUser.displayName || '',
// // //         receiverId: chatRoom.participants.find(p => p.id !== currentUser.uid)?.id || '',
// // //         timestamp: Date.now(),
// // //         status: 'sent',
// // //         replyTo: replyTo ?? null, // Fix: Ensure replyTo is null if undefined
// // //         mentions
// // //       };
  
// // //       const messageSnapshot = await push(messageRef, newMessageData);
  
// // //       // Send notification for mentions
// // //       if (mentions.length > 0) {
// // //         mentions.forEach(userId => {
// // //           sendNotification(userId, {
// // //             title: `${currentUser.displayName} mentioned you`,
// // //             body: newMessage,
// // //             data: {
// // //               chatId: chatRoom.id,
// // //               messageId: messageSnapshot.key
// // //             }
// // //           });
// // //         });
// // //       }
  
// // //       // Send notification to receiver
// // //       if (newMessageData.receiverId) {
// // //         sendNotification(newMessageData.receiverId, {
// // //           title: `New message from ${currentUser.displayName}`,
// // //           body: newMessage,
// // //           data: {
// // //             chatId: chatRoom.id,
// // //             messageId: messageSnapshot.key
// // //           }
// // //         });
// // //       }
  
// // //       setNewMessage('');
// // //       setReplyTo(null);
// // //       scrollToBottom();
// // //     } catch (error) {
// // //       console.error('Error sending message:', error);
// // //     }
// // //   };
  

// // //   const handleEditMessage = async (messageId: string, newContent: string) => {
// // //     if (!chatRoom || !currentUser) return;

// // //     try {
// // //       const messageRef = ref(realtimeDb, `chats/${chatRoom.id}/messages/${messageId}`);
// // //       await set(messageRef, {
// // //         ...editingMessage,
// // //         content: newContent,
// // //         edited: true,
// // //         editedAt: Date.now()
// // //       });
// // //       setEditingMessage(null);
// // //     } catch (error) {
// // //       console.error('Error editing message:', error);
// // //     }
// // //   };

// // //   const handleDeleteMessage = async (messageId: string) => {
// // //     if (!chatRoom || !currentUser) return;

// // //     try {
// // //       const messageRef = ref(realtimeDb, `chats/${chatRoom.id}/messages/${messageId}`);
// // //       await set(messageRef, null);
// // //     } catch (error) {
// // //       console.error('Error deleting message:', error);
// // //     }
// // //   };

// // //   const handleReaction = async (messageId: string, emoji: string) => {
// // //     if (!chatRoom || !currentUser) return;

// // //     try {
// // //       const messageRef = ref(realtimeDb, `chats/${chatRoom.id}/messages/${messageId}/reactions/${currentUser.uid}`);
// // //       await set(messageRef, emoji);
// // //     } catch (error) {
// // //       console.error('Error adding reaction:', error);
// // //     }
// // //   };

// // //   const handleForwardMessage = async (message: Message, targetChatId: string) => {
// // //     try {
// // //       const messageRef = ref(realtimeDb, `chats/${targetChatId}/messages`);
// // //       await push(messageRef, {
// // //         ...message,
// // //         forwarded: true,
// // //         originalChatId: chatRoom?.id,
// // //         timestamp: Date.now(),
// // //         status: 'sent'
// // //       });
// // //     } catch (error) {
// // //       console.error('Error forwarding message:', error);
// // //     }
// // //   };

// // //   const extractMentions = (text: string): string[] => {
// // //     const mentions = text.match(/@[\w]+/g) || [];
// // //     return mentions.map(mention => mention.slice(1));
// // //   };

// // //   const markMessageAsSeen = async (chatId: string, messageId: string) => {
// // //     const messageRef = ref(realtimeDb, `chats/${chatId}/messages/${messageId}`);
// // //     await set(messageRef, { status: 'seen' });
// // //   };

// // //   const updateTypingStatus = async (chatId: string, userId: string, isTyping: boolean) => {
// // //     const typingRef = ref(realtimeDb, `chats/${chatId}/typing/${userId}`);
// // //     await set(typingRef, isTyping);
// // //   };

// // //   const updateOnlineStatus = async (userId: string, isOnline: boolean) => {
// // //     const userStatusRef = ref(realtimeDb, `users/${userId}/status`);
// // //     await set(userStatusRef, {
// // //       state: isOnline ? 'online' : 'offline',
// // //       lastSeen: Date.now()
// // //     });
// // //   };

// // //   const scrollToBottom = () => {
// // //     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
// // //   };

// // //   useEffect(() => {
// // //     scrollToBottom();
// // //   }, [messages]);

// // //   return (
// // //     <div className="flex flex-col h-screen">
// // //       <div className="flex-1 overflow-y-auto p-4">
// // //         {messages.map((message) => (
// // //           <MessageComponent
// // //             key={message.id}
// // //             message={message}
// // //             currentUser={currentUser}
// // //             onEdit={handleEditMessage}
// // //             onDelete={handleDeleteMessage}
// // //             onReaction={handleReaction}
// // //             onReply={() => setReplyTo(message)}
// // //             onForward={handleForwardMessage}
// // //           />
// // //         ))}
// // //         <div ref={messagesEndRef} />
// // //       </div>
      
// // //       {isTyping && (
// // //         <div className="px-4 py-2 text-sm text-gray-500">
// // //           Someone is typing...
// // //         </div>
// // //       )}
      
// // //       {replyTo && (
// // //         <div className="px-4 py-2 bg-gray-100">
// // //           <div className="flex justify-between items-center">
// // //             <span>Replying to: {replyTo.content}</span>
// // //             <button onClick={() => setReplyTo(null)}>×</button>
// // //           </div>
// // //         </div>
// // //       )}
      
// // //       <div className="p-4 border-t">
// // //         <div className="flex items-center space-x-2">
// // //           {/* <EmojiPicker onSelect={({emoji} : any) => setNewMessage(prev => prev + emoji)} />
// // //            */}
// // //           <input
// // //             type="text"
// // //             value={newMessage}
// // //             onChange={(e) => {
// // //               setNewMessage(e.target.value);
// // //               debouncedTypingUpdate(true);
// // //             }}
// // //             onBlur={() => debouncedTypingUpdate(false)}
// // //             placeholder="Type a message..."
// // //             className="flex-1 p-2 border rounded-lg"
// // //             onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
// // //           />
// // //           <button
// // //             onClick={handleSendMessage}
// // //             className="px-4 py-2 bg-blue-500 text-white rounded-lg"
// // //           >
// // //             Send
// // //           </button>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // "use client"

// // // components/chat/ChatRoom.tsx
// // import React, { useEffect, useState, useRef } from 'react';
// // import { useParams, useRouter } from 'next/navigation';
// // import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
// // import { ref, onValue, push, set } from 'firebase/database';
// // import { db, auth, realtimeDb } from '@/lib/firebase';
// // import { Message, ChatRoom } from '@/../../types/user';
// // import { useNotifications } from '../../../../utils/hooks/useNotifications';
// // import { debounce } from 'lodash';
// // import MessageList from './../../../components/chat/MessageList';
// // import ChatHeader from './../../../components/chat/ChatHeader';
// // import MessageInput from './../../../components/chat/MessageInput';
// // import ReplyPreview from './../../../components/chat/ReplyPreview';
// // import AttachmentMenu from './../../../components/chat/AttachmentMenu';
// // import { uploadMedia } from '@/app/utils/mediaUpload';
// // import { updateOnlineStatus, updateTypingStatus } from '@/lib/chatUtils';

// // export default function ChatRoomPage() {
// //   const params = useParams();
// //   const router = useRouter();
// //   const [chatRoom, setChatRoom] = useState<ChatRoom | null>(null);
// //   const [messages, setMessages] = useState<Message[]>([]);
// //   const [newMessage, setNewMessage] = useState('');
// //   const [replyTo, setReplyTo] = useState<Message | null>(null);
// //   const [isTyping, setIsTyping] = useState(false);
// //   const [showAttachMenu, setShowAttachMenu] = useState(false);
// //   const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
// //   const [isRecording, setIsRecording] = useState(false);
// //   const messagesEndRef = useRef<HTMLDivElement>(null);
// //   const currentUser = auth.currentUser;
// //   const { sendNotification } = useNotifications();

// //   const debouncedTypingUpdate = debounce((typing: boolean) => {
// //     if (currentUser && chatRoom) {
// //       updateTypingStatus(chatRoom.id, currentUser.uid, typing);
// //     }
// //   }, 500);

// //   useEffect(() => {
// //     if (!params.id || !currentUser) {
// //       router.push('/chats');
// //       return;
// //     }

// //     const chatRoomRef = doc(db, 'chatRooms', params.id as string);
// //     const unsubscribeChatRoom = onSnapshot(chatRoomRef, (doc) => {
// //       if (doc.exists()) {
// //         setChatRoom({ id: doc.id, ...doc.data() } as ChatRoom);
// //       }
// //     });

// //     const messagesRef = ref(realtimeDb, `chats/${params.id}/messages`);
// //     const unsubscribeMessages = onValue(messagesRef, (snapshot) => {
// //       const data = snapshot.val();
// //       if (data) {
// //         const messageList = Object.entries(data).map(([id, msg]: [string, any]) => ({
// //           id,
// //           ...msg,
// //         }));
// //         setMessages(messageList.sort((a, b) => a.timestamp - b.timestamp));
// //         updateUnreadCount(params.id as string, currentUser.uid);
// //       }
// //     });

// //     const typingRef = ref(realtimeDb, `chats/${params.id}/typing`);
// //     const unsubscribeTyping = onValue(typingRef, (snapshot) => {
// //       const data = snapshot.val();
// //       if (data) {
// //         const otherParticipantId = chatRoom?.participants.find(
// //           p => p.id !== currentUser.uid
// //         )?.id;
// //         setIsTyping(!!data[otherParticipantId || '']);
// //       }
// //     });

// //     updateOnlineStatus(currentUser.uid, true);

// //     return () => {
// //       unsubscribeChatRoom();
// //       unsubscribeMessages();
// //       unsubscribeTyping();
// //       updateOnlineStatus(currentUser.uid, false);
// //     };
// //   }, [params.id, currentUser, router]);

// //   const handleSendMessage = async () => {
// //     if ((!newMessage.trim() && selectedFiles.length === 0) || !currentUser || !chatRoom) return;

// //     try {
// //       const messageRef = ref(realtimeDb, `chats/${chatRoom.id}/messages`);
// //       const mentions = extractMentions(newMessage);
// //       let mediaUrls: string[] = [];

// //       if (selectedFiles.length > 0) {
// //         mediaUrls = await Promise.all(selectedFiles.map(file => uploadMedia(file)));
// //       }

// //       const newMessageData: Omit<Message, 'id'> = {
// //         content: newMessage.trim(),
// //         senderId: currentUser.uid,
// //         senderName: currentUser.displayName || '',
// //         receiverId: chatRoom.participants.find(p => p.id !== currentUser.uid)?.id || '',
// //         timestamp: Date.now(),
// //         status: 'sent',
// //         mediaUrl: mediaUrls.length > 0 ? mediaUrls[0] : undefined,
// //         replyTo: replyTo || undefined,
// //         mentions,
// //         reactions: {}
// //       };

// //       const messageSnapshot = await push(messageRef, newMessageData);

// //       handleNotifications(newMessageData, mentions, chatRoom.id, messageSnapshot.key);

// //       setNewMessage('');
// //       setReplyTo(null);
// //       setSelectedFiles([]);
// //       setShowAttachMenu(false);
// //       scrollToBottom();
// //     } catch (error) {
// //       console.error('Error sending message:', error);
// //     }
// //   };

// //   // Additional helper functions...
// //   const handleNotifications = (
// //     message: Omit<Message, 'id'>,
// //     mentions: string[],
// //     chatId: string,
// //     messageId: string
// //   ) => {
// //     // Handle mentions notifications
// //     mentions.forEach(userId => {
// //       sendNotification(userId, {
// //         title: `${currentUser?.displayName} mentioned you`,
// //         body: message.content,
// //         data: { chatId, messageId }
// //       });
// //     });

// //     // Handle regular message notification
// //     if (message.receiverId) {
// //       sendNotification(message.receiverId, {
// //         title: `New message from ${currentUser?.displayName}`,
// //         body: message.content,
// //         data: { chatId, messageId }
// //       });
// //     }
// //   };

// //   const updateUnreadCount = async (chatId: string, userId: string) => {
// //     const chatRef = doc(db, 'chatRooms', chatId);
// //     await updateDoc(chatRef, {
// //       [`unreadCount.${userId}`]: 0
// //     });
// //   };

// //   const scrollToBottom = () => {
// //     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
// //   };

// //   return (
// //     <div className="flex flex-col h-screen bg-gray-100">
// //       <ChatHeader
// //         chatRoom={chatRoom}
// //         currentUser={currentUser}
// //         isTyping={isTyping}
// //       />

// //       <div className="flex-1 overflow-y-auto bg-[#e5ded8]">
// //         <MessageList
// //           messages={messages}
// //           currentUser={currentUser}
// //           onReply={setReplyTo}
// //           messagesEndRef={messagesEndRef}
// //         />
// //       </div>

// //       {replyTo && (
// //         <ReplyPreview
// //           message={replyTo}
// //           onClose={() => setReplyTo(null)}
// //         />
// //       )}

// //       {showAttachMenu && (
// //         <AttachmentMenu
// //           onFileSelect={setSelectedFiles}
// //           onClose={() => setShowAttachMenu(false)}
// //         />
// //       )}

// //       <MessageInput
// //         value={newMessage}
// //         onChange={(e) => {
// //           setNewMessage(e.target.value);
// //           debouncedTypingUpdate(true);
// //         }}
// //         onSend={handleSendMessage}
// //         onAttach={() => setShowAttachMenu(true)}
// //         onRecord={() => setIsRecording(!isRecording)}
// //         isRecording={isRecording}
// //         selectedFiles={selectedFiles}
// //         onRemoveFile={(index) => {
// //           setSelectedFiles(files => files.filter((_, i) => i !== index));
// //         }}
// //       />
// //     </div>
// //   );
// // }




// // app/chatroom/[id]/page.tsx
// "use client";

// import { useEffect, useState, useRef } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import { 
//   doc, 
//   getDoc, 
//   collection,
//   query,
//   orderBy,
//   onSnapshot,
//   updateDoc,
//   addDoc,
//   serverTimestamp
// } from 'firebase/firestore';
// import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// import { db, auth, storage } from '@/lib/firebase';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import { Card, CardContent, CardHeader } from '@/components/ui/card';
// import { Skeleton } from '@/components/ui/skeleton';
// import { getInitials } from '@/lib/utils';
// import { toast } from '@/hooks/use-toast';
// import { Send, Image, Paperclip } from 'lucide-react';

// interface Message {
//   id: string;
//   content: string;
//   senderId: string;
//   timestamp: any;
//   type: 'text' | 'image' | 'file';
//   fileUrl?: string;
//   fileName?: string;
//   read: boolean;
// }

// interface ChatRoom {
//   id: string;
//   participants: string[];
//   participantsInfo: {
//     id: string;
//     name: string;
//     photoURL?: string;
//   }[];
//   lastMessage: Message | null;
//   typingUsers?: string[];
// }

// export default function ChatRoomPage() {
//   const params = useParams();
//   const router = useRouter();
//   const [chatRoom, setChatRoom] = useState<ChatRoom | null>(null);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [newMessage, setNewMessage] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [isTyping, setIsTyping] = useState(false);
//   const [otherUserTyping, setOtherUserTyping] = useState(false);
//   const messagesEndRef = useRef<HTMLDivElement>(null);
//   const typingTimeoutRef = useRef<NodeJS.Timeout>();
//   const fileInputRef = useRef<HTMLInputElement>(null);
  
//   const currentUser = auth.currentUser;
  
//   useEffect(() => {
//     if (!currentUser) {
//       router.push('/login');
//       return;
//     }

//     const fetchChatRoom = async () => {
//       if (!params.id) return;
      
//       try {
//         const docRef = doc(db, 'chatRooms', params.id as string);
//         const docSnap = await getDoc(docRef);
        
//         if (docSnap.exists()) {
//           const roomData = docSnap.data() as ChatRoom;
//           if (!roomData.participants.includes(currentUser.uid)) {
//             toast({
//               title: "Access Denied",
//               description: "You don't have permission to view this chat",
//               variant: "destructive",
//             });
//             router.push('/home');
//             return;
//           }
//           setChatRoom(roomData);
//         } else {
//           toast({
//             title: "Error",
//             description: "Chat room not found",
//             variant: "destructive",
//           });
//           router.push('/');
//         }
//       } catch (error) {
//         toast({
//           title: "Error",
//           description: "Failed to load chat room",
//           variant: "destructive",
//         });
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchChatRoom();
//   }, [params.id, router, currentUser]);

//   useEffect(() => {
//     if (!params.id || !currentUser) return;

//     const q = query(
//       collection(db, `chatRooms/${params.id}/messages`),
//       orderBy('timestamp', 'asc')
//     );

//     const unsubscribe = onSnapshot(q, (snapshot) => {
//       const newMessages: Message[] = [];
//       snapshot.forEach((doc) => {
//         newMessages.push({ id: doc.id, ...doc.data() } as Message);
//       });
//       setMessages(newMessages);
      
//       // Mark messages as read
//       newMessages.forEach(async (message) => {
//         if (!message.read && message.senderId !== currentUser.uid) {
//           const messageRef = doc(db, `chatRooms/${params.id}/messages`, message.id);
//           await updateDoc(messageRef, { read: true });
//         }
//       });
//     });

//     return () => unsubscribe();
//   }, [params.id, currentUser]);

//   useEffect(() => {
//     if (!params.id || !currentUser) return;

//     const typingRef = doc(db, 'chatRooms', params.id);
//     const unsubscribe = onSnapshot(typingRef, (snapshot) => {
//       const data = snapshot.data();
//       if (data?.typingUsers?.includes(currentUser.uid)) {
//         setIsTyping(true);
//       } else {
//         setIsTyping(false);
//       }
      
//       setOtherUserTyping(
//         data?.typingUsers?.some((uid: string) => uid !== currentUser.uid) ?? false
//       );
//     });

//     return () => unsubscribe();
//   }, [params.id, currentUser]);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   const handleTyping = async () => {
//     if (!params.id || !currentUser || !chatRoom) return;

//     const chatRoomRef = doc(db, 'chatRooms', params.id);
//     const currentTypingUsers = chatRoom.typingUsers || [];

//     if (!currentTypingUsers.includes(currentUser.uid)) {
//       await updateDoc(chatRoomRef, {
//         typingUsers: [...currentTypingUsers, currentUser.uid],
//       });
//     }

//     if (typingTimeoutRef.current) {
//       clearTimeout(typingTimeoutRef.current);
//     }

//     typingTimeoutRef.current = setTimeout(async () => {
//       const updatedTypingUsers = (chatRoom.typingUsers || []).filter(
//         (uid) => uid !== currentUser.uid
//       );
//       await updateDoc(chatRoomRef, { typingUsers: updatedTypingUsers });
//     }, 2000);
//   };

//   const handleSendMessage = async () => {
//     if (!newMessage.trim() || !currentUser || !params.id) return;

//     try {
//       const messageData = {
//         content: newMessage.trim(),
//         senderId: currentUser.uid,
//         timestamp: serverTimestamp(),
//         type: 'text',
//         read: false,
//       };

//       await addDoc(collection(db, `chatRooms/${params.id}/messages`), messageData);
      
//       // Update last message in chat room
//       const chatRoomRef = doc(db, 'chatRooms', params.id);
//       await updateDoc(chatRoomRef, {
//         lastMessage: messageData,
//         updatedAt: serverTimestamp(),
//       });

//       setNewMessage('');
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "Failed to send message",
//         variant: "destructive",
//       });
//     }
//   };

//   const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (!file || !currentUser || !params.id) return;

//     try {
//       const storageRef = ref(storage, `chat-files/${params.id}/${Date.now()}_${file.name}`);
//       const snapshot = await uploadBytes(storageRef, file);
//       const downloadURL = await getDownloadURL(snapshot.ref);

//       const messageData = {
//         content: file.name,
//         senderId: currentUser.uid,
//         timestamp: serverTimestamp(),
//         type: file.type.startsWith('image/') ? 'image' : 'file',
//         fileUrl: downloadURL,
//         fileName: file.name,
//         read: false,
//       };

//       await addDoc(collection(db, `chatRooms/${params.id}/messages`), messageData);
      
//       await updateDoc(doc(db, 'chatRooms', params.id), {
//         lastMessage: messageData,
//         updatedAt: serverTimestamp(),
//       });
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "Failed to upload file",
//         variant: "destructive",
//       });
//     }
//   };

//   if (loading) {
//     return (
//       <div className="max-w-4xl mx-auto mt-8 px-4">
//         <Card>
//           <CardContent className="p-6">
//             <Skeleton className="h-[600px]" />
//           </CardContent>
//         </Card>
//       </div>
//     );
//   }

//   if (!chatRoom || !currentUser) return null;

//   const otherUser = chatRoom.participantsInfo.find(
//     (p) => p.id !== currentUser.uid
//   );

//   return (
//     <div className="max-w-4xl mx-auto mt-8 px-4">
//       <Card className="h-[800px] flex flex-col">
//         <CardHeader className="border-b">
//           <div className="flex items-center space-x-4">
//             <Avatar>
//               <AvatarImage src={otherUser?.photoURL} alt={otherUser?.name} onClick={() => router.push(`/profile/${otherUser?.id}`)}  />
//               <AvatarFallback onClick={() => router.push(`/profile/${otherUser?.id}`)}>{getInitials(otherUser?.name || '')}</AvatarFallback>
//             </Avatar>
//             <div>
//               <h2 className="text-xl font-semibold">{otherUser?.name}</h2>
//               {otherUserTyping && (
//                 <p className="text-sm text-gray-500">typing...</p>
//               )}
//             </div>
//           </div>
//         </CardHeader>
        
//         <CardContent className="flex-1 overflow-y-auto p-4">
//           <div className="space-y-4">
//             {messages.map((message) => (
//               <div
//                 key={message.id}
//                 className={`flex ${
//                   message.senderId === currentUser.uid ? 'justify-end' : 'justify-start'
//                 }`}
//               >
//                 <div
//                   className={`max-w-[70%] p-3 rounded-lg ${
//                     message.senderId === currentUser.uid
//                       ? 'bg-blue-500 text-white'
//                       : 'bg-gray-100 dark:bg-gray-800'
//                   }`}
//                 >
//                   {message.type === 'text' && <p>{message.content}</p>}
//                   {message.type === 'image' && (
//                     <img
//                       src={message.fileUrl}
//                       alt={message.fileName}
//                       className="max-w-full rounded"
//                     />
//                   )}
//                   {message.type === 'file' && (
//                     <a
//                       href={message.fileUrl}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="flex items-center space-x-2 text-blue-400 hover:text-blue-500"
//                     >
//                       <Paperclip size={16} />
//                       <span>{message.fileName}</span>
//                     </a>
//                   )}
//                   <div className="text-xs mt-1 opacity-70">
//                     {message.timestamp?.toDate().toLocaleTimeString()}
//                     {message.senderId === currentUser.uid && (
//                       <span className="ml-2">
//                         {message.read ? '✓✓' : '✓'}
//                       </span>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             ))}
//             <div ref={messagesEndRef} />
//           </div>
//         </CardContent>

//         <div className="p-4 border-t">
//           <div className="flex items-center space-x-2">
//             <Button
//               variant="ghost"
//               size="icon"
//               onClick={() => fileInputRef.current?.click()}
//             >
//               <Image className="h-5 w-5" />
//             </Button>
//             <input
//               type="file"
//               ref={fileInputRef}
//               className="hidden"
//               onChange={handleFileUpload}
//               accept="image/*,.pdf,.doc,.docx"
//             />
//             <Input
//               value={newMessage}
//               onChange={(e) => {
//                 setNewMessage(e.target.value);
//                 handleTyping();
//               }}
//               onKeyPress={(e) => {
//                 if (e.key === 'Enter') {
//                   handleSendMessage();
//                 }
//               }}
//               placeholder="Type a message..."
//               className="flex-1"
//             />
//             <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
//               <Send className="h-5 w-5" />
//             </Button>
//           </div>
//         </div>
//       </Card>
//     </div>
//   );
// }

"use client";

import { useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { 
  doc, 
  getDoc, 
  collection,
  query,
  orderBy,
  onSnapshot,
  updateDoc,
  addDoc,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, auth, storage } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { getInitials } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { Send, ImageIcon, Paperclip, ArrowLeft, Download } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import Space from '@/components/space';
import Navbar from '@/components/Navbar';

interface Message {
  id: string;
  content: string;
  senderId: string;
  timestamp: Timestamp;
  type: 'text' | 'image' | 'file';
  fileUrl?: string;
  fileName?: string;
  read: boolean;
}

interface UserInfo {
  id: string;
  name: string;
  photoURL?: string;
}

interface ChatRoom {
  id: string;
  participants: string[];
  participantsInfo: UserInfo[];
  lastMessage: Message | null;
  typingUsers?: string[];
  updatedAt?: Timestamp;
}

export default function ChatRoomPage() {
  const params = useParams();
  const router = useRouter();
  const [chatRoom, setChatRoom] = useState<ChatRoom | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [otherUserTyping, setOtherUserTyping] = useState(false);
  const [uploading, setUploading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const currentUser = auth.currentUser;
  const chatId = params.id as string;
  
  useEffect(() => {
    if (!currentUser) {
      router.push('/login');
      return;
    }

    const fetchChatRoom = async () => {
      if (!chatId) return;
      
      try {
        const docRef = doc(db, 'chatRooms', chatId);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const roomData = { ...docSnap.data(), id: docSnap.id } as ChatRoom;
          if (!roomData.participants.includes(currentUser.uid)) {
            toast({
              title: "Access Denied",
              description: "You don't have permission to view this chat",
              variant: "destructive",
            });
            router.push('/home');
            return;
          }
          setChatRoom(roomData);
        } else {
          toast({
            title: "Error",
            description: "Chat room not found",
            variant: "destructive",
          });
          router.push('/');
        }
      } catch (error) {
        console.error("Failed to load chat room:", error);
        toast({
          title: "Error",
          description: "Failed to load chat room",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchChatRoom();
  }, [chatId, router, currentUser]);

  useEffect(() => {
    if (!chatId || !currentUser) return;

    const q = query(
      collection(db, `chatRooms/${chatId}/messages`),
      orderBy('timestamp', 'asc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newMessages: Message[] = [];
      snapshot.forEach((doc) => {
        newMessages.push({ id: doc.id, ...doc.data() } as Message);
      });
      setMessages(newMessages);
      
      // Mark messages as read
      newMessages.forEach(async (message) => {
        if (!message.read && message.senderId !== currentUser.uid) {
          try {
            const messageRef = doc(db, `chatRooms/${chatId}/messages`, message.id);
            await updateDoc(messageRef, { read: true });
          } catch (error) {
            console.error("Failed to mark message as read:", error);
          }
        }
      });
    });

    return () => unsubscribe();
  }, [chatId, currentUser]);

  useEffect(() => {
    if (!chatId || !currentUser) return;

    const typingRef = doc(db, 'chatRooms', chatId);
    const unsubscribe = onSnapshot(typingRef, (snapshot) => {
      const data = snapshot.data();
      
      setOtherUserTyping(
        data?.typingUsers?.some((uid: string) => uid !== currentUser.uid) ?? false
      );
    });

    return () => unsubscribe();
  }, [chatId, currentUser]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleTyping = async () => {
    if (!chatId || !currentUser || !chatRoom) return;

    const chatRoomRef = doc(db, 'chatRooms', chatId);
    const currentTypingUsers = chatRoom.typingUsers || [];

    if (!currentTypingUsers.includes(currentUser.uid)) {
      try {
        await updateDoc(chatRoomRef, {
          typingUsers: [...currentTypingUsers, currentUser.uid],
        });
      } catch (error) {
        console.error("Failed to update typing status:", error);
      }
    }

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(async () => {
      try {
        const updatedTypingUsers = (chatRoom.typingUsers || []).filter(
          (uid) => uid !== currentUser.uid
        );
        await updateDoc(chatRoomRef, { typingUsers: updatedTypingUsers });
      } catch (error) {
        console.error("Failed to clear typing status:", error);
      }
    }, 2000);
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !currentUser || !chatId) return;

    try {
      const messageData = {
        content: newMessage.trim(),
        senderId: currentUser.uid,
        timestamp: serverTimestamp(),
        type: 'text' as const,
        read: false,
      };

      await addDoc(collection(db, `chatRooms/${chatId}/messages`), messageData);
      
      // Update last message in chat room
      const chatRoomRef = doc(db, 'chatRooms', chatId);
      await updateDoc(chatRoomRef, {
        lastMessage: messageData,
        updatedAt: serverTimestamp(),
      });

      setNewMessage('');
    } catch (error) {
      console.error("Failed to send message:", error);
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive",
      });
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !currentUser || !chatId) return;

    setUploading(true);
    try {
      const storageRef = ref(storage, `chat-files/${chatId}/${Date.now()}_${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);

      const messageData = {
        content: file.name,
        senderId: currentUser.uid,
        timestamp: serverTimestamp(),
        type: file.type.startsWith('image/') ? 'image' as const : 'file' as const,
        fileUrl: downloadURL,
        fileName: file.name,
        read: false,
      };

      await addDoc(collection(db, `chatRooms/${chatId}/messages`), messageData);
      
      await updateDoc(doc(db, 'chatRooms', chatId), {
        lastMessage: messageData,
        updatedAt: serverTimestamp(),
      });
      
      toast({
        title: "Success",
        description: "File uploaded successfully",
      });
    } catch (error) {
      console.error("Failed to upload file:", error);
      toast({
        title: "Error",
        description: "Failed to upload file",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
      if (event.target) {
        event.target.value = '';
      }
    }
  };

  const formatTime = (timestamp: Timestamp | undefined) => {
    if (!timestamp) return '';
    const date = timestamp.toDate();
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (timestamp: Timestamp | undefined) => {
    if (!timestamp) return '';
    const date = timestamp.toDate();
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

  const renderDateDivider = (index: number) => {
    if (index === 0) {
      return (
        <div className="flex justify-center my-4">
          <Badge variant="outline" className="px-3 py-1">
            {formatDate(messages[index].timestamp)}
          </Badge>
        </div>
      );
    }

    const prevDate = messages[index - 1].timestamp?.toDate().toDateString();
    const currDate = messages[index].timestamp?.toDate().toDateString();

    if (prevDate !== currDate) {
      return (
        <div className="flex justify-center my-4">
          <Badge variant="outline" className="px-3 py-1">
            {formatDate(messages[index].timestamp)}
          </Badge>
        </div>
      );
    }

    return null;
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto mt-8 px-4">
        <Card className="h-[800px]">
          <CardHeader className="border-b">
            <div className="flex items-center space-x-4">
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-6 w-40" />
            </div>
          </CardHeader>
          <CardContent className="p-6 flex-1">
            <div className="space-y-4">
              <Skeleton className="h-16 w-3/4 ml-auto" />
              <Skeleton className="h-16 w-3/4" />
              <Skeleton className="h-16 w-3/4 ml-auto" />
              <Skeleton className="h-16 w-3/4" />
            </div>
          </CardContent>
          <CardFooter className="border-t p-4">
            <Skeleton className="h-10 w-full" />
          </CardFooter>
        </Card>
      </div>
    );
  }

  if (!chatRoom || !currentUser) return null;

  const otherUser = chatRoom.participantsInfo.find(
    (p) => p.id !== currentUser.uid
  );

  return (
    <div className="max-w-4xl mx-auto mt-8 ">
      <Card className="h-[800px] flex flex-col border-none shadow-none">
        <CardHeader className="border-b py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => router.push('/home')}
                className="mr-2"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="cursor-pointer" onClick={() => router.push(`/profile/${otherUser?.id}`)}>
                <Avatar>
                  <AvatarImage src={otherUser?.photoURL} alt={otherUser?.name || 'User'} />
                  <AvatarFallback>{getInitials(otherUser?.name || '')}</AvatarFallback>
                </Avatar>
              </div>
              <div>
                <h2 className="text-xl font-semibold" onClick={() => router.push(`/profile/${otherUser?.id}`)}>
                  {otherUser?.name}
                </h2>
                {otherUserTyping && (
                  <p className="text-sm text-gray-500 animate-pulse">typing...</p>
                )}
              </div>
            </div>
          </div>
        </CardHeader>
        
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-2">
            {messages.map((message, index) => (
              <div key={message.id}>
                {renderDateDivider(index)}
                <div
                  className={`flex ${
                    message.senderId === currentUser.uid ? 'justify-end' : 'justify-start'
                  } mb-4`}
                >
                  {message.senderId !== currentUser.uid && (
                    <Avatar className="mr-2 mt-1 h-8 w-8">
                      <AvatarImage 
                        src={otherUser?.photoURL} 
                        alt={otherUser?.name || 'User'} 
                      />
                      <AvatarFallback>{getInitials(otherUser?.name || '')}</AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`max-w-[70%] rounded-lg ${
                      message.senderId === currentUser.uid
                        ? 'bg-blue-500 text-white rounded-tr-none'
                        : 'bg-gray-100 dark:bg-gray-800 rounded-tl-none'
                    }`}
                  >
                    {message.type === 'text' && (
                      <div className="p-3">
                        <p className="break-words">{message.content}</p>
                      </div>
                    )}
                    {message.type === 'image' && (
                      <div className="p-2">
                        <div className="relative rounded overflow-hidden">
                          <Image
                            src={message.fileUrl || ''}
                            alt={message.fileName || 'Image'}
                            width={300}
                            height={200}
                            className="max-w-full rounded object-cover"
                            style={{ objectFit: 'contain' }}
                          />
                        </div>
                        <p className="text-xs mt-1">{message.fileName}</p>
                      </div>
                    )}
                    {message.type === 'file' && (
                      <div className="p-3">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <a
                                href={message.fileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center space-x-2 hover:underline"
                              >
                                <Paperclip size={16} />
                                <span className="truncate max-w-[200px]">{message.fileName}</span>
                                <Download size={16} />
                              </a>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Download {message.fileName}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    )}
                    <div className={`text-xs px-3 pb-2 ${
                      message.senderId === currentUser.uid ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {formatTime(message.timestamp)}
                      {message.senderId === currentUser.uid && (
                        <span className="ml-2">
                          {message.read ? '✓✓' : '✓'}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        <CardFooter className="p-4 border-t">
          <div className="flex items-center space-x-2 w-full">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                  >
                    <ImageIcon className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Upload image or file</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileUpload}
              accept="image/*,.pdf,.doc,.docx"
            />
            <Input
              value={newMessage}
              onChange={(e) => {
                setNewMessage(e.target.value);
                handleTyping();
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder="Type a message..."
              className="flex-1"
            />
            <Button onClick={handleSendMessage} disabled={!newMessage.trim() || uploading}>
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </CardFooter>
      </Card>

      <Space />
      <Navbar />
    </div>
  );
}