import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";
import { deleteNoti, makeRead } from "../../apicalls/notification";
import { message } from "antd";

const Notification = ({ notifications, getNoti }) => {
  const markAsRead = async (id) => {
    try {
      const response = await makeRead(id);
      if (response.isSuccess) {
        getNoti();
        message.success(response.message);
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      message.error(err.message);
    }
  };

  const deleteNotification = async (id) => {
    try {
      const response = await deleteNoti(id);
      if (response.isSuccess) {
        getNoti();
        message.success(response.message);
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      message.error(err.message);
    }
  };

  return (
    <section className="px-4">
      <h1 className="text-xl font-bold my-3">Notification</h1>
      <div className="max-w-xl">
        {!notifications && (
          <p className="text-red-600 text-base">No notification yet.</p>
        )}
        {notifications &&
          notifications.map((noti) => (
            <div
              key={noti._id}
              className={`${
                noti.isRead ? "bg-gray-200" : "bg-white"
              } mb-4 rounded-lg px-4 py-2 shadow-sm`}
            >
              <p className="text-sm font-medium text-gray-400">
                {formatDistanceToNow(new Date(noti.createdAt))} ago...
              </p>
              <h4 className="text-base font-semibold my-2">{noti.title}</h4>
              <p className="text-sm font-medium">{noti.message}</p>
              <p className="text-sm font-thin">
                Contact -{" "}
                <span className="tracking-wider">{noti.phone_number}</span>
              </p>
              <hr />
              <div className="flex justify-end gap-3">
                <Link
                  to={`/products/${noti.product_id}`}
                  className="text-blue-600 font-medium my-2 underline"
                >
                  View bids
                </Link>
                {noti.isRead ? (
                  <p
                    className="text-blue-600 font-medium my-2 underline cursor-pointer"
                    onClick={() => {
                      deleteNotification(noti._id);
                    }}
                  >
                    Delete Forever
                  </p>
                ) : (
                  <p
                    className="text-blue-600 font-medium my-2 underline cursor-pointer"
                    onClick={() => {
                      markAsRead(noti._id);
                    }}
                  >
                    Mark as read
                  </p>
                )}
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default Notification;
