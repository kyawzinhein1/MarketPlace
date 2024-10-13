const { Router } = require("express");
const { body } = require("express-validator");

const router = Router();

const productController = require("../controllers/product");
const authMiddleware = require("../middlewares/auth");

// add product
//POST  /create-product
router.post(
  "/create-product",
  authMiddleware,
  [
    body("product_name")
      .trim()
      .notEmpty()
      .withMessage("product name must have."),
    body("product_price")
      .trim()
      .notEmpty()
      .withMessage("product price must have."),
    body("product_category")
      .trim()
      .notEmpty()
      .withMessage("product category must have."),
    body("product_description")
      .trim()
      .notEmpty()
      .withMessage("product description must have."),
    body("product_used_for")
      .trim()
      .notEmpty()
      .withMessage("product userFor must have."),
    // body("product_details"),
    // .isArray()
    // .withMessage("product details must array."),
  ],
  productController.addNewProduct
);

// get all products
// GET /products
router.get("/products", authMiddleware, productController.getAllProducts);

// get old products
// GET /product/:id
router.get("/products/:id", authMiddleware, productController.getOldProduct);

// update product
//POST /update-product
router.post(
  "/update-product",
  [
    body("product_name")
      .trim()
      .notEmpty()
      .withMessage("product name must have."),
    body("product_price")
      .trim()
      .notEmpty()
      .withMessage("product price must have."),
    body("product_category")
      .trim()
      .notEmpty()
      .withMessage("product category must have."),
    body("product_description")
      .trim()
      .notEmpty()
      .withMessage("product description must have."),
    body("product_used_for")
      .trim()
      .notEmpty()
      .withMessage("product userFor must have."),
  ],
  authMiddleware,
  productController.updateProduct
);

// delete product
// DELETE /products/:id
router.delete("/products/:id", authMiddleware, productController.deleteProduct);

// upload images
// POST /upload
router.post("/upload", authMiddleware, productController.uploadProductImages);

// get product images
// GET /product-images/:id
router.get(
  "/product-images/:id",
  authMiddleware,
  productController.getProductImages
);

// delete product images
// DELETE /products/images/destroy/:productId/:imgToDelete
router.delete(
  "/products/images/destroy/:productId/:imgToDelete",
  productController.deleteProductImages
);

// save product
// POST /saved-products/:id
router.post(
  "/saved-products/:id",
  authMiddleware,
  productController.savedProduct
);

// get save products
// GET /saved-products
router.get(
  "/saved-products",
  authMiddleware,
  productController.getSavedProducts
);

// delete saved product
// DELETE /unsaved-products/:id
router.delete(
  "/unsaved-products/:id",
  authMiddleware,
  productController.unSavedProduct
);

module.exports = router;
