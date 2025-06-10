const User = require('../models/userModel');
const { extractSkills, extractTextFromFile } = require('../services/resumeService');

exports.uploadResume = async (req, res) => {
    const filePath = req.file.path;
    const fileType = req.file.mimetype; // dynamically determine file type
    try {
        // console.log('File Path:', filePath);
        // console.log('File Type:', fileType);

        const text = await extractTextFromFile(filePath, fileType);
        // console.log('Extracted Text:', text);

        const skills = extractSkills(text);
        // console.log('Extracted Skills:', skills);

        const user = await User.findById(req.user.userId);
        // console.log('User:', user);

        user.resumeUrl = filePath;
        user.skills = skills;
        await user.save();

        res.status(200).json({ message: 'Your Resume is uploaded', skills });
    } catch (err) {
        console.error('Error:', err.message);
        res.status(500).json({ error: err.message });
    }
};