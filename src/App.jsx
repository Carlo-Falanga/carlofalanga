import SmoothScroll from "./components/layout/SmoothScroll";
import SiteHeader from "./components/layout/SiteHeader";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Skills from "./components/sections/Skills";
import Approach from "./components/sections/Approach";
import Statement from "./components/sections/Statement";
import Projects from "./components/sections/Projects";
import Background from "./components/sections/Background";
import FooterCTA from "./components/sections/FooterCTA";

function App() {
  return (
    <SmoothScroll>
      <SiteHeader />
      <Hero />
      <About />
      <Skills />
      <Approach />
      <Statement />
      <Projects />
      <Background />
      <FooterCTA />
    </SmoothScroll>
  );
}

export default App;
