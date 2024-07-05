import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../common/loader";
import paitientService from "../../services/patientService";
import Table from "../Table/table";

function LabRecords(props) {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [postLoading, setPostLoading] = useState(false);
  const [data, setData] = useState([]);
  const { id } = useParams();
  const [isEdit, setIsEdit] = useState(id ? true : false);

  useEffect(() => {
    const getLabRecords = async () => {
      let LabRecords = await paitientService.getLabRecords();
      console.log(LabRecords.data.recordsData);
      setData(LabRecords.data.recordsData);
    };
    getLabRecords();
  }, [id]);

  // Filter records that are objects
  const filteredData = data.filter((record) => typeof record === "object");
  return (
    <>
      {filteredData.length === 0 ? (
        <div className="text-lg">No Records Found</div>
      ) : (
        <div className="flex justify-center">
          <div className="flex flex-col">
            <h2 className="font-bold text-lg mb-2 text-center mt-10">
              Lab Record Details
            </h2>
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200 mt-8">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Lab Tests</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredData.map((record, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {record[0].name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <ul className="list-disc list-inside">
                              {record[0].labReport.report}
                            </ul>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default LabRecords;
