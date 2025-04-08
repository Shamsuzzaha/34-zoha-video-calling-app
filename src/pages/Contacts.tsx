
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCall } from '@/contexts/CallContext';
import { useContacts } from '@/contexts/ContactContext';
import AppLayout from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Users, Video, UserPlus, X, MessageSquare, Shield, MoreVertical } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const Contacts: React.FC = () => {
  const { onlineUsers } = useCall();
  const { contacts, addNewContact, blockContact, deleteContact } = useContacts();
  const navigate = useNavigate();
  const [newContactEmail, setNewContactEmail] = useState('');
  
  const startCall = (userId: string, userName: string) => {
    navigate(`/call?userId=${userId}&userName=${userName}`);
  };

  const handleAddContact = async () => {
    try {
      await addNewContact(newContactEmail);
      setNewContactEmail('');
    } catch (error) {
      console.error('Error adding contact:', error);
    }
  };

  const startChat = (userId: string) => {
    navigate(`/chat?userId=${userId}`);
  };

  return (
    <AppLayout>
      <div className="container max-w-6xl">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Contacts</h1>
            <p className="text-gray-600">Manage your contacts and connect with others</p>
          </div>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-telezyne-blue">
                <UserPlus className="h-4 w-4 mr-2" />
                Add Contact
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Contact</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <Input
                  placeholder="Enter contact's email"
                  value={newContactEmail}
                  onChange={(e) => setNewContactEmail(e.target.value)}
                />
                <Button
                  className="w-full bg-telezyne-blue"
                  onClick={handleAddContact}
                  disabled={!newContactEmail}
                >
                  Add Contact
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-6">
          {/* My Contacts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                My Contacts
              </CardTitle>
            </CardHeader>
            <CardContent>
              {contacts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {contacts.map((contact) => {
                    const isOnline = onlineUsers.some(user => user.id === contact.id);
                    return (
                      <Card key={contact.id} className="overflow-hidden">
                        <div className="p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-4">
                              <div className="relative">
                                <Avatar className="h-12 w-12">
                                  <AvatarImage src={contact.photoURL} alt={contact.displayName} />
                                  <AvatarFallback className="bg-telezyne-purple text-white">
                                    {contact.displayName.substring(0, 1)}
                                  </AvatarFallback>
                                </Avatar>
                                {isOnline && (
                                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></span>
                                )}
                              </div>
                              <div>
                                <h3 className="font-semibold">{contact.displayName}</h3>
                                <p className="text-sm text-gray-600">{contact.email}</p>
                                <div className="flex items-center gap-1 text-sm">
                                  <span className={`h-2 w-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                                  <span className={isOnline ? 'text-green-600' : 'text-gray-500'}>
                                    {isOnline ? 'Online' : 'Offline'}
                                  </span>
                                </div>
                              </div>
                            </div>
                            
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => blockContact(contact.id)}>
                                  <Shield className="h-4 w-4 mr-2" />
                                  Block Contact
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => deleteContact(contact.id)}>
                                  <X className="h-4 w-4 mr-2" />
                                  Remove Contact
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                          
                          <div className="flex gap-2">
                            <Button
                              className="flex-1 bg-telezyne-blue"
                              onClick={() => startCall(contact.id, contact.displayName)}
                              disabled={!isOnline}
                            >
                              <Video className="h-4 w-4 mr-2" />
                              Call
                            </Button>
                            <Button
                              variant="outline"
                              className="flex-1"
                              onClick={() => startChat(contact.id)}
                            >
                              <MessageSquare className="h-4 w-4 mr-2" />
                              Chat
                            </Button>
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="inline-block p-4 rounded-full bg-gray-100 mb-4">
                    <Users className="h-8 w-8 text-gray-400" />
                  </div>
                  <p className="text-lg font-medium text-gray-600 mb-1">No contacts yet</p>
                  <p className="text-sm text-gray-500">
                    Add contacts to start connecting with others
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Online Users */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Online Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              {onlineUsers.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {onlineUsers.map((user) => (
                    <Card key={user.id} className="overflow-hidden">
                      <div className="p-4">
                        <div className="flex items-center gap-4 mb-3">
                          <div className="relative">
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={user.photoURL} alt={user.displayName} />
                              <AvatarFallback className="bg-telezyne-purple text-white">
                                {user.displayName.substring(0, 1)}
                              </AvatarFallback>
                            </Avatar>
                            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></span>
                          </div>
                          <div>
                            <h3 className="font-semibold">{user.displayName}</h3>
                            <p className="text-sm text-gray-600">{user.email}</p>
                            <div className="flex items-center gap-1 text-green-600 text-xs">
                              <span className="h-2 w-2 bg-green-500 rounded-full"></span>
                              <span>Online</span>
                            </div>
                          </div>
                        </div>
                        <Button 
                          className="w-full bg-telezyne-blue"
                          onClick={() => startCall(user.id, user.displayName)}
                        >
                          <Video className="h-4 w-4 mr-2" />
                          Start Video Call
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="inline-block p-4 rounded-full bg-gray-100 mb-4">
                    <Users className="h-8 w-8 text-gray-400" />
                  </div>
                  <p className="text-lg font-medium text-gray-600 mb-1">No online users</p>
                  <p className="text-sm text-gray-500">
                    Wait for users to come online or check back later
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default Contacts;
