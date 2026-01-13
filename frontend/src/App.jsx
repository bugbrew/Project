import React, { useState } from "react";
import ResumeForm from "./components/ResumeForm";
import ResumePreview from "./components/ResumePreview";
import "./index.css";

function App() {
  const [resumeData, setResumeData] = useState(null);

  return (
    <div className="app-container">
      <ResumeForm setResumeData={setResumeData} />
      <ResumePreview resumeData={resumeData} />
    </div>
  );
}

export default App;
