import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/clerk-react';
import { Calendar, Bell, Menu, X } from 'lucide-react';

export default function Header() {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    }

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  // Consistent button base classes
  const buttonBaseClasses = "h-10 px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center min-w-[80px]";
  const iconButtonClasses = "h-10 w-10 rounded-lg flex items-center justify-center transition-all duration-200";

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-blue-800 to-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div 
            className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity duration-200"
            onClick={() => navigate('/')}
          >
            <div className="bg-white p-2 rounded-lg">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold">Schedule Closings</h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            <a href="#" className="text-blue-100 hover:text-white transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-blue-700/50">
              Company
            </a>
            <a href="#" className="text-blue-100 hover:text-white transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-blue-700/50">
              Investor Relations
            </a>
            <a href="#" className="text-blue-100 hover:text-white transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-blue-700/50">
              Resources / FAQs
            </a>
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {isSignedIn ? (
              <div className="flex items-center space-x-2 sm:space-x-3">
                <button className={`${iconButtonClasses} bg-blue-700 hover:bg-blue-600`}>
                  <Bell className="h-5 w-5" />
                </button>
                <UserButton 
                  appearance={{
                    elements: {
                      avatarBox: "w-10 h-10",
                      userButtonPopoverCard: "bg-white",
                      userButtonPopoverActionButton: "text-gray-700 hover:bg-gray-100"
                    }
                  }}
                />
              </div>
            ) : (
              <div className="flex items-center space-x-2 sm:space-x-3">
                <SignUpButton mode="modal">
                  <button className={`${buttonBaseClasses} text-blue-100 hover:text-white border border-blue-400 hover:border-white`}>
                    <span className="hidden sm:inline">Create Account</span>
                    <span className="sm:hidden">Sign Up</span>
                  </button>
                </SignUpButton>
                <SignInButton mode="modal">
                  <button className={`${buttonBaseClasses} bg-white text-blue-600 hover:bg-blue-50 shadow-sm`}>
                    Login
                  </button>
                </SignInButton>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              className={`${iconButtonClasses} bg-blue-700 hover:bg-blue-600 lg:hidden`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <div className="lg:hidden fixed inset-0 bg-black/20 z-40" onClick={() => setIsMobileMenuOpen(false)} />
            
            {/* Dropdown Menu */}
            <div 
              ref={menuRef}
              className="lg:hidden absolute top-16 right-4 w-64 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-50 animate-in slide-in-from-top-2 duration-200"
            >
              <nav className="py-2">
                <a 
                  href="#" 
                  className="block text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200 px-4 py-3 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Company
                </a>
                <a 
                  href="#" 
                  className="block text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200 px-4 py-3 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Investor Relations
                </a>
                <a 
                  href="#" 
                  className="block text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200 px-4 py-3 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Resources / FAQs
                </a>
              </nav>
            </div>
          </>
        )}
      </div>
    </header>
  );
}