const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadResume } = require('../controllers/resumeController');
const { protect } = require('../middleware/authMiddleware');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

// File filter to allow only PDF and DOC/DOCX files
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only PDF and DOC/DOCX files are allowed'), false);
  }
};

const upload = multer({ storage, fileFilter });

router.post('/upload', protect, upload.single('resume'), (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ message: 'Invalid file type. Only PDF and DOC/DOCX files are allowed.' });
  }
  next();
}, uploadResume);

module.exports = router;