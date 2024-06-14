import Loader from "../../../common/loader";
import paitientService from "../../../services/patientService";
import Table from "../../Table/table";
function SelectDoctor(props) {
  // const [data, setData] = useState([]);
  // const [value, setValue] = useState([]);
  // const [loader, setLoader] = useState(true);
  // const [columnNames, setColumnNames] = useState([]);
  // const [access, setaccess] = useState([]);

  // useEffect(() => {
  //   const getDoctorsList = async () => {
  //     let DoctorData = await paitientService.getOrganizationList("doctor");

  //     // console.log(DoctorData.data.records);
  //     // console.log(DoctorData.data.access);

  //     setData(DoctorData.data.records);
  //     setaccess(DoctorData.data.access);

  //     setLoader(false);

  //   };

  //   console.log(value);
  //   const updateColumnNames = () => {
  //     const keys = Object.keys(doctorsDummyData[0]);
  //     console.log("keys: ", keys);
  //     setColumnNames(keys);
  //   };

  //   getDoctorsList();
  //   updateColumnNames();
  // }, []);

  // useEffect(() => {
  //   data.forEach((item) => {
  //     if (item?.department === 'bds') {
  //       setValue(item);
  //     }
  //   });
  // }, [data]);
  // console.log(value);

  // const doctorsDummyData = [
  //   {
  //     // doctorId: "697202",
  //     name: "doctor1",
  //     gender: "male",
  //     // dob: "12-03-1989",
  //     // aadharNumber: "567812349876",
  //     contact: "9879879870",
  //     degree: "MS, MBBS",
  //     department: "Ortho",
  //     // orgName: "doctor",
  //     // prescriptions: ["42621"]
  //   }
  // ];

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
          console.log("id: ", id);
          window.alert(res.data.message);
          window.location.reload();
        } else {
          window.alert("Providing Access Failed");
        }
      } else {
        e.target.checked = !e.target.checked;
        console.log("Access cancelled");
      }
    } else {
      var confirmed = window.confirm(
        "Are you sure you want to remove access ?"
      );

      if (confirmed) {
        console.log("Access removed");
        const res = await paitientService.removeAccess(id);
        console.log(res);

        if (res.data.success) {
          window.alert(res.data.message);
          window.location.reload();
        } else {
          window.alert("Removing Access Failed");
        }
      } else {
        e.target.checked = !e.target.checked;
        console.log("Access cancelled");
      }
    }
  };
  console.log(props?.data);
  return (
    <>
      {/* Hii */}
      {props?.loader ? (
        <div className="mt-10">
          <Loader />
        </div>
      ) : (
        <>
          {props?.data.length === 0 ? (
            <div className="mt-10 text-center">No Data Available</div>
          ) : (
            <Table
              tableName="Doctor List"
              tableData={props?.data}
              columnNames={props?.columnNames}
              accessCheckbox={true}
              accessHandler={accessHandler}
              access={props?.access}
              orgName="doctor"
            />
          )}
        </>
      )}
    </>
  );
}

export default SelectDoctor;
