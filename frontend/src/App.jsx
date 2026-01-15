import { useEffect, useState } from "react";
import ResumeForm from "./components/ResumeForm";
import ResumePreview from "./components/ResumePreview";
import ATSKeywordHighlighter from "./components/ATSKeywordHighlighter";

function App() {
  const [resumeData, setResumeData] = useState({
    name: "",
    email: "",
    phone: "",
    github: "",
    linkedin: "",
    portfolio: "",
    summary: "",
    skills: [],
    experience: [
      { company: "", role: "", startDate: "", endDate: "", description: "" }
    ],
    projects: [
      { title: "", description: "", techStack: "", links: "" }
    ],
    education: [
      { institute: "", degree: "", graduationYear: "", subjects: "" }
    ],
  });

  const [view, setView] = useState("edit"); // edit | preview

  useEffect(() => {
    const saved = localStorage.getItem("resumeData");
    if (saved) setResumeData(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("resumeData", JSON.stringify(resumeData));
  }, [resumeData]);

  return (
    <div className="app-container">
      {/* TOP CONTROLS */}
      <div className="top-bar">
        <button onClick={() => setView("edit")}>Edit</button>
        <button
          onClick={() => setView("preview")}
          disabled={!resumeData}
        >
          Preview
        </button>
        <button
          onClick={() => window.print()}
          disabled={!resumeData}
        >
          Download PDF
        </button>
      </div>

      {/* EDIT MODE */}
      {view === "edit" && (
        <>
          <ResumeForm
            resumeData={resumeData}
            setResumeData={setResumeData}
            onPreview={(data) => {
              setResumeData(data);
              setView("preview");
            }}
          />

          <ATSKeywordHighlighter resumeData={resumeData} />
        </>
      )}

      {/* PREVIEW MODE */}
      {view === "preview" && resumeData && (
        <ResumePreview data={resumeData} />
      )}
    </div>
  );
}

export default App;
