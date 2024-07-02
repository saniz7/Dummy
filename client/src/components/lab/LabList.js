import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../../common/loader";
import profileService from "../../services/profileService";
import authService from "../../services/authService";
import LabTable from "../Table/LabTable";
import DoctorTable from "../Table/DoctorTable";

function LabList(props) {
  const [loader, setLoader] = useState(true);
  const [data, setData] = useState([]);
  const [user, setUser] = useState([]);
  const [columnNames, setColumnNames] = useState([]);
  const [currentId, setCurrentId] = useState(0);

  useEffect(() => {
    const getLabList = async () => {
      const res = await profileService.getLabList();
      console.log(res.data);
      setUser(res.data.labs.user);
      if (res.data.success) {
        setData(res.data.labs);
        setLoader(false);
      }
    };

    const updateColumnNames = () => {
      const keys = Object.keys(dummyRecordData[0]);
      console.log("keys: ", keys);
      setColumnNames(keys);
    };

    getLabList();
    updateColumnNames();
  }, []);

  const labIdButtonClick = (id) => {
    console.log("labIdButtonClick: ", id);
    setCurrentId(id);
  };

  const dummyRecordData = [
    {
      labId: "12345",
      name: "Lab1",
      contact: "9876543210",
      address: "123 Lab Street",
      orgName: "Lab Organization",
      createdAt: "2024-07-01T05:51:08.726Z",
      // Add other fields here as per your schema
    },
  ];

  let topbutton;
  console.log(authService.getRole());
  if (authService.getRole() === "doctor") {
    topbutton = (
      <div className="flex items-center justify-center mt-10 font-bold text-3xl">
        Doctor's Dashboard
        <Link to="/add-patient-records">
          <button
            type="submit"
            className="mt-8 ml-60 mb-0 bg-indigo-600 text-white hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-semibold rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Add Records
          </button>
        </Link>
      </div>
    );
  } else if (authService.getRole() === "lab") {
    topbutton = (
      <div className="flex items-center justify-center mt-10 font-bold text-3xl">
        Lab Dashboard
        <Link to="/add-reports">
          <button
            type="submit"
            className="mt-8 ml-60 mb-0 bg-indigo-600 text-white hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-semibold rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Add Report
          </button>
        </Link>
      </div>
    );
  } else if (authService.getRole() === "pharmacy") {
    topbutton = (
      <>
        <Link to="/generate-bill">
          <button
            type="submit"
            className="mt-8 ml-60 mb-0 bg-indigo-600 text-white hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-semibold rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Generate Bill
          </button>
        </Link>
      </>
    );
  } else if (authService.getRole() === "insurance") {
    topbutton = (
      <>
        <Link to="/latest-requests">
          <button
            type="submit"
            className="mt-8 ml-60 mb-0 bg-indigo-600 text-white hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-semibold rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Claim Request
          </button>
        </Link>
      </>
    );
  }

  return (
    <>
      {loader ? (
        <div className="mt-10">
          {/* <Loader /> */}
          No data found
        </div>
      ) : (
        <>
          {data.length === 0 ? (
            <p>No Data to Show</p>
          ) : (
            <>
              {topbutton}

              <LabTable
                tableName="Labs List"
                user={user}
                tableData={data}
                columnNames={columnNames}
                labIdButtonClick={labIdButtonClick}
              />

              {authService.getRole() === "lab" && (
                <div className="flex justify-between">
                  {data.map((record, index) => (
                    <div key={index}>
                      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200 mt-8">
                              <tbody className="bg-white divide-y divide-gray-200">
                                <tr>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    Lab ID
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {record.labDataFromLedger.labId}
                                  </td>
                                </tr>
                                <tr>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    Name
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {record.labDataFromLedger.name}
                                  </td>
                                </tr>
                                <tr>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    Contact
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {record.labDataFromLedger.contact}
                                  </td>
                                </tr>
                                <tr>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    Address
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {record.labDataFromLedger.address}
                                  </td>
                                </tr>
                                <tr>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    Organization Name
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {record.registrationArgs.orgName}
                                  </td>
                                </tr>
                                <tr>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    Created At
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {new Date(
                                      record.labDataFromLedger.createdAt
                                    ).toLocaleString()}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </>
      )}
    </>
  );
}

export default LabList;
