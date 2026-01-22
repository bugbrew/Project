import React from "react";

const ALL_SKILLS = [
  "C", "C++", "Python", "Java", "JavaScript",
  "HTML", "CSS", "React", "Node.js", "Express",
  "SQL", "MongoDB", "Git", "Linux", "Ruby", "TypeScript"
];

export default function ResumeForm({ resumeData, setResumeData }) {

  const handleChange = (e) => {
    const { name, value } = e.target;
    setResumeData(prev => ({ ...prev, [name]: value }));
  };

  const toggleSkill = (skill) => {
    setResumeData(prev => {
      const skills = prev.skills || [];
      const updatedSkills = skills.includes(skill)
        ? skills.filter(s => s !== skill)
        : [...skills, skill];
      return { ...prev, skills: updatedSkills };
    });
  };

  // Experience handlers
  const handleExperienceChange = (index, field, value) => {
    const updated = [...resumeData.experience];
    updated[index][field] = value;
    setResumeData(prev => ({ ...prev, experience: updated }));
  };

  const addExperience = () => {
    setResumeData(prev => ({
      ...prev,
      experience: [...prev.experience, { company: "", role: "", startDate: "", endDate: "", description: "" }]
    }));
  };

  const removeExperience = (index) => {
    const updated = resumeData.experience.filter((_, i) => i !== index);
    setResumeData(prev => ({ ...prev, experience: updated }));
  };

  // Education handlers
  const handleEducationChange = (index, field, value) => {
    const updated = [...resumeData.education];
    updated[index][field] = value;
    setResumeData(prev => ({ ...prev, education: updated }));
  };

  const addEducation = () => {
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, { institute: "", degree: "", graduationYear: "", subjects: "" }]
    }));
  };

  const removeEducation = (index) => {
    const updated = resumeData.education.filter((_, i) => i !== index);
    setResumeData(prev => ({ ...prev, education: updated }));
  };

  // Project handlers
  const handleProjectChange = (index, field, value) => {
    const updated = [...resumeData.projects];
    updated[index][field] = value;
    setResumeData(prev => ({ ...prev, projects: updated }));
  };

  const addProject = () => {
    setResumeData(prev => ({
      ...prev,
      projects: [...prev.projects, { title: "", description: "", techStack: "", links: "" }]
    }));
  };

  const removeProject = (index) => {
    const updated = resumeData.projects.filter((_, i) => i !== index);
    setResumeData(prev => ({ ...prev, projects: updated }));
  };

  return (
    <div className="resume-form">
      <h1>Resume Builder</h1>

      {/* Personal Details / Links */}
      <section className="form-grid two-section">
        <div className="form-box">
          <h2>Personal Details</h2>
          <input name="name" placeholder="Full Name" value={resumeData.name} onChange={handleChange} />
          <input name="email" placeholder="Email" value={resumeData.email} onChange={handleChange} />
          <input name="phone" placeholder="Phone" value={resumeData.phone} onChange={handleChange} />
        </div>
        <div className="form-box">
          <h2>Links</h2>
          <input name="github" placeholder="GitHub URL" value={resumeData.github} onChange={handleChange} />
          <input name="linkedin" placeholder="LinkedIn URL" value={resumeData.linkedin} onChange={handleChange} />
          <input name="portfolio" placeholder="Portfolio Website" value={resumeData.portfolio} onChange={handleChange} />
        </div>

        <div className="links-preview">
        {resumeData.github && (
          <p>
            GitHub:{" "}
            <a
              href={resumeData.github.startsWith("http") ? resumeData.github : `https://${resumeData.github}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {resumeData.github}
            </a>
          </p>
        )}

        {resumeData.linkedin && (
          <p>
            LinkedIn:{" "}
            <a
              href={resumeData.linkedin.startsWith("http") ? resumeData.linkedin : `https://${resumeData.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {resumeData.linkedin}
            </a>
          </p>
        )}

        {resumeData.portfolio && (
          <p>
            Portfolio:{" "}
            <a
              href={resumeData.portfolio.startsWith("http") ? resumeData.portfolio : `https://${resumeData.portfolio}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {resumeData.portfolio}
            </a>
          </p>
        )}
      </div>

      </section>

      <div className="summary-section">
  {/* Links above summary */}
  <div className="links-inline">
    {resumeData.github && (
      <span>
        GitHub:{" "}
        <a
          href={resumeData.github.startsWith("http") ? resumeData.github : `https://${resumeData.github}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {resumeData.github}
        </a>
      </span>
    )}
    {resumeData.linkedin && (
      <span>
        LinkedIn:{" "}
        <a
          href={resumeData.linkedin.startsWith("http") ? resumeData.linkedin : `https://${resumeData.linkedin}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {resumeData.linkedin}
        </a>
      </span>
    )}
    {resumeData.portfolio && (
      <span>
        Portfolio:{" "}
        <a
          href={resumeData.portfolio.startsWith("http") ? resumeData.portfolio : `https://${resumeData.portfolio}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {resumeData.portfolio}
        </a>
      </span>
    )}
  </div>

  {/* Summary */}
  <h3>Summary</h3>
  <p>{resumeData.summary || "No summary added yet."}</p>
</div>

      <textarea
        name="summary"
        placeholder="Write a brief professional summary..."
        value={resumeData.summary}
        onChange={handleChange}
      />


      {/* Skills / Experience */}
      <section className="form-grid two-section">
        <div className="form-box">
          <h2>Skills</h2>
          <div className="skills-list">
            {ALL_SKILLS.map(skill => (
              <label key={skill} className="skill-item">
                <input
                  type="checkbox"
                  checked={resumeData.skills.includes(skill)}
                  onChange={() => toggleSkill(skill)}
                />
                {skill}
              </label>
            ))}
          </div>
        </div>

        <div className="form-box">
          <h2>Experience</h2>

          {resumeData.experience.map((exp, i) => (
            <div key={i} className="block">
              <input placeholder="Company" value={exp.company} onChange={(e) => handleExperienceChange(i, "company", e.target.value)} />
              <input placeholder="Role" value={exp.role} onChange={(e) => handleExperienceChange(i, "role", e.target.value)} />
              <input placeholder="Start Date" value={exp.startDate} onChange={(e) => handleExperienceChange(i, "startDate", e.target.value)} />
              <input placeholder="End Date" value={exp.endDate} onChange={(e) => handleExperienceChange(i, "endDate", e.target.value)} />
              <textarea placeholder="Description" rows={3} value={exp.description} onChange={(e) => handleExperienceChange(i, "description", e.target.value)} />
              {resumeData.experience.length > 1 && <button type="button" onClick={() => removeExperience(i)}>Remove</button>}
            </div>
          ))}
          
          <button type="button" onClick={addExperience}>Add Experience</button>
        </div>
      </section>

      {/* Projects / Education */}
      <section className="form-grid two-section">
        <div className="form-box">
          <h2>Projects</h2>
          {resumeData.projects.map((proj, i) => (
            <div key={i} className="block">
              <input placeholder="Title" value={proj.title} onChange={(e) => handleProjectChange(i, "title", e.target.value)} />
              <input placeholder="Tech Stack" value={proj.techStack} onChange={(e) => handleProjectChange(i, "techStack", e.target.value)} />
              <input placeholder="Links" value={proj.links} onChange={(e) => handleProjectChange(i, "links", e.target.value)} />
              <textarea placeholder="Description" rows={3} value={proj.description} onChange={(e) => handleProjectChange(i, "description", e.target.value)} />
              {resumeData.projects.length > 1 && <button type="button" onClick={() => removeProject(i)}>Remove</button>}
            </div>
          ))}
          <button type="button" onClick={addProject}>Add Project</button>
        </div>

        <div className="form-box">
          <h2>Education</h2>
          {resumeData.education.map((edu, i) => (
            <div key={i} className="block">
              <input placeholder="Institute" value={edu.institute} onChange={(e) => handleEducationChange(i, "institute", e.target.value)} />
              <input placeholder="Degree" value={edu.degree} onChange={(e) => handleEducationChange(i, "degree", e.target.value)} />
              <input placeholder="Year" value={edu.graduationYear} onChange={(e) => handleEducationChange(i, "graduationYear", e.target.value)} />
              <input placeholder="Subjects" value={edu.subjects} onChange={(e) => handleEducationChange(i, "subjects", e.target.value)} />
              {resumeData.education.length > 1 && <button type="button" onClick={() => removeEducation(i)}>Remove</button>}
            </div>
          ))}
          <button type="button" onClick={addEducation}>Add Education</button>
        </div>
      </section>

      {/* Professional Summary */}
      <section>
        <h2>Professional Summary</h2>
        <textarea name="summary" placeholder="Highlight your strengths" value={resumeData.summary} onChange={handleChange} rows={4} />
      </section>
    </div>
  );
}
