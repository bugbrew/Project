import React, { useState } from "react";
import axios from "axios";

const ResumeForm = ({ setResumeData }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    github: "",
    linkedin: "",
    portfolio: "",
    summary: "",
    photo: "",
    skills: "",
    experiences: [{ title: "", company: "", duration: "", description: "" }],
    educationInstitute: "",
    educationYear: "",
    educationSubjects: ""
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleExperienceChange = (index, e) => {
    const newExperiences = [...form.experiences];
    newExperiences[index][e.target.name] = e.target.value;
    setForm({ ...form, experiences: newExperiences });
  };

  const addExperience = () => {
    setForm({ ...form, experiences: [...form.experiences, { title: "", company: "", duration: "", description: "" }] });
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setForm({ ...form, photo: reader.result });
      reader.readAsDataURL(file);
    }
  };

  const validate = () => {
    const errs = {};
    if (!/^[a-zA-Z\s]{2,50}$/.test(form.name)) errs.name = "Name should be 2-50 letters";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = "Enter a valid email";
    if (!/^\d{10}$/.test(form.phone)) errs.phone = "Phone must be 10 digits";
    if (form.github && !/^https?:\/\/github\.com\/\S+$/.test(form.github)) errs.github = "Invalid GitHub URL";
    if (form.linkedin && !/^https?:\/\/(www\.)?linkedin\.com\/.*$/.test(form.linkedin)) errs.linkedin = "Invalid LinkedIn URL";
    if (form.portfolio && !/^https?:\/\/\S+$/.test(form.portfolio)) errs.portfolio = "Invalid Portfolio URL";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    try {
      const res = await axios.post("http://localhost:5000/api/resume", form);
      alert(res.data.message);
      setResumeData(form);
    } catch (err) {
      console.error(err);
      alert("Error submitting resume");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="resume-form">
      <h2>Build Your Professional Resume</h2>

      <div className="form-group">
        <label>Name</label>
        <input type="text" name="name" value={form.name} onChange={handleChange} maxLength={50} required />
        {errors.name && <span className="error">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label>Email</label>
        <input type="email" name="email" value={form.email} onChange={handleChange} required />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>

      <div className="form-group">
        <label>Phone</label>
        <input type="tel" name="phone" value={form.phone} onChange={handleChange} required />
        {errors.phone && <span className="error">{errors.phone}</span>}
      </div>

      <div className="form-group">
        <label>Photo (optional)</label>
        <input type="file" accept="image/*" onChange={handlePhotoUpload} />
      </div>

      <div className="form-group">
        <label>Summary</label>
        <textarea name="summary" value={form.summary} onChange={handleChange} maxLength={300} />
      </div>

      <div className="form-group">
        <label>GitHub URL (optional)</label>
        <input type="url" name="github" value={form.github} onChange={handleChange} placeholder="https://github.com/username" />
      </div>

      <div className="form-group">
        <label>LinkedIn URL (optional)</label>
        <input type="url" name="linkedin" value={form.linkedin} onChange={handleChange} placeholder="https://linkedin.com/in/username" />
      </div>

      <div className="form-group">
        <label>Portfolio URL (optional)</label>
        <input type="url" name="portfolio" value={form.portfolio} onChange={handleChange} placeholder="https://portfolio.com" />
      </div>

      <div className="form-group">
        <label>Skills</label>
        <textarea name="skills" value={form.skills} onChange={handleChange} maxLength={200} required />
      </div>

      {/* Experience Section */}
      <div className="form-group">
        <label>Experience</label>
        {form.experiences.map((exp, index) => (
          <div key={index} className="experience-block">
            <input name="title" value={exp.title} onChange={(e) => handleExperienceChange(index, e)} placeholder="Job Title" required />
            <input name="company" value={exp.company} onChange={(e) => handleExperienceChange(index, e)} placeholder="Company Name" required />
            <input name="duration" value={exp.duration} onChange={(e) => handleExperienceChange(index, e)} placeholder="Duration" required />
            <textarea name="description" value={exp.description} onChange={(e) => handleExperienceChange(index, e)} placeholder="Description" required />
          </div>
        ))}
        <button type="button" className="add-exp-btn" onClick={addExperience}>Add More Experience</button>
      </div>

      {/* Education */}
      <div className="form-group">
        <label>Institute Name</label>
        <input type="text" name="educationInstitute" value={form.educationInstitute} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label>Graduation Year</label>
        <input type="text" name="educationYear" value={form.educationYear} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label>Subjects / Major</label>
        <input type="text" name="educationSubjects" value={form.educationSubjects} onChange={handleChange} required />
      </div>

      <button type="submit">Preview Resume</button>
    </form>
  );
};

export default ResumeForm;
