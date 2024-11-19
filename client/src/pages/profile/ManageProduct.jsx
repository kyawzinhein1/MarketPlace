import ProductForm from "../../components/ProductManage/ProductForm";
import { Tabs } from "antd";
import Upload from "../../components/ProductManage/Upload";

const ManageProduct = ({
  setActiveTabKey,
  getProducts,
  editMode,
  editProductId,
  manageTabKey,
}) => {
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

  return (
    <section className="px-4">
      <Tabs defaultActiveKey={manageTabKey} items={items} />
    </section>
  );
};

export default ManageProduct;
