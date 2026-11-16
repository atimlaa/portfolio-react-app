import React from "react";
import { Link } from "react-router-dom";

// Shared shell for Privacy / Terms / Cookie pages
export const LAST_UPDATED = "November 14, 2026";

const LegalLayout = ({ eyebrow, title, children }) => (
  <article className="w-full min-h-screen bg-[#0a192f] text-[#a8b2d1] pt-32 pb-24">
    <div className="max-w-[760px] mx-auto px-8">
      <p className="text-red-400 font-mono mb-2 text-sm tracking-wider">{eyebrow}</p>
      <h1 className="text-4xl font-bold text-[#ccd6f6]">
        {title}
        <span className="block h-[3px] bg-red-500 mt-3 w-16" />
      </h1>
      <p className="mt-6 text-sm font-mono text-[#8892b0]">Last updated: {LAST_UPDATED}</p>

      <div className="legal mt-10 space-y-6 leading-relaxed">{children}</div>

      <Link
        to="/"
        className="inline-block mt-14 border border-red-500 text-red-400 px-6 py-3 rounded-sm font-mono text-sm tracking-wider hover:bg-red-500/10 transition-colors duration-300"
      >
        ← Back to portfolio
      </Link>
    </div>
  </article>
);

export default LegalLayout;
