import { CardUsageExample } from "../../components/dashboard/Card";
import {
  BanknotesIcon,
  UserGroupIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/solid";
import Chart from "../../components/dashboard/Chart";
import Bar from "../../components/dashboard/Bar";
import { useEffect, useState } from "react";

const Dashboard = ({ products, users }) => {
  const [totalSales, setTotalSales] = useState(0);
  const [productCount, setProductCount] = useState(0);
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
      setProductCount(products.length);
      setUserCount(users.length);
    }
  }, [products]);

  return (
    <section>
      <div className="flex items-center gap-6">
        <CardUsageExample
          title={"Total Sales"}
          count={`${totalSales} MMK`}
          icon={BanknotesIcon}
          note={"MMK"}
        />
        <CardUsageExample
          title={"Active Users"}
          count={userCount}
          icon={UserGroupIcon}
          note={"Users"}
        />
        <CardUsageExample
          title={"Products"}
          count={productCount}
          icon={ShoppingCartIcon}
          note={"Items"}
        />
      </div>
      <Chart />
      <Bar />
    </section>
  );
};

export default Dashboard;
