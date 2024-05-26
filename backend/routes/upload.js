const express = require('express');
const router = express.Router();
const upLoadController = require('../controllers/upLoadController')

router.post('/', upLoadController.handleUpload);

module.exports = router;