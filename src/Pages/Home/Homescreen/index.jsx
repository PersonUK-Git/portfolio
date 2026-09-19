import { lazy, Suspense } from "react";
import AboutMe from "../AboutMe";
import ContactMe from "../ContactMe";
import Experience from "../Experience";
import Footer from "../Footer";
import HeroSection from "../HeroSection";
import MyPortfolio from "../MyPortfolio";
import MySkills from "../MySkills";
import Testimonial from "../Testimonials";
import { useRevealOnScroll } from "../../../hooks/useInView";

// Three.js is split into its own chunk so the text paints before the 3D loads.
const BackgroundScene = lazy(() => import("../../../three/BackgroundScene"));

export default function Home() {
  useRevealOnScroll();

  return (
    <>
      <Suspense fallback={null}>
        <BackgroundScene />
      </Suspense>
      <main className="page">
        <HeroSection />
        <AboutMe />
        <Experience />
        <MySkills />
        <MyPortfolio />
        <Testimonial />
        <ContactMe />
        <Footer />
      </main>
    </>
  );
}
