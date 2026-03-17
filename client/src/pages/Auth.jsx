import React from 'react';
import { motion } from 'framer-motion';
import { FcGoogle } from 'react-icons/fc';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, provider } from "../utils/firebase";
import axios from 'axios';
import { serverUrl } from '../App';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';

function Auth() {
    const dispatch = useDispatch()

    const serverUrl = "https://intellinoteserver.onrender.com";

    const handleGoogleAuth = async () => {
        // Google authentication logic 
        try {
            const response = await signInWithPopup(auth, provider);
            const User = response.user;
            const name = User.displayName;
            const email = User.email;
            const result = await axios.post(serverUrl + "/api/auth/google", { name, email }, { withCredentials: true });
            dispatch(setUserData(result.data))

            // Implement Google Sign-In logic here
        } catch (error) {
            console.log("Google authentication failed:", error);
        }
    }
    return (
        <div className='min-h-screen overflow-hidden bg-white text-black px-8'>

            <motion.header // Header Start
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5 }}
                //animation k liye used framer motion documentaion.

                className='max-w-7xl mx-auto mt-8 bg-black/80 
    backdrop-blur-sm 
    rounded-2xl 
    border border-white/10 px-8 py-6 
    shadow-[0_20px_45px_rgba(0,0,0,0.6)]'>
                <h1 className='text-3xl font-bold bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent'>
                    Welcome to IntelliNote⭐
                </h1>
                <p className='text-sm text-gray-300 mt-1'>
                    An AI-powered note-taking platform that transforms complex topics into structured notes, documentation, diagrams, and revision-ready content.
                </p>
            </motion.header>

            <main className='max-w-7xl mx-auto py-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center'>
                {/* Left side Content */}
                <motion.div
                    initial={{ opacity: 0, x: -60 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7 }}>
                    <h1 className='text-2xl lg:text-5xl font-extrabold leading-tight
        bg-gradient-to-br from-black/90 via-black/60 to-black/90 bg-clip-text text-transparent max-w-xl'>
                        Turn Information Into<br />
                        Intelligent Notes!
                    </h1>
                    {/*Let's Start Motion Button*/}
                    <motion.button
                        //click karne pe google auth ka function call hoga.
                        onClick={handleGoogleAuth}
                        whileHover={{
                            y: -10,
                            scale: 1.07
                        }}
                        whileTap={{ scale: 0.97 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 18 }}
                        className='mt-10 px-12 py-4 rounded-xl flex items-center gap-3 bg-gradient-to-br from-black/90 via-black/80 to-black/90
        border border-white/10 text-white font-semibold text-lg shadow-[0_25px_60px_rgba(0,0,0,0.7)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.7)]'>
                        <FcGoogle size={22} />
                        Continue with Google
                    </motion.button>

                    <p className='mt-6 max-w-xl text-lg bg-gradient-to-br from-gray-700 via-gray-500/80 to-gray-700 bg-clip-text text-transparent'>
                        You Get <span className='font-semibold'>100 FREE Credits</span> to create Exam Notes, Projects, Charts, Graphs and download them as PDF- instantly using AI.
                    </p>
                    <p className='mt-4 text-sm text-gray-500'>- Start with 100 Free credits - Upgrade anytime for more credits - Instant access -</p>
                </motion.div>

                {/* Right side Content */}
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                    {/* 640px se zada hua to 2 column me divide ho jayega, otherwise 1 column me hi rahega.*/}
                    <Feature icon="🎁" title="Free Credits" des="Get 100 FREE Credits to start creating notes." />
                    <Feature icon="📚" title="Notes" des="High-yield, AI-powered notes." />
                    <Feature icon="📂" title="Projects" des="Well structured documentation for your projects." />
                    <Feature icon="📊" title="Charts & Graphs" des="Visualize concepts with AI-generated charts and graphs." />
                    <Feature icon="💾" title="Download PDF" des="Instantly download your notes as PDF." />

                </div>


            </main>


        </div>
    )
}
function Feature({ icon, title, des }) {
    return (
        <motion.div
            whileHover={{
                y: -12,
                scale: 1.07
            }}
            transition={{ type: 'spring', stiffness: 200, damping: 18 }}
            className='relative rounded-2xl p-4
        bg-gradient-to-br from-black/90 via-black/80 to-black/90
        backdrop-blur-2xl border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.7)] text-white' style={{ transformStyle: 'preserve-3d' }}>
            <div className='relative z-10' style={{ transform: "translateZ(30px)" }}>
                <div className='text-4xl mb-2'>{icon}</div>
                <h3 className='text-lg font-semibold mb-1'>{title}</h3>
                <p className='text-gray-300 text-sm leading-relaxed'>{des}</p>
            </div>

        </motion.div>
    )
}


export default Auth;
