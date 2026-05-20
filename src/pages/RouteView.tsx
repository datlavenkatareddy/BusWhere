import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, Navigation, CheckCircle2, AlertCircle, Map as MapIcon, Share2, StopCircle } from 'lucide-react';
import { formatDistanceToNow, differenceInHours } from 'date-fns';
import { busRoutes } from '../data/routes';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';

// Fix leaflet icon path issues in React
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom Bus Icon
const busIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/3448/3448339.png',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

type BusStatus = {
  id: string;
  status: 'departed' | 'arriving' | 'delayed' | 'at_stop' | 'not_updated';
  stopName: string;
  timestamp: Date;
  updatedBy: string;
  etaMinutes?: number;
  lat?: number;
  lng?: number;
};

// Mock data to simulate Firebase for now since config is pending
const mockStatuses: Record<string, BusStatus> = {
  'j-16': {
    id: '1',
    status: 'departed',
    stopName: 'Mettuguda',
    timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 mins ago
    updatedBy: 'Student A',
    etaMinutes: 15,
    lat: 17.4330,
    lng: 78.5303,
  },
  's-28': {
    id: '2',
    status: 'at_stop',
    stopName: 'Punjagutta',
    timestamp: new Date(Date.now() - 1000 * 60 * 1), // 1 min ago
    updatedBy: 'Student B',
    lat: 17.4265,
    lng: 78.4502,
  }
};

// Component to dynamically recenter map
function ChangeView({ center }: { center: [number, number] }) {
  const map = useMap();
  map.setView(center, map.getZoom());
  return null;
}

export default function RouteView() {
  const { routeId } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<BusStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [myStop, setMyStop] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);
  
  // GPS Sharing State
  const [isSharingLocation, setIsSharingLocation] = useState(false);
  const watchIdRef = useRef<number | null>(null);
  
  const currentRoute = busRoutes.find(r => r.id === routeId);

  useEffect(() => {
    // Simulate fetching from Firebase Firestore
    const fetchStatus = () => {
      setLoading(true);
      setTimeout(() => {
        const existingStatus = routeId ? mockStatuses[routeId] : null;
        
        // If status exists and is less than 12 hours old, it's valid for today
        if (existingStatus && differenceInHours(new Date(), existingStatus.timestamp) < 12) {
          setStatus(existingStatus);
        } else {
          // If no status or it's from yesterday, show a not updated state
          setStatus({
            id: 'new',
            status: 'not_updated',
            stopName: currentRoute?.stops[0] || 'Starting Point',
            timestamp: new Date(),
            updatedBy: 'System',
          });
        }
        setLoading(false);
      }, 800);
    };
    
    fetchStatus();
    
    // Simulate real-time updates polling
    const interval = setInterval(() => {
      if (routeId && mockStatuses[routeId]) {
        setStatus(mockStatuses[routeId]);
      }
    }, 3000);
    
    return () => clearInterval(interval);
  }, [routeId, currentRoute]);

  // Clean up GPS watcher on unmount
  useEffect(() => {
    return () => stopSharingLocation();
  }, []);

  const startSharingLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    setIsSharingLocation(true);
    
    watchIdRef.current = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        
        // Push update to mock DB (simulate Firebase write)
        if (routeId) {
          const newStatus: BusStatus = {
            id: Math.random().toString(),
            status: 'departed',
            stopName: myStop || 'Moving...',
            timestamp: new Date(),
            updatedBy: 'You (Live GPS)',
            lat: latitude,
            lng: longitude,
          };
          mockStatuses[routeId] = newStatus;
          setStatus(newStatus);
        }
      },
      (error) => {
        console.error("Error getting location", error);
        alert("Failed to get location. Please enable GPS permissions.");
        setIsSharingLocation(false);
      },
      { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
    );
  };

  const stopSharingLocation = () => {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
    setIsSharingLocation(false);
  };

  const handleUpdateStatus = (newStatus: BusStatus['status']) => {
    if (!myStop.trim()) {
      alert("Please select your current stop name to update the status.");
      return;
    }
    
    setIsUpdating(true);
    // Simulate Firebase write
    setTimeout(() => {
      // If we are sharing location, keep the lat/lng, otherwise clear it or keep last known?
      // Let's just use normal status update without GPS if not sharing.
      const updatedStatus: BusStatus = {
        id: Math.random().toString(),
        status: newStatus,
        stopName: myStop,
        timestamp: new Date(),
        updatedBy: 'You',
        etaMinutes: newStatus === 'departed' ? 10 : 0
      };
      
      // If actively sharing, attach latest GPS
      if (isSharingLocation && status?.lat && status?.lng) {
        updatedStatus.lat = status.lat;
        updatedStatus.lng = status.lng;
      }
      
      setStatus(updatedStatus);
      if (routeId) {
        mockStatuses[routeId] = updatedStatus; 
      }
      setIsUpdating(false);
    }, 500);
  };

  const getStatusColor = (s: BusStatus['status']) => {
    switch (s) {
      case 'departed': return 'bg-blue-500';
      case 'arriving': return 'bg-orange-500';
      case 'at_stop': return 'bg-green-500';
      case 'delayed': return 'bg-red-500';
      case 'not_updated': return 'bg-gray-400';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (s: BusStatus['status']) => {
    switch (s) {
      case 'departed': return 'Just Left';
      case 'arriving': return 'Arriving Soon';
      case 'at_stop': return 'At Stop';
      case 'delayed': return 'Delayed';
      case 'not_updated': return 'Not Updated Yet';
      default: return 'Unknown';
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4 animate-pulse">
        <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        <p className="text-gray-500 font-medium">Finding bus...</p>
      </div>
    );
  }

  const isNotUpdated = status?.status === 'not_updated';

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out pb-10">
      {/* Header section */}
      <div className="flex items-center gap-4">
        <button 
          onClick={() => navigate('/')}
          className="p-3 bg-white/60 backdrop-blur-md rounded-2xl shadow-sm border border-white/80 hover:bg-white transition-all hover:shadow-md active:scale-95 group"
        >
          <ArrowLeft size={20} className="text-gray-600 group-hover:text-blue-600 transition-colors" />
        </button>
        <div>
          <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
            Rt {currentRoute?.routeNo} 
            {currentRoute && (
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${currentRoute.type === 'junior' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>
                {currentRoute.type}
              </span>
            )}
          </h2>
          <p className="text-sm text-blue-600 font-semibold flex items-center gap-1.5 mt-0.5">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            Real-time Status
          </p>
        </div>
      </div>

      {/* Map visualization if GPS is available */}
      {status?.lat && status?.lng && (
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-2 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/80 relative overflow-hidden h-48 w-full z-0">
           <MapContainer 
             center={[status.lat, status.lng]} 
             zoom={15} 
             scrollWheelZoom={false} 
             className="h-full w-full rounded-2xl z-0"
           >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            />
            <Marker position={[status.lat, status.lng]} icon={busIcon}>
              <Popup>
                Bus is currently here! <br/> {status.stopName}
              </Popup>
            </Marker>
            <ChangeView center={[status.lat, status.lng]} />
          </MapContainer>
        </div>
      )}

      {/* Current Status Card */}
      <div className={`bg-white/70 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/80 relative overflow-hidden group ${isNotUpdated ? 'grayscale-[0.5] opacity-90' : ''}`}>
        {/* Decorative background element */}
        <div className={`absolute -top-10 -right-10 w-48 h-48 opacity-20 rounded-full blur-3xl transition-colors duration-1000 ${status ? getStatusColor(status.status) : 'bg-gray-500'}`}></div>
        
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6 relative z-10">
          {isNotUpdated ? 'No Updates Today' : 'Latest Update'}
        </h3>
        
        <div className="flex items-start gap-5 relative z-10">
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg transition-colors duration-500 ${status ? getStatusColor(status.status) : 'bg-gray-500'} ${status?.status === 'departed' ? 'shadow-blue-500/30 animate-bounce' : 'shadow-black/5'}`}>
            {isNotUpdated ? <Clock size={32} /> : <Navigation size={32} />}
          </div>
          
          <div className="flex-1">
            <h4 className={`text-3xl font-black tracking-tight ${isNotUpdated ? 'text-gray-500' : 'text-gray-900'}`}>
              {status ? getStatusText(status.status) : 'Unknown'}
            </h4>
            
            {!isNotUpdated ? (
              <div className="flex items-center gap-2 text-gray-600 mt-2 bg-gray-50/50 w-fit px-3 py-1.5 rounded-lg border border-gray-100">
                <MapPin size={16} className="text-blue-500" />
                <span className="font-semibold">{status?.stopName || 'Unknown Stop'}</span>
              </div>
            ) : (
              <p className="text-sm font-medium text-gray-400 mt-2">
                Be the first to update the status today!
              </p>
            )}
          </div>
        </div>

        {!isNotUpdated && (
          <div className="mt-8 pt-6 border-t border-gray-100/80 flex items-center justify-between relative z-10">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
                <Clock size={16} />
                <span>Updated {status ? formatDistanceToNow(status.timestamp, { addSuffix: true }) : 'never'}</span>
              </div>
              <div className="text-xs font-semibold text-gray-400 ml-6">
                by <span className="text-gray-600">{status?.updatedBy}</span>
              </div>
            </div>
            
            {status?.etaMinutes !== undefined && status.etaMinutes > 0 && (
              <div className="px-4 py-1.5 bg-blue-50 text-blue-700 rounded-xl text-sm font-bold flex items-center gap-1.5 shadow-sm border border-blue-100/50">
                ~{status.etaMinutes}m ETA
              </div>
            )}
          </div>
        )}
      </div>

      {/* GPS Live Sharing Toggle */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-6 shadow-lg shadow-blue-500/20 text-white flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold flex items-center gap-2">
            <MapIcon size={20} /> Live GPS Tracking
          </h3>
          <p className="text-blue-100 text-sm mt-1 font-medium max-w-[200px]">
            Share real-time moving location while on the bus.
          </p>
        </div>
        
        {isSharingLocation ? (
          <button 
            onClick={stopSharingLocation}
            className="bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 px-4 py-3 rounded-xl font-bold flex items-center gap-2 transition-all active:scale-95"
          >
            <StopCircle size={18} className="text-red-300" />
            Stop
          </button>
        ) : (
          <button 
            onClick={startSharingLocation}
            className="bg-white text-blue-600 hover:bg-blue-50 px-4 py-3 rounded-xl font-bold flex items-center gap-2 transition-all active:scale-95 shadow-md"
          >
            <Share2 size={18} />
            Share
          </button>
        )}
      </div>

      {/* Update Action Area */}
      <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/80">
        <h3 className="text-xl font-bold text-gray-900 mb-1">Update Manually</h3>
        <p className="text-sm font-medium text-gray-500 mb-6">Tap a button below to update your friends instantly.</p>
        
        <div className="mb-6 relative">
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Your Current Location</label>
          <div className="relative group z-20">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <MapPin size={18} className="text-gray-400 group-focus-within:text-blue-500 transition-colors" />
            </div>
            <input 
              type="text" 
              value={myStop}
              onChange={(e) => setMyStop(e.target.value)}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
              placeholder="Select or type your stop..."
              className="w-full pl-11 pr-4 py-4 bg-white/50 backdrop-blur-sm border-2 border-gray-100/80 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none font-medium text-gray-900 shadow-sm"
            />
          </div>
          
          {/* Stops Dropdown */}
          {currentRoute && isInputFocused && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-gray-100 max-h-48 overflow-y-auto z-30 animate-in fade-in slide-in-from-top-2 duration-200">
              {currentRoute.stops
                .filter(stop => stop.toLowerCase().includes(myStop.trim().toLowerCase()))
                .map((stop, idx) => (
                  <button
                    key={idx}
                    onMouseDown={(e) => {
                      e.preventDefault(); // Prevent input onBlur from firing before click
                      setMyStop(stop);
                      setIsInputFocused(false);
                    }}
                    className="w-full text-left flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0"
                  >
                    <MapPin size={16} className="text-blue-500" />
                    <span className="font-semibold text-gray-700">{stop}</span>
                  </button>
              ))}
              {currentRoute.stops.filter(stop => stop.toLowerCase().includes(myStop.trim().toLowerCase())).length === 0 && (
                <div className="p-4 text-center text-gray-500 text-sm font-medium">
                  No matching stops found.
                </div>
              )}
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3 md:gap-4">
          <button 
            onClick={() => handleUpdateStatus('at_stop')}
            disabled={isUpdating}
            className="flex flex-col items-center justify-center p-5 rounded-2xl border-2 border-green-100 bg-gradient-to-b from-green-50 to-white text-green-700 font-bold hover:shadow-[0_8px_20px_rgba(34,197,94,0.15)] hover:border-green-200 transition-all active:scale-[0.97] disabled:opacity-50 group"
          >
            <div className="bg-green-100 p-3 rounded-full mb-3 group-hover:bg-green-200 transition-colors">
              <CheckCircle2 size={24} className="text-green-600" />
            </div>
            At Stop
          </button>
          
          <button 
            onClick={() => handleUpdateStatus('departed')}
            disabled={isUpdating}
            className="flex flex-col items-center justify-center p-5 rounded-2xl border-2 border-blue-100 bg-gradient-to-b from-blue-50 to-white text-blue-700 font-bold hover:shadow-[0_8px_20px_rgba(59,130,246,0.15)] hover:border-blue-200 transition-all active:scale-[0.97] disabled:opacity-50 group"
          >
            <div className="bg-blue-100 p-3 rounded-full mb-3 group-hover:bg-blue-200 transition-colors">
              <Navigation size={24} className="text-blue-600" />
            </div>
            Just Left
          </button>
          
          <button 
            onClick={() => handleUpdateStatus('arriving')}
            disabled={isLiverUpdateDisabled(isUpdating)}
            className="flex flex-col items-center justify-center p-5 rounded-2xl border-2 border-orange-100 bg-gradient-to-b from-orange-50 to-white text-orange-700 font-bold hover:shadow-[0_8px_20px_rgba(249,115,22,0.15)] hover:border-orange-200 transition-all active:scale-[0.97] disabled:opacity-50 group"
          >
            <div className="bg-orange-100 p-3 rounded-full mb-3 group-hover:bg-orange-200 transition-colors">
              <Clock size={24} className="text-orange-600" />
            </div>
            Arriving
          </button>
          
          <button 
            onClick={() => handleUpdateStatus('delayed')}
            disabled={isUpdating}
            className="flex flex-col items-center justify-center p-5 rounded-2xl border-2 border-red-100 bg-gradient-to-b from-red-50 to-white text-red-700 font-bold hover:shadow-[0_8px_20px_rgba(239,68,68,0.15)] hover:border-red-200 transition-all active:scale-[0.97] disabled:opacity-50 group"
          >
            <div className="bg-red-100 p-3 rounded-full mb-3 group-hover:bg-red-200 transition-colors">
              <AlertCircle size={24} className="text-red-600" />
            </div>
            Delayed
          </button>
        </div>
      </div>
    </div>
  );
}

function isLiverUpdateDisabled(isUpdating: boolean) {
  return isUpdating;
}
