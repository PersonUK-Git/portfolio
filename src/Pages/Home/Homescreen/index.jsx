import { lazy, Suspense, useState } from "react";
import AboutMe from "../AboutMe";
import ContactMe from "../ContactMe";
import Experience from "../Experience";
import Footer from "../Footer";
import HeroSection from "../HeroSection";
import MyPortfolio from "../MyPortfolio";
import MySkills from "../MySkills";
import Testimonial from "../Testimonials";
import Intro, { shouldPlayIntro } from "../../../motion/Intro";
import { initSmoothScroll } from "../../../motion/smoothScroll";
import { useCinematic } from "../../../motion/useCinematic";

// Three.js is split into its own chunk so the text paints before the 3D loads.
const BackgroundScene = lazy(() => import("../../../three/BackgroundScene"));

initSmoothScroll();

export default function Home() {
  const [playIntro] = useState(shouldPlayIntro);
  const [heroReady, setHeroReady] = useState(!playIntro);
  const [introMounted, setIntroMounted] = useState(playIntro);

  useCinematic(heroReady);

  return (
    <>
      <Suspense fallback={null}>
        <BackgroundScene />
      </Suspense>
      <div className="grain" aria-hidden="true" />
      {introMounted && (
        <Intro
          onDone={() => {
            setHeroReady(true);
            // Leave the curtains in the DOM until they have finished opening.
            setTimeout(() => setIntroMounted(false), 1400);
          }}
        />
      )}
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
