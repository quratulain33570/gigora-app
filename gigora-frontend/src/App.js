import React, { useState } from 'react';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  const [currentPage, setCurrentPage] = useState('login'); // 'landing', 'login', or 'signup'

  return (
    <div>
      {/* Quick switcher bar at the top for testing */}
      <div className="bg-navy text-white text-xs py-1 px-4 flex justify-end gap-3 sticky top-0 z-[100]">
        <button onClick={() => setCurrentPage('landing')} className="hover:underline">Landing Page</button>
        <span>|</span>
        <button onClick={() => setCurrentPage('login')} className="hover:underline">Login Page</button>
        <span>|</span>
        <button onClick={() => setCurrentPage('signup')} className="hover:underline">Signup Page</button>
      </div>

      {currentPage === 'landing' && <Landing />}
      {currentPage === 'login' && <Login />}
      {currentPage === 'signup' && <Signup />}
    </div>
  );
}

export default App;