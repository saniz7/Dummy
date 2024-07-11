import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../common/loader";
import patientService from "../../services/patientService";
import AddReports from "./AddReports";
import GenerateBill from "../chemist/GenerateBill";
import authService from "../../services/authService";
import ClaimRequest from "../Insurance/ClaimRequest";

function Paitients() {
  const { id } = useParams();

  const [loader, setLoader] = useState(true);
  const [prescriptions, setPrescriptions] = useState([]);
  const [showPopover, setShowPopover] = useState(false);
  const [popoverData, setPopoverData] = useState({});

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const res = await patientService.getPatientAccessList();
        console.log(res.data);
        if (res.data.success) {
          setPrescriptions(res.data.accessMemberDetails);
          setLoader(false);
        } else {
          console.error(
            "Failed to fetch patient details:",
            res.data.message.prescriptions
          );
        }
      } catch (error) {
        console.error("Error fetching patient details:", error);
      }
    };

    fetchPatientDetails();
  }, [id]);

  const handleAddReportClick = (record) => {
    setPopoverData(record);
    setShowPopover(true);
  };

  const closePopover = () => {
    setShowPopover(false);
    setPopoverData({});
  };

  const userRole = authService.getRole();
  console.log(userRole);
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4 text-[#023047]">
        Patient Details
      </h2>

      {loader ? (
        <Loader />
      ) : prescriptions.length > 0 ? (
        <div className="overflow-hidden border border-gray-200 rounded-lg mb-8">
          <div className="">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-[#005f73]">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Patient ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Record ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Doctor ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Diagnosis
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Medicines
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Lab Tests
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Created At
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {prescriptions.map((prescription, index) => {
                  console.log(prescription.patientId);
                  if (prescription.patientId === id) {
                    return (
                      <React.Fragment key={index}>
                        {prescription.medicalRecords.map((record, idx) => {
                          const meddd = JSON.parse(
                            JSON.parse(JSON.parse(record.medicines))
                          );
                          const labbb = JSON.parse(
                            JSON.parse(JSON.parse(record.labTests))
                          );

                          return (
                            <tr key={`${index}-${idx}`}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {record.patientId}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {record.recordId}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {record.doctorId}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {record.diagnosis}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                <ul className="divide-y divide-gray-200">
                                  {meddd.map((medicine, index) => (
                                    <li key={index}>
                                      {`Name: ${medicine.name}, Dose: ${medicine.dose}`}
                                    </li>
                                  ))}
                                </ul>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                <ul className="divide-y divide-gray-200">
                                  {labbb.map((medicine, index) => (
                                    <li key={index}>
                                      {`Name: ${medicine.name}`}
                                    </li>
                                  ))}
                                </ul>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {new Date(
                                  record.createdAt
                                ).toLocaleDateString()}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                <button
                                  className="hover:cursor-pointer bg-[#0a9396] text-white rounded-lg p-2"
                                  onClick={() => handleAddReportClick(record)}
                                >
                                  Add Report
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </React.Fragment>
                    );
                  }
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <p>No prescriptions found for this patient.</p>
      )}

      {showPopover && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white relative rounded-lg shadow-lg w-[500px]">
            <button
              className="absolute -top-8 -right-3 m-4 text-white text-6xl"
              onClick={closePopover}
            >
              &times;
            </button>
            {userRole === "lab" ? (
              <AddReports
                patientId={popoverData.patientId}
                recordId={popoverData.recordId}
                labTests={JSON.parse(
                  JSON.parse(JSON.parse(popoverData.labTests))
                )}
                closePopover={closePopover}
              />
            ) : userRole === "insurance" ? (
              <ClaimRequest
                patientId={popoverData.patientId}
                recordId={popoverData.recordId}
                labTests={JSON.parse(
                  JSON.parse(JSON.parse(popoverData.labTests))
                )}
                closePopover={closePopover}
              />
            ) : (
              <GenerateBill
                patientId={popoverData.patientId}
                recordId={popoverData.recordId}
                labTests={JSON.parse(
                  JSON.parse(JSON.parse(popoverData.labTests))
                )}
                closePopover={closePopover}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Paitients;
