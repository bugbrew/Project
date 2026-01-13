import { useEffect, useState } from "react";
import ResumeForm from "./components/ResumeForm";
import ResumePreview from "./components/ResumePreview";
import ATSScore from "./components/ATSScore";
import SkillBooster from "./components/SkillBooster";

function App() {
  const [resumeData, setResumeData] = useState(null);
  const [view, setView] = useState("edit"); // edit | preview

  // Load saved resume on refresh
  useEffect(() => {
    const saved = localStorage.getItem("resumeData");
    if (saved) {
      setResumeData(JSON.parse(saved));
    }
  }, []);

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
            onPreview={(data) => {
              setResumeData(data);
              setView("preview"); // preview immediately
            }}
          />

          {resumeData && <SkillBooster data={resumeData} />}
        </>
      )}

      {/* PREVIEW MODE */}
      {view === "preview" && resumeData && (
        <>
          <ATSScore data={resumeData} />
          <ResumePreview data={resumeData} />
          {resumeData && <SkillBooster data={resumeData} />}

        </>
      )}
    </div>
  );
}

export default App;
