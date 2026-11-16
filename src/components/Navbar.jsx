import React, { useState, useEffect } from "react";
import Logo from "../assets/logo2.png";
import { FaBars, FaTimes, FaGithub, FaLinkedin } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { Link as ScrollLink } from "react-scroll";
import { Link as RouterLink, useLocation } from "react-router-dom";

const NAV_LINKS = [
  { to: "home", label: "Home" },
  { to: "about", label: "About" },
  { to: "skills", label: "Skills" },
  { to: "projects-container", label: "Projects" },
  { to: "contact", label: "Contact" },
];

// Section links: smooth-scroll on the home page, regular links elsewhere.
// Both render a real <a href> so they work with Tab + Enter.
const NavLink = ({ onHome, to, className, activeClass, children, ...rest }) =>
  onHome ? (
    <ScrollLink
      to={to}
      href={`#${to}`}
      smooth={true}
      duration={500}
      spy={true}
      activeClass={activeClass}
      className={className}
      {...rest}
    >
      {children}
    </ScrollLink>
  ) : (
    <RouterLink to={`/#${to}`} className={className} {...rest}>
      {children}
    </RouterLink>
  );

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { pathname } = useLocation();
  const onHome = pathname === "/";

  // Close the mobile menu with Escape
  useEffect(() => {
    if (!nav) return;
    const onKey = (e) => e.key === "Escape" && setNav(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [nav]);

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
        aria-hidden="true"
        className="fixed top-0 left-0 z-50 h-[3px] bg-red-500 transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Social icons — separate fixed element so backdrop-blur never traps them */}
      <div className="hidden lg:flex fixed flex-col top-[40%] left-0 z-40" aria-label="Social links" role="complementary">
        <ul className="flex flex-col gap-2">
          <li className="w-[160px] h-[60px] flex justify-between items-center ml-[-90px] hover:ml-[-10px] focus-within:ml-[-10px] duration-300 bg-blue-700">
            <a
              className="flex justify-between items-center w-full text-white"
              href="https://www.linkedin.com/in/aryan-timla/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn <FaLinkedin size={30} aria-hidden="true" />
            </a>
          </li>
          <li className="w-[160px] h-[60px] flex justify-between items-center ml-[-90px] hover:ml-[-10px] focus-within:ml-[-10px] duration-300 bg-gray-800">
            <a
              className="flex justify-between items-center w-full text-white"
              href="https://github.com/atimlaa"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub <FaGithub size={30} aria-hidden="true" />
            </a>
          </li>
          <li className="w-[160px] h-[60px] flex justify-between items-center ml-[-90px] hover:ml-[-10px] focus-within:ml-[-10px] duration-300 bg-red-700">
            <a
              className="flex justify-between items-center w-full text-white"
              href="mailto:aryantimla@gmail.com"
            >
              Email <HiOutlineMail size={30} aria-hidden="true" />
            </a>
          </li>
        </ul>
      </div>

      <nav aria-label="Main" className="z-40 fixed w-full h-[70px] flex justify-between items-center px-6 bg-black border-b border-white/5">
        <RouterLink to="/" aria-label="Aryan Timla, home">
          <img src={Logo} alt="Aryan Timla logo" width="88" height="64" style={{ width: "88px", height: "64px" }} />
        </RouterLink>

        {/* Desktop menu */}
        <ul className="hidden md:flex text-sm tracking-widest uppercase">
          {NAV_LINKS.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                onHome={onHome}
                to={to}
                activeClass="text-red-400 border-b-2 border-red-400"
                className="cursor-pointer text-gray-400 hover:text-red-400 transition-colors duration-300 py-1 border-b-2 border-transparent hover:border-red-400"
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Hamburger */}
        <button
          type="button"
          onClick={() => setNav(!nav)}
          aria-label={nav ? "Close menu" : "Open menu"}
          aria-expanded={nav}
          aria-controls="mobile-menu"
          className="md:hidden z-50 cursor-pointer text-gray-300 p-2"
        >
          {nav ? <FaTimes size={22} aria-hidden="true" /> : <FaBars size={22} aria-hidden="true" />}
        </button>

        {/* Mobile menu */}
        <ul
          id="mobile-menu"
          className={`md:hidden fixed inset-0 bg-black/95 backdrop-blur-md flex flex-col justify-center items-center gap-10 transition-all duration-500 ${
            nav ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
          }`}
        >
          {NAV_LINKS.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                onHome={onHome}
                to={to}
                onClick={() => setNav(false)}
                className="text-3xl text-gray-300 hover:text-red-400 cursor-pointer transition-colors duration-300 font-light tracking-widest"
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

      </nav>
    </>
  );
};

export default Navbar;
