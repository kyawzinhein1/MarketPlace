import { message, Tabs } from "antd";
import { useEffect, useState } from "react";
import Products from "./Products";
import Users from "./Users";
import Notification from "./Notification";

import { getAllProducts, getAllUsers } from "../../apicalls/admin";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import General from "./General";
import Dashboard from "./Dashboard";
import { getAllNoti } from "../../apicalls/notification";

const Index = () => {
  const { user } = useSelector((state) => state.reducer.user);
  const navigate = useNavigate();

  const [activeTabKey, setActiveTabKey] = useState("1");
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [notification, setNotification] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const onChangeHandler = (key) => {
    setActiveTabKey(key);
  };

  const getProducts = async (page = 1, perPage = 10) => {
    try {
      const response = await getAllProducts(page, perPage);
      if (response.isSuccess) {
        setProducts(response.productDocs);
        setCurrentPage(response.currentPage);
        setTotalPages(response.totalPages);
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
      isAdmin();
      getProducts(1, 10);
      getUsers();
      getNoti();
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
      children: (
        <Products
          products={products}
          getProducts={getProducts}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      ),
    },
    {
      key: "3",
      label: "Manage Users",
      children: <Users />,
    },
    {
      key: "4",
      label: "Notification",
      children: <Notification />,
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
