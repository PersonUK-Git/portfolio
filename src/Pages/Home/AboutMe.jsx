import { useEffect, useRef } from "react";
import data from "../../data/index.json";

export default function AboutMe() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-scale");
            elements.forEach((el, index) => {
              setTimeout(() => {
                el.classList.add("revealed");
              }, index * 80);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="AboutMe" className="about--section" ref={sectionRef}>
      <div className="hero--section--content--box about--section--box">
        <div className="hero--section--content">
          <p className="section--title reveal">About</p>
          <h1 className="skills--section--heading reveal" style={{ textAlign: "left" }}>About Me & Experience</h1>
          <p className="hero--section-description reveal">
            I am a Software Developer and Computer Science Engineering student passionate about crafting high-performance cross-platform applications, custom native bridges, and centralized backend/SSO ecosystems.
          </p>
          <p className="hero--section-description reveal">
            My experience spans building centralized authentication hubs, integrating biometrics with iOS HealthKit & Android Health Connect, and publishing fully automated production apps to the Play Store.
          </p>
        </div>

        {/* Stats */}
        <div className="about--stats reveal">
          <div className="about--stat--card">
            <div className="about--stat--number">1+ Yrs</div>
            <div className="about--stat--label">Experience</div>
          </div>
          <div className="about--stat--card">
            <div className="about--stat--number">3+</div>
            <div className="about--stat--label">Live Apps</div>
          </div>
          <div className="about--stat--card">
            <div className="about--stat--number">15+</div>
            <div className="about--stat--label">Reusable Components</div>
          </div>
        </div>
      </div>

      {/* Experience Timeline */}
      <div className="about--timeline--wrapper reveal-right">
        <h3 style={{ 
          marginBottom: "24px", 
          color: "var(--heading-color)",
          fontSize: "24px",
          fontWeight: 700 
        }}>
          Work Experience
        </h3>
        <div className="about--timeline">
          {data?.experience?.map((exp, idx) => (
            <div key={idx} className="about--timeline--item reveal">
              <div className="about--timeline--year">{exp.duration}</div>
              <div className="about--timeline--title">{exp.role} @ {exp.company}</div>
              <p className="text-sm" style={{ color: "var(--primary)", fontWeight: "600", marginBottom: "8px" }}>
                {exp.location}
              </p>
              <ul style={{ paddingLeft: "16px", color: "var(--text-muted)", fontSize: "14px", lineHeight: "1.6" }}>
                {exp.points.map((pt, pIdx) => (
                  <li key={pIdx} style={{ marginBottom: "6px" }}>{pt}</li>
                ))}
              </ul>
              <div className="portfolio--tech-tags" style={{ marginTop: "12px" }}>
                {exp.tags.map((tag, tIdx) => (
                  <span key={tIdx} className="portfolio--tech-tag" style={{ background: "rgba(94, 59, 238, 0.05)" }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}

          {/* Education Milestone */}
          <div className="about--timeline--item reveal">
            <div className="about--timeline--year">2021 - 2025</div>
            <div className="about--timeline--title">B.Tech in Computer Science Engineering</div>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>Amity University Haryana</p>
          </div>
        </div>
      </div>
    </section>
  );
}
