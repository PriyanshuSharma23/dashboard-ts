import type { UseQueryResult } from "@tanstack/react-query";
import { ArcElement, Chart } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { graphBgColors } from "../constants";

import { BaseGraph } from "./BaseGraph";

Chart.register(ArcElement);
const colors = graphBgColors;

export const DoughnutChart = ({
  q,
  heading,
}: {
  q: UseQueryResult;
  heading: string;
}) => {
  const options = {
    data: {
      labels: Object.keys(q.data ?? {}),

      datasets: [
        {
          label: heading,
          data: Object.values(q.data ?? {}),
          backgroundColor: colors,
        },
      ],
    },
  };

  return (
    // <div
    //   className={`min-h-[200px] min-w-[200px] p-5 rounded-lg shadow-lg bg-white ${
    //     q.isLoading ? "animate-pulse flex justify-center items-center" : ""
    //   }`}
    // >
    //   {q.isLoading ? (
    //     <LoadingSpinner color={"text-purple-500"} />
    //   ) : (
    //     <div className="flex gap-2 items-center justify-between">
    //       <div className="max-w-min">

    //       </div>
    //       <article>
    //         <h1 className="text-2xl">{heading}</h1>

    //         <Appendix labels={Object.entries(q.data ?? {})} colors={colors} />
    //       </article>
    //     </div>
    <BaseGraph appendixColors={colors} heading={heading} qData={q}>
      <Doughnut {...options} />
    </BaseGraph>
  );
};
