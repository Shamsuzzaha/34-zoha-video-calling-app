
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Video, Shield, Globe } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-telezyne-blue to-telezyne-purple flex flex-col overflow-hidden">
      {/* Navbar */}
      <header className="container mx-auto flex justify-between items-center py-6 px-4">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-md bg-white flex items-center justify-center">
            <span className="text-lg font-bold text-gradient">T</span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-white">Telezyne</h1>
        </div>
        
        <div className="flex gap-4 items-center">
          <Button 
            variant="link" 
            className="text-white hover:text-white/80"
            onClick={() => navigate('/login')}
          >
            Sign In
          </Button>
          <Button 
            className="bg-white text-telezyne-blue hover:bg-white/90"
            onClick={() => navigate('/register')}
          >
            Get Started
          </Button>
        </div>
      </header>
      
      {/* Hero Section */}
      <main className="flex-1 container mx-auto px-4 py-12 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="text-white max-w-xl">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Connect with crystal-clear video calls
          </h2>
          <p className="text-lg md:text-xl text-white/80 mb-8">
            Telezyne brings you seamless video calling with high-quality audio and video for both personal and professional communication.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              className="bg-white text-telezyne-blue hover:bg-white/90"
              onClick={() => navigate('/register')}
            >
              Sign Up Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-white text-white hover:bg-white/20"
              onClick={() => navigate('/login')}
            >
              Sign In
            </Button>
          </div>
        </div>
        
        <div className="relative hidden md:block">
          <div className="video-container bg-black/20 backdrop-blur-sm border border-white/20 shadow-xl">
            {/* Simulated video interface */}
            <div className="absolute inset-0 grid-pattern opacity-20"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-white text-center">
                <Video className="h-16 w-16 mx-auto mb-4 opacity-60" />
                <h3 className="text-xl font-medium">Start your first video call</h3>
              </div>
            </div>
            <div className="local-video bg-black/40">
              <div className="h-full flex items-center justify-center text-white text-sm">
                You
              </div>
            </div>
            <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex gap-4">
              <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm">
                <Video className="h-5 w-5 text-white" />
              </div>
              <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm">
                <span className="block h-5 w-5 rounded-full bg-white"></span>
              </div>
              <div className="h-12 w-12 rounded-full bg-red-500 flex items-center justify-center">
                <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Features section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why choose Telezyne?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6">
              <div className="h-16 w-16 rounded-full bg-telezyne-blue/10 flex items-center justify-center mb-4">
                <Video className="h-8 w-8 text-telezyne-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-3">High-Quality Calls</h3>
              <p className="text-gray-600">
                Experience crystal-clear video and audio with our advanced WebRTC technology.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6">
              <div className="h-16 w-16 rounded-full bg-telezyne-purple/10 flex items-center justify-center mb-4">
                <Shield className="h-8 w-8 text-telezyne-purple" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Secure Communication</h3>
              <p className="text-gray-600">
                Your calls and messages are encrypted and secure with our robust security measures.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6">
              <div className="h-16 w-16 rounded-full bg-telezyne-blue/10 flex items-center justify-center mb-4">
                <Globe className="h-8 w-8 text-telezyne-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Connect Anywhere</h3>
              <p className="text-gray-600">
                Join calls from any device with an internet connection, anywhere in the world.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Create your free account today and experience the future of communication with Telezyne.
          </p>
          <Button 
            size="lg" 
            className="bg-telezyne-blue hover:bg-telezyne-blue/90"
            onClick={() => navigate('/register')}
          >
            Sign Up Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="h-8 w-8 rounded-md bg-gradient-to-r from-telezyne-blue to-telezyne-purple flex items-center justify-center">
                <span className="text-sm font-bold">T</span>
              </div>
              <span className="text-lg font-bold">Telezyne</span>
            </div>
            
            <div className="text-sm text-gray-400">
              © 2025 Telezyne. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
