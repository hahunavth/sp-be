const express = require("express");
const router = express.Router();
const supplier = require("../controllers/supplier.comtroler");

router.get("/", supplier.getProductImportPriceList);

module.exports = router;
