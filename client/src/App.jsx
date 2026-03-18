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
import { getRedirectResult } from 'firebase/auth';
import { auth, provider } from './utils/firebase';
import axios from 'axios';
import { setUserData } from './redux/userSlice.js';

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true); // ✅ loading state

  useEffect(() => {
    const init = async () => {
      // ✅ Check for mobile Google redirect result first
      try {
        const response = await getRedirectResult(auth);
        if (response) {
          const name = response.user.displayName;
          const email = response.user.email;
          const result = await axios.post(
            serverUrl + "/api/auth/google",
            { name, email },
            { withCredentials: true }
          );
          if (result.data.token) {
            localStorage.setItem("token", result.data.token);
          }
          dispatch(setUserData(result.data.user));
        }
      } catch (error) {
        console.log("Redirect result error:", error);
      }
      // ✅ Then fetch current user normally
      await getCurrentUser(dispatch);
      setLoading(false); // ✅ done loading
    };
    init();
  }, []);

  const { userData } = useSelector((state) => state.user);
  console.log("User Data in App.jsx:", userData);

  // ✅ Show loading screen while checking auth
  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-white'>
        <p className='text-gray-500 text-sm'>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <Routes>
        <Route path="/" element={userData ? <Home /> : <Navigate to="/auth" replace />} />
        <Route path="/auth" element={userData ? <Navigate to="/" replace /> : <Auth />} />
        <Route path="/history" element={userData ? <History /> : <Navigate to="/auth" replace />} />
        <Route path="/notes" element={userData ? <Notes /> : <Navigate to="/auth" replace />} />
        <Route path="/pricing" element={userData ? <Pricing /> : <Navigate to="/auth" replace />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment-failed" element={<PaymentFailed />} />
      </Routes>
    </>
  );
}

export default App;
