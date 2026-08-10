import SmoothScroll from "./components/motion/SmoothScroll";
import SiteHeader from "./components/SiteHeader";
import FooterCTA from "./components/sections/FooterCTA";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Approach from "./components/sections/Approach";
import Skills from "./components/sections/Skills"
import Statement from "./components/sections/Statement"
import Projects from "./components/sections/Projects"
import Background from "./components/sections/Background";


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
      <FooterCTA />
    </SmoothScroll>
  );
}

export default App;
