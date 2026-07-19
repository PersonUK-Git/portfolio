import React, { useState } from 'react';
import { toast } from 'react-toastify';

export default function ContactMe() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    topic: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://portfolio-camq.onrender.com/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      await response.json();
      toast.success("Message sent successfully!");
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        topic: '',
        message: '',
      });
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      toast.error("There was an error sending your message. Please try again later.");
    }
  };

  return (
    <section id="Contact" className="contact--section">
      <div style={{ maxWidth: "600px", margin: "0 auto 16px" }}>
        <p className="sub--title">Get In Touch</p>
        <h2 className="section--heading" style={{ marginTop: "8px", marginBottom: "16px" }}>Contact Me</h2>
        <p className="text-lg" style={{ color: "var(--text-muted)" }}>
          Get in touch to explore collaborations or discuss opportunities in tech and engineering.
        </p>
      </div>
      <form className="contact--form--container" onSubmit={handleSubmit}>
        <div className="container">
          <label htmlFor="firstName" className="contact--label">
            <span className="text-md">First Name</span>
            <input
              type="text"
              className="contact--input text-md"
              name="firstName"
              id="firstName"
              placeholder="First name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </label>
          <label htmlFor="lastName" className="contact--label">
            <span className="text-md">Last Name</span>
            <input
              type="text"
              className="contact--input text-md"
              name="lastName"
              id="lastName"
              placeholder="Last name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </label>
          <label htmlFor="email" className="contact--label">
            <span className="text-md">Email</span>
            <input
              type="email"
              className="contact--input text-md"
              name="email"
              id="email"
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
          <label htmlFor="phoneNumber" className="contact--label">
            <span className="text-md">Phone Number</span>
            <input
              type="number"
              className="contact--input text-md"
              name="phoneNumber"
              id="phoneNumber"
              placeholder="Phone number"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <label htmlFor="topic" className="contact--label">
          <span className="text-md">Choose a topic</span>
          <select
            id="topic"
            className="contact--input text-md"
            name="topic"
            value={formData.topic}
            onChange={handleChange}
            required
          >
            <option value="">Select One...</option>
            <option value="Collaboration">Collaboration</option>
            <option value="Freelance Project">Freelance Project</option>
            <option value="Job Opportunity">Job Opportunity</option>
            <option value="Speaking Engagement">Speaking Engagement</option>
            <option value="Technical Support">Technical Support</option>
            <option value="General Inquiry">General Inquiry</option>
            <option value="Feedback">Feedback</option>
          </select>
        </label>
        <label htmlFor="message" className="contact--label">
          <span className="text-md">Message</span>
          <textarea
            className="contact--input text-md"
            id="message"
            name="message"
            rows="6"
            placeholder="Type your message..."
            value={formData.message}
            onChange={handleChange}
            required
          />
        </label>
        <div>
          <button type="submit" className="btn btn-primary contact--form--btn">
            Send Message
          </button>
        </div>
      </form>
    </section>
  );
}
