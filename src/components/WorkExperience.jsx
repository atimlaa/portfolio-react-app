import React from 'react';

const WorkExperience = () => {
  return (
    <div className="bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-semibold text-gray-800">Work Experience</h2>
        <div className="mt-4">
          {/* Replace the following with your actual work experience details */}
          <div className="flex items-center mb-8">
            <img
              src="/company-logo.png"
              alt="NPM Logo"
              className="w-12 h-12 mr-4 rounded-full object-cover"
            />
            <div>
              <h3 className="text-xl font-semibold text-gray-700">Data Analyst</h3>
              <p className="text-gray-600">Nebraska Public Media - August 2022 to Present</p>
              <p className="mt-2 text-gray-800">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac tincidunt lectus, non facilisis lorem.
              </p>
            </div>
          </div>
          {/* Add more work experience entries as needed */}
        </div>
      </div>
    </div>
  );
};

export default WorkExperience;
