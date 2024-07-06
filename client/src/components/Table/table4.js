import React, { useState } from "react";
import { TiThMenu } from "react-icons/ti";
import { Link } from "react-router-dom";

function Table4({
  tableName,
  tableData,
  columnNames,
  user,
  patientIdButtonClick,
}) {
  const updatedColumnNames = [...columnNames, "Action"];
  const [show, setShow] = useState({});
  const [ID, setID] = useState("");
  const handleClick = (patientId) => {
    setID(patientId);
    setShow((prevState) => ({
      ...prevState,
      [patientId]: !prevState[patientId],
    }));
  };

  return (
    <div className="container my-12 px-6 mx-auto">
      <section className="mb-32 text-center">
        <div className="mx-auto px-3 lg:px-6">
          <h2 className="text-3xl font-bold mb-12">{tableName}</h2>
          <div className="flex flex-col relative">
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
                              patientIdButtonClick(item["patientId"])
                            }
                          >
                            {keys.map((key, i) => (
                              <td
                                key={i}
                                className="px-3 py-4 whitespace-nowrap"
                              >
                                <div className="flex justify-center">
                                  <div className="text-sm text-right font-medium text-gray-900">
                                    {key === "name" ? (
                                      user
                                    ) : key === "Action" ? (
                                      <div className="flex justify-end items-end relative">
                                        {show[item.patientId] && (
                                          <div className="absolute flex flex-col gap-2 top-1 right-3 bg-gray-300 text-black p-2 rounded-lg z-10">
                                            <Link
                                              className="hover:cursor-pointer"
                                              to={`/view-paitient-records/${ID}`}
                                            >
                                              View Report
                                            </Link>
                                          </div>
                                        )}
                                        <div className="flex justify-end items-end cursor-pointer">
                                          <TiThMenu
                                            onClick={() =>
                                              handleClick(item.patientId)
                                            }
                                          />
                                        </div>
                                      </div>
                                    ) : (
                                      item[key]
                                    )}
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
  );
}

export default Table4;
