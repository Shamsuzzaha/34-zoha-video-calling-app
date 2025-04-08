
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Call from "./pages/Call";
import Profile from "./pages/Profile";
import History from "./pages/History";
import Contacts from "./pages/Contacts";
import Settings from "./pages/Settings";
import { AuthProvider } from "./contexts/AuthContext";
import { CallProvider } from "./contexts/CallContext";
import { ContactProvider } from "./contexts/ContactContext";
import IncomingCallModal from "./components/call/IncomingCallModal";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <ContactProvider>
        <CallProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <IncomingCallModal />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/call" element={<Call />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/history" element={<History />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </CallProvider>
      </ContactProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
