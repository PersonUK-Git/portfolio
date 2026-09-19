import { useEffect, useState } from "react";
import ScrollLink from "../../components/ScrollLink";

const LINKS = [
  { to: "heroSection", label: "Home" },
  { to: "AboutMe", label: "About" },
  { to: "experience", label: "Experience" },
  { to: "mySkills", label: "Skills" },
  { to: "MyPortfolio", label: "Projects" },
  { to: "testimonial", label: "Feedback" },
];

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState("heroSection");

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(window.scrollY > 20);
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    const onResize = () => window.innerWidth > 960 && setOpen(false);

    // Highlight whichever section crosses the middle of the viewport.
    const spy = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    [...LINKS.map((l) => l.to), "Contact"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) spy.observe(el);
    });
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      spy.disconnect();
    };
  }, []);

  const close = () => setOpen(false);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""} ${open ? "open" : ""}`}>
      <div className="navbar--progress" style={{ transform: `scaleX(${progress})` }} />
      <ScrollLink to="heroSection" className="navbar--brand" onClick={close}>
        <span className="navbar--logo">P</span>
        Prateek<span className="accent">.dev</span>
      </ScrollLink>

      <button
        className={`nav__hamburger ${open ? "active" : ""}`}
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
        aria-expanded={open}
      >
        <span />
        <span />
        <span />
      </button>

      <ul className="navbar--items">
        {LINKS.map((l) => (
          <li key={l.to}>
            <ScrollLink
              to={l.to}
              className={`navbar--link ${active === l.to ? "active" : ""}`}
              onClick={close}
            >
              {l.label}
            </ScrollLink>
          </li>
        ))}
        <li className="navbar--cta-mobile">
          <ScrollLink to="Contact" className="btn btn-primary" onClick={close}>
            Let's talk
          </ScrollLink>
        </li>
      </ul>

      <ScrollLink to="Contact" className="btn btn-primary navbar--cta">
        Let's talk
      </ScrollLink>
    </nav>
  );
}

export default Navbar;
