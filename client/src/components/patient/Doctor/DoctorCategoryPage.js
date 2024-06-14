import React from "react";
import { Link } from "react-router-dom";

const DoctorCategoryPage = () => {
  return (
    <div className="grid grid-cols-2  mx-20 ">
      <Link to={`/select-doctor/bds`} style={{ textDecoration: "none" }}>
        <span className="scale-90 md:scale-100 border-2 rounded-3xl flex flex-col justify-center sm:mt-10 mx-5 md:mx-5 items-center border-blue-100  p-10 text-xl hover:border-blue-200 cursor-pointer hover:bg-blue-50 transition delay-100 hover:scale-90 md:hover:scale-110">
          BDS
        </span>{" "}
      </Link>
      <Link to={`/select-doctor/ortho`} style={{ textDecoration: "none" }}>
        <span className="scale-90 md:scale-100 border-2 rounded-3xl flex flex-col justify-center sm:mt-10 mx-5 md:mx-5 items-center border-blue-100  p-10 text-xl hover:border-blue-200 cursor-pointer hover:bg-blue-50 transition delay-100 hover:scale-90 md:hover:scale-110">
          ORTHO
        </span>{" "}
      </Link>
    </div>
  );
};

export default DoctorCategoryPage;
