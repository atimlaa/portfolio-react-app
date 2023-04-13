import React from 'react';

const Skills = () => {
  return (
    <div name='skills' className='w-full h-screen bg-[#0a192f] text-gray-300'>
      {/* Container */}
      <div className='max-w-[1000px] mx-auto p-4 flex flex-col justify-center w-full h-full'>
        <div>
          <p className='text-4xl font-bold inline border-b-4 border-red-500'>Skills</p>
          <p className='py-4'>The technologies I have worked with:</p>
          <ul className="list pl-4">
            <li className="item pb-4">
              <h2 className='text-2xl font-bold inline border-b-4 border-red-500'>Front-End</h2>
              <p className="pl-4">ReactJS, HTML, CSS, Bootstrap, NPM, Yarn, Tailwind CSS</p>
            </li>
            <li className="item pb-4">
              <h2 className='text-2xl font-bold inline border-b-4 border-red-500'>Back-End</h2>
              <p className="pl-4">.NET, MySQL, MongoDB, AWS S3, Google BigQuery</p>
            </li>
            <li className="item pb-4">
              <h2 className='text-2xl font-bold inline border-b-4 border-red-500'>Languages</h2>
              <p className="pl-4">Java, Python, C#, C, C++, R</p>
            </li>
            <li className="item pb-4">
              <h2 className='text-2xl font-bold inline border-b-4 border-red-500'>Developer Tools</h2>
              <p className="pl-4">Git, GitHub, Selenium, Travis CI</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Skills;
