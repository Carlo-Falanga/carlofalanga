import SiteHeader from "./components/Header/SiteHeader";
import SiteFooter from "./components/Footer/SiteFooter";
import styles from "./App.module.css";

function App() {
  return (
    <>
      <div className={styles.pageWrap}>
        <SiteHeader />
        <div>Main Page</div>
        <SiteFooter />
      </div>
    </>
  );
}

export default App;
