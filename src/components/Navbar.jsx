import React, { useState, useEffect } from "react";
import Logo from "../assets/logo2.png";
import { FaBars, FaTimes, FaGithub, FaLinkedin } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { Link } from "react-scroll";

const NAV_LINKS = [
  { to: "home", label: "Home" },
  { to: "about", label: "About" },
  { to: "skills", label: "Skills" },
  { to: "projects-container", label: "Projects" },
  { to: "contact", label: "Contact" },
];

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      setScrollProgress(totalHeight ? (window.scrollY / totalHeight) * 100 : 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Scroll progress bar */}
      <div
        className="fixed top-0 left-0 z-50 h-[3px] bg-red-500 transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Social icons — separate fixed element so backdrop-blur never traps them */}
      <div className="hidden lg:flex fixed flex-col top-[40%] left-0 z-40">
        <ul className="flex flex-col gap-2">
          <li className="w-[160px] h-[60px] flex justify-between items-center ml-[-90px] hover:ml-[-10px] duration-300 bg-blue-700">
            <a
              className="flex justify-between items-center w-full text-gray-300"
              href="https://www.linkedin.com/in/aryan-timla/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn <FaLinkedin size={30} />
            </a>
          </li>
          <li className="w-[160px] h-[60px] flex justify-between items-center ml-[-90px] hover:ml-[-10px] duration-300 bg-gray-800">
            <a
              className="flex justify-between items-center w-full text-gray-300"
              href="https://github.com/atimlaa"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub <FaGithub size={30} />
            </a>
          </li>
          <li className="w-[160px] h-[60px] flex justify-between items-center ml-[-90px] hover:ml-[-10px] duration-300 bg-red-700">
            <a
              className="flex justify-between items-center w-full text-gray-300"
              href="mailto:aryantimla@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Email <HiOutlineMail size={30} />
            </a>
          </li>
        </ul>
      </div>

      <div className="z-40 fixed w-full h-[70px] flex justify-between items-center px-6 bg-black border-b border-white/5">
        <div>
          <img src={Logo} alt="Logo" style={{ width: "100px" }} />
        </div>

        {/* Desktop menu */}
        <ul className="hidden md:flex text-sm tracking-widest uppercase">
          {NAV_LINKS.map(({ to, label }) => (
            <li key={to}>
              <Link
                to={to}
                smooth={true}
                duration={500}
                spy={true}
                activeClass="text-red-400 border-b-2 border-red-400"
                className="cursor-pointer text-gray-400 hover:text-red-400 transition-colors duration-300 py-1 border-b-2 border-transparent hover:border-red-400"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Hamburger */}
        <div
          onClick={() => setNav(!nav)}
          className="md:hidden z-50 cursor-pointer text-gray-300"
        >
          {nav ? <FaTimes size={22} /> : <FaBars size={22} />}
        </div>

        {/* Mobile menu */}
        <ul
          className={`fixed inset-0 bg-black/95 backdrop-blur-md flex flex-col justify-center items-center gap-10 transition-all duration-500 ${
            nav ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
          }`}
        >
          {NAV_LINKS.map(({ to, label }) => (
            <li key={to} onClick={() => setNav(false)}>
              <Link
                to={to}
                smooth={true}
                duration={500}
                className="text-3xl text-gray-300 hover:text-red-400 cursor-pointer transition-colors duration-300 font-light tracking-widest"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

      </div>
    </>
  );
};

export default Navbar;
