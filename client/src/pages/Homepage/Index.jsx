import { useEffect, useState } from "react";
import Filter from "../../components/HomePage/Filter";
import Hero from "./../../components/HomePage/Hero";
import Card from "../../components/HomePage/Card";
import { message } from "antd";
import { getProducts, getSavedProducts } from "../../apicalls/product";
import { getCategories } from "../../apicalls/product";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../../store/slices/loaderSlice";

import { RotatingLines } from "react-loader-spinner";

const Index = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [savedProducts, setSavedProducts] = useState([]);

  const { isProcessing } = useSelector((state) => state.reducer.loader);
  const dispatch = useDispatch();

  const getAllCategories = async () => {
    dispatch(setLoader(true));
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
    dispatch(setLoader(false));
  };

  const getAllProducts = async () => {
    dispatch(setLoader(true));
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
    dispatch(setLoader(false));
  };

  const getSaveProducts = async () => {
    dispatch(setLoader(true));
    try {
      const response = await getSavedProducts();
      if (response.isSuccess) {
        setSavedProducts(response.productDocs);
      } else {
        throw new error(response.message);
      }
    } catch (err) {
      message.error(err.message);
    }
    dispatch(setLoader(false));
  };

  useEffect((_) => {
    getAllCategories();
    getAllProducts();
    getSaveProducts();
  }, []);

  return (
    <div>
      <Hero setProducts={setProducts} getAllProducts={getAllProducts} />
      <Filter
        categories={categories}
        setProducts={setProducts}
        getAllProducts={getAllProducts}
      />
      {isProcessing ? (
        <div className=" flex items-center justify-center">
          <RotatingLines
            strokeColor="#3b82f6"
            strokeWidth="5"
            animationDuration="0.75"
            width="50"
            visible={isProcessing}
          />
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 max-w-4xl mx-auto flex-wrap flex-row mt-8">
          {products.map((product) => (
            <Card
              product={product}
              key={product._id}
              savedProducts={savedProducts}
              getAllProducts={getAllProducts}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Index;
