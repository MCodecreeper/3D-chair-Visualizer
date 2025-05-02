'use client';

import type { NextPage } from 'next';
import type { ReactElement } from 'react';
import Scene from '@/components/3d/Scene';
import ControlPanel from '@/components/ui/ControlPanel';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Home: NextPage = (): ReactElement => {
  const [isControlPanelOpen, setIsControlPanelOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleOptionClick = () => {}; // No-op function to satisfy ControlPanel prop

  return (
    <>
      <style jsx global>{`
        html,
        body {
          background: linear-gradient(135deg, #f7f9fc, #e9ecef) !important;
          margin: 0;
          padding: 0;
          height: 100%;
          width: 100%;
          overflow: hidden;
          font-family: 'Playfair Display', serif;
        }
        * {
          box-sizing: border-box;
        }
        @media (max-width: 639px) {
          html, body {
            font-size: 14px;
          }
        }
      `}</style>

      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap"
        rel="stylesheet"
      />

      <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-[#f7f9fc] to-[#e9ecef] flex flex-col">
        <div className="absolute inset-0 z-0 opacity-15" style={{
          backgroundImage: 'radial-gradient(circle, #ced4da 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}></div>

        <div className="absolute inset-0 z-[1]" aria-hidden="true">
          <Scene />
        </div>

        <header className="absolute top-10 left-4 text-left z-[10] max-w-[calc(100%-20px)] sm:left-6 md:left-10 md:max-w-[calc(100%-320px)]">
          <h1 className="text-3xl font-bold text-[#1c252e] leading-tight sm:text-4xl md:text-6xl">
            Chair Atelier
          </h1>
          <div className="flex justify-start mt-2 gap-2 sm:mt-3 sm:gap-3 md:mt-4 md:gap-4">
            <div className="w-12 h-1 bg-[#a68a3d] sm:w-16 md:w-24"></div>
            <div className="w-12 h-1 bg-[#a68a3d] sm:w-16 md:w-24"></div>
          </div>
          <p className="mt-1 text-base text-[#34495e] font-medium italic sm:text-lg md:text-xl">
            Craft Your Timeless Masterpiece
          </p>
          <p className="mt-1 text-lg text-[#a68a3d] font-semibold sm:text-xl md:text-2xl">
            Designed by <span className="text-[#00796b] font-bold">Hamza Kamran</span>
          </p>
        </header>

        <div className="absolute top-10 right-4 z-[20] sm:right-6 md:right-6">
          <button
            onClick={() => setIsControlPanelOpen((prev) => !prev)}
            className="w-full bg-[#1c252e] text-white px-4 py-2 rounded-lg text-base font-semibold hover:bg-[#2f3e4e] transition-colors duration-300 flex items-center justify-center gap-2 shadow-md sm:py-3 sm:text-xl md:py-4 md:text-xl"
          >
            <span>{isMobile ? 'Customize Chair' : 'Customize Your Chair'}</span>
            <svg
              className={`w-5 h-5 transform transition-transform duration-300 ${isControlPanelOpen ? 'rotate-180' : 'rotate-0'} sm:w-6 sm:h-6 md:w-6 md:h-6`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out ${isControlPanelOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}
          >
            <div className="bg-white border-2 border-[#a68a3d] shadow-lg rounded-tl-2xl rounded-bl-2xl mt-2 h-[calc(100vh-100px)] sm:h-[calc(100vh-120px)] md:h-[calc(100vh-100px)]">
              {isControlPanelOpen && (
                <ControlPanel setIsControlPanelOpen={setIsControlPanelOpen} onOptionClick={handleOptionClick} />
              )}
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isControlPanelOpen && !isMobile && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="absolute bottom-16 left-4 z-[15] max-w-[calc(100%-20px)] bg-white bg-opacity-95 p-2 rounded-lg shadow-lg border border-[#a68a3d] text-center sm:left-6 sm:p-3 md:left-10 md:bottom-20 md:max-w-[calc(100%-320px)] md:p-4"
            >
              <p className="text-sm text-[#34495e] font-medium sm:text-base md:text-lg">
                Explore the chair’s texture with smooth rotation and zoom.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-[#a68a3d] rounded-tl-xl z-[10] sm:w-24 sm:h-24 md:w-32 md:h-32"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-[#a68a3d] rounded-bl-xl z-[10] sm:w-24 sm:h-24 md:w-32 md:h-32"></div>
        <div className="absolute bottom-0 right-[20px] w-16 h-16 border-b-4 border-r-4 border-[#a68a3d] rounded-br-xl z-[10] sm:right-[24px] sm:w-24 sm:h-24 md:right-[320px] md:w-32 md:h-32"></div>

        <div className="absolute bottom-6 left-4 text-left z-[10] max-w-[calc(100%-20px)] sm:left-6 md:left-10 md:max-w-[calc(100%-320px)]">
          <p className="text-sm text-[#34495e] opacity-80 font-medium sm:text-base md:text-base">
            Elegantly Crafted by Atelier Designs
          </p>
        </div>

        {!isMobile && (
          <motion.a
            href="mailto:hamzakamran843@gmail.com"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="absolute bottom-6 left-4 z-[20] bg-[#a68a3d] text-white text-center py-2 px-4 rounded-lg shadow-md cursor-pointer hover:bg-[#8b6f2b] transition-colors duration-300 sm:left-6 sm:py-3 sm:px-6 md:left-10 md:bottom-6 md:py-3 md:px-6"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{ width: 'calc(100% - 32px)', maxWidth: '280px' }}
          >
            Wanna Collaborate to make something extra-ordinary ?
          </motion.a>
        )}
      </div>
    </>
  );
};

export default Home;