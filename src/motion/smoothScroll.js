import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const reducedMotion =
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Read by the WebGL scene every frame: page progress 0..1 and scroll velocity.
export const motion = { progress: 0, velocity: 0 };

let lenis = null;

export function initSmoothScroll() {
  if (lenis || reducedMotion) return lenis;

  lenis = new Lenis({ duration: 1.25, easing: (t) => 1 - Math.pow(1 - t, 4), smoothWheel: true });
  lenis.on("scroll", (l) => {
    motion.progress = l.progress || 0;
    motion.velocity = l.velocity || 0;
    ScrollTrigger.update();
  });
  // Drive Lenis from GSAP's ticker so scroll and scrubbed timelines share one clock.
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  return lenis;
}

export function getLenis() {
  return lenis;
}

export function scrollToId(id, offset = -80) {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis) lenis.scrollTo(el, { offset, duration: 1.6 });
  else window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + offset, behavior: "smooth" });
}

// Keeps the fallback (no Lenis) path feeding the same shared motion state.
if (typeof window !== "undefined") {
  let last = window.scrollY;
  window.addEventListener(
    "scroll",
    () => {
      if (lenis) return;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      motion.progress = max > 0 ? window.scrollY / max : 0;
      motion.velocity = window.scrollY - last;
      last = window.scrollY;
    },
    { passive: true }
  );
}
