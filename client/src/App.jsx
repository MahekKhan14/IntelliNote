import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Auth from './pages/Auth.jsx';
export const serverUrl = "https://intellinoteserver.onrender.com";
import { getCurrentUser } from './services/api.js';
import { useDispatch, useSelector } from 'react-redux';
import Notes from './pages/Notes.jsx';
import Pricing from './pages/Pricing.jsx';
import History from './pages/History.jsx';
import PaymentSuccess from './pages/PaymentSuccess.jsx';
import PaymentFailed from './pages/PaymentFailed.jsx';

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true); // ✅ only change

  useEffect(() => {
    // Fetch current user details only once when the app loads
    getCurrentUser(dispatch).finally(() => setLoading(false)); // ✅ only change
  }, []);

  const { userData } = useSelector((state) => state.user);
  console.log("User Data in App.jsx:", userData);

  // ✅ Wait before redirecting
  if (loading) return <div className='min-h-screen flex items-center justify-center'><p>Loading...</p></div>;

  return (
    <>
      <Routes>
        {/* ✅ Corrected redirect logic */}
        <Route path="/" element={userData ? <Home /> : <Navigate to="/auth" replace />} />
        <Route path="/auth" element={userData ? <Navigate to="/" replace /> : <Auth />} />
        <Route path="/history" element={userData ? <History/> : <Navigate to="/auth" replace/>} />
        <Route path="/notes" element={userData ? <Notes/> : <Navigate to="/auth" replace/>} />
        <Route path="/pricing" element={userData ? <Pricing/> : <Navigate to="/auth" replace/>}/>
        <Route path="/payment-success" element={<PaymentSuccess/>}/>
        <Route path="/payment-failed" element={<PaymentFailed/>}/>
      </Routes>
    </>
  );
}

export default App;
