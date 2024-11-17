import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";

const Notification = ({ notifications }) => {
  return (
    <section>
      <h1 className="text-xl font-bold my-3">Notification</h1>

      {!notifications && <p className="text-red-600 text-base">No notification yet.</p>}

      <div className="max-w-xl">
        {notifications &&
          notifications.map((noti) => (
            <div
              key={noti._id}
              className="bg-white mb-4 rounded-lg px-4 py-2 shadow-sm"
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
              <div className="flex justify-end">
                <Link
                  to={`/products/${noti.product_id}`}
                  className="text-blue-600 font-medium my-2 underline"
                >
                  View bids
                </Link>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default Notification;
