import { useEffect, useState } from "react";
import { baseURL, filesApp, fetchVersion } from "../../../utils/Appurls";
import { useLocation, useNavigate } from "react-router-dom";

const ProjectDetails = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const item_id = state.item_id || "";
  const item_name = state.item_name || "";
  const [data, setData] = useState([]);
  const [selectedSkus, setSelectedSkus] = useState([]);

  const fetchTableData = async (signal) => {
    try {
      const response = await fetch(
        `${baseURL}${filesApp}${fetchVersion}${item_id}/`,
        {
          method: "GET",
          headers: { Accept: "application/json" },
          signal,
        }
      );

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
    <div className="w-full h-full flex flex-col gap-2 mt-1">
      <div className="w-full h-18 flex flex-row justify-between items-center pl-6 pr-6 ">
        <div className="flex flex-col justify-center">
          <h1 className="text-2xl font-medium headercolor">{item_name}</h1>
          <p className="text-sm bodycolor ">
            All version details of the project are listed here.
          </p>
        </div>
      </div>
      <div className="flex-col w-full h-full flex-1 overflow-x-auto">
        <div className="w-full h-full flex flex-col pl-4 pr-2 pb-2 gap-2">
          <div className="flex flex-row  ">
            <button className="bg-black text-white px-3 py-1.5 rounded-lg hover:bg-white hover:text-black border border-black">
              ADD VERSION
            </button>
          </div>
          <div className="overflow-auto h-[70vh] ">
            <table className="min-w-[2400px] border-collapse text-center">
              <thead className="sticky top-0 bg-gray-100">
                <tr>
                  <th
                    className="px-4 py-4 border-r border-black/7"
                    style={{ width: "50px" }}
                  >
                    <input
                      type="checkbox"
                      checked={
                        data.length > 0 && selectedSkus.length === data.length
                      }
                      onChange={(e) => handleSelectAll(e.target.checked)}
                      className="w-4.5 h-4.5"
                    />
                  </th>
                  <th
                    className="px-6 py-4 text-[17px] font-semibold uppercase border-r border-black/7"
                    style={{ width: "130px" }}
                  >
                    PART NO.
                  </th>
                  <th
                    className="px-6 py-4 text-[17px] font-semibold uppercase border-r border-black/7"
                    style={{ width: "130px" }}
                  >
                    PART TYPE
                  </th>
                  <th
                    className="px-6 py-4 text-[17px] font-semibold uppercase border-r border-black/7"
                    style={{ width: "70px" }}
                  >
                    QUANTITY
                  </th>
                  <th
                    className="px-6 py-4 text-[17px] font-semibold uppercase border-r border-black/7"
                    style={{ width: "150px" }}
                  >
                    USE CAT
                  </th>
                  <th
                    className="px-6 py-4 text-[17px] font-semibold uppercase border-r border-black/7"
                    style={{ width: "140px" }}
                  >
                    STATUS
                  </th>
                  <th
                    className="px-6 py-4 text-[17px] font-semibold uppercase border-r border-black/7"
                    style={{ width: "100px" }}
                  >
                    LOCATION
                  </th>
                  <th
                    className="px-6 py-4 text-[17px] font-semibold uppercase border-r border-black/7"
                    style={{ width: "250px" }}
                  >
                    DESCRIPTION
                  </th>
                  <th
                    className="px-6 py-4 text-[17px] font-semibold uppercase border-r border-black/7"
                    style={{ width: "250px" }}
                  >
                    REMARKS
                  </th>
                </tr>
              </thead>

              <tbody>
                {data.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50 border-b border-black/10"
                    onAuxClick={() => {
                      const encodedID = btoa(item.id);
                      navigate(`/projects/${encodedID}`);
                    }}
                  >
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedSkus.includes(item.id)}
                        onChange={() => handleRowSelect(item.id)}
                        className="w-4 h-4"
                      />
                    </td>
                    <td className="px-3 py-5 text-black">{item.part_no}</td>
                    <td className="px-3 py-5 text-black">{item.part_type}</td>
                    <td className="px-3 py-5 text-black">{item.quantity}</td>
                    <td className="px-3 py-5 text-black">
                      {item.use_category}
                    </td>
                    <td className="px-3 py-5 text-black">{item.part_status}</td>
                    <td className="px-3 py-5 text-black">{item.location}</td>
                    <td className="px-3 py-5 text-black">{item.remark}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* <div className="mt-4 text-sm">
        <strong>Selected SKUs:</strong> {selectedSkus.join(", ")}
      </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
