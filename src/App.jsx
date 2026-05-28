import { ThemeProvider } from "./context/ThemeContext";
import SiteHeader from "./components/SiteHeader";
import FooterCTA from "./components/footer/FooterCTA";
import Hero from "./components/hero/Hero";
import SpecStrip from "./components/specStrip/SpecStrip";
import About from "./components/about/About";
import Skills from "./components/skills/Skills"
import Projects from "./components/projects/Projects"
import Contact from "./components/contact/Contact"


function App() {
  return (
    <ThemeProvider>
      <div className="max-w-7xl mx-auto">
        <SiteHeader />
        <Hero/>
        <SpecStrip/>
        <About/>
        <Skills/>
        <Projects/>
        <Contact/>
        <FooterCTA />
      </div>
    </ThemeProvider>
  );
}

export default App;
