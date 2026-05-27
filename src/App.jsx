import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";
import Hero from "./components/hero/Hero";
import SpecStrip from "./components/specStrip/SpecStrip";
import About from "./components/about/About";
import Skills from "./components/skills/Skills"


function App() {
  return (
    <>
      <div className="max-w-7xl mx-auto">
        <SiteHeader />
        <Hero/>
        <SpecStrip/>
        <About/>
        <Skills/>
        <SiteFooter />
      </div>
    </>
  );
}

export default App;
