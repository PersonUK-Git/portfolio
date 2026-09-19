import data from "../../data/index.json";

export default function Experience() {
  return (
    <section id="experience" className="section">
      <div className="chapter" aria-hidden="true">
        <span className="chapter-word">Experience</span>
      </div>
      <div className="section--header">
        <p className="eyebrow">02 · Experience</p>
        <h2 className="section--title">
          Where I've been <span className="gradient-text">building</span>
        </h2>
      </div>

      <div className="timeline">
        <span className="timeline--line" />
        {data.experience.map((exp) => (
          <article key={exp.id} className="timeline--item reveal">
            <span className="timeline--dot" />
            <div className="timeline--card glass">
              <header className="timeline--header">
                <div>
                  <h3>{exp.role}</h3>
                  <p className="timeline--company">
                    {exp.company} <span className="muted">· {exp.location}</span>
                  </p>
                </div>
                <span className="chip chip--live">{exp.duration}</span>
              </header>
              <ul className="timeline--points">
                {exp.points.map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>
              <div className="tags">
                {exp.tags.map((t) => (
                  <span key={t} className="tag">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
