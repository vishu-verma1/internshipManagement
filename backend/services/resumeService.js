const fs = require("fs");
const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");

const skillSet = [
  "javascript",
  "node.js",
  "react",
  "mongodb",
  "express",
  "html",
  "css",
  "python",
  "java",
  "c++",
  "typescript",
  "angular",
  "vue",
  "php",
  "ruby",
  "c#",
  "go",
  "swift",
  "kotlin",
  "sql",
  "nosql",
  "aws",
  "azure",
  "docker",
  "kubernetes",
  "firebase",
  "linux",
  "git",
  "github",
];

exports.extractSkills = (text) => {
  const textLower = text.toLowerCase();
  return skillSet.filter((skill) => {
    // escape special regex characters in skill string
    const escapedSkill = skill.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    // create regex to match whole words
    const regex = new RegExp(`\\b${escapedSkill}\\b`);
    return regex.test(textLower);
  });
};

exports.extractTextFromFile = async (filePath, fileType) => {
  if (fileType === "application/pdf") {
    const dataBuffer = fs.readFileSync(filePath);
    const pdfData = await pdfParse(dataBuffer);
    return pdfData.text;
  } else if (
    fileType === "application/msword" ||
    fileType ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    const result = await mammoth.extractRawText({ path: filePath });
    return result.value;
  } else {
    throw new Error("File type not supported for text extraction");
  }
};

// ...existing code or remove commented middleware...
