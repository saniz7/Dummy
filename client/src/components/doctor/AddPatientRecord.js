import React, { useState } from "react";
import Input from "../../common/input";
import Loader from "../../common/loader";
import paitientService from "../../services/patientService";
import { useLocation } from "react-router-dom";

function AddPatientRecords() {
  const location = useLocation();

  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const [patientId, setPatientId] = useState("");
  const [medicines, setMedicines] = useState([]);
  const [labTests, setLabTests] = useState([]);
  const [diagnosis, setDiagnosis] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [temp, setTemp] = useState("");
  const [bp, setBP] = useState("");

  const [inputFields, setInputFields] = useState([]);
  const [inputLabFields, setInputLabFields] = useState([]);

  const handleMedicineButtonClick = () => {
    setInputFields([...inputFields, ""]);
    setMedicines([...medicines, { name: "", dose: "" }]);
  };

  const handleLabButtonClick = () => {
    setInputLabFields([...inputLabFields, ""]);
    setLabTests([...labTests, { name: "" }]);
  };

  const handleMedicineNameChange = (index, name) => {
    const updatedMedicines = [...medicines];
    updatedMedicines[index].name = name;
    setMedicines(updatedMedicines);
  };

  const handleDoseNameChange = (index, dose) => {
    const updatedMedicines = [...medicines];
    updatedMedicines[index].dose = dose;
    setMedicines(updatedMedicines);
  };

  const handleTestNameChange = (index, name) => {
    const updatedLabTests = [...labTests];
    updatedLabTests[index].name = name;
    setLabTests(updatedLabTests);
  };

  const handleDiagnosisChange = (e) => {
    setDiagnosis(e.target.value);
  };
  const handleweightChange = (e) => {
    setWeight(e.target.value);
  };
  const handleheightChange = (e) => {
    setHeight(e.target.value);
  };
  const handletempChange = (e) => {
    setTemp(e.target.value);
  };
  const handlebpChange = (e) => {
    setBP(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = location.pathname.split("/")[2];

    setLoader(true);
    setError("");
    setSuccess("");

    const prescriptionData = {
      patientId: id,
      diagnosis,
      medicines,
      labTests,
      weight,
      height,
      temp,
      bp,
    };

    try {
      const res = await paitientService.postPrescription(prescriptionData);
      if (res.data.success) {
        setSuccess("Prescription added successfully!");
        setError("");
        setLoader(false);
        setPatientId("");
        setMedicines([]);
        setLabTests([]);
        setDiagnosis("");
        setWeight("");
        setHeight("");
        setTemp("");
        setBP("");
        setInputFields([]);
        setInputLabFields([]);
        window.location.href = "/patient-records";
      }
    } catch (error) {
      setError("An error occurred while adding the prescription");
      setLoader(false);
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-[93vh] py-10">
      <div className="flex flex-col items-center justify-center px-6 mx-auto lg:py-0">
        <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
          <h2 className="mb-1 text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Add Patient Record
          </h2>
          <form
            className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
            onSubmit={handleSubmit}
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="mt-3">
                <label
                  htmlFor={"weight"}
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Weight
                </label>
                <input
                  type="text"
                  name="weight"
                  id="weight"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                  placeholder="Weight"
                  required
                  value={weight}
                  onChange={handleweightChange}
                />
              </div>
              <div className="mt-3">
                <label
                  htmlFor={"height"}
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Height
                </label>
                <input
                  type="text"
                  name="height"
                  id="height"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                  placeholder="Height"
                  required
                  value={height}
                  onChange={handleheightChange}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="">
                <label
                  htmlFor={"temperature"}
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Temperature
                </label>
                <input
                  type="text"
                  name="temperature"
                  id="temperature"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                  placeholder="Temperature"
                  required
                  value={temp}
                  onChange={handletempChange}
                />
              </div>
              <div className="">
                <label
                  htmlFor={"bp"}
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Blood Pressure
                </label>
                <input
                  type="text"
                  name="bp"
                  id="bp"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                  placeholder="Blood Pressure"
                  required
                  value={bp}
                  onChange={handlebpChange}
                />
              </div>
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
                    Medicine
                  </label>
                  <input
                    type="text"
                    name="medicine"
                    id="medicine"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                    placeholder="Medicine"
                    required
                    value={medicines[index].name}
                    onChange={(e) =>
                      handleMedicineNameChange(index, e.target.value)
                    }
                  />
                </div>
                <div className="mt-3">
                  <label
                    htmlFor={"dose"}
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Dose
                  </label>
                  <input
                    type="text"
                    name="dose"
                    id="dose"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                    placeholder="Dose"
                    required
                    value={medicines[index].dose}
                    onChange={(e) =>
                      handleDoseNameChange(index, e.target.value)
                    }
                  />
                </div>
              </div>
            ))}

            <div
              className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-2 rounded"
              onClick={handleLabButtonClick}
            >
              Add Lab Test +
            </div>
            {inputLabFields.map((value, index) => (
              <div key={index} className="mb-4">
                <div className="mt-3">
                  <label
                    htmlFor={"labTest"}
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Test Name
                  </label>
                  <input
                    type="text"
                    name="labTest"
                    id="labTest"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                    placeholder="Test Name"
                    required
                    value={labTests[index].name}
                    onChange={(e) =>
                      handleTestNameChange(index, e.target.value)
                    }
                  />
                </div>
              </div>
            ))}

            <div className="mt-3">
              <label
                htmlFor={"diagnosis"}
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Diagnosis
              </label>
              <input
                type="text"
                name="diagnosis"
                id="diagnosis"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                placeholder="Diagnosis"
                required
                value={diagnosis}
                onChange={handleDiagnosisChange}
              />
            </div>

            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}
            {success && (
              <div className="text-green-500 text-sm text-center">
                {success}
              </div>
            )}

            <button
              type="submit"
              className="w-full text-white bg-indigo-600 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              {loader ? <Loader height={5} width={5} /> : "Prescribe"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default AddPatientRecords;
