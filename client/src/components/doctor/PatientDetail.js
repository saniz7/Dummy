import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../common/loader";
import patientService from "../../services/patientService";

function PatientDetails() {
  const { patientId } = useParams();
  const { category } = useParams();
  console.log(category);
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
        <div className="overflow-x-auto border border-gray-200 rounded-lg mb-8">
          <div className="px-4 py-5 sm:px-6">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider min-w-0">
                    Patient ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider min-w-0">
                    Record ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider min-w-0">
                    Doctor ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider min-w-0">
                    Doctor Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider min-w-0">
                    Weight
                  </th>
                  <th className="px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider min-w-0">
                    Height
                  </th>
                  <th className="px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider min-w-0">
                    Temperature
                  </th>
                  <th className="px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider min-w-0">
                    Blood Pressure
                  </th>

                  <th className="px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider min-w-0">
                    Diagnosis
                  </th>
                  <th className="px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider min-w-0">
                    Medicines
                  </th>
                  <th className="px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider min-w-0">
                    Lab Tests
                  </th>
                  <th className="px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider min-w-0">
                    Created At
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {prescriptions.map((prescription, index) => (
                  <React.Fragment key={index}>
                    {prescription.medicalRecords.map((record, idx) => {
                      if (
                        record.department === category &&
                        record.patientId === patientId
                      ) {
                        console.log(record.labTests);
                        const meddd = JSON.parse(
                          JSON.parse(JSON.parse(record.medicines))
                        );
                        const labbb = JSON.parse(
                          JSON.parse(JSON.parse(record.labTests))
                        );

                        return (
                          <tr key={`${index}-${idx}`}>
                            <td className="px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                              {record.patientId}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                              {record.recordId}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                              {record.doctorId}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                              {record.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                              {record.weight} kg
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                              {record.height} cm
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                              {record.temp}&deg;C
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                              {record.bp} hg
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                              {record.diagnosis}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                              <ul className="divide-y divide-gray-200">
                                {meddd.map((medicine, index) => (
                                  <li key={index}>
                                    {`Name: ${medicine.name}, Dose: ${medicine.dose}`}
                                  </li>
                                ))}
                              </ul>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                              <ul className="divide-y divide-gray-200">
                                {labbb.map((medicine, index) => (
                                  <li
                                    key={index}
                                  >{`Name: ${medicine.name}`}</li>
                                ))}
                              </ul>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                              {new Date(record.createdAt).toLocaleDateString()}
                            </td>
                          </tr>
                        );
                      } else {
                        return null; // If record.department does not match category, return null or handle as needed
                      }
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
