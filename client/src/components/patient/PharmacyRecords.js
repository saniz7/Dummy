import React, { useEffect, useState } from "react";
import Loader from "../../common/loader";
import patientService from "../../services/patientService";
import { useParams } from "react-router-dom";

function PharmacyRecords(props) {
  const [loader, setLoader] = useState(true);
  const [data, setData] = useState([]);
  const { id } = useParams();
  const recordId = parseInt(id, 10);
  console.log(recordId);
  useEffect(() => {
    const getPatientDetails = async () => {
      let res = await patientService.getPharmacyRecords();
      console.log(res.data);
      setData(res.data.recordsData);
      setLoader(false);
    };

    getPatientDetails();
  }, []);

  return (
    <>
      {loader ? (
        <div className="mt-10">
          <Loader />
        </div>
      ) : (
        <>
          {data.length === 1 ? (
            <div className="text-lg text-center text-[#023047]">
              No Data Available
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="flex flex-col">
                <h2 className="font-bold text-lg mb-2 text-center mt-10 text-[#023047]">
                  Record Details
                </h2>
                <div className="flex w-full justify-between font-semibold text-[#023047]">
                  <span>Record ID : {data[0]?.recordId}</span>
                  <span>Doctor ID : {data[0]?.doctorId}</span>
                </div>
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                      <table className="min-w-full divide-y divide-gray-200 mt-8">
                        <thead>
                          <tr>
                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-[#023047] uppercase tracking-wider">
                              Medicines
                            </th>
                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-[#023047] uppercase tracking-wider">
                              Medicine Dose
                            </th>
                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-[#023047] uppercase tracking-wider">
                              Medicine Dispensed
                            </th>
                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-[#023047] uppercase tracking-wider">
                              Medicine Comments
                            </th>
                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-[#023047] uppercase tracking-wider">
                              Medicine Bill
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {data.map((record, index) => {
                            console.log(id);
                            if (recordId === record.recordId) {
                              const med = JSON.parse(record.medicines).slice(1);
                              // const medbill = JSON.parse(bill);

                              return med.map((value, index) => (
                                <tr key={index}>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {value.name}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {value.dose}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {value.dispensed}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {value.comment}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {/* {bill[0].total} */}
                                  </td>
                                </tr>
                              ));
                            }
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default PharmacyRecords;
