import { useEffect, useRef } from "react";
import data from "../../data/index.json";

export default function Testimonial() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll(".testimonial--section--card");
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.style.opacity = "1";
                card.style.transform = "translateY(0)";
              }, index * 150);
            });
          }
        });
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="testimonial--section" id="testimonial" ref={sectionRef}>
      <div className="portfolio--container-box">
        <div className="portfolio--container">
          <p className="sub--title">Feedbacks</p>
          <h2 className="sections--heading">Faculty Feedback</h2>
        </div>
      </div>
      <div className="portfolio--section--container" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "32px", width: "100%" }}>
        {data?.testimonial?.map((item, index) => (
          <div
            key={index}
            className="testimonial--section--card"
            style={{
              opacity: 0,
              transform: "translateY(30px)",
              transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            <div className="testimonial--section--card--review">
              {Array.from({ length: 5 }, (_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="var(--primary)"
                  stroke="none"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              ))}
            </div>
            <p className="text-md" style={{ fontStyle: "italic", color: "var(--text-secondary)", lineHeight: "1.7" }}>
              "{item.description}"
            </p>
            <div className="testimonial--section--card--author--detail">
              <img src={item.src} alt="Avatar" />
              <div>
                <p className="text-md testimonial--author--name">{item.author_name}</p>
                <p className="text-md testimonial--author--designation">{item.author_designation}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
