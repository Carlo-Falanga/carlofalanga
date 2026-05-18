import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";
import Hero from "./components/hero/Hero";


function App() {
  return (
    <>
      <div className="max-w-[1280px] mx-auto">
        <SiteHeader />
        <Hero/>
        <SiteFooter />
      </div>
    </>
  );
}

export default App;
