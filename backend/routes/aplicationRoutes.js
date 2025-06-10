const express = require('express');
const router = express.Router();
const { applyToInternship, getUserApplications, getCandidatesForInternship, updateApplicationStatus, getAcceptedCandidates} = require('../controllers/applicationController');
const {protect} = require('../middleware/authMiddleware');

router.post('/:internshipId/apply', protect, applyToInternship);
router.get('/', protect, getUserApplications);
router.get('/internship/:internshipId', protect, getCandidatesForInternship);
router.patch('/:id', protect, updateApplicationStatus);
router.get('/internship/:internshipId/accepted', protect, getAcceptedCandidates);

module.exports = router;