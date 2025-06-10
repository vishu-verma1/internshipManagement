const pdfParse = require('pdf-parse');
const fs = require('fs');

// Basic skill list
const skillKeywords = ['JavaScript', 'Node.js', 'React', 'MongoDB', 'HTML', 'CSS', 'Python', 'Java', 'C++', 'SQL'];

const extractSkills = async (filePath) => {
  const dataBuffer = fs.readFileSync(filePath);
  const data = await pdfParse(dataBuffer);

  const text = data.text;
  const foundSkills = skillKeywords.filter(skill =>
    text.toLowerCase().includes(skill.toLowerCase())
  );

  return [...new Set(foundSkills)];
};

module.exports = extractSkills;
