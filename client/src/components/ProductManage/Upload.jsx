import React, { useEffect, useState } from "react";
import { message } from "antd";
import { TrashIcon } from "@heroicons/react/24/solid";
import {
  deleteSavedImages,
  getSavedImages,
  uploadImages,
} from "../../apicalls/product";

import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../../store/slices/loaderSlice";

const Upload = ({ editProductId, setActiveTabKey }) => {
  const [previewImages, setPreviewImages] = useState([]);
  const [images, setImages] = useState([]);
  const [savedImages, setSavedImages] = useState([]);
  const [selectedImagesCount, setSelectedImagesCount] = useState(0);

  const { isProcessing } = useSelector((state) => state.reducer.loader);
  const dispatch = useDispatch();

  const getImages = async (product_id) => {
    try {
      const response = await getSavedImages(product_id);
      if (response.isSuccess) {
        setSavedImages(response.data.images);
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      message.error(err.message);
    }
  };

  useEffect((_) => {
    getImages(editProductId);
  }, []);

  const onChangeHandler = (event) => {
    const selectedImages = event.target.files;
    const selectedImagesArray = Array.from(selectedImages);

    // update selected images count
    setSelectedImagesCount((prev) => prev + selectedImagesArray.length);

    setImages((prev) => [...prev, ...selectedImagesArray]);

    const previewImagesArray = selectedImagesArray.map((img) => {
      return URL.createObjectURL(img);
    });

    setPreviewImages((prev) => prev.concat(previewImagesArray));
  };

  const deleteHandler = (img) => {
    const indexToDelete = previewImages.findIndex((e) => e === img);

    // update selected images count
    setSelectedImagesCount((prev) => prev - 1);

    if (indexToDelete !== -1) {
      const updateSelectedImages = [...images];
      updateSelectedImages.splice(indexToDelete, 1);

      const updatedPreviewImages = [...previewImages];
      updatedPreviewImages.splice(indexToDelete, 1);

      setImages(updateSelectedImages);
      setPreviewImages(updatedPreviewImages);

      URL.revokeObjectURL(img);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    dispatch(setLoader(true));

    if (selectedImagesCount >= 2) {
      const formData = new FormData();
      for (let i = 0; i < images.length; i++) {
        formData.append("product_images", images[i]);
      }

      formData.append("product_id", editProductId);

      try {
        const response = await uploadImages(formData);
        if (response.isSuccess) {
          message.success(response.message);
          setActiveTabKey("1");
        } else {
          throw new Error(response.message);
        }
      } catch (err) {
        message.error(err.message);
      }
    } else {
      message.error("Please selected at least two images.");
    }
    dispatch(setLoader(false));
  };

  const savedImagesDeleteHandler = async (img) => {
    setSavedImages((prev) => prev.filter((e) => e !== img));

    try {
      const response = await deleteSavedImages({
        productId: editProductId,
        imgToDelete: img,
      });

      if (response.isSuccess) {
        message.success(response.message);
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      message.error(err.message);
    }
  };

  return (
    <section>
      <h1 className="text-xl font-bold mt-3 my-6">
        Upload your product's images here.
      </h1>
      <h1>Save images in cloud.</h1>
      {savedImages.length > 0 ? (
        <div className="flex gap-2 mt-2 mb-6">
          {savedImages.map((e) => (
            <div key={e} className="basis-1/6 h-32 relative">
              <img
                src={e}
                alt={e}
                className="w-full h-full rounded-md object-cover"
              />
              <TrashIcon
                width={18}
                className="absolute top-1 right-1 text-red-600 w-7 h-5 rounded-xl cursor-pointer hover:text-white hover:bg-red-600 transition-all"
                onClick={() => {
                  savedImagesDeleteHandler(e);
                }}
              />
            </div>
          ))}
        </div>
      ) : (
        <h1 className="text-red-600 mb-5">No product images are uploaded.</h1>
      )}
      <form
        method="post"
        encType="multipart/form-data"
        onSubmit={submitHandler}
      >
        <label
          htmlFor="upload"
          className="p-3 rounded-md border-2 border-dashed border-blue-600 font-medium text-blue-600 cursor-pointer"
        >
          Upload from device
        </label>
        <input
          type="file"
          name="product_images"
          multiple
          accept="image/png,image/jpeg,image/jpg"
          id="upload"
          hidden
          onChange={onChangeHandler}
        />

        <div className="flex gap-2 mt-8">
          {previewImages &&
            previewImages.map((img, index) => (
              <div key={index} className="basis-1/6 h-32 relative">
                <img
                  src={img}
                  alt={index}
                  className="w-full h-full rounded-md object-cover"
                />
                <TrashIcon
                  width={18}
                  className="absolute top-1 right-1 text-red-600 w-7 h-5 rounded-xl cursor-pointer hover:text-white hover:bg-red-600 transition-all"
                  onClick={() => {
                    deleteHandler(img);
                  }}
                />
              </div>
            ))}
        </div>

        {selectedImagesCount > 1 && (
          <button
            className="block px-4 py-2 mt-2 bg-blue-600 text-white rounded-md"
            disabled={isProcessing && selectedImagesCount < 1}
          >
            {isProcessing ? "Uploading ..." : "Upload"}
          </button>
        )}
      </form>
    </section>
  );
};

export default Upload;
