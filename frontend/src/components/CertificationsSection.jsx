import { useState } from "react";

function CertificationsSection({ certifications = [], onChange }) {
  const [list, setList] = useState(certifications);

  const update = (updated) => {
    setList(updated);
    onChange(updated);
  };

  const addCertification = () => {
    update([
      ...list,
      {
        name: "",
        issuer: "",
        year: "",
        link: "",
      },
    ]);
  };

  const removeCertification = (index) => {
    update(list.filter((_, i) => i !== index));
  };

  const handleChange = (index, field, value) => {
    const updated = [...list];
    updated[index][field] = value;
    update(updated);
  };

  return (
    <div className="section">
      <h2>Certifications</h2>

      {list.map((cert, index) => (
        <div key={index} className="card">
          <input
            type="text"
            placeholder="Certification Name"
            value={cert.name}
            onChange={(e) =>
              handleChange(index, "name", e.target.value)
            }
          />

          <input
            type="text"
            placeholder="Issuing Organization"
            value={cert.issuer}
            onChange={(e) =>
              handleChange(index, "issuer", e.target.value)
            }
          />

          <input
            type="text"
            placeholder="Year"
            value={cert.year}
            onChange={(e) =>
              handleChange(index, "year", e.target.value)
            }
          />

          <input
            type="text"
            placeholder="Credential Link (optional)"
            value={cert.link}
            onChange={(e) =>
              handleChange(index, "link", e.target.value)
            }
          />

          <button onClick={() => removeCertification(index)}>
            Remove
          </button>
        </div>
      ))}

      <button onClick={addCertification}>
        + Add Certification
      </button>
    </div>
  );
}

export default CertificationsSection;
