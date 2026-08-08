import SmoothScroll from "./components/motion/SmoothScroll";
import SiteHeader from "./components/SiteHeader";
import FooterCTA from "./components/footer/FooterCTA";
import MagnetTransition from "./components/magnet/MagnetTransition";
import Hero from "./components/hero/Hero";
import About from "./components/about/About";
import Approach from "./components/approach/Approach";
import Skills from "./components/skills/Skills"
import Statement from "./components/statement/Statement"
import Projects from "./components/projects/Projects"
import Experience from "./components/experience/Experience";
import Education from "./components/education/Education";
import Contact from "./components/contact/Contact"


function App() {
  return (
    <SmoothScroll>
      <SiteHeader />
      <Hero/>
      <About/>
      <Skills/>
      <Approach/>
      <Statement/>
      <Projects/>
      <Experience/>
      <Education/>
      <Contact/>
      <MagnetTransition />
      <FooterCTA />
    </SmoothScroll>
  );
}

export default App;
