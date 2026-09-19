import { useEffect, useState } from "react";
import data from "../../data/index.json";
import ScrollLink from "../../components/ScrollLink";
import { ArrowDown, FileIcon, GithubIcon, LinkedinIcon, MailIcon } from "../../components/Icons";

// Types each role out, pauses, deletes it, then moves on to the next one.
function useTypewriter(words) {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index % words.length];
    let delay = deleting ? 40 : 85;
    if (!deleting && text === word) delay = 1600;
    if (deleting && text === "") delay = 300;

    const timer = setTimeout(() => {
      if (!deleting && text === word) setDeleting(true);
      else if (deleting && text === "") {
        setDeleting(false);
        setIndex((i) => i + 1);
      } else setText(word.slice(0, text.length + (deleting ? -1 : 1)));
    }, delay);
    return () => clearTimeout(timer);
  }, [text, deleting, index, words]);

  return text;
}

export default function HeroSection() {
  const { profile, stats } = data;
  const typed = useTypewriter(profile.roles);

  return (
    <section id="heroSection" className="hero">
      <div className="hero--content">
        <p className="hero--badge">
          <span className="pulse-dot" />
          Software Developer @ {profile.company}
        </p>

        <h1 className="hero--title">
          Hi, I'm <span className="gradient-text">Prateek Sharma</span>
        </h1>
        <p className="hero--typed" aria-label={profile.roles.join(", ")}>
          <span aria-hidden="true">
            {typed}
            <span className="caret" />
          </span>
        </p>

        <p className="hero--description">
          I build cross-platform apps, SSO systems and native mobile bridges, and ship them with Docker and CI/CD. I
          like making software feel alive, so this site is a small universe of its own.
        </p>

        <div className="hero--actions">
          <ScrollLink to="MyPortfolio" className="btn btn-primary">
            Explore my work
          </ScrollLink>
          <a href={profile.resume} target="_blank" rel="noreferrer" className="btn btn-ghost">
            <FileIcon /> Resume
          </a>
        </div>

        <div className="hero--socials">
          <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub">
            <GithubIcon />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <LinkedinIcon />
          </a>
          <a href={`mailto:${profile.email}`} aria-label="Email">
            <MailIcon />
          </a>
        </div>
      </div>

      <div className="hero--stats">
        {stats.map((s) => (
          <div key={s.label} className="hero--stat glass">
            <span className="hero--stat-value gradient-text">{s.value}</span>
            <span className="hero--stat-label">{s.label}</span>
          </div>
        ))}
      </div>

      <ScrollLink to="AboutMe" className="scroll-indicator" aria-label="Scroll down">
        <span className="mouse">
          <span className="wheel" />
        </span>
        <ArrowDown size={16} />
      </ScrollLink>
    </section>
  );
}
