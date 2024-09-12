import { message } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../../apicalls/product";
import NoItem from "../../images/noItem.png";

const Details = () => {
  const [product, setProduct] = useState({});
  const [selectedImage, setSelectedImage] = useState(0);

  const params = useParams();

  const findById = async () => {
    try {
      const response = await getProductById(params.id);

      if (response.isSuccess) {
        setProduct(response.productDoc);
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      message.error(err.message);
    }
  };

  useEffect(() => {
    findById();
  }, []);

  return (
    <section className="flex flex-col md:flex-row items-start justify-between">
      {product && product.category && product.seller && (
        <>
          <div className="w-full md:w-1/3">
            {product && product.images && product.images.length > 0 ? (
              <>
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-56 sm:h-72 object-fill object-center rounded-lg overflow-hidden mt-3"
                />
                <div className="flex items-center gap-3 mt-3 overflow-x-auto">
                  {product.images.map((i, index) => (
                    <div
                      key={i}
                      className={`border-2 overflow-hidden border-blue-400 rounded-lg p-2 ${
                        selectedImage === index && "border-dashed"
                      }`}
                    >
                      <img
                        src={i}
                        alt={product.name}
                        className="w-16 h-16 sm:w-20 sm:h-20 object-cover cursor-pointer"
                        onClick={() => setSelectedImage(index)}
                      />
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
                <img
                  src={NoItem}
                  alt={product.name}
                  className="w-full h-56 sm:h-72 object-fill object-center rounded-xl overflow-hidden"
                />
                <p className="font-medium my-2 text-red-600">
                  This product does not include images.
                </p>
              </>
            )}
          </div>

          <div className="w-full md:w-2/3 px-4 md:px-10 lg:px-20 mt-6 md:mt-0">
            <h1 className="text-lg sm:text-2xl font-bold my-1">
              {product.name}
            </h1>
            <p className="text-gray-500 font-medium leading-6 mb-4">
              {product.description}
            </p>
            <hr />
            <h1 className="text-lg sm:text-xl font-semibold my-2">
              Infomations
            </h1>
            <div className="flex justify-between mb-4">
              <div className="font-medium space-y-2">
                <p>Type</p>
                <p>Used for</p>
              </div>
              <div className="text-gray-600 space-y-2 text-right">
                <p>{product.category.toUpperCase().replaceAll("_", " ")}</p>
                <p>{product.usedFor}</p>
              </div>
            </div>
            <hr />
            <div className="mb-4">
              <h1 className="text-lg sm:text-xl font-semibold my-2">Details</h1>
              {product.details.map((d, i) => (
                <div className="flex justify-between" key={i}>
                  <div className="font-medium space-y-2">
                    <p>{d}</p>
                  </div>
                  <div className="text-gray-600 space-y-2">
                    <p>Include</p>
                  </div>
                </div>
              ))}
            </div>
            <hr />
            <h1 className="text-lg sm:text-xl font-semibold my-2">
              Seller Information
            </h1>
            <div className="flex justify-between mb-4">
              <div className="font-medium space-y-2">
                <p>Name</p>
                <p>E-mail</p>
              </div>
              <div className="text-gray-600 space-y-2 text-right">
                <p>{product.seller.name}</p>
                <p>{product.seller.email}</p>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default Details;
