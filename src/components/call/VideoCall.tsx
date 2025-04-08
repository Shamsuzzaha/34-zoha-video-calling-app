
import React, { useRef, useEffect } from 'react';
import { useCall } from '@/contexts/CallContext';
import CallControls from './CallControls';
import ChatPanel from './ChatPanel';
import CallerInfo from './CallerInfo';
import { Card } from '@/components/ui/card';

const VideoCall: React.FC = () => {
  const { 
    localStream, 
    remoteStream, 
    inCall, 
    callUser, 
    isCalling,
    callDuration,
    videoEnabled
  } = useCall();
  
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  
  useEffect(() => {
    if (localVideoRef.current && localStream) {
      localVideoRef.current.srcObject = localStream;
    }
  }, [localStream]);
  
  useEffect(() => {
    if (remoteVideoRef.current && remoteStream) {
      remoteVideoRef.current.srcObject = remoteStream;
    }
  }, [remoteStream]);
  
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  if (!inCall && !isCalling) {
    return null;
  }
  
  return (
    <div className="flex h-full flex-col xl:flex-row gap-4">
      <div className="flex-1">
        <div className="video-container bg-gray-900 rounded-lg overflow-hidden relative">
          {/* Remote Video (or loading state if not connected yet) */}
          {remoteStream ? (
            <video
              ref={remoteVideoRef}
              autoPlay
              playsInline
              className="video-element"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                {isCalling ? (
                  <>
                    <div className="mb-2 flex justify-center">
                      <div className="h-16 w-16 rounded-full bg-telezyne-purple/20 flex items-center justify-center">
                        <div className="h-12 w-12 rounded-full bg-telezyne-purple/40 flex items-center justify-center pulse-dot relative text-telezyne-purple">
                          <div className="h-8 w-8 rounded-full bg-telezyne-purple flex items-center justify-center">
                            <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                    <h3 className="text-lg font-medium">Calling {callUser?.displayName}</h3>
                    <p className="text-sm text-gray-300 mt-1">Please wait while we connect you...</p>
                  </>
                ) : (
                  <div className="text-lg">Starting call...</div>
                )}
              </div>
            </div>
          )}
          
          {/* Local video (small) */}
          <div className="local-video overflow-hidden">
            <video
              ref={localVideoRef}
              autoPlay
              playsInline
              muted
              className={`object-cover w-full h-full ${!videoEnabled ? 'hidden' : ''}`}
            />
            {!videoEnabled && (
              <div className="w-full h-full flex items-center justify-center bg-gray-800">
                <span className="text-white text-xs">Camera Off</span>
              </div>
            )}
          </div>
          
          {/* Call duration */}
          {inCall && (
            <div className="absolute top-4 left-4 bg-black/40 text-white px-3 py-1 rounded-full text-sm">
              {formatDuration(callDuration)}
            </div>
          )}
          
          {/* Caller info (name and avatar) */}
          <CallerInfo />
          
          {/* Call controls */}
          <CallControls />
        </div>
      </div>
      
      {/* Chat panel - only show when in call */}
      {inCall && (
        <Card className="w-full xl:w-80 flex flex-col h-[400px] xl:h-auto">
          <ChatPanel />
        </Card>
      )}
    </div>
  );
};

export default VideoCall;
