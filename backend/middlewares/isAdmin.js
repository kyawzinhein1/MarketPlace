const User = require("../models/User");

module.exports = async (req, res, next) => {
  try {
    const { userId } = req;
    const userDoc = await User.findById(userId).select("role");
    console.log(userDoc);
    if (userDoc.role !== "admin") {
      throw new Error("Unauthorized admin.");
    }
    req.userId = userId;
    next();
  } catch (error) {
    return res.status(401).json({
      isSuccess: false,
      message: error.message,
    });
  }
};
