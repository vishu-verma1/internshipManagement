const express = require('express');
const router = express.Router();
const { getCompanyById } = require('../controllers/companyController');
const { protect } = require('../middleware/authMiddleware');

router.get('/:id', protect, getCompanyById);

module.exports = router;