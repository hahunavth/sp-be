const express = require('express');
const router = express.Router();
const export1 = require('../controllers/export.controller');

/* GET home page. */
router.get('/', export1.exportProduct);

module.exports = router;
