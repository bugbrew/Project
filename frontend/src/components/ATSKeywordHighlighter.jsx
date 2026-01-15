import { useState, useEffect } from "react";

export default function ATSKeywordHighlighter({ resumeData }) {
  const [jd, setJd] = useState("");
  const [missing, setMissing] = useState([]);
  const [matched, setMatched] = useState([]);

  useEffect(() => {
    if (!jd || !resumeData) return;

    const jdKeywords = extractKeywords(jd);
    const resumeText = buildResumeText(resumeData);

    const found = [];
    const notFound = [];

    jdKeywords.forEach((kw) => {
      resumeText.includes(kw) ? found.push(kw) : notFound.push(kw);
    });

    setMatched(found);
    setMissing(notFound);
  }, [jd, resumeData]);

  return (
    <div className="ats-panel">
      <h3>ATS Keyword Match</h3>

      <textarea
        placeholder="Paste Job Description here"
        value={jd}
        onChange={(e) => setJd(e.target.value)}
        rows="6"
      />

      {jd && (
        <>
          <div className="ats-row">
            <span className="good">Matched ({matched.length})</span>
            <span className="bad">Missing ({missing.length})</span>
          </div>

          <div className="keyword-list">
            {missing.map((k) => (
              <span key={k} className="keyword missing">{k}</span>
            ))}
            {matched.map((k) => (
              <span key={k} className="keyword matched">{k}</span>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/* ---------- HELPERS ---------- */

function extractKeywords(text) {
  return [...new Set(
    text
      .toLowerCase()
      .replace(/[^a-z0-9 ]/g, "")
      .split(/\s+/)
      .filter((w) => w.length > 3)
  )];
}

function buildResumeText(data) {
  return (
    data.summary +
    " " +
    data.skills.join(" ") +
    " " +
    data.experience.map((e) => e.description).join(" ") +
    " " +
    data.projects.map((p) => p.description + " " + p.techStack).join(" ")
  ).toLowerCase();
}
