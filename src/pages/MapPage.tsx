import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import MapboxMap from '../components/MapboxMap';
import { MapPin, Phone, Star, Mail, Calendar, Search, X } from 'lucide-react';
import { GeocodingService } from '../services/geocodingService';

export default function MapPage() {
  const [searchParams] = useSearchParams();
  const [baseFirms, setBaseFirms] = useState<any[]>([]);
  const [filteredFirms, setFilteredFirms] = useState<any[]>([]);
  const [searchLocation, setSearchLocation] = useState<{
    address: string;
    coordinates: [number, number];
  } | null>(null);
  const [selectedFirm, setSelectedFirm] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [additionalSearchResults, setAdditionalSearchResults] = useState<any[]>([]);

  // Sample law firm data - this will come from your database later
  const lawFirms = [
    {
      id: 1,
      name: "Charlotte Legal Partners",
      address: "123 Main Street, Charlotte, NC 28202",
      coordinates: [-80.8431, 35.2271] as [number, number], // Downtown Charlotte
      phone: "(704) 555-0123",
      email: "contact@charlottelegal.com",
      rating: 4.8,
      reviewCount: 24,
      specialties: ["Real Estate", "Closings", "Title Work"]
    },
    {
      id: 2,
      name: "Piedmont Closing Services",
      address: "456 Trade Street, Charlotte, NC 28202",
      coordinates: [-80.7550, 35.3180] as [number, number], // University area
      phone: "(704) 555-0456",
      email: "info@piedmontclosing.com",
      rating: 4.9,
      reviewCount: 31,
      specialties: ["Residential Closings", "Commercial Real Estate"]
    },
    {
      id: 3,
      name: "Queen City Title & Law",
      address: "789 South Blvd, Charlotte, NC 28203",
      coordinates: [-80.8850, 35.1950] as [number, number], // South Charlotte
      phone: "(704) 555-0789",
      email: "hello@queencitytitle.com",
      rating: 4.7,
      reviewCount: 18,
      specialties: ["Title Insurance", "Real Estate Law"]
    },
    {
      id: 4,
      name: "Uptown Real Estate Law",
      address: "321 North Tryon Street, Charlotte, NC 28202",
      coordinates: [-80.9200, 35.2650] as [number, number], // West Charlotte
      phone: "(704) 555-0321",
      email: "contact@uptownrelaw.com",
      rating: 4.6,
      reviewCount: 42,
      specialties: ["Luxury Properties", "Investment Real Estate"]
    },
    {
      id: 5,
      name: "SouthPark Legal Group",
      address: "654 Park Road, Charlotte, NC 28209",
      coordinates: [-80.8150, 35.2050] as [number, number], // SouthPark area
      phone: "(704) 555-0654",
      email: "info@southparklegal.com",
      rating: 4.8,
      reviewCount: 29,
      specialties: ["Residential Closings", "Refinancing"]
    },
    {
      id: 6,
      name: "Matthews Closing Company",
      address: "987 Matthews Township Pkwy, Matthews, NC 28105",
      coordinates: [-80.7200, 35.1200] as [number, number], // Matthews (southeast)
      phone: "(704) 555-0987",
      email: "contact@matthewsclosing.com",
      rating: 4.5,
      reviewCount: 15,
      specialties: ["Suburban Properties", "First-Time Buyers"]
    },
    {
      id: 7,
      name: "Gastonia Real Estate Law",
      address: "789 East Franklin Blvd, Gastonia, NC 28054",
      coordinates: [-81.1873, 35.2621] as [number, number], // Gastonia (west, ~25+ miles)
      phone: "(704) 555-1234",
      email: "info@gastonialaw.com",
      rating: 4.4,
      reviewCount: 22,
      specialties: ["Commercial Real Estate", "Property Development"]
    },
    {
      id: 8,
      name: "Concord Title Services",
      address: "456 Union Street, Concord, NC 28025",
      coordinates: [-80.5794, 35.4087] as [number, number], // Concord (northeast, ~25+ miles)
      phone: "(704) 555-5678",
      email: "contact@concordtitle.com",
      rating: 4.6,
      reviewCount: 19,
      specialties: ["Title Insurance", "Closing Services"]
    },
    {
      id: 9,
      name: "Rock Hill Legal Group",
      address: "123 Main Street, Rock Hill, SC 29730",
      coordinates: [-81.0251, 34.9249] as [number, number], // Rock Hill, SC (south, ~25+ miles)
      phone: "(803) 555-9012",
      email: "info@rockhillegal.com",
      rating: 4.7,
      reviewCount: 35,
      specialties: ["Residential Closings", "Real Estate Litigation"]
    },
    {
      id: 10,
      name: "Mooresville Closing Solutions",
      address: "321 Broad Street, Mooresville, NC 28115",
      coordinates: [-80.8107, 35.5851] as [number, number], // Mooresville (north, ~30+ miles)
      phone: "(704) 555-3456",
      email: "solutions@mooresvilleclosing.com",
      rating: 4.3,
      reviewCount: 28,
      specialties: ["Lake Properties", "Vacation Homes"]
    },
    {
      id: 11,
      name: "Hickory Title & Trust",
      address: "654 Highway 70 SW, Hickory, NC 28602",
      coordinates: [-81.3412, 35.7344] as [number, number], // Hickory (northwest, ~60+ miles)
      phone: "(828) 555-7890",
      email: "trust@hickorytitle.com",
      rating: 4.8,
      reviewCount: 16,
      specialties: ["Rural Properties", "Land Development"]
    },
    {
      id: 12,
      name: "Statesville Real Estate Partners",
      address: "789 Davie Avenue, Statesville, NC 28677",
      coordinates: [-80.8873, 35.7826] as [number, number], // Statesville (north, ~40+ miles)
      phone: "(704) 555-2468",
      email: "partners@statesvillere.com",
      rating: 4.5,
      reviewCount: 31,
      specialties: ["Agricultural Properties", "Commercial Development"]
    },
    {
      id: 13,
      name: "Monroe Legal Services",
      address: "456 Windsor Forest Drive, Monroe, NC 28110",
      coordinates: [-80.5495, 34.9854] as [number, number], // Monroe (southeast, ~25+ miles)
      phone: "(704) 555-1357",
      email: "services@monroelegal.com",
      rating: 4.2,
      reviewCount: 24,
      specialties: ["First-Time Buyers", "Residential Closings"]
    },
    {
      id: 14,
      name: "Huntersville Title Company",
      address: "987 Gilead Road, Huntersville, NC 28078",
      coordinates: [-80.8426, 35.4107] as [number, number], // Huntersville (north, ~20+ miles)
      phone: "(704) 555-8024",
      email: "title@huntersvilletitle.com",
      rating: 4.9,
      reviewCount: 42,
      specialties: ["New Construction", "Custom Homes"]
    }
  ];

  // Process search parameters and filter attorneys
  useEffect(() => {
    const address = searchParams.get('address');
    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');

    if (address && lat && lng) {
      const searchCoords: [number, number] = [parseFloat(lng), parseFloat(lat)];
      
      setSearchLocation({
        address,
        coordinates: searchCoords
      });

      // Calculate distances and sort by proximity
      const firmsWithDistance = lawFirms.map(firm => ({
        ...firm,
        distance: GeocodingService.calculateDistance(
          parseFloat(lat),
          parseFloat(lng),
          firm.coordinates[1], // latitude
          firm.coordinates[0]  // longitude
        )
      }));

      // Sort by distance and take closest 10
      const sortedFirms = firmsWithDistance
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 10);

      setBaseFirms(sortedFirms);
    } else {
      // No search parameters, show all firms
      setBaseFirms(lawFirms);
      setSearchLocation(null);
    }
  }, [searchParams]);

  // Filter firms based on search term
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredFirms(baseFirms);
      setAdditionalSearchResults([]);
      return;
    }

    // Search within base firms (nearby or all if no location search)
    const baseSearchFiltered = baseFirms.filter(firm =>
      firm.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      firm.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      firm.specialties.some((specialty: string) =>
        specialty.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

    // If there's a location search, also search all firms for additional results
    let additionalResults: any[] = [];
    if (searchLocation) {
      const baseFirmIds = new Set(baseFirms.map(firm => firm.id));
      additionalResults = lawFirms.filter(firm =>
        !baseFirmIds.has(firm.id) && (
          firm.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          firm.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
          firm.specialties.some((specialty: string) =>
            specialty.toLowerCase().includes(searchTerm.toLowerCase())
          )
        )
      );
    }

    setFilteredFirms(baseSearchFiltered);
    setAdditionalSearchResults(additionalResults);
  }, [searchTerm, baseFirms, searchLocation]);

  const handleAttorneySelect = (attorney: any) => {
    console.log('Selected attorney:', attorney);
    setSelectedFirm(attorney);

    // Scroll to the selected firm within the sidebar container only
    const firmElement = document.getElementById(`firm-${attorney.id}`);
    const scrollContainer = document.getElementById('firms-scroll-container');

    if (firmElement && scrollContainer) {
      const containerRect = scrollContainer.getBoundingClientRect();
      const firmRect = firmElement.getBoundingClientRect();

      // Calculate the relative position within the container
      const relativeTop = firmRect.top - containerRect.top + scrollContainer.scrollTop;

      // Position the firm at the top of the container
      scrollContainer.scrollTo({
        top: relativeTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="min-h-screen bg-white">
        <div className="flex h-screen bg-white"> {/* Remove pt-16 to touch header */}
          
          {/* Search Information Header */}
          {searchLocation && (
            <div className="absolute top-16 left-0 right-0 z-40 bg-white border-b border-gray-200 shadow-sm">
              <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-5 w-5 text-red-500" />
                      <div>
                        <span className="text-sm font-medium text-gray-700">Search Location:</span>
                        <span className="ml-2 text-sm text-gray-900">{searchLocation.address}</span>
                      </div>
                    </div>
                    {searchParams.get('closingDate') && (
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-5 w-5 text-blue-500" />
                        <div>
                          <span className="text-sm font-medium text-gray-700">Closing Date:</span>
                          <span className="ml-2 text-sm text-gray-900">
                            {new Date(searchParams.get('closingDate')!).toLocaleDateString('en-US', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="text-sm text-gray-500">
                    {filteredFirms.length} firms found within 25 miles
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Left Sidebar - Law Firms List */}
          <div className={`w-1/3 bg-white border-r border-gray-200 flex flex-col ${searchLocation ? 'mt-20' : ''}`}>
            {/* Header */}
            <div className="px-6 pt-4 pb-2 border-b border-gray-200 bg-white">
              <h1 className="text-2xl font-bold text-gray-900 mb-1">
                {searchLocation ? 'Nearby Law Firms' : 'Available Law Firms'}
              </h1>
              <p className="text-gray-600 text-sm">
                {filteredFirms.length} firms found {searchLocation ? 'within 25 miles' : 'in your area'}
              </p>
            </div>

            {/* Search Box */}
            <div className="px-4 pt-2 pb-1 bg-white">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search law firms..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Scrollable Law Firms List */}
            <div id="firms-scroll-container" className="flex-1 overflow-y-auto">
              <div className="p-3 space-y-2">
                {filteredFirms.map((firm) => (
                  <div
                    key={firm.id}
                    id={`firm-${firm.id}`}
                    className={`rounded-lg p-4 transition-colors cursor-pointer border ${
                      selectedFirm && selectedFirm.id === firm.id
                        ? 'bg-blue-50 border-blue-200 hover:bg-blue-100'
                        : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                    }`}
                    onClick={() => setSelectedFirm(firm)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-base font-semibold text-gray-900 flex-1">
                        {firm.name}
                      </h3>
                      <div className="text-right">
                        <div className="flex items-center space-x-1 text-xs">
                          <Star className="h-3 w-3 text-yellow-400 fill-current" />
                          <span className="font-medium">{firm.rating}</span>
                          <span className="text-gray-500">({firm.reviewCount})</span>
                        </div>
                        {firm.distance && (
                          <div className="text-xs text-blue-600 font-medium">
                            {firm.distance.toFixed(1)} miles
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-start space-x-2 text-xs text-gray-600">
                        <MapPin className="h-3 w-3 mt-0.5 flex-shrink-0" />
                        <span>{firm.address}</span>
                      </div>

                      <div className="flex items-center space-x-2 text-xs text-gray-600">
                        <Phone className="h-3 w-3 flex-shrink-0" />
                        <span>{firm.phone}</span>
                      </div>

                      <div className="flex items-center space-x-2 text-xs text-gray-600">
                        <Mail className="h-3 w-3 flex-shrink-0" />
                        <span>{firm.email}</span>
                      </div>
                    </div>

                    <div className="mt-2">
                      <div className="flex flex-wrap gap-1 mb-2">
                        {firm.specialties.map((specialty, index) => (
                          <span
                            key={index}
                            className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                      <div className="flex justify-end">
                        <button className="bg-blue-600 text-white px-2 py-1 rounded text-xs hover:bg-blue-700 transition-colors">
                          Schedule
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Additional Search Results Box */}
                {additionalSearchResults.length > 0 && (
                  <div className="mt-4 px-3">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <h3 className="text-sm font-semibold text-blue-800 mb-2">
                        Additional Results (Outside 25 Miles)
                      </h3>
                      <div className="space-y-2">
                        {additionalSearchResults.map((firm) => (
                          <div
                            key={firm.id}
                            className={`rounded-lg p-3 transition-colors cursor-pointer border ${
                              selectedFirm && selectedFirm.id === firm.id
                                ? 'bg-blue-100 border-blue-300 hover:bg-blue-200'
                                : 'bg-white border-blue-100 hover:bg-gray-50'
                            }`}
                            onClick={() => setSelectedFirm(firm)}
                          >
                            <div className="flex items-start justify-between mb-1">
                              <h4 className="text-sm font-semibold text-gray-900 flex-1">
                                {firm.name}
                              </h4>
                              <div className="text-right">
                                <div className="flex items-center space-x-1 text-xs">
                                  <Star className="h-3 w-3 text-yellow-400 fill-current" />
                                  <span className="font-medium">{firm.rating}</span>
                                  <span className="text-gray-500">({firm.reviewCount})</span>
                                </div>
                              </div>
                            </div>

                            <div className="space-y-1">
                              <div className="flex items-start space-x-2 text-xs text-gray-600">
                                <MapPin className="h-3 w-3 mt-0.5 flex-shrink-0" />
                                <span>{firm.address}</span>
                              </div>

                              <div className="flex items-center space-x-2 text-xs text-gray-600">
                                <Phone className="h-3 w-3 flex-shrink-0" />
                                <span>{firm.phone}</span>
                              </div>
                            </div>

                            <div className="mt-1">
                              <div className="flex flex-wrap gap-1 mb-2">
                                {firm.specialties.map((specialty, index) => (
                                  <span
                                    key={index}
                                    className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full"
                                  >
                                    {specialty}
                                  </span>
                                ))}
                              </div>
                              <div className="flex justify-end">
                                <button className="bg-blue-600 text-white px-2 py-1 rounded text-xs hover:bg-blue-700 transition-colors">
                                  Schedule
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Side - Map */}
          <div className={`flex-1 ${searchLocation ? 'mt-20' : ''}`}>
            <MapboxMap
              attorneys={filteredFirms}
              searchLocation={searchLocation}
              onAttorneySelect={handleAttorneySelect}
              selectedFirm={selectedFirm}
            />
          </div>
        </div>
      </div>
    </div>
  );
}