import React from 'react';

const Skills = () => {
  return (
    <div name='skills' className='w-full h-screen bg-[#0a192f] text-gray-300'>
      {/* Container */}
      <div className='max-w-[1000px] mx-auto p-4 flex flex-col justify-center h-full'>
        <div>
          <h1 className='text-4xl font-bold inline border-b-4 border-red-500 mb-8'>Skills</h1>
          <p className='py-4'>The technologies I have worked with:</p>
          <ul className="list-disc pl-8">
            <li className="pb-6 transition-all duration-300 hover:bg-gray-700 hover:text-white">
              <h2 className='text-2xl font-bold inline border-b-4 border-red-500'>Front-End</h2>
              <p className="pl-8 mt-2 text-lg">ReactJS, HTML, CSS, Bootstrap, NPM, Yarn, Tailwind CSS</p>
            </li>
            <li className="pb-6 transition-all duration-300 hover:bg-gray-700 hover:text-white">
              <h2 className='text-2xl font-bold inline border-b-4 border-red-500'>Back-End</h2>
              <p className="pl-8 mt-2 text-lg">.NET, MySQL, MongoDB, AWS S3, Google BigQuery</p>
            </li>
            <li className="pb-6 transition-all duration-300 hover:bg-gray-700 hover:text-white">
              <h2 className='text-2xl font-bold inline border-b-4 border-red-500'>Languages</h2>
              <p className="pl-8 mt-2 text-lg">Java, Python, C/C++, C#, R</p>
            </li>
            <li className="pb-6 transition-all duration-300 hover:bg-gray-700 hover:text-white">
              <h2 className='text-2xl font-bold inline border-b-4 border-red-500'>Developer Tools</h2>
              <p className="pl-8 mt-2 text-lg">Git, GitHub, Selenium, Travis CI</p>
            </li>
            <li className="pb-6 transition-all duration-300 hover:bg-gray-700 hover:text-white">
              <h2 className='text-2xl font-bold inline border-b-4 border-red-500'>Other Tools</h2>
              <p className="pl-8 mt-2 text-lg">Google Analytics, Tableau, Looker Studio, Shiny, Quarto</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Skills;
