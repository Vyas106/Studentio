
// context/ChatContext.tsx
import { createContext, useContext, useEffect, useState } from 'react';
import { db, auth } from '@/lib/firebase';
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  createdAt: number;
}

interface ChatContextType {
  messages: Message[];
  sendMessage: (receiverId: string, content: string) => Promise<void>;
  activeChat: string | null;
  setActiveChat: (userId: string | null) => void;
}

const ChatContext = createContext<ChatContextType | null>(null);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [activeChat, setActiveChat] = useState<string | null>(null);

  useEffect(() => {
    if (!auth.currentUser || !activeChat) return;

    const q = query(
      collection(db, "messages"),
      where("participants", "array-contains", auth.currentUser.uid),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newMessages: Message[] = [];
      snapshot.forEach((doc) => {
        newMessages.push({ id: doc.id, ...doc.data() } as Message);
      });
      setMessages(newMessages);
    });

    return () => unsubscribe();
  }, [activeChat]);

  const sendMessage = async (receiverId: string, content: string) => {
    if (!auth.currentUser) return;

    try {
      await addDoc(collection(db, "messages"), {
        senderId: auth.currentUser.uid,
        receiverId,
        content,
        createdAt: serverTimestamp(),
        participants: [auth.currentUser.uid, receiverId]
      });
    } catch (error) {
      console.error("Error sending message:", error);
      throw error;
    }
  };

  return (
    <ChatContext.Provider value={{ messages, sendMessage, activeChat, setActiveChat }}>
      {children}
    </ChatContext.Provider>
  );
}

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
