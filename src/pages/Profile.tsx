
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import AppLayout from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2, Save } from 'lucide-react';

const Profile: React.FC = () => {
  const { currentUser, updateUserProfile } = useAuth();
  const [displayName, setDisplayName] = useState(currentUser?.displayName || '');
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!displayName.trim()) return;
    
    try {
      setLoading(true);
      await updateUserProfile(displayName);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <AppLayout>
      <div className="container max-w-4xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">My Profile</h1>
          <p className="text-gray-600">
            Update your personal information
          </p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex flex-col items-center">
                <Avatar className="h-32 w-32">
                  <AvatarImage src={currentUser?.photoURL || undefined} alt={currentUser?.displayName || "User"} />
                  <AvatarFallback className="text-4xl">
                    {currentUser?.displayName 
                      ? currentUser.displayName.substring(0, 1).toUpperCase() 
                      : currentUser?.email?.substring(0, 1).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <p className="text-sm text-gray-500 mt-2">
                  Profile photo from your login provider
                </p>
              </div>
              
              <form onSubmit={handleSubmit} className="flex-1 space-y-4">
                <div>
                  <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 mb-1">
                    Display Name
                  </label>
                  <Input
                    id="displayName"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Enter your display name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    value={currentUser?.email || ''}
                    disabled
                    className="bg-gray-50"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Email cannot be changed
                  </p>
                </div>
                
                <div className="pt-2">
                  <Button type="submit" disabled={loading} className="bg-telezyne-blue hover:bg-telezyne-blue/90">
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Profile;
