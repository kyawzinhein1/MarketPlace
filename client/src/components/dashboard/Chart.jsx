import { Card, Title, LineChart } from "@tremor/react";
import { format } from "date-fns";

const Chart = ({ products }) => {
  
  // get date from last 1 week
  const currentDate = new Date(); // current date
  const lastOneWeek = new Date();
  lastOneWeek.setDate(currentDate.getDate() - 7);

  const productDailySellRate = {};

  // calc products in 1 week
  products.forEach((product) => {
    const productSellDate = new Date(product.createdAt);

    if (productSellDate <= currentDate && productSellDate >= lastOneWeek) {
      const formattedDate = format(new Date(productSellDate), "dd/MM");

      if (!productDailySellRate[formattedDate]) {
        productDailySellRate[formattedDate] = 0;
      }
      productDailySellRate[formattedDate] += 1;
    }
  });

  // targets
  // limit date (last 1 week)
  // filter how many products in 1 week per day

  const chartdata = Object.entries(productDailySellRate).map(([key, val]) => ({
    year: key,
    "productDailySellRate": val,
  }));

  return (
    <Card>
      <Title>Product Sell Rates Per Daily</Title>
      <LineChart
        className="mt-6"
        data={chartdata}
        index="year"
        categories={["productDailySellRate"]}
        colors={["blue"]}
        yAxisWidth={40}
      />
    </Card>
  );
};

export default Chart;
