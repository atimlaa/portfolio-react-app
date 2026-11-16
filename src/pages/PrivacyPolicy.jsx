import React from "react";
import { Link } from "react-router-dom";
import LegalLayout from "./LegalLayout";
import usePageMeta from "../hooks/usePageMeta";

const EMAIL = "aryantimla@gmail.com";
const a = "text-red-400 underline underline-offset-4";
const h2 = "text-xl font-semibold text-[#ccd6f6] pt-4";

const PrivacyPolicy = () => {
  usePageMeta("/privacy");

  return (
    <LegalLayout eyebrow="legal" title="Privacy Policy">
      <p>
        This is the personal portfolio of Aryan Timla, based in Lincoln,
        Nebraska, USA. I collect as little personal data as possible. This page
        explains what is collected, why, and what you can do about it.
      </p>

      <h2 className={h2}>What I collect</h2>
      <ul className="list-disc pl-6 space-y-2 [&>li]:px-0">
        <li>
          <strong className="text-[#ccd6f6]">Contact form:</strong> your name,
          email address and message, only when you choose to send one. That is
          the only information the form asks for.
        </li>
        <li>
          <strong className="text-[#ccd6f6]">Your cookie choice:</strong> one
          value saved in your browser's local storage so the banner doesn't
          keep reappearing. It never leaves your device. See the{" "}
          <Link to="/cookies" className={a}>Cookie Policy</Link>.
        </li>
        <li>
          <strong className="text-[#ccd6f6]">Server logs:</strong> the site is
          hosted on GitHub Pages, which may log technical data such as your IP
          address to keep the service secure. I don't have access to those
          logs. See{" "}
          <a className={a} href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" target="_blank" rel="noopener noreferrer">
            GitHub's Privacy Statement
          </a>.
        </li>
      </ul>
      <p>
        I do <strong className="text-[#ccd6f6]">not</strong> use analytics,
        advertising, tracking pixels, or third-party fonts, and I do not sell or
        share your personal data.
      </p>

      <h2 className={h2}>Why I use it</h2>
      <p>
        Contact form details are used only to read and reply to your message.
        I won't add you to a mailing list or use your details for anything
        else.
      </p>

      <h2 className={h2}>Who processes it</h2>
      <p>
        Form submissions are delivered through{" "}
        <a className={a} href="https://getform.io" target="_blank" rel="noopener noreferrer">Getform</a>,
        which forwards them to my email inbox. Getform and my email provider
        store the message on my behalf under their own privacy terms.
      </p>

      <h2 className={h2}>How long I keep it</h2>
      <p>
        I keep messages only as long as needed to respond and follow up, and
        delete them within 12 months unless we are still in touch.
      </p>

      <h2 className={h2}>Your rights</h2>
      <p>
        You can ask me at any time to see, correct, or delete the information
        you sent me. Email{" "}
        <a className={a} href={`mailto:${EMAIL}`}>{EMAIL}</a> and I will reply
        within 45 days. This small personal site may not fall under laws like
        the Nebraska Data Privacy Act, the CCPA or the GDPR, but I honor these
        requests from anyone, wherever you live.
      </p>

      <h2 className={h2}>Children</h2>
      <p>
        This site is not directed at children under 13, and I don't knowingly
        collect their personal information. If you believe a child has sent me
        information, contact me and I will delete it.
      </p>

      <h2 className={h2}>Security</h2>
      <p>
        The site is served over HTTPS. No method of transmission is 100%
        secure, so please don't send sensitive information (like passwords or
        financial details) through the contact form.
      </p>

      <h2 className={h2}>Changes</h2>
      <p>
        If this policy changes, I'll update the date at the top of this page.
      </p>

      <h2 className={h2}>Contact</h2>
      <p>
        Questions? Email <a className={a} href={`mailto:${EMAIL}`}>{EMAIL}</a>.
      </p>
    </LegalLayout>
  );
};

export default PrivacyPolicy;
