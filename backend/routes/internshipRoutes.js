const express = require('express');
const router = express.Router();
const { createInternship, getInternships, getCompanyInternships, deleteInternship } = require('../controllers/internshipController');
const { protect } = require('../middleware/authMiddleware'); 

router.post('/', protect, createInternship);
router.get('/get', getInternships);
router.get('/company', protect, getCompanyInternships); // Fetch internships created by the company
router.delete('/:id', protect, deleteInternship); // Delete an internship


module.exports = router;