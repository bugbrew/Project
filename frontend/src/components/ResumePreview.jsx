import React from "react";

const ResumePreview = ({ resumeData }) => {
  if (!resumeData) return <p className="no-resume">Your resume preview will appear here!</p>;

  return (
    <div className="resume-card">
      <header>
        <div className="header-left">
          <h1>{resumeData.name}</h1>
          <p>{resumeData.email} | {resumeData.phone}</p>
          {resumeData.github && <p>GitHub: {resumeData.github}</p>}
          {resumeData.linkedin && <p>LinkedIn: {resumeData.linkedin}</p>}
          {resumeData.portfolio && <p>Portfolio: {resumeData.portfolio}</p>}
        </div>
        {resumeData.photo && <div className="photo"><img src={resumeData.photo} alt="Profile" /></div>}
      </header>

      {resumeData.summary && (
        <section>
          <h2>Summary</h2>
          <p>{resumeData.summary}</p>
        </section>
      )}

      <section>
        <h2>Skills</h2>
        <p>{resumeData.skills}</p>
      </section>

      <section>
        <h2>Experience</h2>
        {resumeData.experiences.map((exp, i) => (
          <div key={i} className="experience-block">
            <h3>{exp.title} - {exp.company}</h3>
            <p>{exp.duration}</p>
            <p>{exp.description}</p>
          </div>
        ))}
      </section>

      <section>
        <h2>Education</h2>
        <p>{resumeData.educationInstitute} | {resumeData.educationYear} | {resumeData.educationSubjects}</p>
      </section>
    </div>
  );
};

export default ResumePreview;
