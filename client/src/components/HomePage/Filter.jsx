import { useState } from "react";
import { getProductsByFilter } from "../../apicalls/product";
import { message } from "antd";

import { useDispatch } from "react-redux";
import { setLoader } from "../../store/slices/loaderSlice";

const Filter = ({ categories, setProducts, getAllProducts }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const dispatch = useDispatch();

  // Normalize and extract unique categories
  const uniqueCategories = [
    ...new Set(
      categories.map((item) =>
        item.category.trim().toUpperCase().replaceAll("_", " ")
      )
    ),
  ];

  // Extract original categories in a similar way to keep them in sync
  const originalCategories = [
    ...new Set(categories.map((item) => item.category.trim())),
  ];

  const categoryHandler = async (i) => {
    const category = originalCategories[i];
    setSelectedCategory(category);
    dispatch(setLoader(true));

    try {
      const response = await getProductsByFilter("category", category);

      if (response && response.isSuccess) {
        if (response.productDocs && response.productDocs.length > 0) {
          setProducts(response.productDocs);
        } else {
          setProducts([]);
          message.warning("No products found for the selected category.");
        }
      } else {
        // Show the error message if response is unsuccessful
        throw new Error(
          response ? response.message : "Failed to fetch products."
        );
      }
    } catch (err) {
      message.error(
        err.message || "No products are found in selected category."
      );
    }

    dispatch(setLoader(false));
  };

  const clearHandler = () => {
    setSelectedCategory("");
    getAllProducts();
  };

  return (
    <section className="flex gap-2 max-w-5xl flex-wrap items-center mx-auto justify-center mt-4">
      {uniqueCategories.map((category, index) => (
        <p
          key={index}
          className={`px-2 py-1 rounded-md text-sm cursor-pointer  border border-blue-600 text-blue-600 ${
            originalCategories[index] === selectedCategory &&
            "bg-blue-600 text-white"
          }`}
          onClick={() => {
            categoryHandler(index);
          }}
        >
          {category}
        </p>
      ))}
      {selectedCategory && (
        <button
          type="button"
          className="px-2 py-1 rounded-md text-sm cursor-pointer  border border-blue-600 text-blue-600"
          onClick={clearHandler}
        >
          Clear
        </button>
      )}
    </section>
  );
};

export default Filter;
