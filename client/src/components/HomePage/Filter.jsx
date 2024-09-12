import { useState } from "react";
import { getProductsByFilter } from "../../apicalls/product";
import { message } from "antd";

const Filter = ({ categories, setProducts, getAllProducts }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

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
    try {
      setSelectedCategory(originalCategories[i]);
      const response = await getProductsByFilter("category", selectedCategory);
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
    setSelectedCategory("");
    getAllProducts();
  };

  return (
    <section className="flex gap-2 max-w-3xl flex-wrap items-center mx-auto justify-center mt-4">
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
      <button
        type="button"
        className="px-2 py-1 rounded-md text-sm cursor-pointer  border border-blue-600 text-blue-600"
        onClick={clearHandler}
      >
        Clear
      </button>
    </section>
  );
};

export default Filter;
