import data from "../../data/index.json";
import { StarIcon } from "../../components/Icons";

export default function Testimonial() {
  return (
    <section id="testimonial" className="section">
      <div className="section--header reveal">
        <p className="eyebrow">05 · Feedback</p>
        <h2 className="section--title">
          Kind words from <span className="gradient-text">faculty</span>
        </h2>
      </div>

      <div className="testimonials">
        {data.testimonial.map((t) => (
          <figure key={t.id} className="testimonial glass reveal">
            <div className="testimonial--stars" aria-label="5 out of 5 stars">
              {Array.from({ length: 5 }, (_, i) => (
                <StarIcon key={i} />
              ))}
            </div>
            <blockquote>“{t.description}”</blockquote>
            <figcaption>
              <img src={t.src} alt="" />
              <div>
                <strong>{t.author_name}</strong>
                <span className="muted small">{t.author_designation}</span>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
