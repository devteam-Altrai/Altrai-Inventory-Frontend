import axios from "axios";
import { useEffect, useState } from "react";
import { baseURL, filesApp, fetchProject } from "../../../utils/Appurls";
import { useNavigate } from "react-router-dom";
import { EllipsisVertical } from "lucide-react";

const ProjectTable = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [selectedSkus, setSelectedSkus] = useState([]);

  const fetchTableData = async (signal) => {
    try {
      const response = await fetch(`${baseURL}${filesApp}${fetchProject}`, {
        method: "GET",
        headers: { Accept: "application/json" },
        signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const json = await response.json();
      setData(json.data ?? []);
    } catch (err) {
      if (err.name !== "AbortError") {
        console.error("Failed to fetch projects:", err);
      }
    }
  };

  const handleRowSelect = (sku) => {
    setSelectedSkus((prev) =>
      prev.includes(sku) ? prev.filter((id) => id !== sku) : [...prev, sku]
    );
  };

  const handleSelectAll = (checked) => {
    setSelectedSkus(checked ? data.map((row) => row.id) : []);
  };

  useEffect(() => {
    const controller = new AbortController();
    fetchTableData(controller.signal);
    return () => controller.abort();
  }, []);
  return (
    <div className="w-full h-full flex flex-col pl-4 pr-2 pb-2 gap-2">
      <div className="flex flex-row">
        <button className="bg-black text-white px-3 py-1.5 rounded-lg hover:bg-white hover:text-black border border-black">
          ADD PROJECT
        </button>
      </div>

      <div className="overflow-auto h-[70vh]">
        <div className="overflow-y-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-4">
          {data.map((item) => (
            <div
              key={item.id}
              className="relative rounded-2xl hover:shadow-lg transition-all flex cursor-pointer flex-col bg-[#fe8269] pt-0.5 pr-0.5 pl-0.5"
              onDoubleClick={() =>
                navigate(`/projects/${item.id}`, {
                  state: {
                    item_id: item.id,
                    item_name: item.product_id,
                  },
                })
              }
            >
              <div className="flex-1 w-full h-full bg-white rounded-2xl flex flex-col justify-between p-3">
                <div className="flex flex-row justify-between">
                  <p className="text-xl font-medium">{item.sku_id}</p>

                  <input
                    type="checkbox"
                    checked={selectedSkus.includes(item.id)}
                    onChange={() => handleRowSelect(item.id)}
                    className="w-4 h-4"
                  />
                </div>

                <p className="text-2xl text-black font-bold">
                  {item.product_id}
                </p>
                <p className="text-sm text-black text-justify">
                  {item.description}
                </p>
              </div>

              <div className="py-1 px-2 text-sm flex justify-center text-white">
                <p>Double Click for more details</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectTable;
