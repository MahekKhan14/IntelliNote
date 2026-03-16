import React from 'react';
import Navbar from '../components/Navbar.jsx';
import { motion } from 'motion/react';
import img from '../assets/img1.png';
import Footer from '../components/Footer.jsx';
import { useNavigate } from 'react-router-dom';
function Home() {
    const navigate = useNavigate()
    return (
        <div className='min-h-screen overflow-hidden bg-white text-black'>
            <Navbar />
            {/* Top */}
            <section className='max-w-7xl mx-auto px-8 pt-32 grid grid-cols-1
            lg:grid-cols-2 gap-20 items-center'>
                <div>
                    <motion.div
                        initial={{ opacity: 0, x: -60 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7 }}
                        whileHover={{ rotateX: 6, rotateY: -6 }}
                        className='transform-gpu'
                        style={{ transformStyle: "preserve-3d" }}>
                        <motion.h1
                            whileHover={{ y: -4 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            style={{ transform: 'translateZ(40px)', textShadow: '0 18px 40px rgba(0,0,0,0.25)' }}
                            className='text-5xl lg:text-6xl font-extrabold leading-tight
                        bg-gradient-to-br from-black/90 via-black/60 to-black/90
                        bg-clip-text text-transparent'>
                            Create Smart <br />AI Notes in Seconds.
                        </motion.h1>

                        <motion.p
                            whileHover={{ y: -2 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            style={{ transform: 'translateZ(40px)', textShadow: '0 18px 40px rgba(0,0,0,0.25)' }}
                            className='mt-6 max-w-xl text-lg
                        bg-gradient-to-br from-gray-700 via-gray-500/80 to-gray-700
                        bg-clip-text text-transparent'>
                            Turn complex concepts into clean, structured notes, project documentation, and
                            visual learning materials using AI — built for faster learning and better understanding.
                        </motion.p>

                    </motion.div>

                     {/*Let's Start with Button*/}
                        <motion.button
                            onClick={() => navigate("/notes")}

                            whileHover={{

                                scale: 1.07
                            }}
                            whileTap={{ scale: 0.97 }}
                            
                            className='mt-10 px-12 py-4 rounded-xl flex items-center gap-3 bg-gradient-to-br from-black/90 via-black/80 to-black/90
                                border border-white/10 text-white font-semibold text-lg shadow-[0_25px_60px_rgba(0,0,0,0.7)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.7)]'>

                            Get Started
                        </motion.button>

                </div>

                {/*Right one for image*/}
                <motion.div
                    className='transform-gpu'
                    style={{ transformStyle: 'preserve-3d' }}
                    initial={{ opacity: 0, x: 60 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, type: 'spring', stiffness: 200, damping: 18 }}
                    whileHover={{
                        y: -12,
                        scale: 1.05,
                    }}>
                    <div className='overflow-hidden'>
                        <img src={img} alt='img'
                            style={{ transform: "translateZ(35px)" }} />
                    </div>

                </motion.div>


            </section>

            {/* Bottom */}
            <section className='max-w-6xl mx-auto px-8 py-32 grid grid-cols-1 md:grid-cols-4 gap-10'>
                <Feature icon="📚" title="Quick Revision" des="Clear, structured and concise notes designed for fast understanding and easy review." />
                <Feature icon="📂" title="Project Documentation" des="Create structured project notes, explanations, and documentation instantly with AI." />
                <Feature icon="📊" title="Flow Diagrams" des="Visualize ideas and workflows with AI-generated diagrams." />
                <Feature icon="⬇️" title="Export as PDF" des="Instantly export your notes and diagrams into a neatly formatted PDF." />



            </section>
            <Footer />

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


export default Home;