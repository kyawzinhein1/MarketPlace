const { Router } = require("express");
const publicController = require("../controllers/public");

const router = Router();

// get all categories
// GET /categories
router.get("/categories", publicController.getCategories);

// get all products
// GET /products
router.get("/products", publicController.getProducts);

module.exports = router;
