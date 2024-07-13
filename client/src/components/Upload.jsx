import React, { useState } from "react";
import { message } from "antd";
import { TrashIcon } from "@heroicons/react/24/solid";
import { uploadImages } from "../apicalls/product";

const Upload = () => {
  const [previewImages, setPreviewImages] = useState([]);
  const [images, setImages] = useState([]);

  const onChangeHandler = (event) => {
    const selectedImages = event.target.files;
    setImages(selectedImages);
    const selectedImagesArray = Array.from(selectedImages);

    const previewImagesArray = selectedImagesArray.map((img) => {
      return URL.createObjectURL(img);
    });
    setPreviewImages((prev) => prev.concat(previewImagesArray));
  };

  const deleteHandler = (img) => {
    setPreviewImages(previewImages.filter((element) => element !== img));
    URL.revokeObjectURL(img);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (let i = 0; i < images.length; i++) {
      formData.append("product_images", images[i]);
    }

    try {
      const response = await uploadImages(formData);
      if (response.isSuccess) {
        message.isSuccess(respons.message);
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

        <button className="block px-4 py-2 bg-blue-600 text-white rounded-md mt-5">
          Upload to product
        </button>
      </form>
    </section>
  );
};

export default Upload;
