
import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Mic, Video, Volume2, Monitor } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const Settings: React.FC = () => {
  return (
    <AppLayout>
      <div className="container max-w-4xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Settings</h1>
          <p className="text-gray-600">
            Manage your app preferences and configurations
          </p>
        </div>
        
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Video className="h-5 w-5" />
                Video Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="camera" className="mb-1 block">Camera</Label>
                <Select defaultValue="default">
                  <SelectTrigger id="camera">
                    <SelectValue placeholder="Select camera" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default Camera</SelectItem>
                    <SelectItem value="front">Front Camera (if available)</SelectItem>
                    <SelectItem value="back">Back Camera (if available)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="hd-video" className="mb-0 block">HD Video</Label>
                  <p className="text-sm text-muted-foreground">Enable high-definition video when available</p>
                </div>
                <Switch id="hd-video" defaultChecked={true} />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="video-mirror" className="mb-0 block">Mirror my video</Label>
                  <p className="text-sm text-muted-foreground">See yourself mirrored during calls</p>
                </div>
                <Switch id="video-mirror" defaultChecked={true} />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mic className="h-5 w-5" />
                Audio Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="microphone" className="mb-1 block">Microphone</Label>
                <Select defaultValue="default">
                  <SelectTrigger id="microphone">
                    <SelectValue placeholder="Select microphone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default Microphone</SelectItem>
                    <SelectItem value="headset">Headset Microphone</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="speaker" className="mb-1 block">Speaker</Label>
                <Select defaultValue="default">
                  <SelectTrigger id="speaker">
                    <SelectValue placeholder="Select speaker" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default Speaker</SelectItem>
                    <SelectItem value="headphones">Headphones</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="noise-suppression" className="mb-0 block">Noise Suppression</Label>
                  <p className="text-sm text-muted-foreground">Reduce background noise</p>
                </div>
                <Switch id="noise-suppression" defaultChecked={true} />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="call-notifications" className="mb-0 block">Call Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications for incoming calls</p>
                </div>
                <Switch id="call-notifications" defaultChecked={true} />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="message-notifications" className="mb-0 block">Message Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications for chat messages</p>
                </div>
                <Switch id="message-notifications" defaultChecked={true} />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>About Telezyne</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold">Version</h3>
                <p className="text-sm text-muted-foreground">1.0.0</p>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-semibold">Technologies</h3>
                <div className="text-sm text-muted-foreground space-y-1 mt-2">
                  <p>• React + Vite</p>
                  <p>• WebRTC with PeerJS</p>
                  <p>• Firebase Authentication</p>
                  <p>• Socket.IO for real-time signaling</p>
                </div>
              </div>
              
              <Separator />
              
              <p className="text-sm text-center text-muted-foreground">
                © 2025 Telezyne. All rights reserved.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default Settings;
