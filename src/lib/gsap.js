import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(ScrollTrigger, CustomEase);

ScrollTrigger.config({ ignoreMobileResize: true });

CustomEase.create("siteEase", "M0,0,C0.16,1,0.3,1,1,1");
CustomEase.create("fadeEase", "M0,0,C0.25,0.1,0.25,1,1,1");

export { gsap, ScrollTrigger, CustomEase };
