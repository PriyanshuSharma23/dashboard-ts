import type { UseQueryResult } from "@tanstack/react-query";
import { ArcElement, Chart } from "chart.js";
import { Doughnut, Pie } from "react-chartjs-2";
import { Appendix } from "./Appendix";
import { LoadingSpinner } from "./LoadingSpinner";

Chart.register(ArcElement);
const colors = ["#FDFDBD", "#C8FFD4", "#B8E8FC", "#B1AFFF"];

export const DoughnutPie = ({
  q,
  chart,
  heading,
}: {
  q: UseQueryResult;
  chart: string;
  heading: string;
}) => {
  const options = {
    data: {
      labels: Object.keys(q.data ?? {}),

      datasets: [
        {
          label: "Product Types",
          data: Object.values(q.data ?? {}),
          backgroundColor: colors,
        },
      ],
    },
  };

  return (
    <div
      className={`min-h-[200px] min-w-[200px] p-5 rounded-lg shadow-lg bg-white ${
        q.isLoading ? "animate-pulse flex justify-center items-center" : ""
      }`}
    >
      {q.isLoading ? (
        <LoadingSpinner color={"text-purple-500"} />
      ) : (
        <div className="flex gap-2 items-center justify-between">
          <div className="max-w-min">
            {chart === "pie" ? <Pie {...options} /> : <Doughnut {...options} />}
          </div>
          <article>
            <h1 className="text-2xl">{heading}</h1>

            <Appendix labels={Object.entries(q.data ?? {})} colors={colors} />
          </article>
        </div>
      )}
    </div>
  );
};
