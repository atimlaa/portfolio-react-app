import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { getConsent, setConsent, onOpenConsentBanner } from "../consent";

const btn =
  "px-4 py-2 rounded-lg text-sm font-mono tracking-wider border transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400";

const CookieBanner = () => {
  const [open, setOpen] = useState(false);
  const headingRef = useRef(null);

  useEffect(() => {
    if (!getConsent()) setOpen(true);
    return onOpenConsentBanner(() => setOpen(true));
  }, []);

  // When reopened from the footer, move focus into the banner
  useEffect(() => {
    if (open && getConsent()) headingRef.current?.focus();
  }, [open]);

  const choose = (value) => {
    setConsent(value);
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.section
          role="region"
          aria-labelledby="cookie-banner-title"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-4 inset-x-4 md:inset-x-auto md:right-6 md:max-w-md z-50 bg-[#112240] border border-white/10 rounded-xl shadow-2xl p-5 text-sm text-[#a8b2d1]"
        >
          <h2
            id="cookie-banner-title"
            ref={headingRef}
            tabIndex={-1}
            className="text-[#ccd6f6] font-semibold mb-2 outline-none"
          >
            Cookies &amp; privacy
          </h2>
          <p className="leading-relaxed mb-4">
            This site uses no tracking or advertising cookies. It only saves
            this choice in your browser. Read the{" "}
            <Link to="/cookies" className="text-red-400 underline underline-offset-4">
              Cookie Policy
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="text-red-400 underline underline-offset-4">
              Privacy Policy
            </Link>
            .
          </p>
          <div className="flex flex-wrap gap-3">
            {/* Equal-weight buttons: no nudging toward "accept" */}
            <button
              type="button"
              onClick={() => choose("accepted")}
              className={`${btn} border-red-500 text-red-400 hover:bg-red-500/10`}
            >
              Accept
            </button>
            <button
              type="button"
              onClick={() => choose("essential")}
              className={`${btn} border-red-500 text-red-400 hover:bg-red-500/10`}
            >
              Essential only
            </button>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default CookieBanner;
