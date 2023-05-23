import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaTiktok } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black p-4 h-30">
      <p className="text-white text-center">Connect with me:</p>
      <div className="flex justify-center p-2">
        <a
          href="https://www.facebook.com/aryan.timla/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white mx-2 hover:text-blue-600"
        >
          <FaFacebook size={25} />
        </a>
        <a
          href="https://twitter.com/AryanTimla"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white mx-2 hover:text-sky-500"
        >
          <FaTwitter size={25} />
        </a>
        <a
          href="https://www.instagram.com/aryan_timla/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white mx-2 hover:text-pink-500"
        >
          <FaInstagram size={25} />
        </a>
        <a
          href="https://www.tiktok.com/@aryantimla"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white mx-2"
        >
          <FaTiktok size={25} />
        </a>
      </div>
      <p className="text-white text-center">&copy; 2023 aryantimla</p>
    </footer>
  );
};

export default Footer;
