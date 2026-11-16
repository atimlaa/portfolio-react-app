import React from "react";

const PageLoader = () => (
  <div
    role="status"
    aria-live="polite"
    className="w-full min-h-screen bg-[#0a192f] flex flex-col items-center justify-center gap-4"
  >
    <span className="w-10 h-10 rounded-full border-2 border-red-500/30 border-t-red-500 animate-spin motion-reduce:animate-none" />
    <span className="text-[#8892b0] font-mono text-sm tracking-wider">Loading…</span>
  </div>
);

export default PageLoader;
