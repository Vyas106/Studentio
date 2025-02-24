"use client";

import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Send, Paperclip, Bot, User, RefreshCw, Menu } from 'lucide-react';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";
interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  attachments?: string[];
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [attachments, setAttachments] = useState<string[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if ((!input.trim() && attachments.length === 0) || isLoading) return;

    try {
      setIsLoading(true);
      setMessages(prev => [...prev, {
        role: 'user',
        content: input,
        timestamp: new Date(),
        attachments: attachments
      }]);
      
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input, attachments }),
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.response,
        timestamp: new Date()
      }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date()
      }]);
    } finally {
      setInput('');
      setAttachments([]);
      setIsLoading(false);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            setAttachments(prev => [...prev, e.target!.result as string]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const MessageSkeleton = () => (
    <div className="flex gap-4 items-start mb-6 px-4">
      <Skeleton className="h-8 w-8 rounded-full bg-neutral-800" />
      <div className="space-y-2 flex-1">
        <Skeleton className="h-4 w-2/3 bg-neutral-800" />
        <Skeleton className="h-4 w-1/2 bg-neutral-800" />
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-black text-white">
      {/* Sidebar - Hidden on mobile */}
      <div className="hidden md:flex md:w-64 lg:w-80 flex-col border-r border-neutral-800 p-4">
        <div className="flex items-center gap-3 mb-8">
          <Bot className="w-8 h-8 text-white" />
          <h1 className="text-xl font-bold">Chat with AI</h1>
        </div>
        <nav className="flex-1">
          {/* Add sidebar navigation items here */}
        </nav>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col h-full">
        {/* Mobile Header */}
        <header className="md:hidden flex items-center gap-3 p-4 border-b border-neutral-800">
          <Button variant="ghost" size="icon" className="text-white">
            <Menu className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-semibold">AI Assistant</h1>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-auto">
          <div className="max-w-3xl mx-auto py-6 space-y-6">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-4 items-start px-4 ${
                  message.role === 'user' ? 'flex-row-reverse' : ''
                }`}
              >
                <Avatar className={`w-8 h-8 ${
                  message.role === 'user' ? 'bg-blue-500' : 'bg-neutral-700'
                }`}>
                  <AvatarFallback>
                    {message.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                  </AvatarFallback>
                </Avatar>
                
                <div className={`flex flex-col gap-2 max-w-[85%] ${
                  message.role === 'user' ? 'items-end' : 'items-start'
                }`}>
                  <div className={`p-4 rounded-2xl ${
                    message.role === 'user' 
                      ? 'bg-blue-600' 
                      : 'bg-neutral-800'
                  }`}>
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  </div>
                  
                  {message.attachments?.map((attachment, i) => (
                   <Image
                   key={i}
                   src={attachment}
  alt="Attached image"
  width={200} // Adjust as needed
  height={200} // Adjust as needed

                  
                   className="max-w-xs rounded-xl"
                 />
                  ))}
                  
                  <span className="text-xs text-neutral-400">
                    {message.timestamp.toLocaleTimeString()}
                  </span>
                </div>
              </div>
            ))}
            
            {isLoading && <MessageSkeleton />}
            <div ref={chatEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="border-t border-neutral-800 p-4">
          <form onSubmit={handleSubmit} className="max-w-3xl mx-auto flex gap-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileInput}
              className="hidden"
              accept="image/*"
              multiple
            />
            
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="text-neutral-400 hover:text-white hover:bg-neutral-800"
              onClick={() => fileInputRef.current?.click()}
            >
              <Paperclip className="w-5 h-5" />
            </Button>

            <div className="flex-1 relative">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Message..."
                className="bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-400 focus:border-neutral-600 focus:ring-0"
                disabled={isLoading}
              />
              {attachments.length > 0 && (
                <div className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {attachments.length}
                </div>
              )}
            </div>

            <Button 
              type="submit" 
              disabled={isLoading}
              className="bg-white text-black hover:bg-neutral-200"
            >
              {isLoading ? (
                <RefreshCw className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}