import type { IntervalTime } from "../utils/date-utils";
import {
  modesData,
  productTypesData,
  salesCount,
  salesIncrease,
  salesMetrics,
} from "../firebase/firebase-utils";
import { useQuery } from "@tanstack/react-query";
import { BarGraph } from "./BarGraph";
import { DoughnutChart } from "./Doughnut";
import { PieChart } from "./Pie";
import { useState } from "react";

export const SalesTab = () => {
  const [interval, setInterval] = useState<IntervalTime>("month");
  const [salesIncInterval, setSalesIncInterval] =
    useState<IntervalTime>("month");

  // sales data
  const productTypeDataQueryResult = useQuery({
    queryKey: ["productTypeData"],
    queryFn: () => {
      return productTypesData();
    },
  });

  const modesDataQueryResult = useQuery({
    queryKey: ["modesData"],
    queryFn: () => {
      return modesData();
    },
  });

  const salesMetricsQueryResult = useQuery({
    queryKey: ["salesMetrics"],
    queryFn: () => {
      return salesMetrics();
    },
  });

  const salesIncQueryResult = useQuery({
    queryKey: ["salesInc", salesIncInterval],
    queryFn: (args) => {
      return salesIncrease(args.queryKey[1] as IntervalTime);
    },
  });

  const salesCountQueryResult = useQuery({
    queryKey: ["salesCount", interval],
    queryFn: (args) => {
      let interval = args.queryKey[1] as IntervalTime;
      return salesCount(interval);
    },
  });

  return (
    // <main
    //   className="px-10 py-4
    //     flex-grow min-w-[500px] h-screen overflow-scroll bg-blue-100"
    //   // bg-gradient-to-br from-blue-100 to-purple-500 via-blue-400
    // >
    //   <div className="flex justify-between shadow-md p-2 bg-white rounded-lg">
    //     <div className="prose w-max">
    //       <h1 className="bg-gradient-to-t  from-black to-slate-400 bg-clip-text text-transparent">
    //         Dashboard
    //       </h1>
    //     </div>

    //     {/* sign out button */}
    //     <button
    //       className="bg-red-600 px-4 py-2 rounded-lg text-white hover:brightness-105"
    //       onClick={signOut}
    //     >
    //       Sign out
    //     </button>
    //   </div>

    <div className="grid  xl:grid-cols-2 gap-4 mt-4">
      {salesCountQueryResult.isLoading ? (
        <div className="h-12 bg-white rounded-lg shadow-md flex items-center justify-center">
          <h1 className="text-2xl">Loading...</h1>
        </div>
      ) : (
        <Block>
          <div className="relative w-full text-center flex gap-2 justify-center">
            <h1 className="text-2xl ">
              <span className="text-green-500 font-bold">
                {salesCountQueryResult.data}
              </span>{" "}
              sales this
            </h1>

            <select
              className="bg-white rounded-lg shadow-md px-2 py-1"
              value={interval}
              onChange={(e) => setInterval(e.target.value as IntervalTime)}
            >
              <option value="day">day</option>
              <option value="week">week</option>
              <option value="month">month</option>
            </select>
          </div>
        </Block>
      )}

      {salesIncQueryResult.isLoading ? (
        <div className="h-12 bg-white rounded-lg shadow-md flex items-center justify-center">
          <h1 className="text-2xl">Loading...</h1>
        </div>
      ) : (
        <Block>
          <div className="relative w-full text-center flex gap-2 justify-center">
            <h1 className="text-2xl ">
              <span
                className={`${
                  salesIncQueryResult.data?.increase! > 0
                    ? "text-green-500"
                    : "text-red-500"
                } font-bold`}
              >
                {salesIncQueryResult.data?.increase.toFixed(2)}%
              </span>{" "}
              {salesIncQueryResult.data?.increase! > 0 ? "⬆️" : "⬇️"}
            </h1>

            <select
              className="bg-white rounded-lg shadow-md px-2 py-1"
              value={salesIncInterval}
              onChange={(e) =>
                setSalesIncInterval(e.target.value as IntervalTime)
              }
            >
              <option value="day">day</option>
              <option value="week">week</option>
              <option value="month">month</option>
            </select>
          </div>
        </Block>
      )}

      <PieChart q={productTypeDataQueryResult} heading="Product Types" />
      <DoughnutChart q={modesDataQueryResult} heading="Modes" />
      <div className="xl:col-span-2">
        <BarGraph q={salesMetricsQueryResult} heading="Sales Metrics" />
      </div>
    </div>
    // </main>
  );
};

const Block = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-12 bg-white rounded-lg shadow-md flex items-center justify-center">
      {children}
    </div>
  );
};
