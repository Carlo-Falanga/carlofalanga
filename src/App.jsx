import SmoothScroll from "./components/motion/SmoothScroll";
import SiteHeader from "./components/SiteHeader";
import FooterCTA from "./components/footer/FooterCTA";
import MagnetTransition from "./components/magnet/MagnetTransition";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Approach from "./components/approach/Approach";
import Skills from "./components/sections/Skills"
import Statement from "./components/statement/Statement"
import Projects from "./components/projects/Projects"
import Background from "./components/background/Background";
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
      <Background/>
      <Contact/>
      <MagnetTransition />
      <FooterCTA />
    </SmoothScroll>
  );
}

export default App;
