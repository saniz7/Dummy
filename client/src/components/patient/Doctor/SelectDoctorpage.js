import React, { useEffect, useState } from 'react'
import paitientService from "../../../services/patientService";
import SelectDoctor from './selectDoctor';
import { useLocation } from 'react-router-dom'

const SelectDoctorpage = () => {
   const [data, setData] = useState([]);
  const [value, setValue] = useState([]);
  const [loader, setLoader] = useState(true);
  const [columnNames, setColumnNames] = useState([]);
  const [access, setaccess] = useState([]);

    const location = useLocation();
    const id = location.pathname.split('/')[2];
    console.log('id',id);

  useEffect(() => {
    const getDoctorsList = async () => {
      let DoctorData = await paitientService.getOrganizationList("doctor");

      // console.log(DoctorData.data.records);
      // console.log(DoctorData.data.access);

      setData(DoctorData.data.records);
      setaccess(DoctorData.data.access);

      setLoader(false);

    };
    const updateColumnNames = () => {
      const keys = Object.keys(doctorsDummyData[0]);
      console.log("keys: ", keys);
      setColumnNames(keys);
    };

    getDoctorsList();
    updateColumnNames();
  }, []);
console.log(data);
  useEffect(() => {
    const orthoDoctors = data.filter(item => item?.department === id);
    setValue(orthoDoctors);
  }, [data]);
console.log(value);

  const doctorsDummyData = [
    {
      // doctorId: "697202",
      name: "doctor1",
      gender: "male",
      // dob: "12-03-1989",
      // aadharNumber: "567812349876",
      contact: "9879879870",
      degree: "MS, MBBS",
      department: "Ortho",
      // orgName: "doctor",
      // prescriptions: ["42621"]
    }
  ];


  const accessHandler = async (e, id) => {

    console.log("checkbox", e.target.checked);
    console.log("checkbox id: ", id);

    if (e.target.checked) {
      var confirmed = window.confirm("Are you sure you want to give access ?");

      if (confirmed) {
        console.log("Access given");
        const res = await paitientService.giveAccess(id);
        console.log(res);

        if (res.data.success) {
          console.log("id: ",id);
          window.alert(res.data.message);
          window.location.reload();
        }
        else{
          window.alert("Providing Access Failed");
        }

      } else {
        e.target.checked = !e.target.checked
        console.log("Access cancelled");
      }
    } else {

      var confirmed = window.confirm("Are you sure you want to remove access ?");

      if (confirmed) {
        console.log("Access removed");
        const res = await paitientService.removeAccess(id);
        console.log(res);

        if(res.data.success){
          window.alert(res.data.message);
          window.location.reload();
        }
        else{
          window.alert("Removing Access Failed");
        }

      } else {
        e.target.checked = !e.target.checked
        console.log("Access cancelled");
      }

    }

  };
  return (
    <div>
        <SelectDoctor data={value} loader={loader} columnNames={columnNames} access={access}/>
    </div>
  )
}

export default SelectDoctorpage