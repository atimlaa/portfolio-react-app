import React from "react";
import { Link } from "react-router-dom";
import { openConsentBanner } from "../consent";

const linkClass =
  "text-gray-400 hover:text-red-400 transition-colors duration-300 underline-offset-4 hover:underline";

const Footer = () => {
  return (
    <footer className="bg-black border-t border-white/5 py-8">
      <div className="max-w-[1000px] mx-auto px-8 flex flex-col items-center gap-4">
        <nav aria-label="Legal">
          <ul className="flex flex-wrap justify-center gap-y-2 text-xs font-mono tracking-wider">
            <li><Link to="/privacy" className={linkClass}>Privacy Policy</Link></li>
            <li><Link to="/terms" className={linkClass}>Terms</Link></li>
            <li><Link to="/cookies" className={linkClass}>Cookie Policy</Link></li>
            <li>
              <button type="button" onClick={openConsentBanner} className={linkClass}>
                Cookie settings
              </button>
            </li>
          </ul>
        </nav>
        <p className="text-gray-400 text-xs font-mono tracking-wider">
          © {new Date().getFullYear()} Aryan Timla — Designed & Built with React
        </p>
      </div>
    </footer>
  );
};

export default Footer;
