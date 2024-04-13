import { Link } from "react-router-dom";
import { useState } from "react";
import "../../App.css"
export default function HeroSection() {



  const handleExternalLinkClick = (url) => {
    window.open(url, "_blank");
  };



  const [displayResume, setDisplayResume] = useState(false);

  const openResumeInNewWindow = (resumePath) => {
    const newWindow = window.open(resumePath, "_blank", "fullscreen=yes");
    if (newWindow) {
      newWindow.focus();

      const anchor = document.createElement('a');
    anchor.href = resumePath;
    anchor.download = 'Prateek_resume.pdf';
    anchor.click();
    } else {
      alert("Your browser is blocking pop-ups. Please allow pop-ups and try again.");
    }
  };
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

        <div className="btn-container">
        <button className="btn btn-primary" onClick={() => {
          handleExternalLinkClick("https://www.linkedin.com/in/prateek-sharma-1b4882264/")
        }}>
          
          Get In Touch
          
        </button>


            <button className="btn btn-primary" onClick={() => {
      openResumeInNewWindow("./assets/Prateek_resume.pdf");
    }}>
      See Resume
    </button>

        {displayResume && (
        <div className="resume-container">
          <embed src="./img/Prateek_resume.pdf" type="application/pdf" width="100%" height="600px" />
        </div>
      )}
        </div>
      </div>
      <div className="hero--section--img">
        <img src="./img/hero_img.png" alt="Hero Section" />
      </div>
    </section>
  );
}
