
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LogOut, User, Settings } from 'lucide-react';

const Navbar: React.FC = () => {
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 py-3 px-4 flex items-center justify-between shadow-sm">
      <Link to="/dashboard" className="flex items-center">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-md bg-gradient-to-r from-telezyne-blue to-telezyne-purple flex items-center justify-center text-white font-bold text-lg">
            T
          </div>
          <h1 className="text-xl font-bold text-telezyne-blue">Telezyne</h1>
        </div>
      </Link>
      
      {currentUser && (
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600 hidden md:block">
            {currentUser.displayName || currentUser.email}
          </span>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full h-9 w-9">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={currentUser.photoURL || undefined} alt={currentUser.displayName || "User"} />
                  <AvatarFallback>
                    {currentUser.displayName 
                      ? currentUser.displayName.substring(0, 1).toUpperCase() 
                      : currentUser.email?.substring(0, 1).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link to="/profile" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/settings" className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="flex items-center gap-2 text-destructive">
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </header>
  );
};

export default Navbar;
