import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";
import Hero from "./components/hero/Hero";
import SpecStrip from "./components/specStrip/SpecStrip";


function App() {
  return (
    <>
      <div className="max-w-7xl mx-auto">
        <SiteHeader />
        <Hero/>
        <SpecStrip/>
        <SiteFooter />
      </div>
    </>
  );
}

export default App;
