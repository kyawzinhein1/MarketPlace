import { useState } from "react";
import ProductForm from "../../components/ProductForm";
import { Tabs } from "antd";
import Upload from "../../components/Upload";

const ManageProduct = ({
  setActiveTabKey,
  getProducts,
  editMode,
  editProductId,
}) => {
  const [productActiveTabKey, setProductActiveTabKey] = useState("1");

  const items = [
    {
      key: "1",
      label: "Product Detail",
      children: (
        <ProductForm
          setActiveTabKey={setActiveTabKey}
          getProducts={getProducts}
          editMode={editMode}
          editProductId={editProductId}
        />
      ),
    },
    editMode
      ? {
          key: "2",
          label: "Product Images",
          children: (
            <Upload
              setActiveTabKey={setActiveTabKey}
              editProductId={editProductId}
            />
          ),
        }
      : null,
  ];

  const onChangeHandler = (key) => {
    setProductActiveTabKey(key);
    // setEditProductId(products._id);
  };

  return (
    <Tabs
      activeKey={productActiveTabKey}
      onChange={onChangeHandler}
      items={items}
    />
  );
};

export default ManageProduct;
