import type { UseQueryResult } from "@tanstack/react-query";
import { ArcElement, Chart } from "chart.js";
import { Pie } from "react-chartjs-2";
import { BaseGraph } from "./BaseGraph";
import { graphBgColors } from "../constants";

Chart.register(ArcElement);
const colors = graphBgColors;

export const PieChart = ({
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
    <BaseGraph appendixColors={colors} heading={heading} qData={q}>
      <Pie {...options} />
    </BaseGraph>
  );
};
