import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../common/input";
import Loader from "../../common/loader";
import registerService from "../../services/registerService";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons

const departments = [
  "Cardiology",
  "Dermatology",
  "Neurology",
  "Orthopedics",
  "Pediatrics",
  "Psychiatry",
  "Radiology",
  "Surgery",
  "Urology",
  "Oncology",
];

const degrees = [
  "MBBS",
  "MD",
  "DO",
  "PhD",
  "BSc",
  "MSc",
  "BDS",
  "MDS",
  "BHMS",
  "BAMS",
];

const specifications = [
  "General",
  "Specialist",
  "Consultant",
  "Surgeon",
  "Physician",
  "Pediatrician",
  "Radiologist",
  "Cardiologist",
  "Neurologist",
  "Dermatologist",
];

function RegisterByAdmin() {
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(""); // New state for name error
  const [email, setEmail] = useState(""); // New state for email
  const [emailError, setEmailError] = useState(""); // New state for email error
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("Male");
  const [NMCnumber, setNMCnumber] = useState("");
  const [contact, setContact] = useState("");
  const [department, setDepartment] = useState(departments[0]);
  const [degree, setDegree] = useState(degrees[0]);
  const [org, setOrg] = useState("doctor");
  const [password, setPassword] = useState("");
  const [specification, setSpecification] = useState(specifications[0]);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const navigate = useNavigate();

  const validateName = (name) => {
    const regex = /^[A-Z][a-zA-Z]*$/;
    if (!regex.test(name)) {
      setNameError(
        "Name should only contain letters and start with a capital letter."
      );
      return false;
    }
    setNameError("");
    return true;
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      setEmailError("Email should contain '@' and no spaces.");
      return false;
    }
    setEmailError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate name and email
    if (!validateName(name) || !validateEmail(email)) {
      return;
    }
    setLoader(true);
    setError("");
    setSuccess("");

    try {
      let res;
      if (org === "doctor") {
        const args = [
          name,
          dob,
          gender,
          NMCnumber,
          contact,
          department.toLowerCase(),
          degree,
          specification,
        ];
        const fcn = "registerDoctor";
        res = await registerService.register({
          args,
          username: name,
          orgName: org,
          department: department,
          password,
          fcn,
        });
      } else if (org === "lab" || org === "pharmacy" || org === "insurance") {
        const args = [name, contact, city, address];
        const fcn = `register${org.charAt(0).toUpperCase() + org.slice(1)}`;
        res = await registerService.register({
          args,
          username: name,
          orgName: org,
          password,
          fcn,
        });
      }

      setLoader(false);

      if (res.data.success === true) {
        navigate("/dashboard");
        setSuccess("User registered successfully.");
        setNMCnumber("");
        setAddress("");
        setCity("");
        setContact("");
        setDegree("");
        setName("");
        setPassword("");
        setGender("");
        setDepartment("");
        setSpecification("");
        setDob("");

        return;
      }
    } catch (error) {
      setLoader(false);
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong!");
      }
      return;
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <>
      <section
        style={{ backgroundColor: "#f3f2f5" }}
        className="min-h-[93vh] py-10"
      >
        <div className="flex flex-col items-center justify-center px-6 mx-auto lg:py-0">
          <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
            <h2 className="mb-1 text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Register
            </h2>
            <form
              className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
              onSubmit={(e) => handleSubmit(e)}
            >
              <div className="mt-6">
                <div className="relative">
                  <select
                    id="dropdown"
                    name="dropdown"
                    className="block w-1/2 m-auto pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-600 focus:border-primary-600 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={org}
                    onChange={(e) => setOrg(e.target.value)}
                  >
                    <option value={"doctor"}>Doctor</option>
                    <option value={"lab"}>Lab</option>
                    <option value={"pharmacy"}>Pharmacy</option>
                    <option value={"insurance"}>Insurance</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-28 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {org === "doctor" ? (
                <div>
                  <Input
                    label="Email"
                    type="email"
                    id="name"
                    required
                    value={name}
                    onChange={setName}
                  />

                  <div className="mt-3">
                    <label
                      htmlFor="gender"
                      className="block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Gender
                    </label>
                    <div className="mt-2 relative">
                      <select
                        id="gender"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        name="gender"
                        className="block appearance-none w-full py-2 px-3 border text-gray-300 border-gray-500 bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        <option value="Male" className="bg-gray-800 text-white">
                          Male
                        </option>
                        <option
                          value="Female"
                          className="bg-gray-800 text-white"
                        >
                          Female
                        </option>
                        <option
                          value="Other"
                          className="bg-gray-800 text-white"
                        >
                          Other
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

                  <Input
                    label="NMC Number"
                    type="text"
                    id="nmc_number"
                    required
                    value={NMCnumber}
                    onChange={setNMCnumber}
                  />

                  <Input
                    label="Contact"
                    type="tel"
                    id="contact"
                    required
                    value={contact}
                    onChange={setContact}
                  />

                  <div className="mt-3">
                    <label
                      htmlFor="department"
                      className="block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Department
                    </label>
                    <div className="mt-2 relative">
                      <select
                        id="department"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        name="department"
                        className="block appearance-none w-full py-2 px-3 border text-gray-300 border-gray-500 bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        {departments.map((dept, index) => (
                          <option key={index} value={dept}>
                            {dept}
                          </option>
                        ))}
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

                  <div className="mt-3">
                    <label
                      htmlFor="degree"
                      className="block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Degree
                    </label>
                    <div className="mt-2 relative">
                      <select
                        id="degree"
                        value={degree}
                        onChange={(e) => setDegree(e.target.value)}
                        name="degree"
                        className="block appearance-none w-full py-2 px-3 border text-gray-300 border-gray-500 bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        {degrees.map((deg, index) => (
                          <option key={index} value={deg}>
                            {deg}
                          </option>
                        ))}
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

                  <div className="mt-3">
                    <label
                      htmlFor="specification"
                      className="block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Specification
                    </label>
                    <div className="mt-2 relative">
                      <select
                        id="specification"
                        value={specification}
                        onChange={(e) => setSpecification(e.target.value)}
                        name="specification"
                        className="block appearance-none w-full py-2 px-3 border text-gray-300 border-gray-500 bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        {specifications.map((spec, index) => (
                          <option key={index} value={spec}>
                            {spec}
                          </option>
                        ))}
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

                  <Input
                    label="Date of Birth"
                    type="date"
                    id="dob"
                    required
                    value={dob}
                    onChange={setDob}
                  />
                  <div className="relative ">
                    <Input
                      label="Password"
                      type={passwordVisible ? "text" : "password"}
                      id="password"
                      required
                      value={password}
                      onChange={setPassword}
                    />
                    <div
                      className="absolute inset-y-0 top-6 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer"
                      onClick={togglePasswordVisibility}
                    >
                      {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                    </div>
                  </div>

                  {loader ? (
                    <div className="mt-6">
                      <Loader />
                    </div>
                  ) : (
                    <button
                      type="submit"
                      className="w-full px-4 py-2 mt-4 text-base font-semibold text-center text-white transition duration-200 ease-in bg-gray-900 rounded-lg shadow-md focus:ring-gray-500 focus:ring-offset-gray-200 focus:outline-none focus:ring-2 hover:bg-gray-700"
                    >
                      Register
                    </button>
                  )}

                  {error && (
                    <div className="text-red-500 mt-2 text-sm text-center">
                      {error}
                    </div>
                  )}

                  {success && (
                    <div className="text-green-500 mt-2 text-sm text-center">
                      {success}
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Input
                    label="Email"
                    type="email"
                    id="name"
                    required
                    value={name}
                    onChange={setName}
                  />

                  <Input
                    label="Contact"
                    type="tel"
                    id="contact"
                    required
                    value={contact}
                    onChange={setContact}
                  />

                  <Input
                    label="City"
                    type="text"
                    id="city"
                    required
                    value={city}
                    onChange={setCity}
                  />

                  <Input
                    label="Address"
                    type="text"
                    id="address"
                    required
                    value={address}
                    onChange={setAddress}
                  />

                  <Input
                    label="Date of Birth"
                    type="text"
                    id="dob"
                    required
                    value={dob}
                    onChange={setDob}
                  />

                  <div className="flex relative">
                    <Input
                      label="Password"
                      type={passwordVisible ? "text" : "password"}
                      id="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <label className="block text-sm font-medium text-gray-900 dark:text-white">
                      Show Password
                    </label>
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-primary-600 dark:text-blue-500"
                      onChange={togglePasswordVisibility}
                    />
                  </div>

                  {loader ? (
                    <div className="mt-6">
                      <Loader />
                    </div>
                  ) : (
                    <button
                      type="submit"
                      className="w-full px-4 py-2 mt-4 text-base font-semibold text-center text-white transition duration-200 ease-in bg-gray-900 rounded-lg shadow-md focus:ring-gray-500 focus:ring-offset-gray-200 focus:outline-none focus:ring-2 hover:bg-gray-700"
                    >
                      Register
                    </button>
                  )}

                  {error && (
                    <div className="text-red-500 mt-2 text-sm text-center">
                      {error}
                    </div>
                  )}

                  {success && (
                    <div className="text-green-500 mt-2 text-sm text-center">
                      {success}
                    </div>
                  )}
                </>
              )}
            </form>
            <div className="flex items-center justify-center mt-4 space-x-4">
              <Link
                to="/"
                className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:underline"
              >
                Back to home
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default RegisterByAdmin;
