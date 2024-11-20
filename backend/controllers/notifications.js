const Notification = require("../models/Notifications");

exports.pushNotification = async (req, res) => {
  const { title, message, owner_id, product_id, phone_number } = req.body;
  try {
    await Notification.create({
      title,
      message,
      owner_id,
      product_id,
      phone_number,
    });

    return res.status(201).json({
      isSuccess: true,
      message: "Notification is pushed.",
    });
  } catch (error) {
    return res.status(500).json({
      isSuccess: false,
      message: error.message,
    });
  }
};

exports.getNotifications = async (req, res) => {
  try {
    const notiDocs = await Notification.find({ owner_id: req.userId }).sort({
      createdAt: -1,
    });
    if (!notiDocs || notiDocs.length === 0) {
      throw new Error("No Notification yet.");
    }
    return res.status(200).json({
      isSuccess: true,
      notiDocs,
    });
  } catch (error) {
    return res.status(500).json({
      isSuccess: false,
      message: error.message,
    });
  }
};

exports.markAsRead = async (req, res) => {
  const { id } = req.params;
  try {
    const notiDocs = await Notification.findById(id);

    if (req.userId.toString() !== notiDocs.owner_id.toString()) {
      throw new Error("Authorization failed.");
    }

    if (!notiDocs) {
      throw new Error("Notification not found");
    }
    notiDocs.isRead = true;
    notiDocs.save();

    return res.status(200).json({
      isSuccess: true,
      message: "Done",
    });
  } catch (error) {
    return res.status(500).json({
      isSuccess: false,
      message: error.message,
    });
  }
};

exports.deleteNoti = async (req, res) => {
  const { id } = req.params;

  try {
    await Notification.findOneAndDelete(id);

    return res.status(200).json({
      isSuccess: true,
      message: "Notification deleted.",
    });
  } catch (error) {
    return res.status(500).json({
      isSuccess: false,
      message: error.message,
    });
  }
};
