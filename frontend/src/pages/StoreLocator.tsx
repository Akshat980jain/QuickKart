import React, { useState } from 'react';
import { 
  MapPin, 
  Navigation, 
  Phone, 
  Clock, 
  CheckCircle, 
  Sparkles,
  Search,
  ChevronRight
} from 'lucide-react';
import { MOCK_STORES } from '../data/mockExtraPagesData';

const StoreLocator: React.FC = () => {
  const [selectedStoreId, setSelectedStoreId] = useState<string>(MOCK_STORES[0].id);
  const [searchCity, setSearchCity] = useState('');

  const selectedStore = MOCK_STORES.find(s => s.id === selectedStoreId) || MOCK_STORES[0];

  const filteredStores = MOCK_STORES.filter(s => 
    s.name.toLowerCase().includes(searchCity.toLowerCase()) || 
    s.city.toLowerCase().includes(searchCity.toLowerCase()) ||
    s.address.toLowerCase().includes(searchCity.toLowerCase())
  );

  return (
    <div className="bg-[#f8f9fa] dark:bg-[#0e1512] min-h-screen text-[#191c1d] dark:text-[#e1e3e4] py-12 px-4 sm:px-6 transition-colors duration-300">
      <div className="max-w-[1280px] mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#fd6c1a] bg-[#fd6c1a]/10 px-3.5 py-1 rounded-full">
            Physical Boutiques & Pickups
          </span>
          <h1 className="font-headline font-bold text-4xl sm:text-5xl tracking-tight">Store & Pavilion Locator</h1>
          <p className="text-gray-600 dark:text-gray-400 text-base">
            Visit our flagship experience pavilions for personal concierge consultations, watch winder testing, and same-day order pickup.
          </p>
        </div>

        {/* Search Input Bar */}
        <div className="max-w-md mx-auto relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by city, landmark, or postal code..."
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)}
            className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-white dark:bg-[#1c2722] border border-gray-200 dark:border-[#2e3a35] text-sm focus:outline-none focus:ring-2 focus:ring-[#fd6c1a] shadow-sm"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Stores List */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="font-headline font-semibold text-lg">Nearby Outlets ({filteredStores.length})</h3>
            
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-1 scrollbar-thin">
              {filteredStores.map((store) => {
                const isSelected = store.id === selectedStoreId;
                return (
                  <div
                    key={store.id}
                    onClick={() => setSelectedStoreId(store.id)}
                    className={`p-6 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-white dark:bg-[#1c2722] border-[#fd6c1a] shadow-md ring-2 ring-[#fd6c1a]/20'
                        : 'bg-white/60 dark:bg-[#1c2722]/60 border-gray-200 dark:border-[#2e3a35] hover:border-gray-300'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-base text-[#191c1d] dark:text-white">{store.name}</h4>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-100 dark:bg-emerald-900/40 dark:text-emerald-400 px-2 py-0.5 rounded-full">
                        {store.distanceKm} km
                      </span>
                    </div>

                    <p className="text-xs text-gray-500 mb-3">{store.address}, {store.city}</p>

                    <div className="space-y-1.5 text-xs text-gray-600 dark:text-gray-300">
                      <p className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-gray-400" /> {store.hours}
                      </p>
                      <p className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-gray-400" /> {store.phone}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {store.amenities.map(a => (
                        <span key={a} className="text-[10px] bg-[#f8f9fa] dark:bg-[#0e1512] text-gray-600 dark:text-gray-400 px-2 py-1 rounded-md border border-gray-200 dark:border-[#2e3a35]">
                          {a}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Simulated Interactive Map & Details */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Map Graphic Container */}
            <div className="bg-[#00241a] rounded-3xl h-[380px] relative overflow-hidden flex items-center justify-center border border-[#0d3b2e] shadow-xl">
              {/* Grid map overlay styling */}
              <div className="absolute inset-0 bg-[radial-gradient(#234e40_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />
              
              {/* Map pin marker */}
              <div className="relative z-10 text-center space-y-2 animate-bounce">
                <div className="w-14 h-14 rounded-full bg-[#fd6c1a] text-white flex items-center justify-center mx-auto shadow-2xl ring-4 ring-[#fd6c1a]/30">
                  <MapPin className="w-7 h-7" />
                </div>
                <div className="bg-black/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg border border-white/20">
                  {selectedStore.name}
                </div>
              </div>

              <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-md text-white text-[10px] px-3 py-1.5 rounded-lg border border-white/10">
                Lat: {selectedStore.lat}° N, Lng: {selectedStore.lng}° E
              </div>
            </div>

            {/* Selected Store Detailed Card */}
            <div className="bg-white dark:bg-[#1c2722] p-8 rounded-3xl border border-gray-200 dark:border-[#2e3a35] shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 dark:border-[#2e3a35] pb-6">
                <div>
                  <h3 className="font-headline font-bold text-2xl mb-1">{selectedStore.name}</h3>
                  <p className="text-sm text-gray-500">{selectedStore.address}, {selectedStore.city}</p>
                </div>
                <button
                  onClick={() => window.open(`https://maps.google.com/?q=${selectedStore.lat},${selectedStore.lng}`)}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#00241a] dark:bg-[#234e40] text-white text-xs font-semibold hover:bg-[#0d3b2e] transition-colors"
                >
                  <Navigation className="w-4 h-4 text-[#fd6c1a]" /> Get Directions
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
                <div>
                  <h5 className="font-semibold text-xs text-gray-400 uppercase mb-2">Operating Hours</h5>
                  <p className="font-medium text-[#191c1d] dark:text-white">{selectedStore.hours}</p>
                </div>
                <div>
                  <h5 className="font-semibold text-xs text-gray-400 uppercase mb-2">Direct Contact</h5>
                  <p className="font-medium text-[#191c1d] dark:text-white">{selectedStore.phone}</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default StoreLocator;
