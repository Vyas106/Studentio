
  // // components/chat/ChatList.tsx
  // "use client";
  
  // import { useEffect, useState } from 'react';
  // import { useRouter } from 'next/navigation';
  // import { auth, db } from '@/lib/firebase';
  // import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';
  // import { Avatar } from '@/components/ui/avatar';
  // import { formatDistanceToNow } from 'date-fns';
  // import type { ChatRoom } from './../../../../types/user';
  
  // export function ChatList() {
  //   const router = useRouter();
  //   const [chats, setChats] = useState<ChatRoom[]>([]);
  //   const [loading, setLoading] = useState(true);
  
  //   useEffect(() => {
  //     const currentUser = auth.currentUser;
  //     if (!currentUser) return;
  
  //     const q = query(
  //       collection(db, 'chatRooms'),
  //       where('participants', 'array-contains', currentUser.uid),
  //       orderBy('updatedAt', 'desc')
  //     );
  
  //     const unsubscribe = onSnapshot(q, (snapshot) => {
  //       const chatRooms: ChatRoom[] = [];
  //       snapshot.forEach((doc) => {
  //         chatRooms.push({ id: doc.id, ...doc.data() } as ChatRoom);
  //       });
  //       setChats(chatRooms);
  //       setLoading(false);
  //     });
  
  //     return () => unsubscribe();
  //   }, []);
  
  //   if (loading) return <div>Loading...</div>;
  
  //   return (
  //     <div className="h-full bg-white dark:bg-gray-800">
  //       {chats.map((chat) => {
  //         const otherParticipant = chat.participants.find(
  //           p => p.id !== auth.currentUser?.uid
  //         );
  
  //         return (
  //           <div
  //             key={chat.id}
  //             onClick={() => router.push(`/chatroom/${chat.id}`)}
  //             className="flex items-center p-4 border-b hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
  //           >
  //             <Avatar
  //               // src={otherParticipant?.avatar}
  //               // alt={otherParticipant?.name}
  //               className="w-12 h-12"
  //             />
  //             <div className="ml-4 flex-1">
  //               <div className="flex justify-between items-center">
  //                 <h3 className="font-medium">{otherParticipant?.name}</h3>
  //                 <span className="text-sm text-gray-500">
  //                   {formatDistanceToNow(chat.updatedAt, { addSuffix: true })}
  //                 </span>
  //               </div>
  //               <div className="flex justify-between items-center">
  //                 <p className="text-sm text-gray-500 truncate max-w-[200px]">
  //                   {chat.lastMessage?.content}
  //                 </p>
  //                 {/* {chat.unreadCount > 0 && (
  //                   <span className="bg-blue-500 text-white rounded-full px-2 py-1 text-xs">
  //                     {chat.unreadCount}
  //                   </span>
  //                 )} */}
  //               </div>
  //             </div>
  //           </div>
  //         );
  //       })}
  //     </div>
  //   );
  // }

  "use client"

  import React, { useEffect, useState } from 'react';
import { db, collection, query, where, getDocs, doc, getDoc } from './../../../lib/firebase'; // Import your Firebase utilities
import { User, ChatRoom } from './../../../../types/user'; // Import interfaces

const ChatList: React.FC = () => {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('authUser') || '{}');
    if (!currentUser || !currentUser.uid) {
      return;
    }

    const fetchChatRooms = async () => {
      const q = query(
        collection(db, 'chatRooms'),
        where('participants', 'array-contains', currentUser.uid)
      );

      const querySnapshot = await getDocs(q);
      const chatRoomsData: ChatRoom[] = [];
      querySnapshot.forEach((doc) => {
        chatRoomsData.push({ id: doc.id, ...doc.data() } as ChatRoom);
      });

      setChatRooms(chatRoomsData);
      fetchParticipants(chatRoomsData, currentUser.uid);
    };

    fetchChatRooms();
  }, []);

  const fetchParticipants = async (chatRoomsData: ChatRoom[], currentUserId: string) => {
    const participants: User[] = [];
    for (let room of chatRoomsData) {
      const otherParticipantId = room.participants.find(
        (id) => id !== currentUserId
      );
      if (otherParticipantId) {
        const userDetails = await fetchUserDetails(otherParticipantId);
        participants.push(userDetails);
      }
    }

    setUsers(participants);
  };

  const fetchUserDetails = async (userId: string): Promise<User> => {
    const userRef = doc(db, 'users', userId);
    const userSnapshot = await getDoc(userRef);
    
    if (!userSnapshot.exists()) {
      throw new Error('User not found');
    }

    const userData = userSnapshot.data();
    return {
      userId,
      email: userData?.email || '',
      displayName: userData?.displayName || 'Unknown User',
      avatarUrl: userData?.avatarUrl || '', // Add default avatar if not available
    };
  };

  return (
    <div>
      <h2>Chat List</h2>
      <ul>
        {users.map((user) => (
          <li key={user.userId}>
            <div>
              <img src={user.avatarUrl} alt={user.displayName} style={{ width: '40px', borderRadius: '50%' }} />
              <h3>{user.displayName}</h3>
              <p>{user.displayName} ({user.email})</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;

  
