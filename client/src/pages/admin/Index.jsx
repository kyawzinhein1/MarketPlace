import { message, Tabs } from "antd";
import { useEffect, useState } from "react";
import Products from "./Products";
import Users from "./Users";
import { getAllProducts } from "../../apicalls/admin";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import General from "./General";

const Index = () => {
  const { user } = useSelector((state) => state.reducer.user);
  const navigate = useNavigate();

  const [activeTabKey, setActiveTabKey] = useState("1");
  const [products, setProducts] = useState([]);

  const onChangeHandler = (key) => {
    setActiveTabKey(key);
  };

  const getProducts = async () => {
    try {
      const response = await getAllProducts();
      if (response.isSuccess) {
        setProducts(response.productDocs);
      } else {
        throw new error(response.message);
      }
    } catch (err) {
      message.error(err.message);
    }
  };

  const isAdmin = () => {
    if (user.role !== "admin") {
      navigate("/");
    }
  };

  useEffect(
    (_) => {
      isAdmin();
      getProducts();
    },
    [activeTabKey]
  );

  const items = [
    {
      key: "1",
      label: "Manage Products",
      children: <Products products={products} />,
    },
    {
      key: "2",
      label: "Manage Users",
      children: <Users />,
    },
    {
      key: "3",
      label: "Notification",
      children: "Content of Tab Pane 2",
    },
    {
      key: "4",
      label: "General",
      children: <General />,
    },
  ];

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
