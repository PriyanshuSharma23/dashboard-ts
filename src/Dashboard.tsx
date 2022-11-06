import { useUser } from "./contexts/UserContext";
import profileImage from "./assets/profile.svg";
import { employee, logo, sales } from "./assets/svg-assets";
import { useState } from "react";

import {
  modesData,
  productTypesData,
  salesMetrics,
} from "./firebase/firebase-utils";
import { useQuery } from "@tanstack/react-query";
import { DoughnutPie } from "./components/DoughnutPie";
import { BarGraph } from "./components/BarGraph";
import { DoughnutChart } from "./components/Doughnut";

enum Tabs {
  Sales,
  Employee,
}

export const Dashboard = () => {
  const { user, signOut } = useUser();
  const [activeTab, setActiveTab] = useState(Tabs.Sales);

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

  if (user === null) {
    return null;
  }

  return (
    <div className="flex">
      <aside
        className="md:w-1/5 min-w-[250px] 
        bg-gradient-to-r from-purple-500 to-blue-500
      h-screen text-white p-4
      relative overflow-hidden
      "
      >
        <h1 className="text-white">{logo}</h1>
        <div className="flex flex-col mt-16 items-stretch gap-6">
          <TabButton
            icon={sales}
            name={"Sales"}
            active={activeTab == Tabs.Sales}
            onClick={() => setActiveTab(Tabs.Sales)}
          />
          <TabButton
            icon={employee}
            name={"Employees"}
            active={activeTab == Tabs.Employee}
            onClick={() => setActiveTab(Tabs.Employee)}
          />
        </div>
        <div className="absolute bottom-0 left-0 px-2 py-4 bg-indigo-600 w-full">
          <div className="flex items-center gap-4 w-max">
            <img
              src={profileImage}
              alt="user's profile image"
              className="w-12 h-12 rounded-full bg-white"
            />
            <span>
              <h3 className="text-3xl">
                {user.displayName?.split(" ")[0] ?? "User"}
              </h3>
            </span>
          </div>
        </div>
      </aside>
      <main className="px-10 py-4 bg-indigo-400 flex-grow min-w-[500px] h-screen overflow-scroll">
        <div className="flex justify-between">
          <div className="prose w-max">
            <h1 className="bg-gradient-to-t  from-black/70 to-gray-800 bg-clip-text text-transparent">
              Dashboard
            </h1>
          </div>

          {/* sign out button */}
          <button
            className="bg-red-600 px-4 py-2 rounded-2xl text-white hover:brightness-105"
            onClick={signOut}
          >
            Sign out
          </button>
        </div>
        <div className="grid  lg:grid-cols-2 gap-4 mt-4">
          <DoughnutPie
            q={productTypeDataQueryResult}
            chart="pie"
            heading="Product Types"
          />
          <DoughnutChart q={modesDataQueryResult} heading="Modes" />
          <div className="lg:col-span-2">
            <BarGraph q={salesMetricsQueryResult} heading="Sales Metrics" />
          </div>
        </div>
      </main>
    </div>
  );
};

const TabButton = ({
  icon,
  name,
  active = false,
  onClick,
}: {
  icon: JSX.Element;
  name: string;
  active?: boolean;
  onClick: () => void;
}) => (
  <button
    className={`flex items-center gap-4 text-2xl px-5 py-2
             transition rounded-lg hover:shadow-md shadow-inner
            ${active ? "shadow-md bg-indigo-500/75 " : ""}`}
    onClick={onClick}
  >
    <span className="text-3xl font-semibold">{icon}</span> <span> {name}</span>
  </button>
);
