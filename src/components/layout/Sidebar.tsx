
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  Home, 
  Video, 
  Phone, 
  Users, 
  Settings, 
  User, 
  MenuIcon, 
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

interface NavItem {
  label: string;
  icon: React.ReactNode;
  href: string;
}

const navItems: NavItem[] = [
  {
    label: 'Dashboard',
    icon: <Home className="h-5 w-5" />,
    href: '/dashboard',
  },
  {
    label: 'Video Call',
    icon: <Video className="h-5 w-5" />,
    href: '/call',
  },
  {
    label: 'Contacts',
    icon: <Users className="h-5 w-5" />,
    href: '/contacts',
  },
  {
    label: 'Call History',
    icon: <Phone className="h-5 w-5" />,
    href: '/history',
  },
  {
    label: 'Profile',
    icon: <User className="h-5 w-5" />,
    href: '/profile',
  },
  {
    label: 'Settings',
    icon: <Settings className="h-5 w-5" />,
    href: '/settings',
  },
];

const MobileNavigation = () => {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <MenuIcon className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0">
        <div className="flex flex-col h-full bg-white">
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-md bg-gradient-to-r from-telezyne-blue to-telezyne-purple flex items-center justify-center text-white font-bold">
                T
              </div>
              <span className="font-bold text-lg">Telezyne</span>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <NavLink
                    to={item.href}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) => cn(
                      "flex items-center gap-3 px-4 py-3 rounded-md transition-colors",
                      isActive 
                        ? "bg-telezyne-blue text-white" 
                        : "hover:bg-gray-100 text-gray-700"
                    )}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
};

const DesktopNavigation = () => {
  return (
    <div className="hidden md:block w-64 bg-white border-r border-gray-200 h-full">
      <div className="p-4">
        <h2 className="font-semibold text-gray-500 uppercase text-xs tracking-wider mb-4">
          Menu
        </h2>
        <nav>
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <NavLink
                  to={item.href}
                  className={({ isActive }) => cn(
                    "flex items-center gap-3 px-4 py-3 rounded-md transition-colors",
                    isActive 
                      ? "bg-telezyne-blue text-white" 
                      : "hover:bg-gray-100 text-gray-700"
                  )}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

const Sidebar = () => {
  return (
    <>
      <div className="md:hidden fixed top-0 right-0 p-4 z-10">
        <MobileNavigation />
      </div>
      <DesktopNavigation />
    </>
  );
};

export default Sidebar;
