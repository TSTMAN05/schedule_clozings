import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Mail, Phone, MapPin, Instagram, Linkedin, Youtube, Facebook } from 'lucide-react';

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="bg-blue-600 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Logo Section */}
        <div className="text-center mb-12">
          <div 
            className="inline-flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity duration-200"
            onClick={() => navigate('/')}
          >
            <div className="bg-white p-3 rounded-lg">
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
            <div className="text-left">
              <h2 className="text-2xl font-bold">Schedule</h2>
              <h2 className="text-2xl font-bold">Closings</h2>
            </div>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center space-x-4 mb-16">
          <a 
            href="#" 
            className="w-12 h-12 bg-gradient-to-br from-pink-500 to-orange-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-200"
            aria-label="Instagram"
          >
            <Instagram className="h-6 w-6 text-white" />
          </a>
          <a 
            href="#" 
            className="w-12 h-12 bg-blue-700 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-200"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-6 w-6 text-white" />
          </a>
          <a 
            href="#" 
            className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-200"
            aria-label="YouTube"
          >
            <Youtube className="h-6 w-6 text-white" />
          </a>
          <a 
            href="#" 
            className="w-12 h-12 bg-blue-800 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-200"
            aria-label="Facebook"
          >
            <Facebook className="h-6 w-6 text-white" />
          </a>
          <a 
            href="#" 
            className="w-12 h-12 bg-red-700 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-200"
            aria-label="Pinterest"
          >
            <div className="text-white font-bold text-lg">P</div>
          </a>
        </div>

        {/* Divider Line */}
        <div className="border-t border-blue-500 mb-12"></div>

        {/* Footer Links Grid */}
        <div className="grid md:grid-cols-3 gap-12">
          {/* Contact Section */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-center md:text-left">CONTACT</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-center md:justify-start space-x-3">
                <Mail className="h-5 w-5 text-blue-200" />
                <a 
                  href="mailto:info@scheduleclosings.com" 
                  className="text-blue-100 hover:text-white transition-colors duration-200"
                >
                  info@scheduleclosings.com
                </a>
              </div>
              <div className="flex items-center justify-center md:justify-start space-x-3">
                <Phone className="h-5 w-5 text-blue-200" />
                <a 
                  href="tel:(704)965-1777" 
                  className="text-blue-100 hover:text-white transition-colors duration-200"
                >
                  (704) 965-1777
                </a>
              </div>
              <div className="flex items-start justify-center md:justify-start space-x-3">
                <MapPin className="h-5 w-5 text-blue-200 mt-0.5 flex-shrink-0" />
                <div className="text-blue-100 text-center md:text-left">
                  <div>10610 Metromont Pkwy Charlotte, NC</div>
                  <div>28269</div>
                </div>
              </div>
            </div>
          </div>

          {/* Company Section */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-center md:text-left">COMPANY</h3>
            <div className="space-y-3">
              <div className="text-center md:text-left">
                <a href="#" className="text-blue-100 hover:text-white transition-colors duration-200 block">
                  About Us
                </a>
              </div>
              <div className="text-center md:text-left">
                <a href="#" className="text-blue-100 hover:text-white transition-colors duration-200 block">
                  Meet The Team
                </a>
              </div>
              <div className="text-center md:text-left">
                <a href="#" className="text-blue-100 hover:text-white transition-colors duration-200 block">
                  Security
                </a>
              </div>
              <div className="text-center md:text-left">
                <a href="#" className="text-blue-100 hover:text-white transition-colors duration-200 block">
                  Newsletter
                </a>
              </div>
            </div>
          </div>

          {/* Navigate Section */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-center md:text-left">NAVIGATE</h3>
            <div className="space-y-3">
              <div className="text-center md:text-left">
                <a href="#" className="text-blue-100 hover:text-white transition-colors duration-200 block">
                  Resources
                </a>
              </div>
              <div className="text-center md:text-left">
                <a href="#" className="text-blue-100 hover:text-white transition-colors duration-200 block">
                  FAQ
                </a>
              </div>
              <div className="text-center md:text-left">
                <a href="#" className="text-blue-100 hover:text-white transition-colors duration-200 block">
                  Login
                </a>
              </div>
              <div className="text-center md:text-left">
                <a href="#" className="text-blue-100 hover:text-white transition-colors duration-200 block">
                  Investor Relations
                </a>
              </div>
              <div className="text-center md:text-left">
                <a href="#" className="text-blue-100 hover:text-white transition-colors duration-200 block">
                  Create My Account
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}