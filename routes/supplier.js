const express = require("express");
const router = express.Router();
const supplier = require("../controllers/supplier.comtroler");

/* GET home page. */
router.get("/products-price", supplier.getProductImportPriceList);
router.get("/", supplier.getAllSupplier);
router.post("/", supplier.createHistory);
router.get("/:id", supplier.findById);
router.put("/:id", supplier.updateHistory);
router.delete("/:id", supplier.deleteHistory);

module.exports = router;
