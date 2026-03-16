import React, { useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Auth from './pages/Auth.jsx';
export const serverUrl = "http://localhost:8000";
import { getCurrentUser } from './services/api.js';
import { useDispatch, useSelector } from 'react-redux';
import Notes from './pages/Notes.jsx';
import Pricing from './pages/Pricing.jsx';
import History from './pages/History.jsx';
import  PaymentSuccess  from  './pages/PaymentSuccess';
import  PaymentFailed  from  './pages/PaymentFailed';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch current user details only once when the app loads
    getCurrentUser(dispatch);
  }, []); // ✅ changed from [dispatch] to []

  const { userData } = useSelector((state) => state.user);
  console.log("User Data in App.jsx:", userData);

  return (
    <>
      <Routes>
        {/* ✅ Corrected redirect logic */}
        <Route
          path="/"
          element={userData ? <Home /> : <Navigate to="/auth" replace />}
        />
        <Route
          path="/auth"
          element={userData ? <Navigate to="/" replace /> : <Auth />}
        />
        <Route
          path="/history"
          element={userData ? <History/> : <Navigate to="/auth" replace/>}
        />
        <Route
          path="/notes"
          element={userData ? <Notes/> : <Navigate to="/auth" replace/>}
        />
        <Route
          path="/pricing"
          element={userData ? <Pricing/> : <Navigate to="/auth" replace/>}/>
        <Route
          path="/payment-success"
          element={<PaymentSuccess/>}/>
        <Route
          path="/payment-failed"
          element={<PaymentFailed/>}/>

      </Routes>




    </>
  );
}

export default App;
