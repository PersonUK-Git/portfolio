import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import data from "../../data/index.json";
import { useInView } from "../../hooks/useInView";
import { scrollToId } from "../../motion/smoothScroll";
import { ArrowUpRight, GithubIcon, LockIcon } from "../../components/Icons";

const ProjectGalaxy = lazy(() => import("../../three/ProjectGalaxy"));

const STATUS_CLASS = { live: "chip--live", wip: "chip--wip", private: "chip--private" };

// 3D tilt + cursor spotlight, written straight to CSS variables so hovering
// never re-renders React.
function onTilt(e) {
  const card = e.currentTarget;
  const r = card.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width;
  const y = (e.clientY - r.top) / r.height;
  card.style.setProperty("--rx", `${(0.5 - y) * 8}deg`);
  card.style.setProperty("--ry", `${(x - 0.5) * 10}deg`);
  card.style.setProperty("--mx", `${x * 100}%`);
  card.style.setProperty("--my", `${y * 100}%`);
}
function resetTilt(e) {
  e.currentTarget.style.setProperty("--rx", "0deg");
  e.currentTarget.style.setProperty("--ry", "0deg");
}

function ProjectLinks({ project }) {
  if (!project.links.length) {
    return (
      <span className="project--private">
        <LockIcon size={14} /> Private source · demo on request
      </span>
    );
  }
  return (
    <div className="project--links">
      {project.links.map((l) => (
        <a key={l.url} href={l.url} target="_blank" rel="noreferrer" className="project--link">
          {l.label === "GitHub" && <GithubIcon size={15} />}
          {l.label}
          <ArrowUpRight size={14} />
        </a>
      ))}
    </div>
  );
}

function FeaturedProject({ project, flash }) {
  return (
    <article id={`project-${project.id}`} className={`featured glass ${flash ? "flash" : ""}`} style={{ "--accent": project.color }}>
      <div className="featured--info">
        <div className="featured--head">
          <img src={project.icon} alt="" className="featured--icon" />
          <div>
            <span className={`chip ${STATUS_CLASS[project.statusType]}`}>● {project.status}</span>
            <h3 className="featured--title">{project.title}</h3>
          </div>
        </div>
        <p className="featured--tagline">{project.tagline}</p>
        <p className="muted">{project.description}</p>
        <ul className="project--highlights">
          {project.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
        <div className="tags">
          {project.tags.map((t) => (
            <span key={t} className="tag">
              {t}
            </span>
          ))}
        </div>
        <ProjectLinks project={project} />
      </div>
      <div className="featured--phones" aria-label={`${project.title} screenshots`}>
        {project.images.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={`${project.title} screenshot ${i + 1}`}
            loading="lazy"
            className="featured--phone"
            style={{ "--i": i }}
          />
        ))}
      </div>
    </article>
  );
}

function ProjectCard({ project, flash }) {
  return (
    <article
      id={`project-${project.id}`}
      className={`project glass ${flash ? "flash" : ""}`}
      style={{ "--accent": project.color }}
      onMouseMove={onTilt}
      onMouseLeave={resetTilt}
    >
      <div className="project--glow" />
      <div className="project--top">
        <span className="project--orb" />
        <span className={`chip ${STATUS_CLASS[project.statusType]}`}>{project.status}</span>
      </div>
      <h3 className="project--title">{project.title}</h3>
      <p className="project--tagline">{project.tagline}</p>
      <p className="project--description">{project.description}</p>
      <ul className="project--highlights">
        {project.highlights.map((h) => (
          <li key={h}>{h}</li>
        ))}
      </ul>
      <div className="tags">
        {project.tags.map((t) => (
          <span key={t} className="tag">
            {t}
          </span>
        ))}
      </div>
      <div className="project--footer">
        <span className="muted small">
          {project.categories.join(" · ")} · {project.date}
        </span>
        <ProjectLinks project={project} />
      </div>
    </article>
  );
}

export default function MyPortfolio() {
  const { projects, categories, profile } = data;
  const [filter, setFilter] = useState("All");
  const [flashId, setFlashId] = useState(null);
  const [galaxyRef, galaxyInView] = useInView();
  const flashTimer = useRef();

  const featured = projects.find((p) => p.featured);
  const rest = projects.filter((p) => !p.featured && (filter === "All" || p.categories.includes(filter)));
  const showFeatured = filter === "All" || featured.categories.includes(filter);

  // Filtering changes the page height, so scroll-driven animations re-measure.
  useEffect(() => {
    ScrollTrigger.refresh();
  }, [filter]);

  const selectProject = (id) => {
    setFilter("All");
    // Wait a frame so the card exists if a filter was hiding it.
    requestAnimationFrame(() => {
      scrollToId(`project-${id}`, -100);
      setFlashId(id);
      clearTimeout(flashTimer.current);
      flashTimer.current = setTimeout(() => setFlashId(null), 1800);
    });
  };

  return (
    <section id="MyPortfolio" className="section">
      <div className="chapter" aria-hidden="true">
        <span className="chapter-word">Projects</span>
      </div>
      <div className="section--header">
        <p className="eyebrow">04 · Projects</p>
        <h2 className="section--title">
          The <span className="gradient-text">project galaxy</span>
        </h2>
        <p className="section--lead reveal">
          Every planet is something I've built. Click one to fly to it, or scroll through them all below.
        </p>
      </div>

      <div className="galaxy glass" ref={galaxyRef}>
        <Suspense fallback={<div className="canvas-fallback" />}>
          <ProjectGalaxy projects={projects} onSelect={selectProject} active={galaxyInView} />
        </Suspense>
        <span className="galaxy--hint">Click a planet to jump to it</span>
      </div>

      <div className="filters reveal" role="tablist" aria-label="Filter projects">
        {categories.map((c) => (
          <button
            key={c}
            role="tab"
            aria-selected={filter === c}
            className={`filter ${filter === c ? "active" : ""}`}
            onClick={() => setFilter(c)}
          >
            {c}
            <span className="filter--count">
              {c === "All" ? projects.length : projects.filter((p) => p.categories.includes(c)).length}
            </span>
          </button>
        ))}
      </div>

      {showFeatured && <FeaturedProject project={featured} flash={flashId === featured.id} />}

      <div className="projects--grid">
        {rest.map((p) => (
          <ProjectCard key={p.id} project={p} flash={flashId === p.id} />
        ))}
      </div>

      <div className="projects--more reveal">
        <a href={profile.github} target="_blank" rel="noreferrer" className="btn btn-ghost">
          <GithubIcon /> More on GitHub
        </a>
      </div>
    </section>
  );
}
