import { useState } from "react";

function ProjectsSection({ projects = [], onChange }) {
  const [list, setList] = useState(projects);

  const update = (updated) => {
    setList(updated);
    onChange(updated);
  };

  const addProject = () => {
    update([
      ...list,
      {
        title: "",
        tech: "",
        description: "",
        link: "",
      },
    ]);
  };

  const removeProject = (index) => {
    update(list.filter((_, i) => i !== index));
  };

  const handleChange = (index, field, value) => {
    const updated = [...list];
    updated[index][field] = value;
    update(updated);
  };

  return (
    <div className="section">
      <h2>Projects</h2>

      {list.map((project, index) => (
        <div key={index} className="card">
          <input
            type="text"
            placeholder="Project Title"
            value={project.title}
            onChange={(e) =>
              handleChange(index, "title", e.target.value)
            }
          />

          <input
            type="text"
            placeholder="Tech Stack (React, Node, MongoDB)"
            value={project.tech}
            onChange={(e) =>
              handleChange(index, "tech", e.target.value)
            }
          />

          <textarea
            placeholder="Project Description (impact + features)"
            value={project.description}
            onChange={(e) =>
              handleChange(index, "description", e.target.value)
            }
          />

          <input
            type="text"
            placeholder="GitHub / Live Link (optional)"
            value={project.link}
            onChange={(e) =>
              handleChange(index, "link", e.target.value)
            }
          />

          <button onClick={() => removeProject(index)}>
            Remove
          </button>
        </div>
      ))}

      <button onClick={addProject}>+ Add Project</button>
    </div>
  );
}

export default ProjectsSection;
