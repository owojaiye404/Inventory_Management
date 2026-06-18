const adaptercontroller = require("../controller/AdapterController");
const express = require("express");
const router = express.Router();

router.post("/products", adaptercontroller.createproduct);
router.get("/products", adaptercontroller.getproducts);
router.get("/products/:id", adaptercontroller.getproduct);
router.put("/products/:id", adaptercontroller.updateproducts);

module.exports = router;
