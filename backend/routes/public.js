const { Router } = require("express");
const publicController = require("../controllers/public");

const router = Router();

// get all categories
// GET /categories
router.get("/categories", publicController.getCategories);

// get all products
// GET api/products
router.get("/products", publicController.getProducts);

// get all products by filter
// GET api/products/filters
router.get("/products/filters", publicController.getProductsByFilters);

// get product by id
// GET api/products/:id
router.get("/products/:id", publicController.getProductById);

module.exports = router;
