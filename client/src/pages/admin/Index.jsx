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
import {
  ArrowTrendingUpIcon,
  BellAlertIcon,
  TableCellsIcon,
  UserGroupIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

const Index = () => {
  const { user } = useSelector((state) => state.reducer.user);
  const navigate = useNavigate();

  const [activeTabKey, setActiveTabKey] = useState("1");
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [notification, setNotification] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [pendingProducts, setPendingProducts] = useState(0);

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
        setTotalProducts(response.totalProducts);
        setPendingProducts(response.pendingProducts);
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
      label: (
        <span className="flex items-start gap-2">
          <TableCellsIcon width={20} />
          Dashboard
        </span>
      ),
      children: (
        <Dashboard
          products={products}
          users={users}
          totalProducts={totalProducts}
          pendingProducts={pendingProducts}
          setActiveTabKey={setActiveTabKey}
        />
      ),
    },
    {
      key: "2",
      label: (
        <span className="flex items-start gap-2">
          <ArrowTrendingUpIcon width={20} />
          Manage Products
        </span>
      ),
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
      label: (
        <span className="flex items-start gap-2">
          <UserGroupIcon width={20} />
          Manage Users
        </span>
      ),
      children: <Users />,
    },
    {
      key: "4",
      label: (
        <span className="flex items-start gap-2">
          <BellAlertIcon width={20} />
          Notification
        </span>
      ),
      children: <Notification />,
    },
    {
      key: "5",
      label: (
        <span className="flex items-start gap-2">
          <UserIcon width={20} />
          Profile
        </span>
      ),
      children: <General />,
    },
  ];

  return (
    <div className="py-4">
      <Tabs
      activeKey={activeTabKey}
      onChange={onChangeHandler}
      items={items}
      tabPosition="left"
    />
    </div>
  );
};

export default Index;
