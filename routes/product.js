const express = require('express');
const router = express.Router();
const product = require('../controllers/product.controller');

/* GET home page. */
router.get('/', product.getAllProduct);

module.exports = router;
