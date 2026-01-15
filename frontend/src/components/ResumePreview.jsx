import React from "react";

export default function ResumePreview({ data }) {
  // Ensure arrays exist
  const experience = Array.isArray(data.experience) ? data.experience : [];
  const education = Array.isArray(data.education) ? data.education : [];
  const projects = Array.isArray(data.projects) ? data.projects : [];
  const skills = Array.isArray(data.skills) ? data.skills : [];

  return (
    <div className="resume-preview">
      {/* HEADER */}
      <header className="resume-header">
        <div className="personal-info">
          <h1>{data.name || "Full Name"}</h1>
          <p>{data.email || "Email"} | {data.phone || "Phone"}</p>
        </div>
        <div className="links">
          {data.github && <p>GitHub: <a href={data.github}>{data.github}</a></p>}
          {data.linkedin && <p>LinkedIn: <a href={data.linkedin}>{data.linkedin}</a></p>}
          {data.portfolio && <p>Portfolio: <a href={data.portfolio}>{data.portfolio}</a></p>}
        </div>
      </header>

      {/* SUMMARY */}
      {data.summary && (
        <section className="section">
          <h2>Professional Summary</h2>
          <p>{data.summary}</p>
        </section>
      )}

      {/* SKILLS */}
      {skills.length > 0 && (
        <section className="section">
          <h2>Technical Skills</h2>
          <ul className="skills-preview">
            {skills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </section>
      )}

      {/* EXPERIENCE */}
      {experience.length > 0 && (
        <section className="section">
          <h2>Experience</h2>
          {experience.map((exp, i) => (
            <div key={i} className="resume-block">
              <h3>{exp.role || "Role"}</h3>
              <p className="company">{exp.company || "Company"} | {exp.startDate || "Start"} - {exp.endDate || "End"}</p>
              <p>{exp.description || "Description"}</p>
            </div>
          ))}
        </section>
      )}

      {/* PROJECTS */}
      {projects.length > 0 && (
        <section className="section">
          <h2>Projects</h2>
          {projects.map((proj, i) => (
            <div key={i} className="resume-block">
              <h3>{proj.title || "Project Title"}</h3>
              <p className="project-links">{proj.techStack || "Tech Stack"} | {proj.links || "Links"}</p>
              <p>{proj.description || "Description"}</p>
            </div>
          ))}
        </section>
      )}

      {/* EDUCATION */}
      {education.length > 0 && (
        <section className="section">
          <h2>Education</h2>
          {education.map((edu, i) => (
            <div key={i} className="resume-block">
              <h3>{edu.degree || "Degree"}</h3>
              <p>{edu.institute || "Institute"} | {edu.graduationYear || "Year"}</p>
              <p>{edu.subjects || "Subjects / Specialization"}</p>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
