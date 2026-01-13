export default function ResumePreview({ data }) {
  if (!data) return <p>No resume data to preview.</p>;

  const {
    name,
    email,
    phone,
    github,
    linkedin,
    portfolio,
    summary,
    skills,
    experience,
    education,
    photo,
  } = data;

  return (
    <div className="resume-preview">
      {/* HEADER */}
      <header className="resume-header">
        {photo && (
          <img
            src={URL.createObjectURL(photo)}
            alt="Profile"
            className="resume-photo"
          />
        )}

        <div>
          <h1 className="resume-name">{name}</h1>

          <p className="resume-contact">
            {email} | {phone}
          </p>

          <p className="resume-links">
            {github && <span>GitHub: {github}</span>}
            {linkedin && <span> | LinkedIn: {linkedin}</span>}
            {portfolio && <span> | Portfolio: {portfolio}</span>}
          </p>
        </div>
      </header>

      {/* SUMMARY */}
      {summary && (
        <section className="resume-section">
          <h2>Professional Summary</h2>
          <p>{summary}</p>
        </section>
      )}

      {/* EXPERIENCE */}
      {experience?.length > 0 && (
        <section className="resume-section">
          <h2>Experience</h2>
          {experience.map((exp, idx) => (
            <div key={idx} className="resume-block">
              <div className="block-header">
                <strong>{exp.role}</strong>
                <span>{exp.startDate} – {exp.endDate || "Present"}</span>
              </div>
              <p className="company-name">{exp.company}</p>
              <p className="block-description">{exp.description}</p>
            </div>
          ))}
        </section>
      )}

      {/* EDUCATION */}
      {education?.length > 0 && (
        <section className="resume-section">
          <h2>Education</h2>
          {education.map((edu, idx) => (
            <div key={idx} className="resume-block">
              <div className="block-header">
                <strong>{edu.degree}</strong>
                <span>{edu.graduationYear}</span>
              </div>
              <p className="institute-name">{edu.institute}</p>
              {edu.subjects && <p className="block-description">Subjects: {edu.subjects}</p>}
            </div>
          ))}
        </section>
      )}

      {/* SKILLS */}
      {skills?.length > 0 && (
        <section className="resume-section">
          <h2>Skills</h2>
          <ul className="skills-list">
            {skills.map((skill, idx) => (
              <li key={idx}>{skill}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
