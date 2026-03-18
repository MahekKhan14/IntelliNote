import React from 'react';
import { motion } from 'motion/react';
import logo from '../assets/logo.png';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { serverUrl } from '../App';
import { setUserData } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';


function Navbar() {
    const {userData} = useSelector((state) => (state.user));
    const credits = userData.credits
    const [showCredits, setShowCredits] = useState(false)
    const [showProfile, setShowProfile] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleSignOut = async () => {
    try {
        await axios.get(serverUrl + "/api/auth/logout", { withCredentials: true })
        localStorage.removeItem("token") // ✅ clear JWT token
        dispatch(setUserData(null))
        navigate("/auth")
    } catch (error) {
        console.log(error)
        // ✅ Even if backend fails, still clear frontend state
        localStorage.removeItem("token")
        dispatch(setUserData(null))
        navigate("/auth")
    }
}
    return (
        <motion.div
        initial = {{ opacity:0, y:-60}}
        animate = {{ opacity:1, y:0}}
        transition = {{ duration : 0.7}}
        className='relative z-20 mx-6 mt-6
        rounded-2xl bg-gradient-to-br from-black/90 via-black/80 to-black/90
        backdrop-blur-2xl border border-white/10
        shadow-[0_22px_55px_rgba(0,0,0,0.75)]
        flex items-center justify-between px-8 py-4'>
            {/* Logo Left */}
            <div className='flex items-center gap-3'>
                <img src={logo} alt="Notes" className='w-9 h-9'/>
                <span className='text-lg hidden md:block font-semibold text-white'>
                    Intelli<span className='text-gray-400'>Note⭐</span>
                </span>
            </div>

            {/* Right Side */}
            <div className='flex items-center gap-6 relative'>
                {/*Credits show krenge*/}
                <div className='relative'>

                    <motion.div
                    onClick={()=>{setShowCredits(!showCredits);setShowProfile(false)}} //toggle hoga in case user clicks on credits section
                    whileHover={{scale:1.2}} whileTap={{scale:0.97}}
                    className='flex items-center gap-2
                    px-3 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm
                    shadow-md cursor-pointer'>
                        <span className='text-lg flex items-center leading-none -translate-y-[1px]'>💎</span>
                        <span className='flex items-center font-medium'>{credits}</span>
                        <motion.span 
                        whileHover={{scale:1.07}} whileTap={{scale:0.97}}
                        className='ml-1 h-6 w-6 flex items-center justify-center rounded-full bg-white text-xs font-bold'>
                            ➕
                        </motion.span>
                    </motion.div>
                    {/* showCredits ki value true hone pe hi ye div show hoga */}
                    <AnimatePresence>
                    {showCredits && 
                    <motion.div
                    initial ={{ opacity:0, y:-10, scale:0.95}}
                    animate ={{ opacity:1, y:10, scale:1}}
                    exit ={{ opacity:0, y:-10, scale:0.95}}
                    transition ={{ duration:0.3}}
                    className='absolute right-[-50px] mt-4 w-64 rounded-2xl
                    bg-black/90 backdrop-blur-xl border border-white/10
                    shadow-[0_25px_60px_rgba(0,0,0,0.7)] p-4 text-white'>
                        <h4 className='font-semibold mb-2'>Buy Credits!</h4>
                        <p className='text-sm text-gray-300 mb-4'>Use credits to generate AI notes, diagrams, and more.</p>
                        <motion.button onClick={()=>{setShowCredits(false); navigate("/pricing")}} //toggle hoga in case user clicks on credits section
                        whileHover={{scale:1.2}} whileTap={{scale:0.97}}
                        className='w-full py-2 rounded-lg bg-gradient-to-br from-white to-gray-200 text-black font-semibold hover:opacity-90'>
                            Buy More Credits 💠
                        </motion.button>
                    </motion.div> }
                    </AnimatePresence>
                </div>


                {/*Pasting the earlier div here for user profile and logout option*/}

                <div className='relative'>

                    <motion.div
                    onClick={()=>{setShowProfile(!showProfile); setShowCredits(false)}} //toggle hoga in case user clicks on profile section
                    whileHover={{scale:1.1}} whileTap={{scale:0.97}}
                    className='flex items-center gap-2
                    px-3 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm
                    shadow-md cursor-pointer'>
                        <span className='text-lg'>{userData?.name.slice(0,1).toUpperCase()}</span>
                        
                    </motion.div>

                    {/* showProfile ki value true hone pe hi ye div show hoga */}
                    <AnimatePresence>
                    {showProfile && 
                    <motion.div
                    initial ={{ opacity:0, y:-10, scale:0.95}}
                    animate ={{ opacity:1, y:10, scale:1}}
                    exit ={{ opacity:0, y:-10, scale:0.95}}
                    transition ={{ duration:0.3}}
                    className='absolute right-0 mt-4 w-52 rounded-2xl
                    bg-black/90 backdrop-blur-xl border border-white/10
                    shadow-[0_25px_60px_rgba(0,0,0,0.7)] p-4 text-white'>
                        
                        <MenuItem text="History" onClick={()=>{setShowProfile(false); navigate("/history")}}/>
                        <div className='h-px bg-white/10 mx-3'></div>
                        <MenuItem text="Sign Out" red onClick={()=>{handleSignOut()}}/>

                        
                        
                    </motion.div> }
                    </AnimatePresence>
                  
                </div>
            </div>
        </motion.div>
    )
}

function MenuItem ({onClick , text , red}){
    return(
        <div onClick={onClick}
        className={`w-full text-left px-5 py-3 text-sm
        transition-colors rounded-lg
        ${red
            ? "text-red-400 hover:bg-red-500/10"
            : "text-gray-200 hover:bg-white/10"}`}>
        {text}

        </div>
    )
}

export default Navbar;
