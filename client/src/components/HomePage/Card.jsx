import noItem from "../../images/noItem.png";
import { BookmarkIcon } from "@heroicons/react/24/outline";

const Card = ({ product }) => {
  return (
    <section className="basis-1/2 px-4 mb-4 mt-8">
      {product.images[0] ? (
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-36 object-cover"
        />
      ) : (
        <img src={noItem} alt={product.name} className="w-full opacity-50" />
      )}
      <p className="text-white text-sm bg blue 600 rounded-lg p-1 w-fit my-2">
        {product.category.toUpperCase().replaceAll("_", " ")}
      </p>
      <div className="flex items-center justify-between">
        <p className=" text-xl font-bold text-gray-700">{product.name}</p>
        <BookmarkIcon className="w-8 h-8 text-blue-600 cursor-pointer" />
      </div>
      <p className="text-gray-500">{product.description.slice(0,80)}</p>
    </section>
  );
};

export default Card;
