const express = require('express');
const router = express.Router();
const product = require('../controllers/importHistory.controller');

/* GET home page. */
router.get('/', product.getAllProduct);
router.post('/', product.createHistory);
router.get('/:id', product.findById);
router.put('/:id', product.updateHistory);
router.delete('/:id', product.deleteHistory);

module.exports = router;
