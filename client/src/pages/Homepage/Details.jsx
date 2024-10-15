import { Form, Input, Layout, message } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getProductById } from "../../apicalls/product";
import NoItem from "../../images/noItem.png";

import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../../store/slices/loaderSlice";

import { RotatingLines } from "react-loader-spinner";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

const Details = () => {
  const [product, setProduct] = useState({});
  const [selectedImage, setSelectedImage] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isProcessing } = useSelector((state) => state.reducer.loader);
  const user = useSelector((state) => state.reducer.user.user);

  const params = useParams();

  const findById = async () => {
    dispatch(setLoader(true));
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
    dispatch(setLoader(false));
  };

  useEffect(() => {
    findById();
  }, []);

  return (
    <section
      className={`flex mt-10 ${
        isProcessing
          ? "items-center justify-center"
          : "items-start justify-between"
      }`}
    >
      {isProcessing ? (
        <RotatingLines
          strokeColor="#3b82f6"
          strokeWidth="5"
          animationDuration="0.75"
          width="50"
          visible={isProcessing}
        />
      ) : (
        <>
          {product && product.category && product.seller && (
            <>
              <div className="w-1/3 ml-20">
                {product && product.images && product.images.length > 0 ? (
                  <>
                    <img
                      src={product.images[selectedImage]}
                      alt={product.name}
                      className="w-full h-72 object-contain object-center rounded-xl overflow-hidden"
                    />
                    <div className="flex items-center gap-3 mt-5">
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
                            className=" w-20 h-20 object-cover cursor-pointer"
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
                      className="w-full h-96 object-fill object-center rounded-xl overflow-hidden"
                    />
                    <p className=" font-medium my-2 text-red-600">
                      This product does not include images.
                    </p>
                  </>
                )}
              </div>

              <div className="w-2/3 px-20">
                <div className="flex justify-between">
                  <div className="w-3/4">
                    <h1 className=" text-2xl font-bold my-1">{product.name}</h1>
                    <p className=" text-gray-500 font-medium leading-6 mb-4">
                      {product.description}
                    </p>
                  </div>
                  <ArrowLeftIcon
                    width={30}
                    height={30}
                    className="text-blue-600 cursor-pointer"
                    onClick={() => {
                      navigate(-1);
                    }}
                  />
                </div>

                <hr />

                <h1 className="text-lg font-semibold my-1">Infomations</h1>
                <div className="flex justify-between mb-1">
                  <div className=" font-medium space-y-1">
                    <p>Price</p>
                    <p>Type</p>
                    <p>Used for</p>
                  </div>
                  <div className=" text-gray-600 space-y-1 text-right">
                    <p>{product.price} MMK</p>
                    <p>{product.category.toUpperCase().replaceAll("_", " ")}</p>
                    <p>{product.usedFor}</p>
                  </div>
                </div>
                <hr />
                <div className=" mb-4">
                  <h1 className="text-lg font-semibold my-1">Details</h1>
                  {product.details.map((d, i) => (
                    <div className="flex justify-between" key={i}>
                      <div className=" font-medium space-y-1">
                        <p>{d}</p>
                      </div>
                      <div className=" text-gray-600 space-y-1">
                        <p>Include</p>
                      </div>
                    </div>
                  ))}
                </div>
                <hr />
                <h1 className="text-lg font-semibold my-2">
                  Seller Infomation
                </h1>
                <div className="flex justify-between mb-4">
                  <div className="font-medium space-y-1">
                    <p>Name</p>
                    <p>E-mail</p>
                  </div>
                  <div className=" text-gray-600 space-y-1 text-right">
                    <p>{product.seller.name}</p>
                    <p>{product.seller.email}</p>
                  </div>
                </div>
                <hr />
                <h1 className="text-lg font-semibold my-1">Bids</h1>

                <div className="mb-10">
                  {user ? (
                    <Form
                      onFinish={() => {
                        window.alert("Commented.");
                      }}
                      layout="vertical"
                    >
                      <Form.Item
                        name="message"
                        label="Text"
                        rules={[
                          {
                            required: true,
                            message: "Message must contain.",
                          },
                          {
                            min: 3,
                            message: "Message must contain 3 characters.",
                          },
                        ]}
                        hasFeedback
                      >
                        <Input placeholder="Write something..." />
                      </Form.Item>
                      <Form.Item
                        name="phone"
                        label="Phone No."
                        rules={[
                          {
                            required: true,
                            message: "Phone Number must contain.",
                          },
                          {
                            min: 9,
                            message: "Phone Number must have 9 digits.",
                          },
                          {
                            max: 11,
                            message: "Phone Number don't exceed 11 digits.",
                          },
                        ]}
                        hasFeedback
                      >
                        <Input
                          type="number"
                          placeholder="Write Phone Number..."
                        />
                      </Form.Item>
                      <button className="text-white font-medium text-base bg-blue-600 px-2 py-1 rounded-md hover:bg-blue-800 transition-all float-right">
                        Submit Message
                      </button>
                    </Form>
                  ) : (
                    <p className="font-medium text-red-600">
                      <Link to={"/login"} className="underline">
                        Login
                      </Link>{" "}
                      or{" "}
                      <Link to={"/register"} className="underline">
                        Register
                      </Link>{" "}
                      to bids this product.
                    </p>
                  )}
                  <hr />
                </div>
              </div>
            </>
          )}
        </>
      )}
    </section>
  );
};

export default Details;
