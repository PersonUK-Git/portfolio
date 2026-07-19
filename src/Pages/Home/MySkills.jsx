import { useEffect, useRef } from "react";
import data from "../../data/index.json";

export default function MySkills() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate progress bars when section comes into view
            const bars = entry.target.querySelectorAll(".skill--progress--fill");
            bars.forEach((bar) => {
              bar.classList.add("animate");
            });

            // Reveal cards with stagger
            const cards = entry.target.querySelectorAll(".skills--section--card");
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.style.opacity = "1";
                card.style.transform = "translateY(0)";
              }, index * 150);
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="skills--section" id="mySkills" ref={sectionRef}>
      <div className="portfolio--container" style={{ alignItems: "center", textAlign: "center" }}>
        <p className="section--title">My Skills</p>
        <h2 className="skills--section--heading">What I Bring to the Table</h2>
      </div>
      <div className="skills--section--container">
        {data?.skills?.map((item, index) => (
          <div
            key={index}
            className="skills--section--card"
            style={{
              opacity: 0,
              transform: "translateY(30px)",
              transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1)`,
            }}
          >
            <div className="skills--section--img">
              <img src={item.src} alt={item.title} />
            </div>
            <div className="skills--section--card--content">
              <h3 className="skills--section--title">{item.title}</h3>
              <p className="skills--section--description">{item.description}</p>

              {/* Tech Stack Tags */}
              {item.techStack && (
                <div className="portfolio--tech-tags">
                  {item.techStack.map((tech, i) => (
                    <span key={i} className="portfolio--tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
              )}

              {/* Progress Bar */}
              {item.progress && (
                <div className="skill--progress--container">
                  <div className="skill--progress--label">
                    <span className="skill--progress--name">Proficiency</span>
                    <span className="skill--progress--percent">{item.progress}%</span>
                  </div>
                  <div className="skill--progress--bar">
                    <div
                      className="skill--progress--fill"
                      style={{ "--progress": `${item.progress}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
