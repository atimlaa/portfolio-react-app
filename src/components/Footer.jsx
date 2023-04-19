import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      style={{ backgroundColor: "black", padding: "1rem", height: "120px" }}
    >
      <p className="text-[white] text-center">Connect with me:</p>
      <div
        style={{ display: "flex", justifyContent: "center", padding: "0.8rem" }}
      >
        <a
          href="https://www.facebook.com/aryan.timla/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#fff", margin: "0 1rem" }}
        >
          <FaFacebook size={25} />
        </a>
        <a
          href="https://twitter.com/AryanTimla"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#fff", margin: "0 1rem" }}
        >
          <FaTwitter size={25} />
        </a>
        <a
          href="https://www.instagram.com/aryan_timla/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#fff", margin: "0 1rem" }}
        >
          <FaInstagram size={25} />
        </a>
      </div>
      <p className="text-[white] text-center">&copy; 2023 aryantimla.com</p>
    </footer>
  );
};

export default Footer;
