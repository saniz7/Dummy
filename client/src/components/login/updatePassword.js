import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../common/loader";
import passwordService from "../../services/passwordService";

function UpdatePassword() {
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);

    setSuccess("");
    setError("");

    if (newPassword !== confirmNewPassword) {
      setLoader(false);
      setError("Passwords do not match!");
      return;
    }

    try {
      // Example: Fetch userName or userId from your authentication context or session
      const userName = localStorage.getItem("user") ?? "{}"; // Replace with actual logic to get userName
      console.log(userName);
      const res = await passwordService.updatePassword(
        oldPassword,
        newPassword,
        userName
      );

      setLoader(false);

      if (res.status === 200) {
        setError(res.data.message);
      } else if (res.status === 201) {
        setSuccess("Password Updated Successfully!");
        setTimeout(() => {
          navigate("/profile");
        }, 1500);
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error || "Something went wrong");
      } else {
        setError("Something went wrong");
      }
      setLoader(false);
    }
  };

  return (
    <section className="bg-gray-50 py-10 dark:bg-gray-900 min-h-[93vh]">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto">
        <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
          <h2 className="mb-1 text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Update Password
          </h2>
          <form
            className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
            onSubmit={(e) => handleSubmit(e)}
          >
            <div>
              <label
                htmlFor="oldPassword"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Old Password
              </label>
              <input
                type="password"
                name="oldPassword"
                id="oldPassword"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="newPassword"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                New Password
              </label>
              <input
                type="password"
                name="newPassword"
                id="newPassword"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="confirmNewPassword"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Confirm New Password
              </label>
              <input
                type="password"
                name="confirmNewPassword"
                id="confirmNewPassword"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
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
              {loader ? <Loader height={5} width={5} /> : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default UpdatePassword;
