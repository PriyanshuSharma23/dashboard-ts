import type { UseQueryResult } from "@tanstack/react-query";
import { ArcElement, Chart } from "chart.js";
import { Doughnut, Pie } from "react-chartjs-2";
import { Appendix } from "./Appendix";
import { LoadingSpinner } from "./LoadingSpinner";

Chart.register(ArcElement);
const colors = ["#FDFDBD", "#C8FFD4", "#B8E8FC", "#B1AFFF"];

export const BaseGraph = ({
  heading,
  children,
  qData,
  appendixColors,
  maxW,
}: {
  qData: UseQueryResult;
  heading: string;
  children: React.ReactNode;
  appendixColors: string[];
  maxW?: string;
}) => {
  //   console.log(qData.data);
  return (
    <div
      className={`min-h-[200px] min-w-[200px] p-5 rounded-lg shadow-lg bg-white ${
        qData.isLoading ? "animate-pulse flex justify-center items-center" : ""
      }`}
    >
      {qData.isLoading ? (
        <LoadingSpinner color={"text-purple-500"} />
      ) : (
        <div className="flex flex-col lg:flex-row gap-2 items-center justify-between">
          <div className={maxW != null ? maxW : "max-w-min"}>{children}</div>
          <article>
            <h1 className="text-2xl text-center">{heading}</h1>

            <Appendix
              labels={Object.entries(qData.data ?? {})}
              colors={appendixColors}
            />
          </article>
        </div>
      )}
    </div>
  );
};
