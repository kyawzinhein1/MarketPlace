import React, { useEffect, useState } from "react";
import { getSavedProducts } from "../../apicalls/product";
import { message } from "antd";
import Card from "../../components/HomePage/Card";

import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../../store/slices/loaderSlice";

import { RotatingLines } from "react-loader-spinner";

const Index = () => {
  const [savedProducts, setSavedProducts] = useState([]);
  const dispatch = useDispatch();

  const { isProcessing } = useSelector((state) => state.reducer.loader);

  const getProducts = async () => {
    dispatch(setLoader(true));
    try {
      const response = await getSavedProducts();

      if (response.isSuccess) {
        setSavedProducts(response.productDocs);
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      message.error(err.message);
    }
    dispatch(setLoader(false));
  };

  // Remove the product locally
  const handleRemoveProduct = (removedProductId) => {
    setSavedProducts((prevProducts) =>
      prevProducts.filter((product) => product._id !== removedProductId)
    );
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <section>
      <h1 className="text-2xl font-bold my-4 text-center">
        Saved Product List
      </h1>
      {isProcessing ? (
        <div className=" flex items-center justify-center">
          <RotatingLines
            strokeColor="#3b82f6"
            strokeWidth="5"
            animationDuration="0.75"
            width="50"
          />
        </div>
      ) : (
        <div className="flex gap-3">
          {savedProducts.length > 0 ? (
            <>
              {savedProducts.map((product) => (
                <Card
                  product={product.product_id}
                  key={product._id}
                  saved={true}
                  getProducts={getProducts}
                  onRemove={() => handleRemoveProduct(product._id)} // Pass the removal handler
                />
              ))}
            </>
          ) : (
            <p className="text-red-600 mx-auto">No Saved Product found.</p>
          )}
        </div>
      )}
    </section>
  );
};

export default Index;
