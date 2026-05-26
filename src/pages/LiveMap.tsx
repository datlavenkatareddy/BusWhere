import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Navigation } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { formatDistanceToNow } from 'date-fns';
import { busRoutes } from '../data/routes';

// Fix leaflet icon path issues in React
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom Bus Icons for Junior vs Senior
const createBusIcon = () => new L.Icon({
  iconUrl: '/mini_bus.png', // We can use hue filters in CSS if needed, but for MVP standard icon works
  iconSize: [48, 48],
  iconAnchor: [24, 24],
  popupAnchor: [0, -20],
});

type BusStatus = {
  id: string;
  routeId: string;
  status: 'departed' | 'arriving' | 'delayed' | 'at_stop';
  stopName: string;
  timestamp: Date;
  updatedBy: string;
  lat: number;
  lng: number;
};

// Mock data: Several active buses spread around Hyderabad
const mockGlobalStatuses: BusStatus[] = [
  {
    id: '1',
    routeId: 'j-16',
    status: 'departed',
    stopName: 'Mettuguda',
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    updatedBy: 'Student A',
    lat: 17.4330,
    lng: 78.5303,
  },
  {
    id: '2',
    routeId: 's-28',
    status: 'at_stop',
    stopName: 'Punjagutta',
    timestamp: new Date(Date.now() - 1000 * 60 * 1),
    updatedBy: 'Student B',
    lat: 17.4265,
    lng: 78.4502,
  },
  {
    id: '3',
    routeId: 'j-42',
    status: 'arriving',
    stopName: 'Attapur',
    timestamp: new Date(Date.now() - 1000 * 60 * 8),
    updatedBy: 'Student C',
    lat: 17.3685,
    lng: 78.4385,
  },
  {
    id: '4',
    routeId: 's-66',
    status: 'departed',
    stopName: 'Kukatpally',
    timestamp: new Date(Date.now() - 1000 * 60 * 2),
    updatedBy: 'Student D',
    lat: 17.4849,
    lng: 78.4138,
  }
];

export default function LiveMap() {
  const navigate = useNavigate();
  const [statuses, setStatuses] = useState<BusStatus[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate fetching all active buses from Firebase
    const fetchAllBuses = () => {
      setLoading(true);
      setTimeout(() => {
        setStatuses(mockGlobalStatuses);
        setLoading(false);
      }, 600);
    };
    
    fetchAllBuses();
  }, []);

  const getStatusText = (s: BusStatus['status']) => {
    switch (s) {
      case 'departed': return 'Just Left';
      case 'arriving': return 'Arriving Soon';
      case 'at_stop': return 'At Stop';
      case 'delayed': return 'Delayed';
      default: return 'Unknown';
    }
  };

  return (
    <div className="flex flex-col h-screen animate-in fade-in duration-700 ease-out bg-gray-50 relative">
      {/* Floating Header */}
      <div className="absolute top-4 left-4 right-4 z-50 flex items-center justify-between">
        <button 
          onClick={() => navigate('/')}
          className="p-3 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-white hover:bg-white transition-all active:scale-95 group"
        >
          <ArrowLeft size={20} className="text-gray-600 group-hover:text-blue-600 transition-colors" />
        </button>
        
        <div className="bg-white/90 backdrop-blur-md px-5 py-3 rounded-2xl shadow-lg border border-white flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
          <h2 className="font-extrabold text-gray-900 tracking-tight">Live Campus Map</h2>
        </div>
      </div>

      {loading ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          <p className="text-gray-500 font-medium">Locating fleet...</p>
        </div>
      ) : (
        <div className="flex-1 w-full relative z-0">
          <MapContainer 
            center={[17.4330, 78.4502]} // Center of Hyderabad broadly
            zoom={12} 
            zoomControl={false}
            className="h-full w-full z-0"
          >
            <TileLayer
              attribution='&copy; OpenStreetMap'
              url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            />
            
            {statuses.map(bus => {
              const routeInfo = busRoutes.find(r => r.id === bus.routeId);
              
              return (
                <Marker 
                  key={bus.id} 
                  position={[bus.lat, bus.lng]} 
                  icon={createBusIcon()}
                >
                  <Popup className="rounded-2xl overflow-hidden shadow-xl border-0">
                    <div className="flex flex-col w-56 -m-1">
                      <div className="bg-blue-50 p-3 pb-2 border-b border-blue-100 flex items-center justify-between">
                        <div className="font-bold text-gray-900 text-sm">
                          Rt {routeInfo?.routeNo}
                        </div>
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${routeInfo?.type === 'junior' ? 'bg-blue-200 text-blue-800' : 'bg-purple-200 text-purple-800'}`}>
                          {routeInfo?.type}
                        </span>
                      </div>
                      
                      <div className="p-3">
                        <div className="flex items-start gap-2 mb-2">
                          <Navigation size={14} className="text-blue-500 mt-0.5 shrink-0" />
                          <div>
                            <p className="text-xs font-bold text-gray-900 leading-tight">{getStatusText(bus.status)}</p>
                            <p className="text-xs text-gray-500 leading-tight">{bus.stopName}</p>
                          </div>
                        </div>
                        
                        <div className="text-[10px] text-gray-400 mb-3 border-t border-gray-100 pt-2">
                          Updated {formatDistanceToNow(bus.timestamp, { addSuffix: true })} by {bus.updatedBy}
                        </div>
                        
                        <button 
                          onClick={() => navigate(`/route/${bus.routeId}`)}
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2 rounded-xl transition-colors text-center"
                        >
                          View Route Details
                        </button>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
        </div>
      )}
    </div>
  );
}
