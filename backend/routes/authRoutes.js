const express = require('express');
const router = express.Router();
const { register, verifyOtp, login, registerCompany, loginCompany, logout, verifyOtpForCompany, getProfile, updateProfile, verifyEmail, uploadProfilePicture } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const uploadPicture = require('../middleware/multer');

router.post('/register', register);
router.post('/verify-otp', verifyOtp);
router.post('/login', login);
router.post('/logout', logout);
router.post('/company/register', registerCompany);
router.post('/company/verify-otp', verifyOtpForCompany);
router.post('/company/login', loginCompany);
router.post('/company/logout', logout);
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);
router.post('/verify-updated-email', protect, verifyEmail)
router.post('/upload-profile-picture', protect, uploadPicture.single('profilePicture'), uploadProfilePicture)

module.exports = router;