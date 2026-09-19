import { useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { getLenis, reducedMotion } from "./smoothScroll";

gsap.registerPlugin(ScrollTrigger, SplitText);

// Every scroll-driven "shot" on the page. Timelines with `scrub` are tied
// directly to scroll position, so they play forwards and backwards like
// scrubbing through a film.
export function useCinematic(ready) {
  useLayoutEffect(() => {
    if (reducedMotion) {
      document.documentElement.classList.add("no-motion");
      return;
    }

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;

      // --- Hero: pull-back as you leave the opening shot ---
      gsap.to(".hero--content", {
        yPercent: -35,
        scale: 0.9,
        opacity: 0,
        filter: "blur(10px)",
        ease: "none",
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(".hero--stats", {
        yPercent: -60,
        opacity: 0,
        ease: "none",
        scrollTrigger: { trigger: ".hero", start: "20% top", end: "bottom top", scrub: true },
      });
      gsap.to(".scroll-indicator", {
        opacity: 0,
        scrollTrigger: { trigger: ".hero", start: "top top", end: "15% top", scrub: true },
      });

      // --- Section titles: each line slides up from behind a mask ---
      // (split by lines, not words, so the gradient-text spans stay intact)
      document.querySelectorAll(".section--title").forEach((title) => {
        SplitText.create(title, {
          type: "lines",
          mask: "lines",
          autoSplit: true, // re-splits on resize; returning the tween lets it be rebuilt
          onSplit: (self) =>
            gsap.from(self.lines, {
              yPercent: 110,
              rotate: 3,
              duration: 1.2,
              stagger: 0.12,
              ease: "power4.out",
              scrollTrigger: { trigger: title, start: "top 85%", toggleActions: "play none none reverse" },
            }),
        });
      });

      gsap.utils.toArray(".eyebrow").forEach((el) => {
        gsap.from(el, {
          clipPath: "inset(0 100% 0 0)",
          x: -20,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none reverse" },
        });
      });

      // --- Giant chapter words drifting behind each section (parallax) ---
      gsap.utils.toArray(".chapter-word").forEach((word) => {
        gsap.fromTo(
          word,
          { xPercent: 12 },
          {
            xPercent: -22,
            ease: "none",
            scrollTrigger: { trigger: word.parentElement, start: "top bottom", end: "bottom top", scrub: true },
          }
        );
      });

      // --- Generic reveals: rise out of depth, staggered per batch ---
      // transition:none stops CSS hover transitions from fighting the tween;
      // clearProps afterwards hands transform back to the hover styles.
      gsap.set(".reveal", {
        opacity: 0,
        y: 70,
        rotateX: 12,
        transformPerspective: 900,
        filter: "blur(6px)",
        transition: "none",
      });
      ScrollTrigger.batch(".reveal", {
        start: "top 90%",
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            rotateX: 0,
            filter: "blur(0px)",
            duration: 1.1,
            stagger: 0.12,
            ease: "power3.out",
            overwrite: true,
            clearProps: "transform,filter,transition",
          }),
      });

      // --- Experience: the timeline draws itself as you scroll ---
      gsap.fromTo(
        ".timeline--line",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: ".timeline", start: "top 75%", end: "bottom 60%", scrub: true },
        }
      );
      gsap.utils.toArray(".timeline--points li").forEach((li, i) => {
        gsap.from(li, {
          opacity: 0,
          x: i % 2 ? 40 : -40,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: li, start: "top 92%", toggleActions: "play none none reverse" },
        });
      });

      // --- Skills: globe zooms in from deep space ---
      gsap.fromTo(
        ".skills--globe",
        { scale: 0.55, rotate: -12, opacity: 0 },
        {
          scale: 1,
          rotate: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: { trigger: ".skills--layout", start: "top bottom", end: "top 35%", scrub: true },
        }
      );

      // --- Projects: galaxy tilts up like a camera crane shot ---
      gsap.fromTo(
        ".galaxy",
        { rotateX: 35, scale: 0.85, transformPerspective: 1200, transformOrigin: "50% 100%" },
        {
          rotateX: 0,
          scale: 1,
          ease: "none",
          scrollTrigger: { trigger: ".galaxy", start: "top bottom", end: "top 30%", scrub: true },
        }
      );

      // Featured app screenshots fan out as the card reaches centre screen.
      gsap.fromTo(
        ".featured--phones",
        { "--spread": 0 },
        {
          "--spread": 1,
          ease: "none",
          scrollTrigger: { trigger: ".featured", start: "top 80%", end: "center center", scrub: true },
        }
      );

      // Project cards fly in with depth, in rows.
      gsap.set(".projects--grid .project", { opacity: 0, y: 100, rotateY: -18, rotateX: 10, transition: "none" });
      ScrollTrigger.batch(".projects--grid .project", {
        start: "top 92%",
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            rotateY: 0,
            rotateX: 0,
            duration: 1.2,
            stagger: 0.14,
            ease: "expo.out",
            clearProps: "transform,transition",
          }),
      });

      // --- Contact: final shot zooms in ---
      gsap.fromTo(
        ".contact",
        { scale: 0.88, borderRadius: 60 },
        {
          scale: 1,
          borderRadius: 20,
          ease: "none",
          scrollTrigger: { trigger: ".contact", start: "top bottom", end: "top 40%", scrub: true },
        }
      );

      // --- Motion blur feel: sections skew slightly with scroll speed ---
      if (!isMobile) {
        const skewTo = gsap.quickTo(".section", "skewY", { duration: 0.5, ease: "power3" });
        ScrollTrigger.create({
          onUpdate: (self) => skewTo(gsap.utils.clamp(-2.5, 2.5, self.getVelocity() / -600)),
        });
      }
    });

    // Layout can shift once fonts and lazy 3D chunks load.
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, []);

  // Hero entrance plays as the intro curtains open (or straight away without
  // an intro). Layout effect so the hero never paints before being hidden.
  useLayoutEffect(() => {
    if (!ready || reducedMotion) return;
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power4.out" } })
        .from(".hero--badge", { opacity: 0, y: 30, duration: 0.9 })
        .from(
          SplitText.create(".hero--title", { type: "lines", mask: "lines" }).lines,
          { yPercent: 115, duration: 1.2, stagger: 0.12 },
          "-=0.6"
        )
        .from(".hero--typed", { opacity: 0, x: -30, duration: 0.8 }, "-=0.6")
        .from(".hero--description", { opacity: 0, y: 30, duration: 0.9 }, "-=0.6")
        .from(".hero--actions > *, .hero--socials > *", { opacity: 0, y: 30, stagger: 0.06, duration: 0.8 }, "-=0.6")
        .from(".hero--stat", { opacity: 0, y: 50, scale: 0.9, stagger: 0.08, duration: 1 }, "-=0.6");
    });
    getLenis()?.scrollTo(0, { immediate: true });
    return () => ctx.revert();
  }, [ready]);
}
