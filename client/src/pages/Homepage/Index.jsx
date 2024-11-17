import { useEffect, useState } from "react";
import Filter from "../../components/HomePage/Filter";
import Hero from "./../../components/HomePage/Hero";
import Card from "../../components/HomePage/Card";
import { getProducts, getSavedProducts } from "../../apicalls/product";
import { getCategories } from "../../apicalls/product";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../../store/slices/loaderSlice";

import { RotatingLines } from "react-loader-spinner";
import { Pagination } from "antd";

const Index = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [savedProducts, setSavedProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

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
      console.error(err.message);
    }
    dispatch(setLoader(false));
  };

  const getAllProducts = async (page = 1, perPage = 6) => {
    dispatch(setLoader(true));
    try {
      const response = await getProducts(page, perPage);
      if (response.isSuccess) {
        setProducts(response.productDocs);
        setCurrentPage(response.currentPage);
        setTotalPages(response.totalPages);
      } else {
        throw new error(response.message);
      }
    } catch (err) {
      console.error(err.message);
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
      console.error(err.message);
    }
    dispatch(setLoader(false));
  };

  useEffect((_) => {
    getAllCategories();
    getAllProducts();
    getSaveProducts();
  }, []);

  const handlePagination = (page, perPage) => {
    console.log(page, perPage);

    getAllProducts(page, perPage);
  };

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
        <>
          <div className="grid grid-cols-3 gap-4 max-w-5xl mx-auto flex-wrap flex-row mt-8">
            {products.map((product) => (
              <Card
                product={product}
                key={product._id}
                savedProducts={savedProducts}
                getAllProducts={getAllProducts}
              />
            ))}
          </div>
          <div className="flex mt-5 mb-20 justify-end max-w-5xl mx-auto">
            <Pagination
              current={currentPage}
              total={totalPages * 6}
              onChange={handlePagination}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Index;
