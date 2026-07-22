import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import SeoOptimizer from './pages/SeoOptimizer';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/DashboardPage';

// Helper component to handle conditional layout
function MainLayout() {
  const location = useLocation();

  // Hide the public top Navbar on dashboard routes! 🛑
  const isDashboardRoute = location.pathname.startsWith('/dashboard');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {!isDashboardRoute && <Navbar />}

      <main className="flex-1 w-full flex flex-col">
        <Routes>
          {/* Default Route */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          {/* App Routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/seo" element={<SeoOptimizer />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
}