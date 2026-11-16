import React from "react";
import { Link } from "react-router-dom";
import LegalLayout from "./LegalLayout";
import usePageMeta from "../hooks/usePageMeta";

const EMAIL = "aryantimla@gmail.com";
const a = "text-red-400 underline underline-offset-4";
const h2 = "text-xl font-semibold text-[#ccd6f6] pt-4";

const Terms = () => {
  usePageMeta("/terms");

  return (
    <LegalLayout eyebrow="legal" title="Terms and Conditions">
      <p>
        By using this website you agree to these terms. If you don't agree,
        please don't use the site.
      </p>

      <h2 className={h2}>About this site</h2>
      <p>
        This is a personal portfolio run by Aryan Timla. It showcases my work,
        skills and experience. Nothing here is an offer of employment,
        professional advice, or a binding commitment.
      </p>

      <h2 className={h2}>Content ownership</h2>
      <p>
        Unless stated otherwise, the text, images, logo and resume on this site
        are © {new Date().getFullYear()} Aryan Timla. You may share links to
        the site and quote small portions with credit. Please don't copy or
        republish substantial parts without permission. Project names and
        logos belonging to other organizations remain the property of their
        owners. Source code published in my public GitHub repositories is
        governed by the license in each repository, if any.
      </p>

      <h2 className={h2}>Acceptable use</h2>
      <p>
        Please don't use the contact form to send spam, malicious content, or
        anything unlawful, and don't try to disrupt or gain unauthorized access
        to the site.
      </p>

      <h2 className={h2}>External links</h2>
      <p>
        The site links to third-party websites (such as GitHub and LinkedIn).
        I'm not responsible for their content or privacy practices.
      </p>

      <h2 className={h2}>No warranty</h2>
      <p>
        The site is provided "as is". I try to keep everything accurate and up
        to date, but I make no guarantees about completeness, accuracy or
        availability.
      </p>

      <h2 className={h2}>Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, I'm not liable for any loss or
        damage arising from your use of this site.
      </p>

      <h2 className={h2}>Privacy</h2>
      <p>
        How personal data is handled is described in the{" "}
        <Link to="/privacy" className={a}>Privacy Policy</Link> and{" "}
        <Link to="/cookies" className={a}>Cookie Policy</Link>.
      </p>

      <h2 className={h2}>Governing law</h2>
      <p>
        These terms are governed by the laws of the State of Nebraska, USA.
      </p>

      <h2 className={h2}>Changes</h2>
      <p>
        I may update these terms from time to time. The date at the top shows
        the latest version.
      </p>

      <h2 className={h2}>Contact</h2>
      <p>
        Email <a className={a} href={`mailto:${EMAIL}`}>{EMAIL}</a>.
      </p>
    </LegalLayout>
  );
};

export default Terms;
