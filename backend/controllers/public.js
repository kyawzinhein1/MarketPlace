const Product = require("../models/Product");

exports.getCategories = async (req, res) => {
  try {
    const categories = await Product.find().select("category");
    return res.status(200).json({
      isSuccess: true,
      categories,
    });
  } catch (err) {
    return res.status(422).json({
      isSuccess: false,
      message: err.message,
    });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const productDocs = await Product.find({ status: "approve" }).sort({
      createdAt: -1,
    });
    return res.status(200).json({
      isSuccess: true,
      productDocs,
    });
  } catch (err) {
    return res.status(422).json({
      isSuccess: false,
      message: err.message,
    });
  }
};
