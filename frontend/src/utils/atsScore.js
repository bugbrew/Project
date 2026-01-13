export function calculateATS(data) {
  let score = 0;
  if (data.summary) score += 15;
  if (data.skills) score += 20;
  if (data.experience.length) score += 25;
  if (data.education.length) score += 15;
  if (data.github || data.linkedin) score += 10;
  return Math.min(score, 100);
}
