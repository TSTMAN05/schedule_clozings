import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface Attorney {
  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  rating: number;
  reviewCount: number;
  specialties: string[];
  coordinates: [number, number]; // [longitude, latitude]
  distance?: number; // Distance from search location in miles
}

interface MapboxMapProps {
  attorneys: Attorney[];
  searchLocation?: {
    address: string;
    coordinates: [number, number];
  };
  onAttorneySelect?: (attorney: Attorney) => void;
  selectedFirm?: Attorney | null;
}

export default function MapboxMap({ attorneys, searchLocation, onAttorneySelect, selectedFirm }: MapboxMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const searchMarker = useRef<mapboxgl.Marker | null>(null);
  const activePopup = useRef<mapboxgl.Popup | null>(null);
  const attorneyMarkers = useRef<Map<number, { marker: mapboxgl.Marker; popup: mapboxgl.Popup }>>(new Map());


  useEffect(() => {
    const mapboxToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
    
    if (!mapboxToken) {
      console.error('Mapbox access token is required');
      return;
    }

    if (map.current || !mapContainer.current) return;

    mapboxgl.accessToken = mapboxToken;

    // Initialize map - center on search location if available, otherwise Charlotte
    const center = searchLocation?.coordinates || [-80.8431, 35.2271];
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: center,
      zoom: searchLocation ? 12 : 11,
      attributionControl: false
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Add attribution control at bottom right
    map.current.addControl(new mapboxgl.AttributionControl({
      compact: true
    }), 'bottom-right');

    map.current.on('load', () => {
      setMapLoaded(true);
    });

    // Close popups when clicking on the map (not on markers)
    map.current.on('click', (e) => {
      // Check if the click was on a marker by looking for our marker classes
      const clickedOnMarker = e.originalEvent.target &&
        (e.originalEvent.target as HTMLElement).closest('.attorney-marker, .search-marker');

      // If not clicked on a marker, close active popup
      if (!clickedOnMarker && activePopup.current) {
        activePopup.current.remove();
        activePopup.current = null;
      }
    });
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
      if (searchMarker.current) {
        searchMarker.current.remove();
        searchMarker.current = null;
      }
    };
  }, []);

  // Add search location marker
  useEffect(() => {
    if (!map.current || !mapLoaded || !searchLocation) return;

    // Remove existing search marker
    if (searchMarker.current) {
      searchMarker.current.remove();
    }

    // Create enhanced search location marker
    const searchElement = document.createElement('div');
    searchElement.className = 'search-marker';
    searchElement.style.cssText = `
      width: 30px;
      height: 42px;
      background: linear-gradient(180deg, #ef4444, #dc2626);
      border: 3px solid white;
      border-radius: 50% 50% 50% 50%;
      cursor: pointer;
      box-shadow: 0 4px 15px rgba(239, 68, 68, 0.4);
      position: relative;
      clip-path: polygon(50% 100%, 0% 0%, 100% 0%);
      transform: translate3d(0, 0, 0);
      backface-visibility: hidden;
    `;

    // Add pulsing animation
    const pulseRing = document.createElement('div');
    pulseRing.style.cssText = `
      position: absolute;
      top: 50%;
      left: 50%;
      width: 60px;
      height: 60px;
      background: rgba(239, 68, 68, 0.3);
      border-radius: 50%;
      transform: translate(-50%, -50%);
      animation: pulse 2s infinite;
    `;

    // Add inner dot with better styling
    const innerDot = document.createElement('div');
    innerDot.style.cssText = `
      width: 12px;
      height: 12px;
      background: white;
      border-radius: 50%;
      position: absolute;
      top: 35%;
      left: 50%;
      transform: translate(-50%, -50%);
      box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    `;

    // Add "You are here" text
    const textElement = document.createElement('div');
    textElement.style.cssText = `
      position: absolute;
      top: -30px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(0,0,0,0.8);
      color: white;
      padding: 3px 6px;
      border-radius: 4px;
      font-size: 9px;
      font-weight: bold;
      white-space: nowrap;
      pointer-events: none;
    `;
    textElement.textContent = 'You are here';

    searchElement.appendChild(pulseRing);
    searchElement.appendChild(innerDot);
    searchElement.appendChild(textElement);

    // Add hover effect
    searchElement.addEventListener('mouseenter', () => {
      searchElement.style.boxShadow = '0 6px 20px rgba(239, 68, 68, 0.6)';
    });

    searchElement.addEventListener('mouseleave', () => {
      searchElement.style.boxShadow = '0 4px 15px rgba(239, 68, 68, 0.4)';
    });

    // Create enhanced popup for search location
    const searchPopup = new mapboxgl.Popup({
      offset: 30,
      closeButton: true,
      closeOnClick: false
    }).setHTML(`
      <div class="p-4 max-w-xs">
        <div class="flex items-center space-x-3 mb-3">
          <div class="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
          <h3 class="font-bold text-red-600 text-lg">You are here</h3>
        </div>
        <p class="text-sm text-gray-700 mb-2 font-medium">Search Location</p>
        <p class="text-sm text-gray-600">${searchLocation.address}</p>
        <div class="mt-3 pt-2 border-t border-gray-200">
          <p class="text-xs text-gray-500">This is where you searched for nearby law firms</p>
        </div>
      </div>
    `);

    searchMarker.current = new mapboxgl.Marker({
      element: searchElement,
      anchor: 'center',
      draggable: false
    })
      .setLngLat(searchLocation.coordinates)
      .setPopup(searchPopup)
      .addTo(map.current);

  }, [searchLocation, mapLoaded]);

  useEffect(() => {
    if (!map.current || !mapLoaded || attorneys.length === 0) return;

    // Clear existing attorney markers (but keep search marker)
    const existingMarkers = document.querySelectorAll('.attorney-marker');
    existingMarkers.forEach(marker => {
      const parentMarker = marker.closest('.mapboxgl-marker');
      if (parentMarker) {
        parentMarker.remove();
      }
    });

    // Clear stored markers
    attorneyMarkers.current.clear();

    // Add markers for each attorney
    attorneys.forEach((attorney) => {
      // Create a simple marker element first
      const markerElement = document.createElement('div');
      markerElement.className = 'attorney-marker';
      markerElement.style.cssText = `
        width: 40px;
        height: 40px;
        background: #2563eb;
        border: 3px solid white;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        color: white;
        font-size: 12px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.3);
        transform: translate3d(0, 0, 0);
        backface-visibility: hidden;
      `;
      markerElement.textContent = attorney.rating.toString();

      // Create popup content - sleek and minimal
      const popupContent = `
        <div class="px-3 py-2">
          <p class="font-medium text-gray-800 text-xs whitespace-nowrap">${attorney.name}</p>
        </div>
      `;

      // Create popup with sleek styling
      const popup = new mapboxgl.Popup({
        offset: 10,
        closeButton: false,
        closeOnClick: false,
        className: 'sleek-popup'
      }).setHTML(popupContent);

      // Create marker with strict positioning - no dragging or bounce
      const marker = new mapboxgl.Marker({
        element: markerElement,
        anchor: 'center',
        draggable: false
      })
        .setLngLat(attorney.coordinates)
        .addTo(map.current!);


      // Store marker and popup for external access
      attorneyMarkers.current.set(attorney.id, { marker, popup });

      // Handle marker click
      markerElement.addEventListener('click', () => {
        // Close any existing popup
        if (activePopup.current) {
          activePopup.current.remove();
        }

        // Open this popup at the marker's location and track it as active
        popup.setLngLat(attorney.coordinates).addTo(map.current!);
        activePopup.current = popup;

        // Trigger attorney selection callback
        if (onAttorneySelect) {
          onAttorneySelect(attorney);
        }
      });
    });

    // Fit map to show all markers if there are any
    if (attorneys.length > 0 || searchLocation) {
      const bounds = new mapboxgl.LngLatBounds();
      
      // Include search location in bounds
      if (searchLocation) {
        bounds.extend(searchLocation.coordinates);
      }
      
      // Include all attorney locations
      attorneys.forEach(attorney => {
        bounds.extend(attorney.coordinates);
      });
      
      map.current.fitBounds(bounds, {
        padding: 80,
        maxZoom: 14
      });
    }

    // Cleanup function to clear active popup
    return () => {
      if (activePopup.current) {
        activePopup.current.remove();
        activePopup.current = null;
      }
    };
  }, [attorneys, searchLocation, mapLoaded, onAttorneySelect]);

  // Handle selectedFirm changes to center map and show popup
  useEffect(() => {
    if (!map.current || !mapLoaded || !selectedFirm) return;

    const attorneyData = attorneyMarkers.current.get(selectedFirm.id);
    if (attorneyData) {
      // Close any existing popup
      if (activePopup.current) {
        activePopup.current.remove();
      }

      // Center map on selected firm
      map.current.flyTo({
        center: selectedFirm.coordinates,
        zoom: 15,
        duration: 1000
      });

      // Show popup for selected firm
      attorneyData.popup.setLngLat(selectedFirm.coordinates).addTo(map.current);
      activePopup.current = attorneyData.popup;
    }
  }, [selectedFirm, mapLoaded]);

  if (!import.meta.env.VITE_MAPBOX_ACCESS_TOKEN) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-100">
        <div className="text-center p-8">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-600 text-2xl">⚠️</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Mapbox Token Required
          </h3>
          <p className="text-gray-600 text-sm">
            Please add your Mapbox access token to the environment variables.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>
        {`
          @keyframes pulse {
            0% {
              transform: translate(-50%, -50%) scale(0.8);
              opacity: 1;
            }
            100% {
              transform: translate(-50%, -50%) scale(1.4);
              opacity: 0;
            }
          }

          .sleek-popup .mapboxgl-popup-content {
            padding: 0 !important;
            border-radius: 8px !important;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
            border: 1px solid rgba(0, 0, 0, 0.1) !important;
            background: rgba(255, 255, 255, 0.95) !important;
            backdrop-filter: blur(8px) !important;
            min-width: auto !important;
          }

          .sleek-popup .mapboxgl-popup-tip {
            border-top-color: rgba(255, 255, 255, 0.95) !important;
          }
        `}
      </style>
      <div className="h-full relative">
        <div ref={mapContainer} className="h-full w-full" />
        {!mapLoaded && (
          <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading map...</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}