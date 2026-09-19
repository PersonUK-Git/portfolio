import React, { useState } from "react";
import { toast } from "react-toastify";
import data from "../../data/index.json";
import { GithubIcon, LinkedinIcon, MailIcon } from "../../components/Icons";

const EMPTY = { firstName: "", lastName: "", email: "", phoneNumber: "", topic: "", message: "" };

export default function ContactMe() {
  const { profile } = data;
  const [formData, setFormData] = useState(EMPTY);
  const [sending, setSending] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      const response = await fetch("https://portfolio-camq.onrender.com/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error("Network response was not ok");
      await response.json();
      toast.success("Message sent successfully!");
      setFormData(EMPTY);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      toast.error(`Couldn't send right now. Email me directly at ${profile.email}.`);
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="Contact" className="section">
      <div className="contact glass reveal">
        <div className="contact--intro">
          <p className="eyebrow">06 · Contact</p>
          <h2 className="section--title">
            Let's build something <span className="gradient-text">out of this world</span>
          </h2>
          <p className="muted">
            Have a role, a freelance project or just a cool idea? My inbox is open, and I usually reply within a day.
          </p>
          <div className="contact--channels">
            <a href={`mailto:${profile.email}`} className="contact--channel">
              <MailIcon /> {profile.email}
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="contact--channel">
              <LinkedinIcon /> LinkedIn
            </a>
            <a href={profile.github} target="_blank" rel="noreferrer" className="contact--channel">
              <GithubIcon /> GitHub
            </a>
          </div>
        </div>

        <form className="contact--form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label>
              <span>First name</span>
              <input name="firstName" value={formData.firstName} onChange={handleChange} required />
            </label>
            <label>
              <span>Last name</span>
              <input name="lastName" value={formData.lastName} onChange={handleChange} required />
            </label>
          </div>
          <div className="form-row">
            <label>
              <span>Email</span>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </label>
            <label>
              <span>Phone</span>
              <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
            </label>
          </div>
          <label>
            <span>Topic</span>
            <select name="topic" value={formData.topic} onChange={handleChange} required>
              <option value="">Select one…</option>
              <option value="Job Opportunity">Job Opportunity</option>
              <option value="Freelance Project">Freelance Project</option>
              <option value="Collaboration">Collaboration</option>
              <option value="General Inquiry">General Inquiry</option>
              <option value="Feedback">Feedback</option>
            </select>
          </label>
          <label>
            <span>Message</span>
            <textarea name="message" rows="5" value={formData.message} onChange={handleChange} required />
          </label>
          <button type="submit" className="btn btn-primary" disabled={sending}>
            {sending ? "Sending…" : "Send message 🚀"}
          </button>
        </form>
      </div>
    </section>
  );
}
