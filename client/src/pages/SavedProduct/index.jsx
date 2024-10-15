import React, { useEffect, useState } from "react";
import { getSavedProducts } from "../../apicalls/product";
import { message } from "antd";
import Card from "../../components/HomePage/Card";

import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../../store/slices/loaderSlice";

import { RotatingLines } from "react-loader-spinner";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [savedProducts, setSavedProducts] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    <section className="px-16">
      <div className="flex justify-between">
        <div>
          <h1 className="text-2xl font-bold my-4">Saved Product List</h1>
        </div>
        <ArrowLeftIcon
          width={30}
          className="text-blue-600 cursor-pointer"
          onClick={() => {
            navigate(-1);
          }}
        />
      </div>
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
        <div className="grid grid-cols-4 gap-6">
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
            <p className="text-red-600 w-full text-center">
              No Saved Product found.
            </p>
          )}
        </div>
      )}
    </section>
  );
};

export default Index;
