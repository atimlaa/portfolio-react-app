import React from "react";
import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import ProjetConduit from "../assets/project_conduit_logo.png";
import pyP3DB from "../assets/pyp3db_logo.png";
import TBF from "../assets/tbf_logo.png";
import SuperBowl from "../assets/super_bowl.png";
import ReportDashboard from "../assets/report_dashboard.png";

const projects = [
  {
    title: "Project Conduit",
    imageSrc: ProjetConduit,
    showGithub: false,
    description: `Data Pipeline Project

Focused on automating data extraction, aggregation, analysis, and reporting for Nebraska Public Media — centralizing NPM's data into one source of truth, making reporting more accurate, credible, and durable.

Tech Stack: Apache Airflow, Python, R, PySpark, Google BigQuery, Google Cloud Storage, Google DataProc, Shiny`,
  },
  {
    title: "Monthly Report App",
    imageSrc: ReportDashboard,
    showGithub: false,
    description: `Report Automation Dashboard

Enhances the efficiency of Nebraska Public Media's monthly reporting process by delivering a holistic view of KPIs and metrics through an integrated dashboard consolidating data from diverse platforms.

Tech Stack: R, Shiny, Golem, Bootstrap, Google BigQuery, Google Cloud Storage, renv, Github Actions`,
  },
  {
    title: "Super Bowl Data Analysis",
    imageSrc: SuperBowl,
    githubUrl: "https://github.com/atimlaa/super-bowl-data-analysis",
    description: `Data Analysis Project

Delves into Super Bowl history to generate insights into game outcomes, viewership trends, and halftime show performance through data visualization.

Tech Stack: Python, pandas, pyplot, seaborn, Streamlit`,
  },
  {
    title: "pyP3DB",
    imageSrc: pyP3DB,
    showGithub: false,
    description: `Senior Design Project

Redesigned and built a website framework for protein modification data in a flexible, comprehensive, and secure way using Django as the backbone.

Tech Stack: Python-Django, Bootstrap, MySQL, MongoDB`,
  },
  {
    title: "TBF Financial",
    imageSrc: TBF,
    githubUrl: "https://github.com/atimlaa/TBF-Financial-Financial-Management-System",
    description: `OOP Class Project

A multi-tier financial management system using object-oriented programming in Java, generating summary and detailed reports for each portfolio using a MySQL backend.

Tech Stack: Java, MySQL, JDBC`,
  },
];

const Project = () => {
  return (
    <div name="projects-container" className="w-full bg-[#0a192f] text-gray-300 py-32">
      <div className="max-w-[1000px] mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="text-red-400 font-mono mb-2 text-sm tracking-wider">
            03. what I've built
          </p>
          <h2 className="text-4xl font-bold text-[#ccd6f6]">
            Projects
            <span className="block h-[3px] bg-red-500 mt-3 w-16" />
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, idx) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <ProjectCard {...project} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Project;
