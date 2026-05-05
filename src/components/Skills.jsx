import React from 'react';
import { motion } from 'framer-motion';

const categories = [
  {
    name: 'Front-End',
    emoji: '🖥️',
    color: 'text-blue-400 border-blue-500/30 bg-blue-500/5 hover:border-blue-400/60',
    dot: 'bg-blue-400',
    skills: ['ReactJS', 'HTML', 'CSS', 'Bootstrap', 'Tailwind CSS', 'NPM', 'Fiori', 'SAPUI5'],
  },
  {
    name: 'Back-End & Cloud',
    emoji: '⚙️',
    color: 'text-green-400 border-green-500/30 bg-green-500/5 hover:border-green-400/60',
    dot: 'bg-green-400',
    skills: ['.NET', 'MySQL', 'MongoDB', 'AWS S3', 'AWS Beanstalk', 'Google BigQuery', 'Google Cloud Storage'],
  },
  {
    name: 'Languages',
    emoji: '💻',
    color: 'text-purple-400 border-purple-500/30 bg-purple-500/5 hover:border-purple-400/60',
    dot: 'bg-purple-400',
    skills: ['Python', 'Java', 'C / C++', 'C#', 'R', 'ABAP'],
  },
  {
    name: 'Developer Tools',
    emoji: '🔧',
    color: 'text-orange-400 border-orange-500/30 bg-orange-500/5 hover:border-orange-400/60',
    dot: 'bg-orange-400',
    skills: ['Git', 'GitHub', 'GitLab', 'Selenium', 'Travis CI'],
  },
  {
    name: 'Analytics & BI',
    emoji: '📊',
    color: 'text-yellow-400 border-yellow-500/30 bg-yellow-500/5 hover:border-yellow-400/60',
    dot: 'bg-yellow-400',
    skills: ['Google Analytics', 'Tableau', 'Looker Studio', 'Shiny', 'Quarto'],
  },
];

const chipVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, delay: i * 0.05 },
  }),
};

const Skills = () => {
  return (
    <div name='skills' className='w-full min-h-screen bg-[#0a192f] text-gray-300 py-32'>
      <div className='max-w-[1000px] mx-auto px-8'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className='mb-16'
        >
          <p className='text-red-400 font-mono mb-2 text-sm tracking-wider'>02. what I work with</p>
          <h2 className='text-4xl font-bold text-[#ccd6f6]'>
            Skills
            <span className='block h-[3px] bg-red-500 mt-3 w-16' />
          </h2>
        </motion.div>

        <div className='space-y-12'>
          {categories.map((cat, catIdx) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: catIdx * 0.08 }}
              viewport={{ once: true }}
            >
              <h3 className='text-[#ccd6f6] font-semibold mb-4 flex items-center gap-2 text-lg'>
                <span>{cat.emoji}</span>
                {cat.name}
              </h3>
              <div className='flex flex-wrap gap-3'>
                {cat.skills.map((skill, i) => (
                  <motion.span
                    key={skill}
                    custom={i}
                    variants={chipVariants}
                    initial='hidden'
                    whileInView='visible'
                    whileHover={{ y: -4, scale: 1.05 }}
                    viewport={{ once: true }}
                    className={`flex items-center gap-2 border px-4 py-2 rounded-lg text-sm font-mono cursor-default transition-all duration-300 ${cat.color}`}
                  >
                    <span className={`w-2 h-2 rounded-full shrink-0 ${cat.dot}`} />
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;
