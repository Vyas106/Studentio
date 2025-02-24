// components/chat/ChatList.tsx
  "use client";
  
  import { useEffect, useState } from 'react';
  import { useRouter } from 'next/navigation';
  import { collection, query, where, orderBy, onSnapshot, updateDoc, doc } from 'firebase/firestore';
  import { db, auth } from '@/lib/firebase';
  import { Input } from '@/components/ui/input';
  import { Button } from '@/components/ui/button';
  import { ChatRoom } from './../../../types/user';
  import { PinIcon, ArchiveIcon, SearchIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { formatDistanceToNow } from 'date-fns';
  
  export function ChatList() {
    const router = useRouter();
    const [chats, setChats] = useState<ChatRoom[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const currentUser = auth.currentUser;
  
    useEffect(() => {
      if (!currentUser) return;
  
      const q = query(
        collection(db, 'chatRooms'),
        where('participants', 'array-contains', { id: currentUser.uid }),
        orderBy('updatedAt', 'desc')
      );
  
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const chatRooms: ChatRoom[] = [];
        snapshot.forEach((doc) => {
          chatRooms.push({ id: doc.id, ...doc.data() } as ChatRoom);
        });
        
        // Sort chats: pinned first, then by last message timestamp
        const sortedChats = chatRooms.sort((a, b) => {
          if (a.pinned && !b.pinned) return -1;
          if (!a.pinned && b.pinned) return 1;
          return b.updatedAt - a.updatedAt;
        });
  
        setChats(sortedChats);
      });
  
      return () => unsubscribe();
    }, [currentUser]);
  
    const filteredChats = chats.filter(chat => {
      const otherParticipant = chat.participants.find(p => p.id !== currentUser?.uid);
      return (
        otherParticipant?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        chat.lastMessage?.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  
    const handlePinChat = async (chatId: string, isPinned: boolean) => {
      await updateDoc(doc(db, 'chatRooms', chatId), {
        pinned: !isPinned
      });
    };
  
    const handleArchiveChat = async (chatId: string, isArchived: boolean) => {
      await updateDoc(doc(db, 'chatRooms', chatId), {
        archived: !isArchived
      });
    };
  
    return (
      <div className="h-full bg-white dark:bg-gray-800">
        <div className="p-4 border-b">
          <div className="flex items-center space-x-2">
            <Input
              placeholder="Search chats..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
              leftIcon={<SearchIcon className="w-4 h-4" />}
            />
          </div>
        </div>
  
        <div className="divide-y">
          {filteredChats.map((chat) => {
            const otherParticipant = chat.participants.find(
              p => p.id !== currentUser?.uid
            );
  
            if (!otherParticipant) return null;
  
            return (
              <div
                key={chat.id}
                className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                onClick={() => router.push(`/chatroom/${chat.id}`)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={otherParticipant.photoURL} />
                      <AvatarFallback>{otherParticipant.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-medium">{otherParticipant.name}</h3>
                        {otherParticipant.isOnline && (
                          <span className="w-2 h-2 bg-green-500 rounded-full" />
                        )}
                      </div>
                      <p className="text-sm text-gray-500 truncate max-w-[200px]">
                        {chat.lastMessage?.content}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-1">
                    <span className="text-xs text-gray-500">
                      {formatDistanceToNow(chat.updatedAt, { addSuffix: true })}
                    </span>
                    {chat.unreadCount[currentUser.uid] > 0 && (
                      <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                        {chat.unreadCount[currentUser.uid]}
                      </span>
                    )}
                    <div className="flex space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePinChat(chat.id, !!chat.pinned);
                        }}
                      >
                        <PinIcon
                          className={`w-4 h-4 ${chat.pinned ? 'text-blue-500' : ''}`}
                        />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleArchiveChat(chat.id, !!chat.archived);
                        }}
                      >
                        <ArchiveIcon
                          className={`w-4 h-4 ${chat.archived ? 'text-blue-500' : ''}`}
                        />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
  