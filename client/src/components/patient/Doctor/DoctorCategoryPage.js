import React from "react";
import { Link } from "react-router-dom";

const DoctorCategoryPage = () => {
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

  return (
    <div className="grid grid-cols-2 mx-20">
      {departments.map((department, index) => (
        <Link
          key={index}
          to={`/select-doctor/${department.toLowerCase()}`}
          style={{ textDecoration: "none" }}
        >
          <span className="scale-90 md:scale-100 border-2 rounded-3xl flex flex-col justify-center sm:mt-10 mx-5 md:mx-5 items-center border-blue-100 p-10 text-xl hover:border-blue-200 cursor-pointer hover:bg-blue-50 transition delay-100 hover:scale-90 md:hover:scale-110">
            {department.toUpperCase()}
          </span>
        </Link>
      ))}
    </div>
  );
};

export default DoctorCategoryPage;
