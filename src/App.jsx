import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";


function App() {
  return (
    <>
      <div className="max-w-[1280px] mx-auto">
        <SiteHeader />
        <div>Main Page</div>
        <SiteFooter />
      </div>
    </>
  );
}

export default App;
