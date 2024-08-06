import { message, Tabs } from "antd";
import { useEffect, useState } from "react";
import Products from "./Products";
import Users from "./Users";
import { getAllProducts, getAllUsers } from "../../apicalls/admin";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import General from "./General";
import Dashboard from "./Dashboard";

const Index = () => {
  const { user } = useSelector((state) => state.reducer.user);
  const navigate = useNavigate();

  const [activeTabKey, setActiveTabKey] = useState("1");
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);

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

  const getUsers = async () => {
    try {
      const response = await getAllUsers();
      if (response.isSuccess) {
        setUsers(response.userDocs);
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
      getUsers();
    },
    [activeTabKey]
  );

  const items = [
    {
      key: "1",
      label: "Dashboard",
      children: <Dashboard products={products} users={users} />,
    },
    {
      key: "2",
      label: "Manage Products",
      children: <Products products={products} getProducts={getProducts} />,
    },
    {
      key: "3",
      label: "Manage Users",
      children: <Users />,
    },
    {
      key: "4",
      label: "Notification",
      children: "Content of Tab Pane 2",
    },
    {
      key: "5",
      label: "Profile",
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
