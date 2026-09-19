import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { getLenis, reducedMotion } from "./smoothScroll";

const SEEN_KEY = "intro-seen";

function alreadySeen() {
  try {
    return sessionStorage.getItem(SEEN_KEY) === "1";
  } catch {
    return false;
  }
}

export function shouldPlayIntro() {
  return !reducedMotion && !alreadySeen();
}

// Opening title card: letterbox bars closed over the page, two title beats,
// then the bars split open onto the hero. Plays once per browser session.
export default function Intro({ onDone }) {
  const root = useRef(null);
  const tl = useRef(null);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  useLayoutEffect(() => {
    const lenis = getLenis();
    lenis?.stop();
    document.documentElement.classList.add("intro-lock");

    const finish = () => {
      try {
        sessionStorage.setItem(SEEN_KEY, "1");
      } catch {}
      document.documentElement.classList.remove("intro-lock");
      getLenis()?.start();
    };

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(root);
      tl.current = gsap
        .timeline({ onComplete: finish })
        .from(q(".intro--kicker"), { opacity: 0, y: 12, duration: 0.6, ease: "power2.out" })
        .from(
          q(".intro--name span"),
          { opacity: 0, yPercent: 60, filter: "blur(12px)", stagger: 0.045, duration: 0.8, ease: "power3.out" },
          "-=0.3"
        )
        .fromTo(q(".intro--rule"), { scaleX: 0 }, { scaleX: 1, duration: 0.8, ease: "power3.inOut" }, "-=0.5")
        .from(q(".intro--tag"), { opacity: 0, letterSpacing: "0.9em", duration: 0.9, ease: "power2.out" }, "-=0.4")
        .to(q(".intro--content"), { opacity: 0, scale: 1.08, filter: "blur(8px)", duration: 0.6, ease: "power2.in" }, "+=0.5")
        // Start the hero entrance as the curtains open, not after.
        .call(() => doneRef.current?.())
        .to(q(".intro--bar-top"), { yPercent: -100, duration: 1.1, ease: "power4.inOut" }, "-=0.1")
        .to(q(".intro--bar-bottom"), { yPercent: 100, duration: 1.1, ease: "power4.inOut" }, "<")
        .to(q(".intro--skip"), { opacity: 0, duration: 0.3 }, "<");
    }, root);

    return () => {
      ctx.revert();
      document.documentElement.classList.remove("intro-lock");
      getLenis()?.start();
    };
  }, []);

  useEffect(() => {
    const skip = () => tl.current && tl.current.progress() < 0.8 && tl.current.timeScale(4);
    window.addEventListener("keydown", skip);
    window.addEventListener("wheel", skip, { passive: true });
    window.addEventListener("touchstart", skip, { passive: true });
    return () => {
      window.removeEventListener("keydown", skip);
      window.removeEventListener("wheel", skip);
      window.removeEventListener("touchstart", skip);
    };
  }, []);

  const name = "PRATEEK SHARMA";

  return (
    <div className="intro" ref={root}>
      <div className="intro--bar intro--bar-top" />
      <div className="intro--bar intro--bar-bottom" />
      <div className="intro--content" aria-hidden="true">
        <p className="intro--kicker">A portfolio in three dimensions</p>
        <h2 className="intro--name">
          {name.split("").map((c, i) => (
            <span key={i}>{c === " " ? " " : c}</span>
          ))}
        </h2>
        <div className="intro--rule" />
        <p className="intro--tag">Full stack · Mobile · 3D</p>
      </div>
      <button className="intro--skip" onClick={() => tl.current?.timeScale(4)}>
        Skip intro →
      </button>
    </div>
  );
}
