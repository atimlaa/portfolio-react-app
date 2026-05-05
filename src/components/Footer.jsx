import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black border-t border-white/5 py-8">
      <div className="max-w-[1000px] mx-auto px-8 flex flex-col items-center gap-4">

        <p className="text-gray-600 text-xs font-mono tracking-wider">
          © {new Date().getFullYear()} Aryan Timla — Designed & Built with React
        </p>
      </div>
    </footer>
  );
};

export default Footer;
