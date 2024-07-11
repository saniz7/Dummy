import React, { useState } from "react";
import Input from "../../common/input";
import Loader from "../../common/loader";
import patientService from "../../services/patientService";

function GenerateBill({ patientId, recordId }) {
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [pId, setPId] = useState(patientId);
  const [rId, setRId] = useState(recordId);
  const [dispensed, setDispensed] = useState("true");
  const [medicines, setMedicines] = useState([]);
  const [medicineBill, setMedicineBill] = useState([]);
  const [inputFields, setInputFields] = useState([]);

  const handleMedicineButtonClick = () => {
    setInputFields([...inputFields, ""]);
    setMedicines((prevMedicines) => [
      ...prevMedicines,
      {
        name: "",
        dose: "",
        dispensed: "True",
        comment: "",
      },
    ]);
  };

  const handleMedicineChange = (index, key, value) => {
    setMedicines((prevMedicines) => {
      const updatedMedicines = [...prevMedicines];
      updatedMedicines[index] = {
        ...updatedMedicines[index],
        [key]: value,
      };
      return updatedMedicines;
    });
  };

  const handleMedicineBillChange = (value) => {
    setMedicineBill([{ total: value }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoader(true);
    setError("");
    setSuccess("");

    const postData = {
      recordId: rId,
      patientId: pId,
      medicines: medicines,
      medicineBill: medicineBill,
      username: "pharmacy1",
    };

    try {
      const res = await patientService.postMedicinePharmacy(postData);
      if (res.data.success) {
        setSuccess("Data uploaded successfully");
        setError("");
        setLoader(false);
        window.location.href = "/patient-list";
      } else {
        setError("Error uploading data");
        setSuccess("");
        setLoader(false);
      }
    } catch (error) {
      setError("Error uploading data");
      setLoader(false);
    }
  };

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900  py-10">
        <div className="flex flex-col items-center justify-center px-6 mx-auto lg:py-0">
          <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
            <h2 className="mb-1 text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Add Patient Record
            </h2>
            <form
              className="mt-4 space-y-4 lg:mt-5 md:space-y-5 overflow-y-auto max-h-[70vh]"
              onSubmit={handleSubmit}
            >
              <div className="grid grid-cols-2 gap-2">
                <Input
                  label="Patient Id"
                  type="number"
                  id="patientid"
                  required
                  disabled
                  value={pId}
                  onChange={(e) => setPId(e.target.value)}
                />

                <Input
                  label="Record Id"
                  type="number"
                  id="recordId"
                  required
                  disabled
                  value={rId}
                  onChange={(e) => setRId(e.target.value)}
                />
              </div>
              <div
                className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-2 rounded"
                onClick={handleMedicineButtonClick}
              >
                Add Medicines +
              </div>
              {inputFields.map((value, index) => (
                <div key={index} className="mb-4">
                  <div className="mt-3">
                    <label
                      htmlFor={"medicine"}
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      {"Medicine"}
                    </label>
                    <input
                      type={"text"}
                      name={"name"}
                      id={"name"}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                      placeholder={"Name"}
                      required
                      value={medicines[index].name}
                      onChange={(e) =>
                        handleMedicineChange(index, "name", e.target.value)
                      }
                    />
                  </div>
                  <div className="mt-3">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label
                          htmlFor={"dose"}
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          {"Dose"}
                        </label>
                        <input
                          type={"text"}
                          name={"dose"}
                          id={"dose"}
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                          placeholder={"Dose"}
                          required
                          value={medicines[index].dose}
                          onChange={(e) =>
                            handleMedicineChange(index, "dose", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="dispensed"
                          className="block text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Dispensed
                        </label>
                        <div className="mt-2 relative">
                          <select
                            id="dispensed"
                            name="dispensed"
                            className="block appearance-none w-full py-2 px-3 border text-gray-300 border-gray-500 bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={medicines[index].dispensed}
                            onChange={(e) =>
                              handleMedicineChange(
                                index,
                                "dispensed",
                                e.target.value
                              )
                            }
                          >
                            <option
                              value="True"
                              className="bg-gray-800 text-white"
                            >
                              True
                            </option>
                            <option
                              value="False"
                              className="bg-gray-800 text-white"
                            >
                              False
                            </option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                            <svg
                              className="h-4 w-4 fill-current"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M14.95 7.95a1 1 0 01-1.414 0L10 4.414l-3.536 3.536a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3">
                      <label
                        htmlFor={"comment"}
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        {"Comment"}
                      </label>
                      <input
                        type={"text"}
                        name={"comment"}
                        id={"comment"}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                        placeholder={"Comment"}
                        value={medicines[index].comment}
                        onChange={(e) =>
                          handleMedicineChange(index, "comment", e.target.value)
                        }
                      />
                    </div>
                  </div>
                </div>
              ))}

              <div className="mt-4">
                <label
                  htmlFor="medicineBill"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  {"Total Medicine Bill"}
                </label>
                <input
                  type="number"
                  name="medicineBill"
                  id="medicineBill"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                  placeholder="Total Bill"
                  required
                  onChange={(e) => handleMedicineBillChange(e.target.value)}
                />
              </div>

              {loader && <Loader />}
              {error && <p className="text-red-600">{error}</p>}
              {success && <p className="text-green-600">{success}</p>}

              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default GenerateBill;
