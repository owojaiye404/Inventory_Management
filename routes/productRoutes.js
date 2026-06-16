const express = require("express");
const router = express.Router();
const { authentication } = require("../middleware/authentication");
const { authorization } = require("../middleware/authorization");

const productController = require("../controller/productController");
const upload = require("../middleware/Cloudinary");

router.use(authentication);

router.post(
  "/",
  authorization("admin", "hr"),
  upload.single("imageUrl"),
  productController.createProduct,
);

router.get("/", productController.getAllProducts);

router.get("/:id", productController.getProductById);

// UPDATE PRODUCT
router.put(
  "/:id",
  authorization("admin", "hr"),
  productController.updateProduct,
);

// DELETE PRODUCT
router.delete(
  "/:id",
  authorization("admin", "hr"),
  productController.deleteProduct,
);

router.put(
  "/uploadimg/:id",
  authorization("admin", "hr"),
  upload.single("imageUrl"),
  productController.updateProductImage,
);

module.exports = router;
