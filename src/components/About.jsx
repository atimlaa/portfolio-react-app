import React from 'react';
import { motion } from 'framer-motion';

const stats = [
  { value: '7+', label: 'Years Coding' },
  { value: '15+', label: 'Technologies' },
];

const facts = [
  'Data Analytics & Applications Developer',
  'Based in Lincoln, NE, United States',
  'From Nepal',
  'Open to full-time opportunities',
  'Available for freelance projects',
];

const About = () => {
  return (
    <div name='about' className='w-full min-h-screen bg-[#0a192f] text-gray-300 py-32'>
      <div className='max-w-[1000px] mx-auto px-8'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className='mb-16'
        >
          <p className='text-red-400 font-mono mb-2 text-sm tracking-wider'>01. about me</p>
          <h2 className='text-4xl font-bold text-[#ccd6f6]'>
            About Me
            <span className='block h-[3px] bg-red-500 mt-3 w-16' />
          </h2>
        </motion.div>

        <div className='grid md:grid-cols-2 gap-14 items-start'>
          {/* Left — bio text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className='space-y-5 text-[#8892b0] leading-relaxed'
          >
            <p>
              Hey 👋 Welcome to my portfolio! I'm a creative and versatile
              Developer. My goal is to use my skills and experience to bring 
              unique and impactful ideas to life.
            </p>
            <p>
              I've had the privilege of working with a diverse range of 
              projects — from school projects to media business, and from
              data analysis to web/app development.
            </p>
            <p>
              When I'm free, you can find me exploring places, seeking
              inspiration in music, playing FIFA, and connecting with
              like-minded individuals.
            </p>
            <p>
              I'm always open to new opportunities and collaborations. If you
              have a project in mind or just want to chat, feel free to reach
              out!
            </p>
          </motion.div>

          {/* Right — stats + quick facts */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className='space-y-6'
          >
            {/* Stats row */}
            <div className='grid grid-cols-3 gap-4'>
              {stats.map(({ value, label }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className='bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center hover:border-red-500/40 transition-colors duration-300'
                >
                  <p className='text-3xl font-bold text-red-400'>{value}</p>
                  <p className='text-xs text-gray-500 mt-1 leading-tight'>{label}</p>
                </motion.div>
              ))}
            </div>

            {/* Quick facts card */}
            <div className='bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-red-500/30 transition-colors duration-300'>
              <h3 className='text-[#ccd6f6] font-semibold mb-4 text-sm tracking-wider uppercase'>Quick Facts</h3>
              <ul className='space-y-3'>
                {facts.map((fact) => (
                  <li key={fact} className='flex items-start gap-3 text-[#8892b0] text-sm'>
                    <span className='text-red-400 mt-0.5 shrink-0'>▹</span>
                    {fact}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;
