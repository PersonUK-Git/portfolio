import data from "../../data/index.json";
import { BriefcaseIcon, CapIcon, MapPinIcon } from "../../components/Icons";

export default function AboutMe() {
  const { profile, education } = data;

  return (
    <section id="AboutMe" className="section">
      <div className="chapter" aria-hidden="true">
        <span className="chapter-word">About</span>
      </div>
      <div className="section--header">
        <p className="eyebrow">01 · About</p>
        <h2 className="section--title">
          A developer who ships <span className="gradient-text">end to end</span>
        </h2>
      </div>

      <div className="about--grid">
        <div className="about--text glass reveal">
          <p>{profile.summary}</p>
          <p>
            By day I'm at <strong>{profile.company}</strong>, building identity, billing and health-data
            infrastructure. On my own time I build and publish apps, from an RPG-style productivity app on the
            Play Store to a procedurally generated Unity arcade and an on-device AI money tracker.
          </p>

          <ul className="about--facts">
            <li>
              <BriefcaseIcon /> Software Developer, {profile.company}
            </li>
            <li>
              <MapPinIcon /> {profile.location}, India
            </li>
            <li>
              <CapIcon /> B.Tech CSE, Amity University Haryana
            </li>
          </ul>
        </div>

        <div className="code-card glass reveal" aria-label="Profile summary as code">
          <div className="code-card--bar">
            <span />
            <span />
            <span />
            <em>prateek.ts</em>
          </div>
          <pre>
            <code>
              <span className="tk-key">const</span> <span className="tk-var">prateek</span> = {"{"}
              {"\n  "}role: <span className="tk-str">"Full Stack Developer"</span>,
              {"\n  "}company: <span className="tk-str">"{profile.company}"</span>,
              {"\n  "}stack: [<span className="tk-str">"React"</span>, <span className="tk-str">"React Native"</span>,
              {"\n          "}<span className="tk-str">"Flutter"</span>, <span className="tk-str">"Node.js"</span>,{" "}
              <span className="tk-str">"TypeScript"</span>],
              {"\n  "}native: [<span className="tk-str">"Swift"</span>, <span className="tk-str">"Kotlin"</span>],
              {"\n  "}shipped: <span className="tk-num">8</span>,
              {"\n  "}playStore: <span className="tk-key">true</span>,
              {"\n  "}openTo: <span className="tk-str">"cool problems"</span>,
              {"\n"}
              {"}"};
            </code>
          </pre>
        </div>
      </div>

      <div className="education reveal">
        <h3 className="subheading">
          <CapIcon size={20} /> Education
        </h3>
        <div className="education--list">
          {education.map((e) => (
            <div key={e.degree} className="education--item glass">
              <span className="education--year">{e.duration}</span>
              <strong>{e.school}</strong>
              <span className="muted">{e.degree}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
