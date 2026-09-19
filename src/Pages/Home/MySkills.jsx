import { lazy, Suspense, useState } from "react";
import data from "../../data/index.json";
import { useInView } from "../../hooks/useInView";

const SkillsGlobe = lazy(() => import("../../three/SkillsGlobe"));

export default function MySkills() {
  const [activeGroup, setActiveGroup] = useState(null);
  const [globeRef, globeInView] = useInView();

  return (
    <section id="mySkills" className="section">
      <div className="section--header reveal">
        <p className="eyebrow">03 · Skills</p>
        <h2 className="section--title">
          My <span className="gradient-text">tech universe</span>
        </h2>
        <p className="section--lead">
          Spin the globe, then hover or tap a category to light up its tools.
        </p>
      </div>

      <div className="skills--layout">
        <div className="skills--globe reveal" ref={globeRef}>
          <Suspense fallback={<div className="canvas-fallback" />}>
            <SkillsGlobe skills={data.skills} activeGroup={activeGroup} active={globeInView} />
          </Suspense>
        </div>

        <div className="skills--groups">
          {data.skills.map((g) => (
            <div
              key={g.group}
              className={`skills--group glass reveal ${activeGroup === g.group ? "active" : ""}`}
              style={{ "--group": g.color }}
              onMouseEnter={() => setActiveGroup(g.group)}              onMouseLeave={() => setActiveGroup(null)}
              onFocus={() => setActiveGroup(g.group)}
              onBlur={() => setActiveGroup(null)}
              tabIndex={0}
            >
              <h3>
                <span className="skills--swatch" />
                {g.group}
              </h3>
              <div className="tags">
                {g.items.map((item) => (
                  <span key={item} className="tag">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
