const express = require('express');
const router = express.Router();
const { createLead, getAllLeads, getLead, updateLead, deleteLead, updateLeadStatus } = require('../controller/leadController');

router.post('/create', createLead);
router.get('/get-all', getAllLeads);
router.post('/get', getLead);
router.get('/update', updateLead);
router.delete('/delete', deleteLead);
router.post('/update-status', updateLeadStatus);

module.exports = router;
