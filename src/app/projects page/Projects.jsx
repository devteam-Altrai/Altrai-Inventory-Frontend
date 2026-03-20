import React from "react";
import ProjectTable from "./components/ProjectTable";

const Projects = () => {
  return (
    <div className="w-full h-full flex flex-col gap-2 mt-1">
      <div className="w-full h-18 flex flex-row justify-between items-center pl-6 pr-6 ">
        <div className="flex flex-col justify-center">
          <h1 className="text-2xl font-medium headercolor">PROJECTS</h1>
          <p className="text-sm bodycolor ">
            All the project details are here.
          </p>
        </div>
        <button></button>
      </div>
      <div className="flex-col w-full h-full flex-1 overflow-x-auto">
        <ProjectTable />
      </div>
    </div>
  );
};

export default Projects;
