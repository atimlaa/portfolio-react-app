import React from "react";
import { Link } from "react-router-dom";
import usePageMeta from "../hooks/usePageMeta";

const NotFound = () => {
  usePageMeta("/404");

  return (
    <section className="relative w-full min-h-screen bg-[#0a192f] overflow-hidden flex items-center">
      <div className="absolute inset-0 bg-[radial-gradient(#1e3a5f_1px,transparent_1px)] [background-size:32px_32px] opacity-40" aria-hidden="true" />
      <div className="relative max-w-[1000px] mx-auto px-8 py-32">
        <p className="text-red-400 font-mono text-lg mb-3 tracking-wider">error 404</p>
        <h1 className="text-5xl sm:text-7xl font-bold text-[#ccd6f6] leading-tight">
          Page not found.
        </h1>
        <p className="text-[#8892b0] py-6 max-w-[520px] leading-relaxed">
          The page you're looking for moved or never existed. Here's where you
          can go instead:
        </p>
        <nav aria-label="Helpful links" className="flex gap-4 flex-wrap">
          <Link
            to="/"
            className="bg-red-600 text-white px-8 py-3 font-mono text-sm tracking-wider rounded-sm hover:bg-red-700 transition-colors duration-300"
          >
            Go home
          </Link>
          <Link
            to="/#projects-container"
            className="border border-red-500 text-red-400 px-8 py-3 font-mono text-sm tracking-wider rounded-sm hover:bg-red-500/10 transition-colors duration-300"
          >
            See projects
          </Link>
          <Link
            to="/#contact"
            className="border border-red-500 text-red-400 px-8 py-3 font-mono text-sm tracking-wider rounded-sm hover:bg-red-500/10 transition-colors duration-300"
          >
            Contact me
          </Link>
        </nav>
      </div>
    </section>
  );
};

export default NotFound;
