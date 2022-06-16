import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexCharts from "react-apexcharts";
import { isDocument } from "@testing-library/user-event/dist/utils";

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

interface PriceProps {
  coinId: string;
  isDark: boolean;
}

function Price({ coinId, isDark }: PriceProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 10000,
    }
  );

  const dataObj = data?.map((value) => ({
    x: value.close,
    y: [value.open, value.high, value.low, value.close],
  }));

  return (
    <>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexCharts
          type="candlestick"
          series={[
            {
              name: "Price",
              data: dataObj ?? [],
            },
          ]}
          options={{
            theme: {
              mode: isDark ? "dark" : "light",
            },
            chart: {
              width: 500,
              height: 500,
              background: "transparent",
              toolbar: { show: false },
            },
            grid: {
              show: false,
            },
            stroke: {
              curve: "smooth",
              width: 4,
            },
            title: {
              text: "CandleStick Chart",
              align: "left",
            },
            xaxis: {
              type: "datetime",
              axisBorder: { show: false },
              axisTicks: { show: false },
              categories: data?.map((value) => value.time_close),
              labels: {
                show: false,
              },
            },
            fill: {
              type: "gradient",
              gradient: { gradientToColors: ["#0be881"], stops: [0, 100] },
            },
            colors: ["#0fbcf9"],
            tooltip: {
              y: {
                formatter: (value) => `${value.toFixed(3)}`,
              },
            },
          }}
        />
      )}
    </>
  );
}

export default Price;
