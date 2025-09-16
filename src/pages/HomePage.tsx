import React from 'react';
import { useNavigate } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import Layout from '../components/Layout';
import { GeocodingService } from '../services/geocodingService';
import { Search, MapPin, Calendar, CheckCircle } from 'lucide-react';

export default function HomePage() {
  const navigate = useNavigate();

  const handleSearch = async (address: string, closingDate: string) => {
    if (!address.trim()) {
      alert('Please enter a property address');
      return;
    }

    try {
      // Geocode the address to get coordinates
      const geocodeResult = await GeocodingService.geocodeAddress(address);
      
      if (!geocodeResult) {
        alert('Could not find the specified address. Please try a different address.');
        return;
      }

      // Navigate to map page with search parameters
      const searchParams = new URLSearchParams({
        address: geocodeResult.address,
        lat: geocodeResult.coordinates[1].toString(),
        lng: geocodeResult.coordinates[0].toString(),
        closingDate: closingDate
      });

      navigate(`/map?${searchParams.toString()}`);
    } catch (error) {
      console.error('Error during search:', error);
      alert('An error occurred while searching. Please try again.');
    }
  };

  return (
    <Layout>
      <HeroSection onSearch={handleSearch} />

      {/* How Easy It Is Section */}
      <section className="py-20 bg-gradient-to-br from-blue-100 via-blue-50 to-blue-200 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/3 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob animation-delay-4000"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full mb-6 shadow-lg">
              <Calendar className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 bg-clip-text text-transparent mb-6 font-sans">
              Scheduling Your Closing is Easy
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
              Find and connect with qualified closing attorneys in just three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {/* Step 1 */}
            <div className="group text-center transform hover:scale-105 transition-all duration-300">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:from-blue-600 group-hover:to-blue-700">
                  <Search className="h-10 w-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                  1
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300 font-sans">
                Search Your Area
              </h3>
              <p className="text-gray-600 leading-relaxed font-light">
                Enter your property address and closing date to find nearby qualified attorneys
              </p>
              <div className="mt-4 h-1 w-16 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full mx-auto"></div>
            </div>

            {/* Step 2 */}
            <div className="group text-center transform hover:scale-105 transition-all duration-300">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:from-purple-600 group-hover:to-purple-700">
                  <MapPin className="h-10 w-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                  2
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors duration-300 font-sans">
                Browse & Compare
              </h3>
              <p className="text-gray-600 leading-relaxed font-light">
                View attorney profiles, ratings, and specialties on our interactive map
              </p>
              <div className="mt-4 h-1 w-16 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full mx-auto"></div>
            </div>

            {/* Step 3 */}
            <div className="group text-center transform hover:scale-105 transition-all duration-300">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:from-green-600 group-hover:to-green-700">
                  <Calendar className="h-10 w-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                  3
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-green-600 transition-colors duration-300 font-sans">
                Schedule Your Closing
              </h3>
              <p className="text-gray-600 leading-relaxed font-light">
                Click "Schedule" to connect directly with your chosen attorney
              </p>
              <div className="mt-4 h-1 w-16 bg-gradient-to-r from-green-400 to-green-600 rounded-full mx-auto"></div>
            </div>
          </div>

        </div>
      </section>
    </Layout>
  );
}