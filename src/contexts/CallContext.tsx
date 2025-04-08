import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import Peer from 'peerjs';
import { io, Socket } from 'socket.io-client';
import { useAuth } from './AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { v4 as uuidv4 } from 'uuid';

interface Message {
  id: string;
  sender: string;
  senderId: string;
  content: string;
  timestamp: Date;
}

interface CallUser {
  id: string;
  displayName: string;
  photoURL?: string;
}

interface CallLog {
  id: string;
  callerId: string;
  callerName: string;
  receiverId: string;
  receiverName: string;
  startTime: Date;
  endTime?: Date;
  duration?: number; // in seconds
  status: 'completed' | 'missed' | 'rejected';
}

interface CallContextType {
  localStream: MediaStream | null;
  remoteStream: MediaStream | null;
  peerConnection: Peer | null;
  isCalling: boolean;
  isReceivingCall: boolean;
  inCall: boolean;
  callUser: CallUser | null;
  audioEnabled: boolean;
  videoEnabled: boolean;
  callLogs: CallLog[];
  onlineUsers: CallUser[];
  messages: Message[];
  callDuration: number;
  initializeMedia: () => Promise<void>;
  startCall: (userId: string, userName: string) => void;
  answerCall: () => void;
  rejectCall: () => void;
  endCall: () => void;
  toggleAudio: () => void;
  toggleVideo: () => void;
  sendMessage: (content: string) => void;
}

const SOCKET_SERVER_URL = import.meta.env.VITE_SOCKET_SERVER_URL || 'http://localhost:5000';

const CallContext = createContext<CallContextType | null>(null);

export const useCall = () => {
  const context = useContext(CallContext);
  if (!context) {
    throw new Error('useCall must be used within a CallProvider');
  }
  return context;
};

export const CallProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  
  // Streams
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  
  // WebRTC and Socket.io
  const peerRef = useRef<Peer | null>(null);
  const socketRef = useRef<Socket | null>(null);
  const currentCallRef = useRef<any | null>(null);
  
  // Call State
  const [isCalling, setIsCalling] = useState(false);
  const [isReceivingCall, setIsReceivingCall] = useState(false);
  const [inCall, setInCall] = useState(false);
  const [callUser, setCallUser] = useState<CallUser | null>(null);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [callLogs, setCallLogs] = useState<CallLog[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<CallUser[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [callDuration, setCallDuration] = useState(0);
  const callTimerRef = useRef<number | null>(null);
  
  useEffect(() => {
    if (!currentUser) return;
    
    // Connect to socket server
    const socket = io(SOCKET_SERVER_URL);
    socketRef.current = socket;
    
    // Setup socket event listeners
    socket.emit('user:connect', {
      id: currentUser.uid,
      displayName: currentUser.displayName,
      photoURL: currentUser.photoURL
    });
    
    socket.on('users:online', (users) => {
      // Filter out current user from online users list
      const filteredUsers = users.filter((user: CallUser) => user.id !== currentUser.uid);
      setOnlineUsers(filteredUsers);
      
      // Refresh socket connection to ensure accurate online status
      socket.emit('user:refresh', {
        id: currentUser.uid,
        displayName: currentUser.displayName,
        photoURL: currentUser.photoURL
      });
    });
    
    socket.on('call:incoming', (data) => {
      if (inCall) {
        // Already in a call, reject this one automatically
        socket.emit('call:rejected', { to: data.from, from: currentUser.uid });
        return;
      }
      
      setCallUser({
        id: data.from,
        displayName: data.fromName,
        photoURL: data.fromPhoto
      });
      setIsReceivingCall(true);
      
      // Show toast notification
      toast({
        title: "Incoming Call",
        description: `${data.fromName} is calling you`,
        duration: 10000,
      });
    });
    
    socket.on('call:accepted', async (data) => {
      toast({
        title: "Call Accepted",
        description: `${data.fromName} has accepted your call`,
      });
      setInCall(true);
      setIsCalling(false);
      startCallTimer();
    });
    
    socket.on('call:rejected', (data) => {
      toast({
        title: "Call Rejected",
        description: `${data.fromName} has rejected your call`,
        variant: "destructive",
      });
      
      // Add to call logs
      addCallLog({
        callerId: currentUser.uid,
        callerName: currentUser.displayName || "Unknown",
        receiverId: data.from,
        receiverName: data.fromName,
        status: 'rejected'
      });
      
      resetCallState();
    });
    
    socket.on('call:ended', () => {
      toast({
        title: "Call Ended",
        description: "The call has been ended",
      });
      
      endCallInternal('completed');
    });
    
    socket.on('message:received', (message) => {
      setMessages(prev => [...prev, {
        ...message,
        timestamp: new Date(message.timestamp)
      }]);
    });
    
    return () => {
      socket.disconnect();
      socketRef.current = null;
      
      // Clean up peer connection
      if (peerRef.current) {
        peerRef.current.destroy();
        peerRef.current = null;
      }
      
      // Stop all media tracks
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
      }
      
      // Clear call timer
      if (callTimerRef.current) {
        window.clearInterval(callTimerRef.current);
      }
    };
  }, [currentUser]);
  
  const startCallTimer = () => {
    if (callTimerRef.current) {
      window.clearInterval(callTimerRef.current);
    }
    
    setCallDuration(0);
    callTimerRef.current = window.setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);
  };
  
  const addCallLog = (callData: Omit<CallLog, 'id' | 'startTime' | 'endTime' | 'duration'>) => {
    const newLog: CallLog = {
      id: uuidv4(),
      startTime: new Date(),
      ...callData
    };
    
    if (callData.status !== 'completed') {
      newLog.endTime = new Date();
      newLog.duration = 0;
    }
    
    setCallLogs(prev => [newLog, ...prev]);
    
    // TODO: Save call log to database via API
  };
  
  const initializeMedia = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });
      
      setLocalStream(stream);
      
      // Initialize peer connection
      if (!currentUser) return;
      
      const peer = new Peer(currentUser.uid);
      peerRef.current = peer;
      
      peer.on('open', (id) => {
        console.log('My peer ID is: ' + id);
      });
      
      peer.on('call', (call) => {
        // Only answer if we're expecting the call
        if (isReceivingCall && callUser) {
          call.answer(stream);
          currentCallRef.current = call;
          
          call.on('stream', (remoteStream) => {
            setRemoteStream(remoteStream);
          });
          
          call.on('close', () => {
            endCallInternal('completed');
          });
          
          call.on('error', (err) => {
            console.error('Call error:', err);
            endCallInternal('missed');
          });
        } else {
          call.close();
        }
      });
      
      toast({
        title: "Media initialized",
        description: "Camera and microphone are now active",
      });
    } catch (error: any) {
      console.error("Media initialization error:", error);
      toast({
        title: "Media error",
        description: error.message || "Could not access camera or microphone",
        variant: "destructive"
      });
    }
  };
  
  const startCall = (userId: string, userName: string) => {
    if (!peerRef.current || !localStream || !socketRef.current || !currentUser) {
      toast({
        title: "Call error",
        description: "Media not initialized. Please try again.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setCallUser({
        id: userId,
        displayName: userName
      });
      setIsCalling(true);
      
      // Signal the receiving user via socket
      socketRef.current.emit('call:request', {
        to: userId,
        from: currentUser.uid,
        fromName: currentUser.displayName,
        fromPhoto: currentUser.photoURL
      });
      
      // Start the peer call but keep it ready until user answers
      const call = peerRef.current.call(userId, localStream);
      currentCallRef.current = call;
      
      call.on('stream', (remoteStream) => {
        setRemoteStream(remoteStream);
      });
      
      call.on('close', () => {
        endCallInternal('completed');
      });
      
      call.on('error', (err) => {
        console.error('Call error:', err);
        endCallInternal('missed');
        toast({
          title: "Call error",
          description: "There was a problem connecting to the other user",
          variant: "destructive"
        });
      });
    } catch (error) {
      console.error("Error starting call:", error);
      setIsCalling(false);
      toast({
        title: "Call failed",
        description: "Could not start the call. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  const answerCall = () => {
    if (!socketRef.current || !currentUser || !callUser) return;
    
    setIsReceivingCall(false);
    setInCall(true);
    startCallTimer();
    
    // Signal to caller that we've accepted
    socketRef.current.emit('call:accepted', {
      to: callUser.id,
      from: currentUser.uid,
      fromName: currentUser.displayName
    });
  };
  
  const rejectCall = () => {
    if (!socketRef.current || !currentUser || !callUser) return;
    
    // Signal to caller that we've rejected
    socketRef.current.emit('call:rejected', {
      to: callUser.id,
      from: currentUser.uid,
      fromName: currentUser.displayName
    });
    
    // Add to call logs
    addCallLog({
      callerId: callUser.id,
      callerName: callUser.displayName || "Unknown",
      receiverId: currentUser.uid,
      receiverName: currentUser.displayName || "Unknown",
      status: 'rejected'
    });
    
    resetCallState();
  };
  
  const endCall = () => {
    if (!socketRef.current || !currentUser || !callUser) return;
    
    // Signal to other peer that we're ending the call
    socketRef.current.emit('call:ended', {
      to: callUser.id,
      from: currentUser.uid,
    });
    
    endCallInternal('completed');
  };
  
  const endCallInternal = (status: 'completed' | 'missed' | 'rejected') => {
    // Stop the call timer
    if (callTimerRef.current) {
      window.clearInterval(callTimerRef.current);
      callTimerRef.current = null;
    }
    
    if (inCall && currentUser && callUser) {
      // Add to call logs
      addCallLog({
        callerId: isCalling ? currentUser.uid : callUser.id,
        callerName: isCalling ? currentUser.displayName || "Unknown" : callUser.displayName,
        receiverId: isCalling ? callUser.id : currentUser.uid,
        receiverName: isCalling ? callUser.displayName : currentUser.displayName || "Unknown",
        status,
      });
      
      // Update the last call log with end time and duration
      if (status === 'completed') {
        setCallLogs(prev => {
          const updated = [...prev];
          if (updated[0]) {
            updated[0] = {
              ...updated[0],
              endTime: new Date(),
              duration: callDuration
            };
          }
          return updated;
        });
      }
    }
    
    // Close the peer connection if it exists
    if (currentCallRef.current) {
      currentCallRef.current.close();
      currentCallRef.current = null;
    }
    
    resetCallState();
  };
  
  const resetCallState = () => {
    setIsCalling(false);
    setIsReceivingCall(false);
    setInCall(false);
    setCallUser(null);
    setRemoteStream(null);
    setCallDuration(0);
    setMessages([]);
  };
  
  const toggleAudio = () => {
    if (!localStream) return;
    
    const audioTrack = localStream.getAudioTracks()[0];
    if (audioTrack) {
      audioTrack.enabled = !audioTrack.enabled;
      setAudioEnabled(audioTrack.enabled);
    }
  };
  
  const toggleVideo = () => {
    if (!localStream) return;
    
    const videoTrack = localStream.getVideoTracks()[0];
    if (videoTrack) {
      videoTrack.enabled = !videoTrack.enabled;
      setVideoEnabled(videoTrack.enabled);
    }
  };
  
  const sendMessage = (content: string) => {
    if (!socketRef.current || !currentUser || !callUser || !content.trim()) return;
    
    const messageData = {
      id: uuidv4(),
      sender: currentUser.displayName || "You",
      senderId: currentUser.uid,
      content,
      timestamp: new Date()
    };
    
    // Add message to local state
    setMessages(prev => [...prev, messageData]);
    
    // Send message via socket
    socketRef.current.emit('message:send', {
      ...messageData,
      to: callUser.id
    });
  };
  
  const value = {
    localStream,
    remoteStream,
    peerConnection: peerRef.current,
    isCalling,
    isReceivingCall,
    inCall,
    callUser,
    audioEnabled,
    videoEnabled,
    callLogs,
    onlineUsers,
    messages,
    callDuration,
    initializeMedia,
    startCall,
    answerCall,
    rejectCall,
    endCall,
    toggleAudio,
    toggleVideo,
    sendMessage
  };
  
  return (
    <CallContext.Provider value={value}>
      {children}
    </CallContext.Provider>
  );
};
