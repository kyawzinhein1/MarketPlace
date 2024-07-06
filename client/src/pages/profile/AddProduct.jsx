import { useEffect, useState } from "react";

import { Checkbox, Col, Form, Row, Select, Input, message } from "antd";
import { SquaresPlusIcon } from "@heroicons/react/24/solid";
import TextArea from "antd/es/input/TextArea";

import {
  SellProduct,
  getOldProduct,
  updateProduct,
} from "../../apicalls/product";

const AddProduct = ({
  setActiveTabKey,
  getProducts,
  editMode,
  editProductId,
}) => {
  const [form] = Form.useForm();
  const [sellerId, setSellerId] = useState(null);

  const options = [
    {
      value: "Electronics",
      label: "Electronics",
    },
    {
      value: "Laptops & Computers",
      label: "Laptops & Computers",
    },
    {
      value: "Smartphones",
      label: "Smartphones",
    },
    {
      value: "Tablets",
      label: "Tablets",
    },
    {
      value: "Audio & Video",
      label: "Audio & Video",
    },
    {
      value: "Cameras & Photography",
      label: "Cameras & Photography",
    },
    {
      value: "Bags & Luggage",
      label: "Bags & Luggage",
    },
    {
      value: "Watches",
      label: "Watches",
    },
  ];

  const checkBoxOptions = [
    {
      value: "Accessories",
      label: "Accessories",
    },
    {
      value: "Warranty",
      label: "Warranty",
    },
    {
      value: "Voucher",
      label: "Voucher",
    },
  ];

  const onFinishHandler = async (values) => {
    try {
      let response;
      if (editMode) {
        values.seller_id = sellerId;
        values.product_id = editProductId;
        response = await updateProduct(values);
      } else {
        response = await SellProduct(values);
      }

      if (response.isSuccess) {
        form.resetFields();
        message.success(response.message);
        getProducts();
        setActiveTabKey("1");
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      message.error(err.message);
    }
  };

  const getOldProductData = async () => {
    try {
      const response = await getOldProduct(editProductId);
      if (response.isSuccess) {
        message.success("Edit mode on!!");
        const { name, description, price, category, usedFor, details, seller } =
          response.productDoc;
        setSellerId(seller);

        const modifiedProduct = {
          product_name: name,
          product_description: description,
          product_price: price,
          product_category: category,
          product_used_for: usedFor,
          product_details: [details],
        };
        form.setFieldsValue(modifiedProduct);
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      console.log(err.message);
      message.error(err.message);
    }
  };

  useEffect(
    (_) => {
      if (editMode) {
        getOldProductData();
      } else {
        form.resetFields();
      }
    },
    [editMode]
  );

  return (
    <section>
      <h1 className="text-xl font-bold my-3">
        {editMode ? "Update your product here." : "What you want to sell?"}
      </h1>
      <Form layout="vertical" onFinish={onFinishHandler} form={form}>
        <Form.Item
          name="product_name"
          label="Product Name"
          rules={[
            {
              required: true,
              message: "Product name must contains.",
            },
          ]}
          hasFeedback
        >
          <Input placeholder="Product name ..."></Input>
        </Form.Item>
        <Form.Item
          name="product_description"
          label="Product Description"
          rules={[
            {
              required: true,
              message: "Product description must contains.",
            },
          ]}
          hasFeedback
        >
          <TextArea rows={4} />
        </Form.Item>

        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              name="product_price"
              label="Price"
              rules={[
                {
                  required: true,
                  message: "Price must contains.",
                },
              ]}
              hasFeedback
            >
              <Input type="number" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="product_category"
              label="Choose a category"
              rules={[
                {
                  required: true,
                  message: "Category must contains.",
                },
              ]}
              hasFeedback
            >
              <Select defaultValue={""} options={options} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="product_used_for"
              label="Used for"
              rules={[
                {
                  required: true,
                  message: "Product's used time must write.",
                },
              ]}
              hasFeedback
            >
              <Input placeholder="eg, 3 months ago" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item name="product_details" label="Check if you have">
          <Checkbox.Group options={checkBoxOptions} defaultValue={[""]} />
        </Form.Item>
        <button className="w-full bg-blue-500 text-white p-1 rounded-md flex items-center justify-center gap-1">
          <SquaresPlusIcon width={30} />{" "}
          {editMode ? "Update Product" : "Sell Product"}
        </button>
      </Form>
    </section>
  );
};

export default AddProduct;
