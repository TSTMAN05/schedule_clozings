import React from 'react';
import SearchForm from './SearchForm';

interface HeroSectionProps {
  onSearch: (address: string, closingDate: string) => void;
}

export default function HeroSection({ onSearch }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/charlotte-nc-neighborhoods.webp)'
        }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Schedule and coordinate 
            <br />
            <span className="text-blue-200">closings with ease.</span>
          </h1>
        </div>

        <SearchForm onSearch={onSearch} />
      </div>
    </section>
  );
}