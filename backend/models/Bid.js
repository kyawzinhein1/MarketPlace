const { Schema, model } = require("mongoose");

const bidSchema = new Schema(
  {
    product_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Product",
    },
    seller_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    buyer_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    text: {
      type: String,
      required: true,
    },
    phone_number: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const bidModel = model("Bid", bidSchema);

module.exports = bidModel;
