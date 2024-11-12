const { Schema, model } = require("mongoose");

const notificationSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    owner_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    product_id: {
      type: String,
      require: true,
      ref: "Product",
    },
    phone_number: {
      require: true,
      type: String,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const notificationModel = model("Notification", notificationSchema);

module.exports = notificationModel;
