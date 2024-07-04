// PatientDetails.js

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../common/loader";
import patientService from "../../services/patientService";

function PatientDetails() {
  const { patientId } = useParams();
  console.log(patientId);
  const [loader, setLoader] = useState(true);
  const [prescriptions, setPrescriptions] = useState([]);

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
  }, [patientId]);

  console.log(prescriptions);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Patient Details</h2>

      {loader ? (
        <Loader />
      ) : prescriptions.length > 0 ? (
        <div className="overflow-hidden border border-gray-200 rounded-lg mb-8">
          <div className="px-4 py-5 sm:px-6">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
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
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {prescriptions.map((prescription, index) => (
                  <React.Fragment key={index}>
                    {prescription.medicalRecords.map((record, idx) => {
                      console.log(record.medicines);
                      let med;
                      let medd;
                      let meddd;
                      let lab;
                      let labb;
                      let labbb;
                      med = JSON.parse(record.medicines);
                      medd = JSON.parse(med);
                      meddd = JSON.parse(medd);
                      lab = JSON.parse(record.labTests);
                      labb = JSON.parse(lab);
                      labbb = JSON.parse(labb);
                      return (
                        <tr key={`${index}-${idx}`}>
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
                              ))}{" "}
                            </ul>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            <ul className="divide-y divide-gray-200">
                              {labbb.map((medicine, index) => (
                                <li key={index}>{`Name: ${medicine.name}`}</li>
                              ))}{" "}
                            </ul>
                          </td>
                          {/* Add code for rendering lab tests if needed */}
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {new Date(record.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      );
                    })}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <p>No prescriptions found for this patient.</p>
      )}
    </div>
  );
}

export default PatientDetails;
