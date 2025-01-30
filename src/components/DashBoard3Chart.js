import React from "react";
import BarChart from "./reUsableCmponent/barChart";

const DashBoard3Chart = () => {
  return (
    <>
      <div className="mt-4">
        {/* Your content for the first column */}
        <div className="bg-white   rounded-lg">
          <div className="flex flex-col items-center   p-6 w-full max-w-2xl mx-auto">
            <BarChart />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashBoard3Chart;
