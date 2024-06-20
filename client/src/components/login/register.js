import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons
import { Link, useNavigate } from "react-router-dom";
import Input from "../../common/input";
import Loader from "../../common/loader";
import registerService from "../../services/registerService";

function Register() {
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("Male");
  const [contact, setContact] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [address, setAddress] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const validateUsername = (username) => {
    // Check if username contains leading or trailing spaces, or spaces in between
    const spaceRegex = /^\s+|\s+$|\s+/;
    return !spaceRegex.test(username);
  };

  const validatePassword = (password) => {
    // Check if password contains at least 8 characters, including numbers and special symbols
    const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/;
    return passwordRegex.test(password);
  };

  const validateContact = (contact) => {
    // Check if contact only contains numbers
    const numbersRegex = /^[0-9]+$/;
    // Check if contact is exactly 10 digits and starts with 98
    const length = contact.length === 10 && contact.substring(0, 2) === "98";
    return numbersRegex.test(contact) && length;
  };

  const validateDob = (dob) => {
    // Convert date string to Date object
    const selectedDate = new Date(dob);
    // Get current date
    const currentDate = new Date();
    // Compare selected date with current date
    return selectedDate <= currentDate;
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate username
    if (!validateUsername(username)) {
      setError(
        "Username cannot contain leading, trailing, or consecutive spaces."
      );
      return;
    }

    // Check if password and confirm password match
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Validate password
    if (!validatePassword(password)) {
      setError(
        "Password must contain at least 8 characters, including numbers and special symbols."
      );
      return;
    }

    // Validate date of birth
    if (!validateDob(dob)) {
      setError("Invalid DOB.");
      return;
    }

    // Validate contact
    if (!validateContact(contact)) {
      setError("Invalid Number");
      return;
    }

    // Other validations...

    setLoader(true);
    setError("");
    setSuccess("");

    try {
      const res = await registerService.registerPatient({
        args: [dob, gender, contact, bloodGroup, address],
        fcn: "registerPatient",
        orgName: "patient",
        password,
        username,
      });

      setLoader(false);

      if (res.data.success === true) {
        navigate("/login");

        setSuccess("User registered successfully.");

        setAddress("");
        setContact("");
        setBloodGroup("");
        setPassword("");
        setGender("");
        setUsername("");
        setPassword("");
        setConfirmPassword("");
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

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900 min-h-[93vh] py-10">
        <div className="flex flex-col items-center justify-center px-6 mx-auto lg:py-0">
          <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
            <h2 className="mb-1 text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Register as Patient
            </h2>
            <form
              className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
              onSubmit={(e) => handleSubmit(e)}
            >
              <Input
                label="Email"
                type="text"
                id="email"
                required
                value={username}
                onChange={setUsername}
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

              <div className="relative ">
                <Input
                  label="Confirm Password"
                  type={confirmPasswordVisible ? "text" : "password"}
                  id="confirm_password"
                  required
                  value={confirmPassword}
                  onChange={setConfirmPassword}
                />
                <div
                  className="absolute inset-y-0 top-6 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
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

              <div className="mt-6">
                <label
                  htmlFor="gender"
                  className="block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Gender
                </label>
                <div className="mt-2 relative">
                  <select
                    id="gender"
                    name="gender"
                    className="block appearance-none w-full py-2 px-3 border text-gray-300 border-gray-500 bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="Male" className="bg-gray-800 text-white">
                      Male
                    </option>
                    <option value="Female" className="bg-gray-800 text-white">
                      Female
                    </option>
                    <option value="Other" className="bg-gray-800 text-white">
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
                label="Contact"
                type="tel"
                id="contact"
                required
                value={contact}
                onChange={setContact}
              />

              <div className="mt-6">
                <label
                  htmlFor="blood_group"
                  className="block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Blood Group
                </label>
                <select
                  id="blood_group"
                  name="blood_group"
                  className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={bloodGroup}
                  onChange={(e) => setBloodGroup(e.target.value)}
                >
                  <option value="">Select Blood Group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </select>
              </div>
              <Input
                label="Address"
                type="text"
                id="address"
                required
                value={address}
                onChange={setAddress}
              />

              {error ? (
                <div className="text-red-500 text-sm text-center">{error}</div>
              ) : null}
              {success ? (
                <div className="text-green-500 text-sm text-center">
                  {success}
                </div>
              ) : null}

              <button
                type="submit"
                className="w-full text-white bg-indigo-600 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                {loader ? <Loader height={5} width={5} /> : "Register"}
              </button>

              <Link
                to="/login"
                className="flex flex-wrap mt-3 justify-center cursor-pointer text-white"
              >
                <div>
                  <small>Login</small>
                </div>
              </Link>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default Register;
