import { useEffect, useState } from "react";
import Filter from "../../components/HomePage/Filter";
import Hero from "./../../components/HomePage/Hero";
import { message } from "antd";
import { getProducts } from "../../apicalls/product";
import { getCategories } from "../../apicalls/product";
import Card from "../../components/HomePage/Card";

const Index = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const getAllCategories = async () => {
    try {
      const response = await getCategories();
      if (response.isSuccess) {
        setCategories(response.categories);
      } else {
        throw new error(response.message);
      }
    } catch (err) {
      message.error(err.message);
    }
  };

  const getAllProducts = async () => {
    try {
      const response = await getProducts();
      if (response.isSuccess) {
        setProducts(response.productDocs);
      } else {
        throw new error(response.message);
      }
    } catch (err) {
      message.error(err.message);
    }
  };

  useEffect((_) => {
    getAllCategories();
    getAllProducts();
  }, []);

  return (
    <div>
      <Hero setProducts={setProducts} getAllProducts={getAllProducts} />
      <Filter
        categories={categories}
        setProducts={setProducts}
        getAllProducts={getAllProducts}
      />
      <div className="flex max-w-xl mx-auto flex-row flex-wrap ">
        {products.map((product) => (
          <Card product={product} key={product._id} />
        ))}
      </div>
    </div>
  );
};

export default Index;
