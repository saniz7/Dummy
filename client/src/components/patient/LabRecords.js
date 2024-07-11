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
      console.log(LabRecords?.data?.recordsData);
      setData(LabRecords?.data?.recordsData);
    };
    getLabRecords();
  }, [id]);

  return (
    <>
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
                      <th>Record ID</th>
                      <th>Doctor Name</th>
                      <th>Lab Tests</th>
                      <th>Params</th>
                      <th>Lab Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {data.map((value, index) => {
                      let lab = [];
                      let labb = [];
                      if (value?.labTests) {
                        lab = JSON.parse(value.labTests);
                        labb = JSON.parse(lab);
                      }
                      if (id === value.recordId) {
                        return (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {value?.recordId}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {value?.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {labb[0]?.name ? labb[0]?.name : "No Lab Tests"}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {labb[0]?.labReport?.report
                                ? labb[0]?.labReport?.report
                                : "No Lab Tests"}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {value.labBill}
                            </td>
                          </tr>
                        );
                      }
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LabRecords;
