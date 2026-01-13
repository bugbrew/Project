export function matchKeywords(skills, jd) {
  const skillSet = skills.toLowerCase();
  return jd
    .split(",")
    .map((k) => k.trim())
    .filter((k) => !skillSet.includes(k.toLowerCase()));
}
