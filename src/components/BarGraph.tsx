import type { UseQueryResult } from "@tanstack/react-query";
import {
  BarElement,
  CategoryScale,
  Chart,
  LinearScale,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { BaseGraph } from "./BaseGraph";
import { graphBgColors } from "../constants";

Chart.register(CategoryScale, LinearScale, BarElement, Tooltip);

export const BarGraph = ({
  q,
  heading,
}: {
  q: UseQueryResult;
  heading: string;
}) => {
  const data = {
    labels: Object.keys(q.data ?? {}),
    datasets: [
      {
        label: heading,
        data: Object.values(q.data ?? {}),
        backgroundColor: graphBgColors,
      },
    ],
  };

  return (
    <BaseGraph
      qData={q}
      heading={heading}
      appendixColors={graphBgColors}
      maxW="lg:min-w-[700px]"
    >
      <Bar
        data={data}
        options={{
          responsive: true,
          hover: {},
        }}
      />
    </BaseGraph>
  );
};
