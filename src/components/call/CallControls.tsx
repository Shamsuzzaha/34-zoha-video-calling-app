
import React from 'react';
import { useCall } from '@/contexts/CallContext';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Video, VideoOff, PhoneOff, MessageCircle } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface ControlButtonProps {
  icon: React.ReactNode;
  onClick: () => void;
  label: string;
  variant?: 'default' | 'destructive' | 'outline';
}

const ControlButton: React.FC<ControlButtonProps> = ({ 
  icon, 
  onClick, 
  label,
  variant = 'default'
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={onClick}
            variant={variant}
            size="icon"
            className="rounded-full w-12 h-12 shadow-md"
          >
            {icon}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const CallControls: React.FC = () => {
  const { 
    audioEnabled, 
    videoEnabled, 
    toggleAudio, 
    toggleVideo, 
    endCall 
  } = useCall();
  
  return (
    <div className="call-controls">
      <ControlButton
        icon={audioEnabled ? <Mic /> : <MicOff />}
        onClick={toggleAudio}
        label={audioEnabled ? 'Mute Microphone' : 'Unmute Microphone'}
        variant={audioEnabled ? 'default' : 'outline'}
      />
      
      <ControlButton
        icon={videoEnabled ? <Video /> : <VideoOff />}
        onClick={toggleVideo}
        label={videoEnabled ? 'Turn Off Camera' : 'Turn On Camera'}
        variant={videoEnabled ? 'default' : 'outline'}
      />
      
      <ControlButton
        icon={<PhoneOff />}
        onClick={endCall}
        label="End Call"
        variant="destructive"
      />
    </div>
  );
};

export default CallControls;
