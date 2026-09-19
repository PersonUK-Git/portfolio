import { Link } from "react-scroll";
import data from "../../data/index.json";
import { GithubIcon, LinkedinIcon, MailIcon } from "../../components/Icons";

function Footer() {
  const { profile } = data;
  return (
    <footer className="footer">
      <Link to="heroSection" smooth duration={800} className="navbar--brand">
        <span className="navbar--logo">P</span>
        Prateek<span className="accent">.dev</span>
      </Link>
      <p className="muted small">
        © {new Date().getFullYear()} {profile.name}. Built with React &amp; Three.js.
      </p>
      <div className="footer--socials">
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
    </footer>
  );
}

export default Footer;
