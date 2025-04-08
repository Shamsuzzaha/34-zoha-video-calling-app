
import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { useCall } from '@/contexts/CallContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { format } from 'timeago.js';
import { Phone, PhoneOff, PhoneIncoming, PhoneOutgoing } from 'lucide-react';

const History: React.FC = () => {
  const { callLogs } = useCall();
  
  const formatDuration = (seconds?: number) => {
    if (!seconds) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  const statusStyles = {
    completed: {
      icon: <Phone className="h-4 w-4" />,
      color: 'bg-green-100 text-green-800',
    },
    missed: {
      icon: <PhoneOff className="h-4 w-4" />,
      color: 'bg-yellow-100 text-yellow-800',
    },
    rejected: {
      icon: <PhoneOff className="h-4 w-4" />,
      color: 'bg-red-100 text-red-800',
    },
  };
  
  return (
    <AppLayout>
      <div className="container max-w-6xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Call History</h1>
          <p className="text-gray-600">
            View details of your recent video calls
          </p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Calls</CardTitle>
          </CardHeader>
          <CardContent>
            {callLogs.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {callLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {log.callerId === log.receiverId ? (
                            <span className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100">
                              <Phone className="h-4 w-4 text-gray-600" />
                            </span>
                          ) : log.callerId === log.receiverId ? (
                            <span className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100">
                              <PhoneOutgoing className="h-4 w-4 text-blue-600" />
                            </span>
                          ) : (
                            <span className="w-8 h-8 flex items-center justify-center rounded-full bg-purple-100">
                              <PhoneIncoming className="h-4 w-4 text-purple-600" />
                            </span>
                          )}
                          <span>
                            {log.callerId === log.receiverId ? 'Self' : 'Incoming'}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="text-xs">
                              {log.callerName.substring(0, 1)}
                            </AvatarFallback>
                          </Avatar>
                          <span>{log.callerName}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{format(log.startTime)}</div>
                      </TableCell>
                      <TableCell>
                        {formatDuration(log.duration)}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`flex items-center gap-1 ${statusStyles[log.status].color}`}>
                          {statusStyles[log.status].icon}
                          {log.status.charAt(0).toUpperCase() + log.status.slice(1)}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-12">
                <div className="inline-block p-4 rounded-full bg-gray-100 mb-4">
                  <Phone className="h-8 w-8 text-gray-400" />
                </div>
                <p className="text-lg font-medium text-gray-600 mb-1">No call history</p>
                <p className="text-sm text-gray-500">
                  Your past calls will appear here once you start making calls
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default History;
