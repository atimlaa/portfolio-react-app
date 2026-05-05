import React from 'react';
import { HiArrowNarrowRight } from 'react-icons/hi';
import { TypeAnimation } from 'react-type-animation';
import { motion } from 'framer-motion';
import Resume from "../assets/resume.pdf";

const Home = () => {
  const downloadResume = () => {
    const link = document.createElement("a");
    link.href = Resume;
    link.download = "resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div name='home' className='relative w-full h-screen bg-[#0a192f] overflow-hidden'>
      {/* Animated dot-grid background */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e3a5f_1px,transparent_1px)] [background-size:32px_32px] opacity-40" />

      {/* Glowing orbs */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl animate-pulse" />
      <div
        className="absolute bottom-1/3 left-1/4 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: '1.5s' }}
      />

      <div className='relative max-w-[1000px] mx-auto px-8 flex flex-col justify-center h-full'>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='text-red-400 font-mono text-lg mb-3 tracking-wider'
        >
          Hi, my name is
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className='text-5xl sm:text-7xl font-bold text-[#ccd6f6] leading-tight'
        >
          Aryan Timla.
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className='mt-2'
        >
          <TypeAnimation
            sequence={[
              'An Applications Developer.',
              2200,
              'A Data Analytics Specialist.',
              2200,
              'A Problem Solver.',
              2200,
            ]}
            wrapper="h2"
            speed={55}
            repeat={Infinity}
            className='text-3xl sm:text-5xl font-bold text-[#8892b0]'
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className='text-[#8892b0] py-6 max-w-[560px] leading-relaxed'
        >
          A professional passionate about data analytics and software
          development. 
          I build things that make data meaningful and applications
          that matter.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className='flex gap-4 flex-wrap'
        >
          <button
            onClick={downloadResume}
            className='group border border-red-500 text-red-400 px-8 py-3 flex items-center gap-2 hover:bg-red-500/10 transition-all duration-300 font-mono text-sm tracking-wider rounded-sm'
          >
            Download Resume
            <HiArrowNarrowRight className='group-hover:translate-x-2 transition-transform duration-300' />
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
