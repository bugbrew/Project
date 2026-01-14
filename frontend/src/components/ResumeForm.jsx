import { useState } from "react";
import ProjectsSection from "./ProjectsSection";
import CertificationsSection from "./CertificationsSection";


const emptyExperience = {
  company: "",
  role: "",
  startDate: "",
  endDate: "",
  description: "",
};

const emptyEducation = {
  institute: "",
  degree: "",
  graduationYear: "",
  subjects: "",
};

const SKILL_OPTIONS = [
  "C",
  "C++",
  "Python",
  "Java",
  "JavaScript",
  "HTML",
  "CSS",
  "React",
  "Node.js",
  "Express",
  "SQL",
  "Git",
  "Linux",
  "Ruby",
];

export default function ResumeForm({ onPreview }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    github: "",
    linkedin: "",
    portfolio: "",
    summary: "",
    skills: [],
    experience: [{ ...emptyExperience }],
    education: [{ ...emptyEducation }],
    photo: null,
  });

  // ---------- BASIC INPUT HANDLER ----------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ---------- EXPERIENCE ----------
  const handleExperienceChange = (index, field, value) => {
    const updated = [...formData.experience];
    updated[index][field] = value;
    setFormData((prev) => ({ ...prev, experience: updated }));
  };

  const addExperience = () => {
    setFormData((prev) => ({
      ...prev,
      experience: [...prev.experience, { ...emptyExperience }],
    }));
  };

  const removeExperience = (index) => {
    const updated = formData.experience.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, experience: updated }));
  };

  // ---------- EDUCATION ----------
  const handleEducationChange = (index, field, value) => {
    const updated = [...formData.education];
    updated[index][field] = value;
    setFormData((prev) => ({ ...prev, education: updated }));
  };

  // ---------- PHOTO ----------
  const handlePhotoUpload = (e) => {
    setFormData((prev) => ({
      ...prev,
      photo: e.target.files[0],
    }));
  };

  // ---------- SKILLS ----------
  const toggleSkill = (skill) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill],
    }));
  };

  // ---------- SUBMIT ----------
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await fetch("http://localhost:5000/api/resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      localStorage.setItem("resumeData", JSON.stringify(formData));
      onPreview(formData);
    } catch (error) {
      console.error("Resume submit failed:", error);
      alert("Error submitting resume");
    }
  };

  return (
    <form className="resume-form" onSubmit={handleSubmit}>
      <h2>Resume Builder</h2>

      {/* PERSONAL INFO */}
      <section>
        <input
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone (10 digits)"
          pattern="[0-9]{10}"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </section>

      {/* LINKS */}
      <section>
        <input
          name="github"
          placeholder="GitHub URL"
          value={formData.github}
          onChange={handleChange}
        />

        <input
          name="linkedin"
          placeholder="LinkedIn URL"
          value={formData.linkedin}
          onChange={handleChange}
        />

        <input
          name="portfolio"
          placeholder="Portfolio Website"
          value={formData.portfolio}
          onChange={handleChange}
        />
      </section>

      {/* SUMMARY */}
      <section>
        <textarea
          name="summary"
          placeholder="Professional Summary"
          rows="4"
          value={formData.summary}
          onChange={handleChange}
        />
      </section>

      {/* SKILLS */}
      <section>
        <h3>Technical Skills</h3>

        <div className="skills-grid">
          {SKILL_OPTIONS.map((skill) => (
            <label key={skill} className="skill-item">
              <input
                type="checkbox"
                checked={formData.skills.includes(skill)}
                onChange={() => toggleSkill(skill)}
              />
              {skill}
            </label>
          ))}
        </div>
      </section>

      {/* EXPERIENCE */}
      <section>
        <h3>Experience</h3>

        {formData.experience.map((exp, index) => (
          <div className="block" key={index}>
            <input
              placeholder="Company Name"
              value={exp.company}
              onChange={(e) =>
                handleExperienceChange(index, "company", e.target.value)
              }
            />

            <input
              placeholder="Role"
              value={exp.role}
              onChange={(e) =>
                handleExperienceChange(index, "role", e.target.value)
              }
            />

            <input
              placeholder="Start Date"
              value={exp.startDate}
              onChange={(e) =>
                handleExperienceChange(index, "startDate", e.target.value)
              }
            />

            <input
              placeholder="End Date"
              value={exp.endDate}
              onChange={(e) =>
                handleExperienceChange(index, "endDate", e.target.value)
              }
            />

            <textarea
              placeholder="Description"
              rows="3"
              value={exp.description}
              onChange={(e) =>
                handleExperienceChange(index, "description", e.target.value)
              }
            />

            {formData.experience.length > 1 && (
              <button
                type="button"
                className="danger-btn"
                onClick={() => removeExperience(index)}
              >
                Remove Experience
              </button>
            )}
          </div>
        ))}

        <button type="button" onClick={addExperience}>
          Add Experience
        </button>
      </section>


      <ProjectsSection
        projects={formData.projects}
        onChange={(projects) =>
          setFormData({ ...formData, projects })
        }
      />
      
      <CertificationsSection
        certifications={formData.certifications}
        onChange={(certifications) =>
          setFormData({ ...formData, certifications })
        }
      />
      

      {/* EDUCATION */}
      <section>
        <h3>Education</h3>

        {formData.education.map((edu, index) => (
          <div className="block" key={index}>
            <input
              placeholder="Institute Name"
              value={edu.institute}
              onChange={(e) =>
                handleEducationChange(index, "institute", e.target.value)
              }
            />

            <input
              placeholder="Degree"
              value={edu.degree}
              onChange={(e) =>
                handleEducationChange(index, "degree", e.target.value)
              }
            />

            <input
              placeholder="Graduation Year"
              value={edu.graduationYear}
              onChange={(e) =>
                handleEducationChange(index, "graduationYear", e.target.value)
              }
            />

            <input
              placeholder="Subjects / Specialization"
              value={edu.subjects}
              onChange={(e) =>
                handleEducationChange(index, "subjects", e.target.value)
              }
            />
          </div>
        ))}
      </section>

      {/* PHOTO */}
      <section>
        <label>Optional Photo</label>
        <input type="file" accept="image/*" onChange={handlePhotoUpload} />
      </section>

      {/* ACTIONS */}
      <div className="form-actions">
        <button
          type="button"
          className="secondary-btn"
          onClick={() => onPreview(formData)}
        >
          Preview Resume
        </button>

        <button type="submit" className="submit-btn">
          Save Resume
        </button>
      </div>
    </form>
  );
}





