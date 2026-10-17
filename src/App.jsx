import { useCallback, useState } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "./lib/gsap";
import { pageTop } from "./lib/scroll";
import SmoothScroll from "./components/layout/SmoothScroll";
import Band from "./components/layout/Band";
import Rail from "./components/layout/Rail";
import Bio from "./components/sections/Bio";
import Works from "./components/sections/Works";
import Stack from "./components/sections/Stack";
import Contact from "./components/sections/Contact";
import { sections } from "./components/content";
import { projects } from "./components/sections/projectList";

function App() {
  const [section, setSection] = useState("about");
  const [projectIndex, setProjectIndex] = useState(0);
  const onActiveChange = useCallback((i) => setProjectIndex(i), []);

  // the rail shows the panel of the last section whose top has passed the middle of the screen
  useGSAP(() => {
    let tops = [];
    ScrollTrigger.create({
      start: 0,
      end: "max",
      onRefresh: () => {
        tops = sections.map((s) => pageTop(document.getElementById(s.id)));
      },
      onUpdate: (self) => {
        const middle = self.scroll() + window.innerHeight * 0.5;
        let current = sections[0].key;
        sections.forEach((s, i) => {
          if (tops[i] < middle) current = s.key;
        });
        setSection(current);
      },
    });
  });

  return (
    <SmoothScroll>
      <Band />
      <Rail section={section} project={projects[projectIndex]} />
      <main>
        <div className="hero-space" />
        <Bio />
        <Works onActiveChange={onActiveChange} />
        <Stack />
        <Contact />
      </main>
    </SmoothScroll>
  );
}

export default App;
