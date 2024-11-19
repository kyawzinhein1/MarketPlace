import { CardUsageExample } from "../../components/Dashboard/Card";
import {
  BanknotesIcon,
  UserGroupIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/solid";
import Chart from "../../components/Dashboard/Chart";
import Bar from "../../components/Dashboard/Bar";
import { useEffect, useState } from "react";

const Dashboard = ({
  products,
  users,
  totalProducts,
  pendingProducts,
  setActiveTabKey,
}) => {
  const [totalSales, setTotalSales] = useState(0);
  const [userCount, setUserCount] = useState(0);

  const calcTotalSale = () => {
    const totalAmount = products.reduce((a, b) => {
      return a + Number(b.price);
    }, 0);
    setTotalSales(totalAmount);
  };

  useEffect(() => {
    if (products.length) {
      calcTotalSale();
      setUserCount(users.length);
    }
  }, [products]);

  return (
    <section className="pr-3">
      <div className="flex gap-3">
        <div className="w-full">
          <CardUsageExample
            title={"Total Sales"}
            count={`${totalSales} MMK`}
            icon={BanknotesIcon}
            note={"MMK"}
          />
        </div>
        <div
          onClick={() => {
            setActiveTabKey("3");
          }}
          className="w-full"
        >
          <CardUsageExample
            title={"Active Users"}
            count={userCount}
            icon={UserGroupIcon}
            note={"Users"}
          />
        </div>
        <div
          onClick={() => {
            setActiveTabKey("2");
          }}
          className="w-full"
        >
          <CardUsageExample
            title={"Total Products"}
            count={totalProducts}
            icon={ShoppingCartIcon}
            note={"Items"}
          />
        </div>
        <div
          onClick={() => {
            setActiveTabKey("2");
          }}
          className="w-full"
        >
          <CardUsageExample
            title={"Pending Products"}
            count={pendingProducts}
            icon={ShoppingCartIcon}
            note={"Pending"}
          />
        </div>
      </div>
      <Chart products={products} />
      <Bar products={products} />
    </section>
  );
};

export default Dashboard;
