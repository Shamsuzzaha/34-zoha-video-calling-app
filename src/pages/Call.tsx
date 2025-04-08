
import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import { useCall } from '@/contexts/CallContext';
import VideoCall from '@/components/call/VideoCall';
import IncomingCallModal from '@/components/call/IncomingCallModal';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Video } from 'lucide-react';

const Call: React.FC = () => {
  const { onlineUsers, startCall, inCall, isCalling } = useCall();
  const [searchParams] = useSearchParams();
  
  const userId = searchParams.get('userId');
  const userName = searchParams.get('userName');
  
  useEffect(() => {
    // If URL has userId and userName parameters, start a call automatically
    if (userId && userName && !inCall && !isCalling) {
      startCall(userId, userName);
    }
  }, [userId, userName, inCall, isCalling]);
  
  return (
    <AppLayout>
      <div className="container">
        <IncomingCallModal />
        
        {(inCall || isCalling) ? (
          <VideoCall />
        ) : (
          <>
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-2">Video Call</h1>
              <p className="text-gray-600">
                Connect with your contacts through high-quality video calls
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Online Users</CardTitle>
                    <CardDescription>Select a user to start a video call</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {onlineUsers.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {onlineUsers.map((user) => (
                          <Card key={user.id} className="overflow-hidden">
                            <div className="p-4 flex items-center gap-4">
                              <Avatar className="h-14 w-14">
                                <AvatarImage src={user.photoURL} alt={user.displayName} />
                                <AvatarFallback className="bg-telezyne-purple text-white">
                                  {user.displayName.substring(0, 1)}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <h3 className="font-semibold">{user.displayName}</h3>
                                <div className="flex items-center gap-1 text-green-600 text-xs mt-1">
                                  <span className="h-2 w-2 bg-green-500 rounded-full"></span>
                                  <span>Online</span>
                                </div>
                              </div>
                              <Button 
                                className="bg-telezyne-blue"
                                onClick={() => startCall(user.id, user.displayName)}
                              >
                                <Video className="h-4 w-4 mr-2" />
                                Call
                              </Button>
                            </div>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 text-gray-500">
                        <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-gray-100 mb-4">
                          <Video className="h-8 w-8 text-gray-400" />
                        </div>
                        <p className="text-lg font-medium mb-1">No users online</p>
                        <p className="text-sm">
                          Wait for other users to come online or check back later
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>How It Works</CardTitle>
                    <CardDescription>Simple steps to make video calls</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex gap-3">
                        <div className="h-8 w-8 rounded-full bg-telezyne-blue/10 flex items-center justify-center text-telezyne-blue font-medium">
                          1
                        </div>
                        <div>
                          <h3 className="font-medium">Select a contact</h3>
                          <p className="text-sm text-gray-600">Choose from your online contacts</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-3">
                        <div className="h-8 w-8 rounded-full bg-telezyne-blue/10 flex items-center justify-center text-telezyne-blue font-medium">
                          2
                        </div>
                        <div>
                          <h3 className="font-medium">Start the call</h3>
                          <p className="text-sm text-gray-600">Click the call button to initiate</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-3">
                        <div className="h-8 w-8 rounded-full bg-telezyne-blue/10 flex items-center justify-center text-telezyne-blue font-medium">
                          3
                        </div>
                        <div>
                          <h3 className="font-medium">Enjoy your conversation</h3>
                          <p className="text-sm text-gray-600">Use the controls to manage your call</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </>
        )}
      </div>
    </AppLayout>
  );
};

export default Call;
