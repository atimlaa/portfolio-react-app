import React, { Suspense, lazy, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { scroller } from "react-scroll";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Footer from "./components/Footer";
import Skills from "./components/Skills";
import Project from "./components/Project";
import Contact from "./components/Contact";
import CookieBanner from "./components/CookieBanner";
import PageLoader from "./components/PageLoader";
import usePageMeta from "./hooks/usePageMeta";

// Secondary pages are code-split so the home page stays fast
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const Terms = lazy(() => import("./pages/Terms"));
const CookiePolicy = lazy(() => import("./pages/CookiePolicy"));
const NotFound = lazy(() => import("./pages/NotFound"));

const HomePage = () => {
  usePageMeta("/");
  const { hash } = useLocation();

  // Support links like /#contact coming from other pages
  useEffect(() => {
    if (hash) {
      scroller.scrollTo(hash.slice(1), { smooth: true, duration: 500 });
    }
  }, [hash]);

  return (
    <>
      <Home />
      <About />
      <Skills />
      <Project />
      <Contact />
    </>
  );
};

function App() {
  const { pathname } = useLocation();

  // New page → start at the top
  useEffect(() => {
    if (pathname !== "/") window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-red-600 focus:text-white focus:px-4 focus:py-2 focus:rounded"
      >
        Skip to main content
      </a>
      <Navbar />
      <main id="main" tabIndex={-1} className="outline-none">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/cookies" element={<CookiePolicy />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <CookieBanner />
    </div>
  );
}

export default App;
