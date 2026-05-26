import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import RouteView from './pages/RouteView';
import LiveMap from './pages/LiveMap';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-blue-500/30">
        <main className="max-w-md mx-auto min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-purple-50/50 shadow-2xl overflow-hidden relative">
          <header className="sticky top-0 z-10 bg-white/70 backdrop-blur-md border-b border-gray-200/50 supports-[backdrop-filter]:bg-white/40">
            <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
              <h1 className="text-2xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent flex items-center gap-2 tracking-tight">
                <span className="text-2xl animate-pulse drop-shadow-sm">🚌</span> BusWhere
              </h1>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Live</span>
              </div>
            </div>
          </header>

          <div className="p-4 md:p-6 h-full pb-20">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/route/:routeId" element={<RouteView />} />
              <Route path="/map" element={<LiveMap />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;
