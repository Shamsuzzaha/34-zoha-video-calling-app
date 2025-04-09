
import React, { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useCall } from '@/contexts/CallContext';
import AppLayout from '@/components/layout/AppLayout';
import IncomingCallModal from '@/components/call/IncomingCallModal';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Phone, Video, User, History, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { format } from 'timeago.js';

const Dashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const { onlineUsers, callLogs, initializeMedia } = useCall();
  
  useEffect(() => {
    // Initialize media when the dashboard loads
    initializeMedia().catch(console.error);
  }, []);
  
  return (
    <AppLayout>
      <div className="container max-w-7xl">
        <IncomingCallModal />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <User className="w-5 h-5 text-zohacall-blue" />
                My Profile
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <Avatar className="h-14 w-14">
                  <AvatarImage src={currentUser?.photoURL || undefined} alt={currentUser?.displayName || "User"} />
                  <AvatarFallback className="text-lg">
                    {currentUser?.displayName 
                      ? currentUser.displayName.substring(0, 1).toUpperCase() 
                      : currentUser?.email?.substring(0, 1).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{currentUser?.displayName}</h3>
                  <p className="text-sm text-gray-500">{currentUser?.email}</p>
                </div>
              </div>
              <div className="mt-4">
                <Link to="/profile">
                  <Button variant="outline" size="sm" className="w-full">Edit Profile</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <Video className="w-5 h-5 text-zohacall-purple" />
                Quick Video Call
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Start a video call with someone in your contacts
              </p>
              <Link to="/call">
                <Button className="w-full bg-zohacall-purple hover:bg-zohacall-purple/90">
                  Start Video Call
                </Button>
              </Link>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <History className="w-5 h-5 text-zohacall-blue" />
                Recent Calls
              </CardTitle>
            </CardHeader>
            <CardContent>
              {callLogs.length > 0 ? (
                <div className="space-y-2">
                  {callLogs.slice(0, 3).map((log) => (
                    <div key={log.id} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="text-xs">
                            {log.callerName.substring(0, 1)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div>{log.callerName}</div>
                          <div className="text-xs text-gray-500">
                            {format(log.startTime)}
                          </div>
                        </div>
                      </div>
                      <div className={`text-xs px-2 py-1 rounded-full ${
                        log.status === 'completed' ? 'bg-green-100 text-green-800' : 
                        log.status === 'missed' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {log.status.charAt(0).toUpperCase() + log.status.slice(1)}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No recent calls</p>
              )}
              
              <div className="mt-4">
                <Link to="/history">
                  <Button variant="outline" size="sm" className="w-full">View All Calls</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium flex items-center gap-2">
                  <Users className="w-5 h-5 text-zohacall-blue" />
                  Online Users ({onlineUsers.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="max-h-80 overflow-y-auto">
                {onlineUsers.length > 0 ? (
                  <div className="divide-y">
                    {onlineUsers.map((user) => (
                      <div key={user.id} className="py-2 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="relative">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={user.photoURL} alt={user.displayName} />
                              <AvatarFallback>{user.displayName.substring(0, 1)}</AvatarFallback>
                            </Avatar>
                            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></span>
                          </div>
                          <div>
                            <div className="font-medium">{user.displayName}</div>
                            <div className="text-xs text-green-600">Online</div>
                          </div>
                        </div>
                        <Link to={`/call?userId=${user.id}&userName=${user.displayName}`}>
                          <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full">
                            <Video className="h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 text-gray-500">
                    <Users className="h-12 w-12 mx-auto opacity-20 mb-2" />
                    <p>No users are currently online</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Welcome to ZohaCall</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-zohacall-blue to-zohacall-purple rounded-lg p-5 text-white">
                    <h3 className="text-lg font-semibold mb-2">Start Video Calling</h3>
                    <p className="text-sm opacity-90 mb-4">
                      Connect with colleagues, friends, and family through high-quality video calls.
                    </p>
                    <Link to="/call">
                      <Button variant="outline" className="border-white text-black hover:bg-white/20 hover:text-white">
                        <Video className="mr-2 h-4 w-4" />
                        Start Now
                      </Button>
                    </Link>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-5">
                    <h3 className="text-lg font-semibold mb-2">Manage Contacts</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Add and organize your contacts to easily connect with them anytime.
                    </p>
                    <Link to="/contacts">
                      <Button variant="outline">
                        <Users className="mr-2 h-4 w-4" />
                        View Contacts
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
