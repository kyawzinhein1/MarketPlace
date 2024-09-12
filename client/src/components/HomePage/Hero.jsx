import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { message } from "antd";
import { getProductsByFilter } from "../../apicalls/product";

const Hero = ({ setProducts, getAllProducts }) => {
  const [searchKey, setSearchKey] = useState("");

  const searchHandler = async () => {
    try {
      const response = await getProductsByFilter("searchKey", searchKey);
      if (response.isSuccess) {
        setProducts(response.productDocs);
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      message.error(err.message);
    }
  };

  const clearHandler = () => {
    setSearchKey("");
    getAllProducts();
  };

  return (
    <div className="w-full text-center mb-2 mt-3">
      <h1 className="text-2xl font-bold text-blue-600 mb-4">
        "Discover, Connect, and Thrive with TradeHub"
      </h1>
      <p className=" text-lg font-medium text-gray-500 max-w-xl mx-auto mb-4">
        Bings buyers and sellers together, providing trust, community, and
        success. Explore, connect, and thrive with us.
      </p>
      <div className=" max-w-sm mx-auto flex items-center gap-2">
        <div className="relative w-full">
          <input
            type="text"
            className=" bg-gray-100 outline-none p-1 rounded-lg w-full"
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
          />
          <MagnifyingGlassIcon
            width={20}
            height={20}
            className=" text-blue-600 absolute top-1.5 right-2 cursor-pointer"
            onClick={searchHandler}
          />
        </div>
        {searchKey && (
          <button
            type="button"
            className="text-sm text-white bg-blue-600 p-2 rounded-md"
            onClick={clearHandler}
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
};

export default Hero;
