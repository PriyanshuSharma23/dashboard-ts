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
import { BarGraph } from "./components/BarGraph";
import { DoughnutChart } from "./components/Doughnut";
import { PieChart } from "./components/Pie";

enum Tabs {
  Sales,
  Employee,
}

export const Dashboard = () => {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState(Tabs.Sales);

  if (user === null) {
    return null;
  }

  return (
    <div className="flex">
      <aside
        className="md:w-1/5 min-w-[250px] 
        shadow-inner
        bg-sky-500
        h-screen text-white p-4
        relative overflow-hidden
        "
        // bg-gradient-to-r from-purple-500 to-blue-500
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
        <div className="absolute bottom-0 left-0 px-2 py-4 bg-blue-500 w-full">
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
      {activeTab == Tabs.Sales ? <SalesTab /> : <div>Employee Tab</div>}
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
             transition rounded-lg hover:shadow-md 
            ${active ? " bg-blue-500/90 " : ""}`}
    onClick={onClick}
  >
    <span className="text-3xl font-semibold">{icon}</span> <span> {name}</span>
  </button>
);

const SalesTab = () => {
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
  const { signOut } = useUser();

  return (
    <main
      className="px-10 py-4 
      flex-grow min-w-[500px] h-screen overflow-scroll bg-blue-100"
      // bg-gradient-to-br from-blue-100 to-purple-500 via-blue-400
    >
      <div className="flex justify-between shadow-md p-2 bg-white rounded-lg">
        <div className="prose w-max">
          <h1 className="bg-gradient-to-t  from-black to-slate-600 bg-clip-text text-transparent">
            Dashboard
          </h1>
        </div>

        {/* sign out button */}
        <button
          className="bg-red-600 px-4 py-2 rounded-lg text-white hover:brightness-105"
          onClick={signOut}
        >
          Sign out
        </button>
      </div>
      <div className="grid  xl:grid-cols-2 gap-4 mt-4">
        <PieChart q={productTypeDataQueryResult} heading="Product Types" />
        <DoughnutChart q={modesDataQueryResult} heading="Modes" />
        <div className="xl:col-span-2">
          <BarGraph q={salesMetricsQueryResult} heading="Sales Metrics" />
        </div>
      </div>
    </main>
  );
};
