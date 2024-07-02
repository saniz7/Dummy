import React, { useState } from "react";
import { Link } from "react-router-dom";
import profileService from "../../services/profileService";
import Modal from "../../container/modal";

function LabTable({
  tableName,
  tableData,
  columnNames,
  user,
  labIdButtonClick,
}) {
  // Add "Action" to the column names
  const updatedColumnNames = [...columnNames, "Action"];
  const [showModal, setShowModal] = useState(false);
  const [labIdToDelete, setLabIdToDelete] = useState(null);

  const deleteLab = async (id) => {
    try {
      const res = await profileService.deleteLabProfile(id);
      console.log("Lab deleted successfully:", res);
      // Refresh the page after successful deletion
      window.location.reload();
    } catch (error) {
      console.error("Error deleting lab:", error);
      // Handle error (e.g., show notification)
    }
  };

  const handleDeleteClick = (id) => {
    setLabIdToDelete(id);
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    if (labIdToDelete) {
      await deleteLab(labIdToDelete);
      setShowModal(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="container my-12 px-6 mx-auto">
        <section className="mb-32 text-center">
          <div className="mx-auto px-3 lg:px-6">
            <h2 className="text-3xl font-bold mb-12">{tableName}</h2>
            {/* Table of Labs */}
            <div className="flex flex-col">
              <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          {updatedColumnNames.map((column, index) => (
                            <th
                              key={index}
                              scope="col"
                              className="px-7 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              {column}
                            </th>
                          ))}
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
                                labIdButtonClick(item.labDataFromLedger.labId)
                              }
                            >
                              {keys.map((key, i) => (
                                <td
                                  key={i}
                                  className="px-3 py-4 whitespace-nowrap"
                                >
                                  <div className="flex">
                                    <div className="ml-4">
                                      <div className="text-sm text-left font-medium text-gray-900">
                                        {key === "Action" ? (
                                          <span
                                            onClick={() =>
                                              handleDeleteClick(
                                                item.user.userId
                                              )
                                            }
                                            style={{ cursor: "pointer" }}
                                          >
                                            Delete Lab
                                          </span>
                                        ) : (
                                          item.labDataFromLedger[key] ||
                                          item.registrationArgs[key] ||
                                          item.user[key]
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </td>
                              ))}
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

      <Modal
        isOpen={showModal}
        title="Confirm Delete"
        message="Are you sure you want to delete this lab?"
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}

export default LabTable;
