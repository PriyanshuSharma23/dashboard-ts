import { Pie } from "react-chartjs-2";
import { productTypesData } from "../firebase/firebase-utils";

import { Chart, ArcElement } from "chart.js";
import { useQuery } from "@tanstack/react-query";
import { Appendix } from "./Appendix";
Chart.register(ArcElement);

const colors = ["#FDFDBD", "#C8FFD4", "#B8E8FC", "#B1AFFF"];

export const PieChart = () => {
  const { isLoading, data } = useQuery({
    queryKey: ["productTypeData"],
    queryFn: () => {
      return productTypesData();
    },
  });

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        // display a pie chart here
        <div className="flex gap-2 items-center">
          <div className="max-w-min">
            <Pie
              data={{
                labels: Object.keys(data ?? {}),

                datasets: [
                  {
                    label: "Product Types",
                    data: Object.values(data ?? {}),
                    backgroundColor: [
                      "#FDFDBD",
                      "#C8FFD4",
                      "#B8E8FC",
                      "#B1AFFF",
                    ],

                    // display labels
                  },
                ],
              }}
            />
          </div>
          <article>
            <h1 className="text-2xl">Product Types</h1>

            <Appendix labels={Object.keys(data ?? {})} colors={colors} />
          </article>
        </div>
      )}
    </div>
  );
};
