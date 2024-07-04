import React, { useState } from "react";
import { Link } from "react-router-dom";
import profileService from "../../services/profileService";
import Modal from "../../container/modal";

function DoctorTable({
  tableName,
  tableData,
  columnNames,
  user,
  patientIdButtonClick,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);

  const updatedColumnNames = [...columnNames, "Action"];

  const handleDeleteClick = (id) => {
    setSelectedDoctorId(id);
    setIsModalOpen(true);
  };

  const deleteDoctor = async () => {
    try {
      const res = await profileService.deleteProfile(selectedDoctorId);
      console.log("Doctor deleted successfully:", res);
      window.location.reload();
    } catch (error) {
      console.error("Error deleting doctor:", error);
      // Handle error (e.g., show notification)
    } finally {
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        title="Confirm Delete"
        message="Are you sure you want to delete this doctor?"
        onClose={() => setIsModalOpen(false)}
        onConfirm={deleteDoctor}
      />
      <div className="container my-12 px-6 mx-auto">
        <section className="mb-32 text-center">
          <div className="mx-auto px-3 lg:px-6">
            <h2 className="text-3xl font-bold mb-12">{tableName}</h2>
            <div className="flex flex-col">
              <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          {updatedColumnNames.map((column, index) => {
                            return (
                              <th
                                key={index}
                                scope="col"
                                className="px-7 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                {column}
                              </th>
                            );
                          })}
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {tableData.map((item, index) => {
                          const keys = [...columnNames, "Action"];
                          return (
                            <tr
                              className="button-cursor"
                              key={index}
                              onClick={() =>
                                patientIdButtonClick(item["patientId"])
                              }
                            >
                              {keys.map((key, i) => {
                                return (
                                  <td
                                    key={i}
                                    className="px-3 py-4 whitespace-nowrap"
                                  >
                                    <div className="flex">
                                      <div className="ml-4">
                                        <div className="text-sm text-left font-medium text-gray-900">
                                          {key === "Action" ? (
                                            <span
                                              onClick={(e) => {
                                                e.stopPropagation(); // Prevent triggering the row click
                                                handleDeleteClick(
                                                  item.user.userId
                                                );
                                              }}
                                            >
                                              Delete Doctor
                                            </span>
                                          ) : (
                                            item.doctorDataFromLedger[key]
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </td>
                                );
                              })}
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default DoctorTable;
