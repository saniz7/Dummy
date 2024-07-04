import React from "react";
import defaultProfile from "../../assets/images/common/defaultProfile.jpg";

const DoctorProfile = ({
  name,
  gender,
  dob,
  department,
  degree,
  NMCnumber,
  contact,
  profileImage,
  textPrompt,
}) => {
  return (
    <div className="flex-auto px-4 lg:px-10 pb-10 text-base mt-5 mx-5 md:mx-48">
      <div className="text-center mb-3 font-bold uppercase">
        <small>Doctor Profile</small>
      </div>
      <div className="relative w-full mb-3 mt-7">
        <div className="flex justify-center mb-7">
          <div className="w-28 h-28 relative">
            <img
              className="rounded-full mx-auto border w-28 h-28"
              src={profileImage ? profileImage : defaultProfile}
              alt="Rounded avatar"
            />
          </div>
        </div>
        <div className="text-red-500 text-center text-base my-5">
          {textPrompt}
        </div>
        <div className="grid gap-1 grid-cols-2 mb-3">
          <div>
            <label
              className="block uppercase text-xs font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <p className="px-3 py-2 bg-gray-100 rounded-md">{name}</p>
          </div>
          <div>
            <label
              className="block uppercase text-xs font-bold mb-2"
              htmlFor="gender"
            >
              Gender
            </label>
            <p className="px-3 py-2 bg-gray-100 rounded-md">{gender}</p>
          </div>
        </div>
        <div className="grid gap-1 grid-cols-2 mb-2">
          <div>
            <label
              className="block uppercase text-xs font-bold mb-2"
              htmlFor="dob"
            >
              Date of Birth
            </label>
            <p className="px-3 py-2 bg-gray-100 rounded-md">{dob}</p>
          </div>
          <div>
            <label
              className="block uppercase text-xs font-bold mb-2"
              htmlFor="department"
            >
              Department
            </label>
            <p className="px-3 py-2 bg-gray-100 rounded-md">{department}</p>
          </div>
        </div>
        <div className="grid gap-1 grid-cols-2 mb-2">
          <div>
            <label
              className="block uppercase text-xs font-bold mb-2"
              htmlFor="degree"
            >
              Degree
            </label>
            <p className="px-3 py-2 bg-gray-100 rounded-md">{degree}</p>
          </div>
          <div>
            <label
              className="block uppercase text-xs font-bold mb-2"
              htmlFor="NMCnumber"
            >
              NMC Number
            </label>
            <p className="px-3 py-2 bg-gray-100 rounded-md">{NMCnumber}</p>
          </div>
        </div>
        <div className="relative w-full mb-3">
          <label
            className="block uppercase text-xs font-bold mb-2"
            htmlFor="contact"
          >
            Contact
          </label>
          <p className="px-3 py-2 bg-gray-100 rounded-md">{contact}</p>
        </div>
      </div>
      <div className="text-red-500 text-sm text-center">{textPrompt}</div>
    </div>
  );
};

export default DoctorProfile;
