import React from "react";

const BomPage = () => {
  return (
    <div className="w-full h-full flex flex-col gap-4 mt-1">
      <div className="w-full h-18 flex flex-row justify-between items-center pl-6 pr-6 bg-amber-200">
        <div className="flex flex-col justify-center">
          <h1 className="text-2xl font-medium headercolor">BOM TABLE</h1>
          <p className="text-sm bodycolor">List of all the items available.</p>
        </div>
      </div>
      {/*Here goes the body of the main component*/}
    </div>
  );
};

export default BomPage;
