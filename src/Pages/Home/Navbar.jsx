import { useEffect, useState } from "react";
import { Link } from "react-scroll";

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

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(window.scrollY > 20);
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    const onResize = () => window.innerWidth > 960 && setOpen(false);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const close = () => setOpen(false);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""} ${open ? "open" : ""}`}>
      <div className="navbar--progress" style={{ transform: `scaleX(${progress})` }} />
      <Link to="heroSection" smooth duration={600} className="navbar--brand" onClick={close}>
        <span className="navbar--logo">P</span>
        Prateek<span className="accent">.dev</span>
      </Link>

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
            <Link
              to={l.to}
              spy
              smooth
              offset={-80}
              duration={600}
              activeClass="active"
              className="navbar--link"
              onClick={close}
            >
              {l.label}
            </Link>
          </li>
        ))}
        <li className="navbar--cta-mobile">
          <Link to="Contact" smooth offset={-80} duration={600} className="btn btn-primary" onClick={close}>
            Let's talk
          </Link>
        </li>
      </ul>

      <Link to="Contact" smooth offset={-80} duration={600} className="btn btn-primary navbar--cta">
        Let's talk
      </Link>
    </nav>
  );
}

export default Navbar;
