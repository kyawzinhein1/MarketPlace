import { Tabs } from "antd";
import Products from "./Products";
import ManageProduct from "./ManageProduct";
import Notification from "./Notification";
import General from "./General";
import { useEffect, useState } from "react";
import { getAllProducts } from "../../apicalls/product";
import { getAllNoti } from "../../apicalls/notification";
import { message } from "antd";
import {
  BellAlertIcon,
  Square3Stack3DIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { ArrowTrendingUpIcon } from "@heroicons/react/24/solid";

const Index = () => {
  const [activeTabKey, setActiveTabKey] = useState("1");
  const [products, setProducts] = useState([]);
  const [notification, setNotification] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editProductId, setEditProductId] = useState(null);
  const [manageTabKey, setManageTabKey] = useState("1");

  const getProducts = async () => {
    try {
      const response = await getAllProducts();
      if (response.isSuccess) {
        setProducts(response.productDocs);
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      message.error(err.message);
    }
  };

  const getNoti = async () => {
    try {
      const response = await getAllNoti();
      if (response.isSuccess) {
        setNotification(response.notiDocs);
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(
    (_) => {
      if (activeTabKey === "1") {
        setEditMode(false);
        setEditProductId(null);
        setManageTabKey("1");
      }
      getProducts();
      getNoti();
    },
    [activeTabKey]
  );

  const items = [
    {
      key: "1",
      label: (
        <span className="flex items-start gap-2">
          <Square3Stack3DIcon width={20} />
          Product
        </span>
      ),
      children: (
        <Products
          setActiveTabKey={setActiveTabKey}
          products={products}
          setEditMode={setEditMode}
          setEditProductId={setEditProductId}
          getProducts={getProducts}
          setManageTabKey={setManageTabKey}
        />
      ),
    },
    {
      key: "2",
      label: (
        <span className="flex items-start gap-2">
          <ArrowTrendingUpIcon width={20} />
          Manage Product
        </span>
      ),
      children: (
        <ManageProduct
          setActiveTabKey={setActiveTabKey}
          getProducts={getProducts}
          editMode={editMode}
          editProductId={editProductId}
          manageTabKey={manageTabKey}
        />
      ),
    },
    {
      key: "3",
      label: (
        <span className="flex items-start gap-2">
          <BellAlertIcon width={20} />
          Notification
          <span className="text-red-600 font-medium">
            {notification.length}
          </span>
        </span>
      ),
      children: <Notification notifications={notification} />,
    },
    {
      key: "4",
      label: (
        <span className="flex items-start gap-2">
          <UsersIcon width={20} />
          Profile
        </span>
      ),
      children: <General />,
    },
  ];

  const onChangeHandler = (key) => {
    setActiveTabKey(key);
  };

  return (
    <Tabs
      activeKey={activeTabKey}
      onChange={onChangeHandler}
      items={items}
      tabPosition="left"
    />
  );
};

export default Index;
