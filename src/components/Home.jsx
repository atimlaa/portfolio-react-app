import React from 'react';
import { HiArrowNarrowRight } from 'react-icons/hi';

const Home = () => {
  const downloadResume = () => {
    const link = document.createElement("a");
    link.href = "/files/resume.pdf";
    link.download = "resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div name='home' className='w-full h-screen bg-[#0a192f]'>
      {/* Container */}
      <div className='max-w-[1000px] mx-auto px-8 flex flex-col justify-center h-full'>
        <p className='text-red-500'>Hi, I am</p>
        <h1 className='text-4xl sm:text-7xl font-bold text-[#ccd6f6]'>
          ARYAN TIMLA
        </h1>
        <h2 className='text-4xl sm:text-6xl font-bold text-[#8892b0]'>
          A Data Analytics Developer.
        </h2>
        <p className='text-[#8892b0] py-4 max-w-[800px]'>
          As an aspiring professional in the software and data industry, I am enthusiastic about putting my skills to work, learning new techs, and gaining more practical experience in the industry. I am excited about what the future holds for me, and I am open to exploring new opportunities and contributing to meaningful projects.
        </p>
        <div>
          <button className='text-white group border-2 px-6 py-3 my-2 flex items-center hover:bg-pink-600 hover:border-pink-600' onClick={downloadResume}>
            Download Resume
            <span className='group-hover:rotate-90 duration-300'>
              <HiArrowNarrowRight className='ml-3' />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
