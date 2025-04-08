
import React from 'react';
import { useCall } from '@/contexts/CallContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { PhoneCall, PhoneOff } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
} from '@/components/ui/dialog';

const IncomingCallModal: React.FC = () => {
  const { isReceivingCall, callUser, answerCall, rejectCall } = useCall();
  
  if (!isReceivingCall || !callUser) return null;
  
  return (
    <Dialog open={isReceivingCall} onOpenChange={() => {}}>
      <DialogContent className="incoming-call-modal">
        <DialogHeader>
          <DialogTitle className="text-center">Incoming Call</DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col items-center justify-center gap-4 py-6">
          <div className="h-24 w-24 rounded-full bg-telezyne-purple/10 flex items-center justify-center">
            <div className="h-20 w-20 rounded-full bg-telezyne-purple/20 flex items-center justify-center relative pulse-dot text-telezyne-purple">
              <Avatar className="h-16 w-16 border-2 border-white">
                <AvatarImage src={callUser.photoURL} alt={callUser.displayName} />
                <AvatarFallback className="text-xl bg-telezyne-purple text-white">
                  {callUser.displayName?.substring(0, 1) || '?'}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold">{callUser.displayName}</h3>
            <p className="text-gray-600">is calling you</p>
          </div>
        </div>
        
        <div className="flex justify-center gap-6">
          <Button
            variant="outline"
            size="icon"
            className="h-14 w-14 rounded-full border-red-500 hover:bg-red-50 hover:text-red-600"
            onClick={rejectCall}
          >
            <PhoneOff className="h-6 w-6 text-red-500" />
          </Button>
          
          <Button
            size="icon"
            className="h-14 w-14 rounded-full bg-green-600 hover:bg-green-700"
            onClick={answerCall}
          >
            <PhoneCall className="h-6 w-6" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default IncomingCallModal;
