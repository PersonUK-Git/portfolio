import { Link } from "react-router-dom";
import "../../App.css"
export default function HeroSection() {
  return (
    <section id="heroSection" className="hero--section">
      <div className="hero--section--content--box">
        <div className="hero--section--content">
          <p className="section--title">Hey, I'm Prateek</p>
          <h1 className="hero--section--title">
            <span className="hero--section-title--color">Computer Science Engineering Student & Aspiring Full Stack</span>{" "}
            <br />
            Developer
          </h1>
          <p className="hero--section-description">
          Passionate about leveraging cutting-edge technologies to create innovative solutions. Currently honing skills in full-stack development
           while pursuing a degree in Computer Science Engineering.
           
            <br /> Committed to continuous learning and embracing challenges in the ever-evolving tech landscape.
          </p>
        </div>
        <button className="btn btn-primary">
          <Link className="link" to="https://www.linkedin.com/in/prateek-sharma-1b4882264/">
          Get In Touch
          </Link>
        </button>
      </div>
      <div className="hero--section--img">
        <img src="./img/hero_img.png" alt="Hero Section" />
      </div>
    </section>
  );
}
