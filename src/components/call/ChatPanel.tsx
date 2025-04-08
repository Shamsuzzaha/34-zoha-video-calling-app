
import React, { useState, useRef, useEffect } from 'react';
import { useCall } from '@/contexts/CallContext';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { ScrollArea } from '@/components/ui/scroll-area';
import { format } from 'timeago.js';

const ChatPanel: React.FC = () => {
  const [message, setMessage] = useState('');
  const { messages, sendMessage } = useCall();
  const { currentUser } = useAuth();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    sendMessage(message);
    setMessage('');
  };
  
  return (
    <>
      <div className="p-3 border-b font-medium">
        Chat
      </div>
      
      <ScrollArea className="flex-1 p-3">
        <div className="flex flex-col gap-3">
          {messages.length === 0 ? (
            <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
              No messages yet
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start gap-2 ${
                  msg.senderId === currentUser?.uid ? 'flex-row-reverse' : ''
                }`}
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src={undefined} alt={msg.sender} />
                  <AvatarFallback className="text-xs bg-telezyne-purple text-white">
                    {msg.sender.substring(0, 1).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                
                <div
                  className={`max-w-[75%] rounded-lg px-3 py-2 ${
                    msg.senderId === currentUser?.uid
                      ? 'bg-telezyne-blue text-white'
                      : 'bg-gray-100'
                  }`}
                >
                  <div className="flex items-baseline gap-2">
                    <span className="font-medium text-sm">
                      {msg.senderId === currentUser?.uid ? 'You' : msg.sender}
                    </span>
                    <span className="text-xs opacity-70">
                      {format(msg.timestamp)}
                    </span>
                  </div>
                  <p className="text-sm mt-1">{msg.content}</p>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      
      <form onSubmit={handleSubmit} className="border-t p-3 flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 py-2 px-3 rounded-md border focus:outline-none focus:ring-1 focus:ring-telezyne-blue"
        />
        <Button type="submit" size="icon" className="bg-telezyne-purple hover:bg-telezyne-purple/90">
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </>
  );
};

export default ChatPanel;
