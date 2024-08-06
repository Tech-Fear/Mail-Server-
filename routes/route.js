const express = require('express');
const router = express.Router();
const { sendmail, sendFromGmail } = require('../controllers/sendmail');

router.post('/sendmail', sendmail);
router.post('/sendFromGmail', sendFromGmail);

module.exports = router;
