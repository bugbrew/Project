import { calculateATS } from "../utils/atsScore";

export default function ATSScore({ data }) {
  const score = calculateATS(data);

  return (
    <div className="ats-score">
      <h3>ATS Compatibility Score</h3>
      <p>{score} / 100</p>
    </div>
  );
}
