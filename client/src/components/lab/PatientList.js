// PaitentsRecords.js

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../../common/loader";
import paitientService from "../../services/patientService";
import authService from "../../services/authService";
import Table4 from "../Table/table4";

function PatientList(props) {
  const [loader, setLoader] = useState(true);
  const [data, setData] = useState([]);
  const [user, setUser] = useState([]);
  const [columnNames, setColumnNames] = useState([]);
  const [currentId, setCurrentId] = useState(484192);

  useEffect(() => {
    const getPatientRecordsAccessList = async () => {
      const res = await paitientService.getPatientAccessList();
      console.log(res.data);
      setUser(res.data.result.userName);
      if (res.data.success) {
        setData(res.data.accessMemberDetails);
        setLoader(false);
      }
    };

    const updateColumnNames = () => {
      const keys = Object.keys(dummyRecordData[0]);
      console.log("keys: ", keys);
      setColumnNames(keys);
    };

    getPatientRecordsAccessList();
    updateColumnNames();
  }, []);

  const patientIdButtonClick = (id) => {
    console.log("patientIdButtonClick: ", id);
    setCurrentId(id);
  };

  const dummyRecordData = [
    {
      patientId: "851280",
      name: "patient1",
      gender: "Female",
      contact: "9874563210",
      dob: "1999-10-10",
      bloodGroup: "A+",
      address: "delhi",
    },
  ];

  const RecordData = [
    {
      data,
      user,
    },
  ];

  let topbutton;
  console.log(authService.getRole());

  return (
    <>
      {loader ? (
        <div className="mt-10">
          <Loader />
        </div>
      ) : (
        <>
          {data.length === 0 ? (
            <>
              <p>No Data to Show</p>
            </>
          ) : (
            <>
              <Table4
                tableName="Patients List"
                user={user}
                tableData={data}
                columnNames={columnNames}
                patientIdButtonClick={patientIdButtonClick}
              />
            </>
          )}
        </>
      )}
    </>
  );
}

export default PatientList;
