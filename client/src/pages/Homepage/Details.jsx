import { Form, Input, Layout, message } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getProductById } from "../../apicalls/product";
import NoItem from "../../images/noItem.png";

import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../../store/slices/loaderSlice";

import { RotatingLines } from "react-loader-spinner";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { checkCurrentUser } from "../../apicalls/auth";
import { addNewBid, getAllBids } from "../../apicalls/bid";

import { formatDistanceToNow } from "date-fns";
import { notify } from "../../apicalls/notification";

const Details = () => {
  const [product, setProduct] = useState({});
  const [userId, setUserId] = useState({});
  const [bids, setBids] = useState([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isPlaced, setIsPlaced] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form] = Form.useForm();

  const { isProcessing } = useSelector((state) => state.reducer.loader);
  const { user } = useSelector((state) => state.reducer.user);

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

  const getBids = async () => {
    dispatch(setLoader(true));
    try {
      const response = await getAllBids(params.id);

      if (response.isSuccess) {
        setBids(response.bidDocs);
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      console.error(err.message);
    }
    dispatch(setLoader(false));
  };

  const getUserId = async () => {
    try {
      const response = await checkCurrentUser();
      const userId = response.userDoc;
      setUserId(userId);
    } catch (error) {
      throw new Error("No user found.");
    }
  };

  useEffect(() => {
    findById();
    getUserId();
    getBids();
  }, []);

  const onFinishHandler = async (values) => {
    setIsPlaced(true);
    values.product_id = product._id;
    values.seller_id = product.seller._id;
    values.buyer_id = userId._id;

    try {
      const response = await addNewBid(values);
      if (response.isSuccess) {
        getBids();
        form.resetFields();
        message.success(response.message);

        await notify({
          title: "New bid placed.",
          message: `New bid is placed in ${product.name} by ${user.name}`,
          owner_id: product.seller._id,
          product_id: product._id,
          phone_number: values.phone,
        });
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
    setIsPlaced(false);
  };

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
              <div className="w-1/3 ml-24 sticky top-20">
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
                          key={index}
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

                <h1 className="text-lg font-semibold my-1">Place Your Bids</h1>
                <div className="mb-10">
                  {user && userId._id !== product.seller._id && (
                    <Form
                      onFinish={onFinishHandler}
                      layout="vertical"
                      form={form}
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
                        {isPlaced ? "Submitting message..." : "Submit Message"}
                      </button>
                    </Form>
                  )}
                  {!user && (
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
                  {userId?._id === product.seller._id && (
                    <p className="font-medium text-red-600">
                      You are the product sellet / owner. You can't placed bid.
                    </p>
                  )}
                  <hr />
                </div>

                <div className="mb-24">
                  <h1 className="text-lg font-semibold my-1">Recent Bids</h1>
                  {bids.length === 0 ? (
                    <p className="text-red-600">No bids are placed yet.</p>
                  ) : (
                    <div>
                      {bids.map((bid) => (
                        <div
                          className="mb-4 bg-white px-2 py-4 rounded-lg"
                          key={bid._id}
                        >
                          <p className="text-base font-semibold">
                            {bid.buyer_id.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {formatDistanceToNow(new Date(bid.createdAt))} ago
                          </p>
                          <p className="text-sm text-gray-600 font-semibold">
                            {bid.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
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
