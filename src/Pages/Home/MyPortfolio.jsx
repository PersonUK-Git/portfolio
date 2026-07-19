import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import data from "../../data/index.json";
import "../../App.css";

export default function MyPortfolio() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll(".portfolio--section--card");
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

  const handleExternalLinkClick = (url) => {
    window.open(url, "_blank");
  };

  return (
    <section className="portfolio--section" id="MyPortfolio" ref={sectionRef}>
      <div className="portfolio--container-box">
        <div className="portfolio--container">
          <p className="sub--title">Recent Projects</p>
          <h2 className="section--heading">My Portfolio</h2>
        </div>
        <div>
          <button
            className="btn btn-github"
            onClick={() => handleExternalLinkClick("https://github.com/PersonUK-Git")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
            </svg>
            Visit My GitHub
          </button>
        </div>
      </div>
      <div className="portfolio--section--container">
        {data?.portfolio?.map((item, index) => (
          <div
            key={index}
            className="portfolio--section--card"
            style={{
              opacity: 0,
              transform: "translateY(30px)",
              transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
            onClick={() => handleExternalLinkClick(item.linkAdd)}
          >
            <div className="portfolio--section--img" style={{ position: "relative" }}>
              {item.images && item.images.length > 0 ? (
                <div style={{ 
                  display: "grid", 
                  gridTemplateColumns: "repeat(4, 1fr)", 
                  gap: "8px", 
                  padding: "12px",
                  background: "rgba(94, 59, 238, 0.03)"
                }}>
                  {item.images.map((imgUrl, i) => (
                    <img 
                      key={i} 
                      src={imgUrl} 
                      alt={`${item.title} - Screenshot ${i + 1}`} 
                      style={{ 
                        width: "100%", 
                        height: "180px", 
                        objectFit: "cover",
                        borderRadius: "8px",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                      }}
                    />
                  ))}
                </div>
              ) : (
                <img src={item.src} alt={item.title} />
              )}
            </div>
            <div className="portfolio--section--card--content">
              <h3 className="portfolio--section--title">{item.title}</h3>
              <p className="text-md" style={{ color: "var(--text-muted)", fontSize: "14px" }}>
                {item.description}
              </p>

              {item.tags && (
                <div className="portfolio--tech-tags">
                  {item.tags.map((tag, i) => (
                    <span key={i} className="portfolio--tech-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <Link
                to="#"
                className="portfolio--link"
                onClick={(e) => {
                  e.stopPropagation();
                  handleExternalLinkClick(item.linkAdd);
                }}
              >
                {item.link}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
