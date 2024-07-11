import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../../common/loader";
import AutoService from "../../services/AutoServices";
import paitientService from "../../services/patientService";
import Table from "../Table/table";
import authService from "../../services/authService";
import { TiThMenu } from "react-icons/ti";

function HealthRecords(props) {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [postLoading, setPostLoading] = useState(false);
  const [data, setData] = useState([]);

  const [doctorsList, setDoctorsList] = useState([]);

  const { id } = useParams();
  const { category } = useParams();
  const [isEdit, setIsEdit] = useState(id ? true : false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e);
  };

  useEffect(() => {
    const getHealthRecords = async () => {
      let HealthRecords = await paitientService.getHealthRecords();
      console.log(HealthRecords.data.recordsData);
      setData(HealthRecords.data.recordsData);
    };
    getHealthRecords();
    console.log(data);
  }, [id]);
  const userRole = authService.getRole();
  const applyforclaim = async (recordId, patientId) => {
    console.log(recordId, patientId);
    let ClaimStatus = await paitientService.postclaimrequest({
      recordId,
      patientId,
    });
    if (ClaimStatus.success) {
      window.alert(`${ClaimStatus.message.message}`);
      window.location.reload();
    }
  };
  const [dropdownVisible, setDropdownVisible] = useState({});
  const [ID, setID] = useState("");

  const handleClick = (patientId) => {
    setID(patientId);
    setDropdownVisible((prevState) => ({
      ...prevState,
      [patientId]: !prevState[patientId],
    }));
  };
  console.log(ID);
  return (
    <>
      <>
        {data.length === 0 ? (
          <div className="text-lg mt-10 text-center ">No Data Found </div>
        ) : (
          <div className="flex justify-center">
            <div className="flex flex-col">
              <h2 className="font-bold text-lg mb-2 text-center mt-10">
                Record Details
              </h2>
              <div className="flex justify-between">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                      <table className="min-w-full divide-y divide-gray-20">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Patient ID
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Record ID
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Doctor ID
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Diagnosis
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Medicines
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Lab Tests
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Created At
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Department
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              View Lab Record
                            </th>
                          </tr>
                        </thead>
                        {data.map((record, index) => {
                          if (record.department === category) {
                            console.log(record.labTests);
                            let med = JSON.parse(record.medicines);
                            let lab = [];

                            // let lab = JSON.parse(record.labTests);
                            return (
                              <tbody className="bg-white divide-y divide-gray-200">
                                <tr>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {record.patientId}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {record.recordId}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {record.doctorId}
                                  </td>

                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {record.diagnosis}
                                  </td>

                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    <ul className="list-disc list-inside">
                                      {med.map((medicine, index) => (
                                        <li
                                          key={index}
                                          className={
                                            "text-gray-600 text-gray-600"
                                          }
                                        >
                                          {`Name:${medicine.name} - Dose:${medicine.dose}`}
                                        </li>
                                      ))}
                                    </ul>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    <ul className="list-disc list-inside">
                                      {record.labTests &&
                                      typeof record.labTests === "object" &&
                                      record.labTests.length > 0 ? (
                                        record.labTests.map((lab, index) => (
                                          <li
                                            key={index}
                                            className="text-gray-600"
                                          >
                                            {`Name:${lab.name}`}
                                          </li>
                                        ))
                                      ) : // Assuming record.labTests is a JSON string
                                      record.labTests ? (
                                        JSON.parse(record.labTests).map(
                                          (lab, index) => (
                                            <li
                                              key={index}
                                              className="text-gray-600"
                                            >
                                              {`Name:${lab.name}`}
                                            </li>
                                          )
                                        )
                                      ) : (
                                        <li className="text-gray-600">
                                          No lab tests available
                                        </li>
                                      )}
                                    </ul>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {new Date(
                                      record.createdAt
                                    ).toLocaleDateString()}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {record.department}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {/* <Link
                                      to={`/lab-records/${record.recordId}`}
                                    >
                                      <button className="bg-gray-800 text-white p-2 hover:cursor-pointer rounded-full">
                                        View Lab Record
                                      </button>
                                    </Link> */}
                                    {/* <button
                                      onClick={() =>
                                        applyforclaim(
                                          record.recordId,
                                          authService.getId()
                                        )
                                      }
                                      className="w-full text-white bg-green-600 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                    >
                                      Apply for Claim
                                    </button> */}
                                    <div className="flex ">
                                      {dropdownVisible[record.patientId] && (
                                        <div className="absolute flex flex-col gap-2 top-[250px] right-0 bg-white border border-black text-black p-3 rounded-lg z-10">
                                          <Link
                                            to={`/lab-records/${record.recordId}`}
                                          >
                                            <button className="  hover:cursor-pointer rounded-full">
                                              Lab Record
                                            </button>
                                          </Link>
                                          <hr className="bg-black h-[2px]"></hr>
                                          <Link
                                            to={`/pharmacy-records/${record.recordId}`}
                                          >
                                            <button className="  hover:cursor-pointer rounded-full">
                                              Pharmacy Record
                                            </button>
                                          </Link>
                                          <hr className="bg-black h-[2px]"></hr>
                                          <button
                                            onClick={() =>
                                              applyforclaim(
                                                record.recordId,
                                                authService.getId()
                                              )
                                            }
                                            className="w-full text-white bg-green-600 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                          >
                                            Claim
                                          </button>
                                        </div>
                                      )}
                                      <div className="flex justify-end items-end cursor-pointer">
                                        <TiThMenu
                                          onClick={() =>
                                            handleClick(record.patientId)
                                          }
                                        />
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            );
                          }
                        })}
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    </>
  );
}

export default HealthRecords;
