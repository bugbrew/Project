import { useState, useEffect } from "react";

export default function SkillBooster({ data }) {
  const [jobDesc, setJobDesc] = useState("");
  const [score, setScore] = useState(null);
  const [missingSkills, setMissingSkills] = useState([]);

  const SKILL_LIST = [
    "C",
    "C++",
    "Python",
    "Java",
    "JavaScript",
    "React",
    "Node.js",
    "Express",
    "HTML",
    "CSS",
    "SQL",
    "Git",
    "Linux",
    "Ruby",
  ];

  useEffect(() => {
      if (jobDesc.trim() === "") {
        setScore(null);
        setMissingSkills([]);
        return;
      }
  
      // Lowercase and split JD words
      const jdWords = jobDesc.toLowerCase().split(/\W+/);
  
      // Collect resume words
      const resumeWords = [
        ...data.skills.map((s) => s.toLowerCase()),
        ...data.summary.toLowerCase().split(/\W+/),
        ...data.experience.flatMap((e) =>
          e.description.toLowerCase().split(/\W+/)
        ),
      ];
  
      // Count matches
      let matches = 0;
      jdWords.forEach((word) => {
        if (resumeWords.includes(word)) matches++;
      });
  
      const atsScore = Math.min(
        100,
        Math.floor((matches / jdWords.length) * 100)
      );
      setScore(atsScore);
  
      // Find missing skills
      const SKILL_LIST = [
        "C", "C++", "Python", "Java", "JavaScript",     "React", 
        "Node.js", "Express", "HTML", "CSS", "SQL", "Git",  "Linux", "Ruby",
      ];
  
      const missing = SKILL_LIST.filter(
        (skill) =>
          jdWords.includes(skill.toLowerCase()) &&
          !data.skills.map((s) => s.toLowerCase()).includes (skill.toLowerCase())
      );
      setMissingSkills(missing);
  
    }, [data, jobDesc]); // <-- Add jobDesc here!


  return (
    <div className="ats-box">
      <h3>ATS Score & Skill Booster</h3>

      <textarea
        placeholder="Paste Job Description here to analyze ATS score..."
        rows="4"
        value={jobDesc}
        onChange={(e) => setJobDesc(e.target.value)}
      />

      {score !== null && (
        <>
          <p>
            <strong>ATS Score:</strong> {score}%
          </p>

          {missingSkills.length > 0 ? (
            <p>
              <strong>Consider adding these skills:</strong>{" "}
              {missingSkills.join(", ")}
            </p>
          ) : (
            <p>All relevant skills from JD are included!</p>
          )}
        </>
      )}
    </div>
  );
}
