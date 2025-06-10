const multer = require('multer');


// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/profile-pictures/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const uploadPicture = multer({ storage });

module.exports = uploadPicture;