import { useState, useEffect } from "react";
import { Link } from "react-scroll";
import "../../App.css";

export default function HeroSection() {
  const [typedText, setTypedText] = useState("");
  const fullText = "Full Stack Developer";

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setTypedText(fullText.slice(0, index + 1));
      index++;
      if (index >= fullText.length) {
        clearInterval(timer);
      }
    }, 80);
    return () => clearInterval(timer);
  }, []);

  const handleExternalLinkClick = (url) => {
    window.open(url, "_blank");
  };

  const openResumeInNewWindow = (resumePath) => {
    const newWindow = window.open(resumePath, "_blank", "fullscreen=yes");
    if (newWindow) {
      newWindow.focus();
      const anchor = document.createElement("a");
      anchor.href = resumePath;
      anchor.download = "Prateek_resume.pdf";
      anchor.click();
    } else {
      alert(
        "Your browser is blocking pop-ups. Please allow pop-ups and try again."
      );
    }
  };

  return (
    <section id="heroSection" className="hero--section">
      {/* Floating decorative shapes */}
      <div className="hero--floating-shape"></div>
      <div className="hero--floating-shape"></div>
      <div className="hero--floating-shape"></div>

      <div className="hero--section--content--box">
        <div className="hero--section--content">
          <p className="section--title">Hey, I'm Prateek</p>
          <h1 className="hero--section--title">
            <span className="hero--section-title--color">
              {typedText}
            </span>
            <span
              style={{
                borderRight: "3px solid var(--primary)",
                animation: "blink 1s step-end infinite",
                marginLeft: "2px",
              }}
            >
              &nbsp;
            </span>
            <br />
            <span style={{ color: "var(--heading-color)", fontSize: "0.6em", fontWeight: 600 }}>
              CSE Student & Tech Enthusiast
            </span>
          </h1>
          <p className="hero--section-description">
            Passionate about leveraging cutting-edge technologies to create
            innovative solutions. Currently honing skills in full-stack
            development while pursuing a degree in Computer Science Engineering.
          </p>
        </div>

        {/* Stats */}
        <div className="hero--stats">
          <div className="hero--stat">
            <span className="hero--stat--number">3+</span>
            <span className="hero--stat--label">Projects Built</span>
          </div>
          <div className="hero--stat">
            <span className="hero--stat--number">4+</span>
            <span className="hero--stat--label">Tech Skills</span>
          </div>
          <div className="hero--stat">
            <span className="hero--stat--number">2+</span>
            <span className="hero--stat--label">Endorsements</span>
          </div>
        </div>

        <div className="btn-container">
          <button
            className="btn btn-primary"
            onClick={() => {
              handleExternalLinkClick(
                "https://www.linkedin.com/in/prateek-sharma-1b4882264/"
              );
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ marginRight: 8 }}
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            Get In Touch
          </button>

          <button
            className="btn btn-outline-primary"
            style={{ display: "inline-flex" }}
            onClick={() => {
              openResumeInNewWindow("./assets/Prateek_resume.pdf");
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ marginRight: 8 }}
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
            See Resume
          </button>
        </div>
      </div>

      <div className="hero--section--img">
        <img src="./img/hero_img.png" alt="Prateek Sharma - Full Stack Developer" />
      </div>

      {/* Scroll down indicator */}
      <Link
        to="mySkills"
        smooth={true}
        duration={500}
        offset={-70}
        className="scroll--indicator"
      >
        <span>Scroll</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </Link>
    </section>
  );
}
