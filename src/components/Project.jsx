import React from "react";
import ProjectCard from "./ProjectCard";
import ProjetConduit from "../assets/project_conduit_logo.png";
import pyP3DB from "../assets/pyp3db_logo.png";
import TBF from "../assets/tbf_logo.png";

const Project = () => {
  return (
    <div
      name="projects-container"
      className="w-full bg-[#0a192f] text-gray-300 py-8"
    >
      <div className="max-w-[1000px] mx-auto flex flex-col justify-center w-full h-full">
        <div className="sm:text-left">
          <p className="text-4xl font-bold inline border-b-4 border-red-500 mb-8">
            Projects
          </p>
        </div>

        <div className="projects-row">
          <ProjectCard
            title="Project Conduit"
            imageSrc={ProjetConduit}
            description={`Data Pipeline Project
          
          Focused on automating data extraction, aggregation, analysis, and reporting for Nebraska Public Media, centralizing NPM's data into one centralized location of truth, towards the goal of making reporting more accurate, credible, and durable.

          Tech Stack:
          Apache Airflow, Python, R, PySpark, Google BigQuery, Google Cloud Storage, Google DataProc, Google Data Studio, Shiny, and many more`}
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
            description={`OOP Class Project
          
            The multi-tier system uses object-oriented programming in Java, keeping TBF’s business model in mind. 
            The program communicates between the classes and generates a summary eport, and a detailed report for each portfolio.
            
            The different objects in the program are represented through tables in MySQL with foreign key relationships. To connect classes with the MySQL database JDBC API is used.`}
            />
        </div>
      </div>
    </div>
  );
};

export default Project;
