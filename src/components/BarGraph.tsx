import type { UseQueryResult } from "@tanstack/react-query";
import { BarElement, CategoryScale, Chart, LinearScale } from "chart.js";
import { Bar } from "react-chartjs-2";
import { BaseGraph } from "./BaseGraph";

Chart.register(CategoryScale, LinearScale, BarElement);

const bgColors = [
  "rgba(255, 99, 132, 0.2)",
  "rgba(255, 159, 64, 0.2)",
  "rgba(255, 205, 86, 0.2)",
  "rgba(75, 192, 192, 0.2)",
  "rgba(54, 162, 235, 0.2)",
  "rgba(153, 102, 255, 0.2)",
  "rgba(201, 203, 207, 0.2)",
];

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
        backgroundColor: bgColors,
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <BaseGraph
      qData={q}
      heading="Prices to Purchase"
      appendixColors={bgColors}
      maxW="max-w-none"
    >
      <Bar data={data} />
    </BaseGraph>
  );
};
