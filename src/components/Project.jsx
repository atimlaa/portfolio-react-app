import React from "react";
import ProjectCard from "./ProjectCard";
import ProjetConduit from "../assets/project_conduit_logo.png"
import pyP3DB from "../assets/pyp3db_logo.png"
import TBF from "../assets/tbf_logo.png"

const Project = () => {
  return (
    <div name='projects-container' className='w-full h-screen bg-[#0a192f] text-gray-300'>

    <div className="max-w-[1000px] mx-auto flex flex-col justify-center w-full h-full">
        <div className='sm:text-left'>
            <p className='text-4xl font-bold inline border-b-4 border-pink-600'>Projects</p>
        </div>

        <div className="projects-row">
        <ProjectCard
          title="Project Conduit"
          imageSrc={ProjetConduit}
          description={`Senior Design Project
          
          This project goal was to redesign and build a website framework for protein modification data. 
          The new version of P3DB redesigned and generalized to host and display data sets in a more flexible, comprehensive, and secure way. 
          
          Python-Django is used to connect the front-end design such as integration with Bootstrap and the backend with flexible database solutions both Mysql and MongoDB.`}
        />
        <ProjectCard
          title="pyP3DB"
          imageSrc={pyP3DB}
          description={`Senior Design Project
          
          This project goal was to redesign and build a website framework for protein modification data. 
          The new version of P3DB redesigned and generalized to host and display data sets in a more flexible, comprehensive, and secure way. 
          
          Python-Django is used to connect the front-end design such as integration with Bootstrap and the backend with flexible database solutions both Mysql and MongoDB.`}
        
        />
        <ProjectCard
          title={`TBF Financial
          Financial Management System`}
          imageSrc={TBF}
          description={`Senior Design Project
          
          This project goal was to redesign and build a website framework for protein modification data. 
          The new version of P3DB redesigned and generalized to host and display data sets in a more flexible, comprehensive, and secure way. 
          
          Python-Django is used to connect the front-end design such as integration with Bootstrap and the backend with flexible database solutions both Mysql and MongoDB.`}
        
        />
      </div>
    </div>
    </div>
  );
};

export default Project;
