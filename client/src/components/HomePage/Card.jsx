import noItem from "../../images/noItem.png";
import { BookmarkIcon, BookmarkSlashIcon } from "@heroicons/react/24/outline";
import { BookmarkIcon as BookMark } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { deleteSavedProduct, savedProduct } from "../../apicalls/product";
import { message } from "antd";
import { useSelector } from "react-redux";

const Card = ({ product, saved = false, onRemove, savedProducts }) => {
  const user = useSelector((state) => state.reducer.user.user);

  const ProductStatusHandler = async (id) => {
    try {
      let response;
      if (saved) {
        response = await deleteSavedProduct(id);
      } else {
        response = await savedProduct(id);
      }

      if (response.isSuccess) {
        message.success(response.message);
        if (saved && onRemove) {
          onRemove(id);
        }
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message || "Something went wrong.");
    }
  };

  const isProductSaved = (product) => {
    return savedProducts.some((p) => p.product_id._id === product._id);
  };

  return (
    <section className={` bg-white p-4 rounded-lg`}>
      {product.images[0] ? (
        <Link to={`/products/${product._id}`}>
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-36 object-cover rounded-lg"
          />
        </Link>
      ) : (
        <Link to={`/products/${product._id}`}>
          <img
            src={noItem}
            alt={product.name}
            className="w-full h-36 object-cover opacity-50 rounded-lg"
          />
        </Link>
      )}

      <p className="text-white text-sm bg-blue-600 rounded-lg p-1 w-fit my-2">
        {product.category.toUpperCase().replaceAll("_", " ")}
      </p>
      <div className="flex items-center justify-between">
        <Link to={`/products/${product._id}`}>
          <p className=" text-xl font-bold text-gray-700">{product.name}</p>
        </Link>
        {user ? (
          saved ? (
            <BookmarkSlashIcon
              className="w-6 h-8 text-blue-600 cursor-pointer"
              onClick={() => ProductStatusHandler(product._id)}
            />
          ) : (
            <>
              {isProductSaved(product) ? (
                <BookMark
                  className="w-6 h-8 text-blue-600"
                  onClick={() => message.warning("Product is already saved!!")}
                />
              ) : (
                <BookmarkIcon
                  className="w-6 h-8 text-blue-600 cursor-pointer"
                  onClick={() => ProductStatusHandler(product._id)}
                />
              )}
            </>
          )
        ) : null}
      </div>
      <p className="text-gray-500 mb-2">{product.description.slice(0, 80)}</p>
      <hr />
      <p className="text-gray-600 text-lg font-semibold mt-3 text-right">
        {product.price} MMK
      </p>
    </section>
  );
};

export default Card;
