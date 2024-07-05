import React from "react";
import { Link, useParams } from "react-router-dom";

const PatientDetailCategory = () => {
  const departments = [
    "cardiology",
    "dermatology",
    "neurology",
    "orthopedics",
    "pediatrics",
    "psychiatry",
    "radiology",
    "surgery",
    "urology",
    "oncology",
  ];
  const { patientId } = useParams();
  console.log(patientId);
  return (
    // <div className="grid grid-cols-2  mx-20 ">
    //   <Link
    //     to={`/patient-details/bds/${patientId}`}
    //     style={{ textDecoration: "none" }}
    //   >
    //     <span className="scale-90 md:scale-100 border-2 rounded-3xl flex flex-col justify-center sm:mt-10 mx-5 md:mx-5 items-center border-blue-100  p-10 text-xl hover:border-blue-200 cursor-pointer hover:bg-blue-50 transition delay-100 hover:scale-90 md:hover:scale-110">
    //       BDS
    //     </span>{" "}
    //   </Link>
    //   <Link to={`/select-doctor/ortho`} style={{ textDecoration: "none" }}>
    //     <span className="scale-90 md:scale-100 border-2 rounded-3xl flex flex-col justify-center sm:mt-10 mx-5 md:mx-5 items-center border-blue-100  p-10 text-xl hover:border-blue-200 cursor-pointer hover:bg-blue-50 transition delay-100 hover:scale-90 md:hover:scale-110">
    //       ORTHO
    //     </span>{" "}
    //   </Link>
    // </div>
    <div className="grid grid-cols-2 mx-20">
      {departments.map((department, index) => (
        <Link
          key={index}
          to={`/health-records/${department}`}
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

export default PatientDetailCategory;
