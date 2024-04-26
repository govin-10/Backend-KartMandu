const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  addProduct,
} = require("../controllers/productController");

// router.get("/", product.getAllProducts);
// router.get("/categories", product.getProductCategories);
// router.get("/category/:category", product.getProductsInCategory);
// router.get("/:id", product.getProduct);
router.route("/add").post(addProduct);
router.route("/get").get(getAllProducts);
// router.patch("/:id", product.editProduct);
// router.delete("/:id", product.deleteProduct);

module.exports = router;
