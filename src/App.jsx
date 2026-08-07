import SmoothScroll from "./components/motion/SmoothScroll";
import SiteHeader from "./components/SiteHeader";
import FooterCTA from "./components/footer/FooterCTA";
import Hero from "./components/hero/Hero";
import SpecStrip from "./components/specStrip/SpecStrip";
import About from "./components/about/About";
import Approach from "./components/approach/Approach";
import Skills from "./components/skills/Skills"
import Projects from "./components/projects/Projects"
import Experience from "./components/experience/Experience";
import Education from "./components/education/Education";
import Contact from "./components/contact/Contact"


function App() {
  return (
    <SmoothScroll>
      <SiteHeader />
      <Hero/>
      <SpecStrip/>
      <About/>
      <Approach/>
      <Skills/>
      <Projects/>
      <Experience/>
      <Education/>
      <Contact/>
      <FooterCTA />
    </SmoothScroll>
  );
}

export default App;
