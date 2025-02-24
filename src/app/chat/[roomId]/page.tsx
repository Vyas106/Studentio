
// // app/chat/[roomId]/page.tsx
// "use client";

// import { useEffect, useState, useRef } from 'react';
// import { useParams } from 'next/navigation';
// import { ref, onValue, push, update } from 'firebase/database';
// import { realtimeDb, auth } from '@/lib/firebase';
// import { Message, ChatRoom } from '../../../../types/user';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { cloudinary } from '../../../lib/cloudinary';

// export default function ChatPage() {
//   const params = useParams();
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [newMessage, setNewMessage] = useState('');
//   const [uploading, setUploading] = useState(false);
//   const messagesEndRef = useRef<HTMLDivElement>(null);
//   const currentUser = auth.currentUser;

//   useEffect(() => {
//     if (!params.roomId || !currentUser) return;

//     const messagesRef = ref(realtimeDb, `chats/${params.roomId}/messages`);
//     const unsubscribe = onValue(messagesRef, (snapshot) => {
//       const data = snapshot.val();
//       if (data) {
//         const messageList = Object.entries(data).map(([id, message]: [string, any]) => ({
//           id,
//           ...message,
//         }));
//         setMessages(messageList);
//         // Update message status to 'seen' for received messages
//         messageList.forEach((message) => {
//           if (message.senderId !== currentUser.uid && message.status !== 'seen') {
//             update(ref(realtimeDb, `chats/${params.roomId}/messages/${message.id}`), {
//               status: 'seen'
//             });
//           }
//         });
//       }
//     });

//     return () => unsubscribe();
//   }, [params.roomId, currentUser]);

//   const handleSendMessage = async () => {
//     if (!newMessage.trim() || !currentUser || !params.roomId) return;

//     const messageRef = ref(realtimeDb, `chats/${params.roomId}/messages`);
//     const message: Omit<Message, 'id'> = {
//       content: newMessage,
//       senderId: currentUser.uid,
//       receiverId: params.roomId.replace(currentUser.uid, ''),
//       timestamp: Date.now(),
//       status: 'sent'
//     };

//     await push(messageRef, message);
//     setNewMessage('');
//   };

//   const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (!file || !currentUser || !params.roomId) return;

//     setUploading(true);
//     try {
//       const formData = new FormData();
//       formData.append('file', file);
//       formData.append('upload_preset', 'chat_media');

//       const response = await fetch(
//         `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`,
//         {
//           method: 'POST',
//           body: formData
//         }
//       );

//       const data = await response.json();
//       const messageRef = ref(realtimeDb, `chats/${params.roomId}/messages`);
//       const message: Omit<Message, 'id'> = {
//         content: '',
//         senderId: currentUser.uid,
//         receiverId: params.roomId.replace(currentUser.uid, ''),
//         timestamp: Date.now(),
//         status: 'sent',
//         mediaUrl: data.secure_url,
//         mediaType: file.type.startsWith('image/') ? 'image' : 'video'
//       };

//       await push(messageRef, message);
//     } catch (error) {
//       console.error('Error uploading file:', error);
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto h-screen flex flex-col">
//       <div className="flex-1 overflow-y-auto p-4 space-y-4">
//         {messages.map((message) => (
//           <div
//             key={message.id}
//             className={`flex ${
//               message.senderId === currentUser?.uid ? 'justify-end' : 'justify-start'
//             }`}
//           >
//             <div
//               className={`max-w-[70%] p-3 rounded-lg ${
//                 message.senderId === currentUser?.uid
//                   ? 'bg-blue-500 text-white'
//                   : 'bg-gray-200'
//               }`}
//             >
//               {message.mediaUrl && (
//                 message.mediaType === 'image' ? (
//                   <img
//                     src={message.mediaUrl}
//                     alt="Shared media"
//                     className="max-w-full rounded-lg mb-2"
//                   />
//                 ) : (
//                   <video
//                     src={message.mediaUrl}
//                     controls
//                     className="max-w-full rounded-lg mb-2"
//                   />
//                 )
//               )}
//               <p>{message.content}</p>
//               <span className="text-xs opacity-75">
//                 {message.status === 'seen' ? '✓✓' : message.status === 'delivered' ? '✓✓' : '✓'}
//               </span>
//             </div>
//           </div>
//         ))}
//         <div ref={messagesEndRef} />
//       </div>
//       <div className="p-4 border-t">
//         <div className="flex space-x-2">
//           <Input
//             type="file"
//             accept="image/*,video/*"
//             onChange={handleFileUpload}
//             disabled={uploading}
//             className="hidden"
//             id="media-upload"
//           />
//           <label htmlFor="media-upload">
//             <Button variant="outline" disabled={uploading} asChild>
//               <span>{uploading ? 'Uploading...' : 'Share Media'}</span>
//             </Button>
//           </label>
//           <Input
//             value={newMessage}
//             onChange={(e) => setNewMessage(e.target.value)}
//             placeholder="Type a message..."
//             onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
//           />
//           <Button onClick={handleSendMessage}>Send</Button>
//         </div>
//       </div>
//     </div>
//   );
// }