import Home from "./components/Home";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Footer from "./components/Footer";
import Skills from "./components/Skills";
import WorkExperience from "./components/WorkExperience";
import Project from "./components/Project";
import Contact from "./components/Contact";

function App() {
  return (
    <div>
     <Navbar />
     <Home />
     <About />
     <Skills />
     <WorkExperience />
     <Project />
     <Contact />
     <Footer />
    </div>
  );
}

export default App;
