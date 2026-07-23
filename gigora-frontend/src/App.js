import { BrowserRouter as Router, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Dashboard from './pages/DashboardPage';
import Landing from './pages/Landing';
import Login from './pages/Login';
import SeoOptimizer from './pages/SeoOptimizer';
import Signup from './pages/Signup';
import { useAuth } from './context/AuthContext';

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  const location = useLocation();
  return user ? children : <Navigate to="/login" replace state={{ from: location.pathname }} />;
}

function AuthRoute({ children }) {
  const { user } = useAuth();
  return user ? <Navigate to="/dashboard" replace /> : children;
}

function AppRoutes() {
  return <div className="min-h-screen bg-slate-950 font-sans selection:bg-violet-500 selection:text-white"><Routes>
    <Route path="/" element={<Landing />} />
    <Route path="/landing" element={<Navigate to="/" replace />} />
    <Route path="/login" element={<AuthRoute><Login /></AuthRoute>} />
    <Route path="/signup" element={<AuthRoute><Signup /></AuthRoute>} />
    <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
    <Route path="/seo" element={<ProtectedRoute><SeoOptimizer /></ProtectedRoute>} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes></div>;
}

export default function App() {
  return <Router><AppRoutes /><Toaster position="top-right" toastOptions={{ duration: 2500 }} /></Router>;
}
