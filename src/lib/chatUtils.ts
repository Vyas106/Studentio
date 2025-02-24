
  
//   // lib/chatUtils.ts
//   import { ref, onValue, set, serverTimestamp } from 'firebase/database';
//   import { auth, realtimeDb, } from './firebase';
// import { useEffect, useState } from 'react';
  
//   export const markMessageAsSeen = async (chatId: string, messageId: string) => {
//     const messageRef = ref(realtimeDb, `chats/${chatId}/messages/${messageId}`);
//     await set(messageRef, { status: 'seen' });
//   };
  
//   export const updateTypingStatus = async (chatId: string, userId: string, isTyping: boolean) => {
//     const typingRef = ref(realtimeDb, `chats/${chatId}/typing/${userId}`);
//     await set(typingRef, isTyping);
//   };
  
//   export const updateOnlineStatus = async (userId: string, status: boolean) => {
//     const userStatusRef = ref(realtimeDb, `status/${userId}`);
//     await set(userStatusRef, {
//       state: status ? 'online' : 'offline',
//       lastChanged: serverTimestamp(),
//     });
//   };
  
  