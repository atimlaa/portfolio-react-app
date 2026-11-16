import React from "react";
import { Link } from "react-router-dom";
import LegalLayout from "./LegalLayout";
import usePageMeta from "../hooks/usePageMeta";
import { openConsentBanner } from "../consent";

const a = "text-red-400 underline underline-offset-4";
const h2 = "text-xl font-semibold text-[#ccd6f6] pt-4";
const cell = "border border-white/10 px-3 py-2 text-left align-top";

const CookiePolicy = () => {
  usePageMeta("/cookies");

  return (
    <LegalLayout eyebrow="legal" title="Cookie Policy">
      <p>
        Short version: <strong className="text-[#ccd6f6]">this site sets no
        cookies</strong> and uses no analytics or advertising trackers.
        Because there is nothing to agree to, you won't see a cookie banner
        when you arrive.
      </p>

      <h2 className={h2}>What is stored in your browser</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <caption className="sr-only">Browser storage used by this site</caption>
          <thead className="text-[#ccd6f6]">
            <tr>
              <th scope="col" className={cell}>Name</th>
              <th scope="col" className={cell}>Type</th>
              <th scope="col" className={cell}>Purpose</th>
              <th scope="col" className={cell}>Duration</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={`${cell} font-mono`}>cookie-consent</td>
              <td className={cell}>Local storage (strictly necessary)</td>
              <td className={cell}>Remembers your choice in cookie settings (only saved if you make one)</td>
              <td className={cell}>Until you clear your browser data</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className={h2}>Third parties</h2>
      <p>
        Fonts are served from this site, not from Google. When you send the
        contact form, your message goes to Getform, which processes it as
        described in the <Link to="/privacy" className={a}>Privacy Policy</Link>.
        Links to social sites only load those sites if you click them.
      </p>

      <h2 className={h2}>Changing your choice</h2>
      <p>
        You can reopen the banner at any time, or clear this site's data in
        your browser settings.
      </p>
      <button
        type="button"
        onClick={openConsentBanner}
        className="border border-red-500 text-red-400 px-5 py-2 rounded-lg font-mono text-sm tracking-wider hover:bg-red-500/10 transition-colors duration-300"
      >
        Open cookie settings
      </button>

      <h2 className={h2}>If this changes</h2>
      <p>
        If I ever add analytics, the banner will ask you on your first visit,
        analytics will only load after you choose "Accept", and this page will
        list it.
      </p>
    </LegalLayout>
  );
};

export default CookiePolicy;
