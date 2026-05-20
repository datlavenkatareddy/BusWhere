import { useState, useMemo } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, ArrowRight, Bus, ChevronRight, User, Users } from 'lucide-react';
import { busRoutes } from '../data/routes';

export default function Home() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter routes based on search query (by route no, name, or stop)
  const filteredRoutes = useMemo(() => {
    if (!searchQuery.trim()) return [];
    
    const query = searchQuery.toLowerCase();
    return busRoutes.filter(route => 
      route.routeNo.includes(query) || 
      route.name.toLowerCase().includes(query) ||
      route.stops.some(stop => stop.toLowerCase().includes(query))
    ).slice(0, 5); // show top 5 matches
  }, [searchQuery]);

  const handleJoin = (e: FormEvent) => {
    e.preventDefault();
    if (filteredRoutes.length > 0) {
      navigate(`/route/${filteredRoutes[0].id}`);
    } else {
      // Find exact match if any, else nothing
      const exact = busRoutes.find(r => r.routeNo === searchQuery.trim());
      if (exact) navigate(`/route/${exact.id}`);
    }
  };

  // Recent dummy routes based on the real data
  const recentRoutes = [
    busRoutes.find(r => r.routeNo === '16' && r.type === 'junior'),
    busRoutes.find(r => r.routeNo === '28' && r.type === 'junior')
  ].filter(Boolean) as typeof busRoutes;

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
      <div className="bg-white/60 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/80 p-8 flex flex-col items-center text-center gap-5 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500"></div>
        
        <div className="w-20 h-20 bg-gradient-to-br from-blue-50 to-indigo-50 text-blue-600 rounded-2xl flex items-center justify-center mb-2 shadow-inner border border-blue-100/50 transform -rotate-3 hover:rotate-0 transition-transform duration-300">
          <Bus size={40} className="drop-shadow-sm" />
        </div>
        
        <div className="space-y-2">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">CBIT Bus Status</h2>
          <p className="text-gray-500 font-medium max-w-[280px] mx-auto leading-relaxed text-sm">
            Stop asking WhatsApp. Find your CBIT bus and see instant live updates.
          </p>
        </div>

        <div className="w-full mt-6 relative">
          <form onSubmit={handleJoin} className="relative group z-20">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-transform group-focus-within:scale-110 group-focus-within:text-blue-500">
              <Search className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-12 pr-4 py-4 border-2 border-gray-100/80 rounded-2xl leading-5 bg-white/50 backdrop-blur-sm placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium text-gray-900 shadow-sm"
              placeholder="Search route no, name, or stop..."
              required
            />
          </form>

          {/* Autocomplete Dropdown */}
          {searchQuery.trim() !== '' && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden z-30 animate-in fade-in slide-in-from-top-2 duration-200">
              {filteredRoutes.length > 0 ? (
                <div className="max-h-64 overflow-y-auto p-2">
                  {filteredRoutes.map((route) => (
                    <button
                      key={route.id}
                      onClick={() => navigate(`/route/${route.id}`)}
                      className="w-full text-left flex items-start gap-3 p-3 hover:bg-gray-50 rounded-xl transition-colors group"
                    >
                      <div className={`p-2 rounded-lg mt-0.5 ${route.type === 'junior' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'}`}>
                        {route.type === 'junior' ? <User size={16} /> : <Users size={16} />}
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-gray-900 flex items-center gap-2">
                          Rt {route.routeNo} - {route.name}
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${route.type === 'junior' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>
                            {route.type}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500 mt-1 line-clamp-1 group-hover:text-gray-700 transition-colors">
                          Via: {route.stops.slice(0, 4).join(', ')}...
                        </div>
                      </div>
                      <ChevronRight size={18} className="text-gray-300 self-center group-hover:text-blue-500 transition-colors" />
                    </button>
                  ))}
                </div>
              ) : (
                <div className="p-6 text-center text-gray-500 text-sm font-medium">
                  No routes found for "{searchQuery}"
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-3 mt-4">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-2 mb-1">
          Recent Routes
        </h3>
        {recentRoutes.map((route, i) => (
          <button
            key={route.id}
            onClick={() => navigate(`/route/${route.id}`)}
            className="flex items-center justify-between p-4 bg-white/60 backdrop-blur-md rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-white/60 hover:bg-white hover:border-blue-100 transition-all group active:scale-[0.98] transform hover:-translate-y-1"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <div className="flex items-center gap-4">
              <div className="bg-gray-50/80 p-3 rounded-xl text-gray-400 group-hover:text-blue-600 group-hover:bg-blue-50 group-hover:shadow-inner transition-all">
                <MapPin size={20} />
              </div>
              <span className="font-semibold text-gray-700 group-hover:text-gray-900 transition-colors">
                {route.name}
              </span>
            </div>
            <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
              <ArrowRight size={16} className="text-gray-300 group-hover:text-blue-600 transition-colors group-hover:translate-x-0.5 transform" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
