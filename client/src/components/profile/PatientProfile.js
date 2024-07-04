import React from "react";
import defaultProfile from "../../assets/images/common/defaultProfile.jpg";

const PatientProfile = ({
  username,
  gender,
  blood,
  date,
  fullAddress,
  phoneNo,
  profileImage,
  editMode,
  setUsername,
  setGender,
  setBlood,
  setDate,
  setFullAddress,
  setPhoneNo,
  handleUpdateDataChange,
  textPrompt,
}) => {
  return (
    <div className="flex-auto px-4 lg:px-10 pb-10 text-2xl mt-5 mx-5 md:mx-48">
      <div className="text-center mb-3 font-bold uppercase">
        <small>Update Profile</small>
      </div>
      <div className="relative w-full mb-3 mt-7">
        <div className="flex justify-center mb-7">
          <div className="w-28 h-28 relative">
            <img
              className="rounded-full mx-auto border w-28 h-28"
              src={profileImage ? profileImage : defaultProfile}
              alt="Rounded avatar"
            />
            <div className="profile-image">
              <label
                htmlFor="file-input"
                className="absolute bottom-0 right-0 p-1 inline-block w-10 h-10 border-2 cursor-pointer border-white bg-gray-300 rounded-full"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="black"
                  className="bi bi-camera"
                  viewBox="0 0 16 16"
                >
                  <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1v6zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z" />
                  <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z" />
                </svg>
              </label>
              <input
                type="file"
                id="file-input"
                name="avatar"
                accept="image/*"
                onChange={handleUpdateDataChange}
                className="hidden"
                disabled={!editMode} // Disable when not in edit mode
              />
            </div>
          </div>
        </div>
        <div className="text-red-500 text-center text-base my-5">
          {textPrompt}
        </div>
        <div className="grid gap-1 grid-cols-2 mb-3">
          <div>
            <label
              className="block uppercase text-xs font-bold mb-2"
              htmlFor="grid-password"
            >
              Name
            </label>
            <input
              type="name"
              className="border-0 px-3 py-3 placeholder-gray-400 
                  text-gray-700 bg-white rounded text-sm shadow 
                  focus:outline-none focus:ring w-full"
              placeholder="Name"
              style={{ transition: "all 0.15s ease 0s" }}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={!editMode} // Disable when not in edit mode
              required
            />
          </div>
          <div>
            <label
              className="block uppercase text-xs font-bold mb-2"
              htmlFor="grid-password"
            >
              Gender
            </label>
            <select
              id="gender"
              className={`form-control cursor-pointer block w-full px-3
                   py-3 text-sm font-normal ${
                     gender === "" ? "text-gray-400" : "text-gray-700"
                   } bg-white 
                   bg-clip-padding border-0 border-solid border-gray-300 
                   rounded transition ease-in-out focus:text-gray-700
                    focus:bg-white focus:border-indigo-600 shadow
                    focus:outline-none`}
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
              disabled={!editMode} // Disable when not in edit mode
            >
              <option value="" disabled hidden>
                Gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
        <div className="grid gap-1 grid-cols-2 mb-2">
          <div>
            <label
              className="block uppercase text-xs font-bold mb-2"
              htmlFor="grid-password"
            >
              Blood Group
            </label>
            <input
              type="name"
              className="border-0 px-3 py-3 placeholder-gray-400 
                  text-gray-700 bg-white rounded text-sm shadow 
                  focus:outline-none focus:ring w-full"
              placeholder="Name"
              style={{ transition: "all 0.15s ease 0s" }}
              value={blood}
              onChange={(e) => setBlood(e.target.value)}
              disabled={!editMode} // Disable when not in edit mode
              required
            />
          </div>
          <div>
            <label
              className="block uppercase text-xs font-bold mb-2"
              htmlFor="grid-password"
            >
              Date of Birth
            </label>
            <input
              type="date"
              className="border-0 px-3 py-3 placeholder-gray-400 
                  text-gray-700 bg-white rounded text-sm shadow 
                  focus:outline-none focus:ring w-full"
              placeholder="Name"
              style={{ transition: "all 0.15s ease 0s" }}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              disabled={!editMode} // Disable when not in edit mode
              required
            />
          </div>
        </div>
      </div>
      <div className="relative w-full mb-3">
        <label
          className="block uppercase text-xs font-bold mb-2"
          htmlFor="grid-password"
        >
          Address
        </label>
        <div className="grid gap-1 grid-cols-2">
          <input
            type="text"
            className="border-0 col-span-2 px-3 mt-2 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
            placeholder="Complete Address"
            style={{ transition: "all 0.15s ease 0s" }}
            value={fullAddress}
            onChange={(e) => setFullAddress(e.target.value)}
            disabled={!editMode} // Disable when not in edit mode
            required
          />
        </div>
      </div>
      <div className="relative w-full mb-3">
        <label
          className="block uppercase text-xs font-bold mb-2"
          htmlFor="grid-password"
        >
          Phone Number
        </label>
        <input
          type="number"
          className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
          placeholder="Phone Number"
          style={{ transition: "all 0.15s ease 0s" }}
          value={phoneNo}
          onChange={(e) => setPhoneNo(e.target.value)}
          disabled={!editMode} // Disable when not in edit mode
          required
        />
      </div>
      <div className="text-red-500 text-sm text-center">{textPrompt}</div>
    </div>
  );
};

export default PatientProfile;
