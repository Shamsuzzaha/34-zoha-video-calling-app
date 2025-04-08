
import React from 'react';
import { useCall } from '@/contexts/CallContext';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const CallerInfo: React.FC = () => {
  const { callUser, inCall } = useCall();
  
  if (!inCall || !callUser) return null;
  
  return (
    <div className="absolute top-4 right-4 flex items-center gap-2 bg-black/40 px-3 py-1.5 rounded-full">
      <Avatar className="h-6 w-6 border border-white/50">
        <AvatarImage src={callUser.photoURL} alt={callUser.displayName} />
        <AvatarFallback className="text-xs">
          {callUser.displayName?.substring(0, 1) || '?'}
        </AvatarFallback>
      </Avatar>
      <span className="text-white text-sm font-medium">{callUser.displayName}</span>
    </div>
  );
};

export default CallerInfo;
