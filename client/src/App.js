// import "./App.css";
// import { Route, Routes } from "react-router-dom";
// import Home from "./container/home";
// import Navbar from "./container/navbar";
// import Page404 from "./container/page404";
// import Login from "./components/login/login";
// import Register from "./components/login/register";
// import RegisterByAdmin from "./components/login/registerByAdmin";
// import Dashboard from "./container/dashboard";
// import RoleAccess from "./common/roleAccess";
// import SelectDoctor from "./components/patient/Doctor/selectDoctor";
// import HealthRecords from "./components/patient/HealthRecords";
// // import ChemistRecords from "./components/patient/selectChemist";
// import InsuranceRecords from "./components/patient/InsuranceRecords";
// import LabRecords from "./components/patient/LabRecords";
// import PaitentsRecords from "./components/doctor/PaitirntRecords";
// import ClaimRequests from "./components/Insurance/ClaimRequest";
// import Paitents from "./components/lab/Paitient";
// import AddRecords from "./components/lab/AddReports";
// import GenerateBills from "./components/chemist/GenerateBill";
// import CustomerList from "./components/chemist/CustomerList";
// import DoctorData from "./components/patient/DoctorData";
// import SelectChemist from "./components/patient/selectChemist";
// import SelectLab from "./components/patient/SelectLab";
// import PharmacyRecords from "./components/patient/PharmacyRecords";
// import SelectInsuranceCompany from "./components/patient/SelectInsuranceCompany";
// import AddPatientRecords from "./components/doctor/AddPatientRecord";
// import LabData from "./components/patient/LabData";
// import Logout from "./container/logout";
// import UpdatePassword from "./components/login/updatePassword";
// import UpdateProfile from "./components/profile/updateProfile";
// // import MiniDrawer from "./components/patient/Dashboard";
// import SelectDoctorpage from "./components/patient/Doctor/SelectDoctorpage";
// import DoctorCategoryPage from "./components/patient/Doctor/DoctorCategoryPage";
// import Sidebar from "./container/sidebar";
// import { useLocation } from "react-router-dom";
// import DoctorList from "./components/doctor/DoctorList";
// function App() {
//   const location = useLocation();
//   const pathname = location.pathname;
//   return (
//     <div className="flex w-full">
//       {pathname !== "/" &&
//         pathname !== "/login" &&
//         pathname !== "/register" && (
//           <div className="hidden md:block md:w-1/5 xl:w-1/6">
//             <Sidebar />
//           </div>
//         )}
//       <div
//         className={`${
//           pathname !== "/" && pathname !== "/login" && pathname !== "/register"
//             ? "w-full md:w-4/5 xl:w-5/6 flex flex-col"
//             : "w-full"
//         }`}
//       >
//         <Navbar />
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/dashboard" element={<Dashboard />} />
//           <Route path="/update" element={<UpdatePassword />} />
//           <Route path="/select-doctor/:id" element={<SelectDoctorpage />} />
//           <Route path="/profile" element={<UpdateProfile />} />

//           {/* Admin */}

//           <Route element={<RoleAccess roles={["Admin"]} />}>
//             <Route path="/dashboard" element={<Dashboard />} />
//             <Route path="/doctor-list" element={<DoctorList />} />
//             <Route path="/add-user" element={<RegisterByAdmin />} />
//           </Route>

//           {/* Patient */}

//           <Route element={<RoleAccess roles={["patient"]} />}>
//             {/* <Route > */}
//             <Route path="/select-doctor" element={<DoctorCategoryPage />} />
//             {/* <Route path="/profile" element={<UpdateProfile />} /> */}
//             <Route path="/select-lab" element={<SelectLab />} />
//             {/* <Route path="/select-insurance-company" element={<SelectInsuranceCompany/>} /> */}
//             {/* <Route path='/select-doctor/doctor-data' element={<DoctorData/>} /> */}
//             <Route path="/health-records" element={<HealthRecords />} />
//             <Route path="/" element={<HealthRecords />} />
//             {/* <Route path="/select-pharmacy" element={<SelectChemist/>} /> */}
//             {/* <Route path="/select-pharmacy/lab-data" element={<LabData/>} /> */}
//             {/* <Route path="/lab-records" element={<LabRecords />} /> */}
//             {/* <Route path="/pharmacy-records" element={<PharmacyRecords />} /> */}
//             {/* <Route path="/insurance-records" element={<InsuranceRecords />} /> */}
//           </Route>

//           {/* Doctor */}

//           <Route element={<RoleAccess roles={["doctor"]} />}>
//             {/* <Route> */}
//             <Route path="/dashboard" element={<Dashboard />} />
//             <Route path="/patient-records" element={<PaitentsRecords />} />
//             <Route
//               path="/add-patient-records/:id"
//               element={<AddPatientRecords />}
//             />
//           </Route>

//           {/* </Route> */}

//           {/* Pharmacy */}

//           <Route element={<RoleAccess roles={["pharmacy"]} />}>
//             {/* <Route> */}
//             <Route path="/dashboard" element={<Dashboard />} />
//             {/* <Route path="/update-medicine-stock" element={<Dashboard/>} /> */}
//             <Route path="/customer-list" element={<CustomerList />} />
//             <Route path="/generate-bill" element={<GenerateBills />} />
//           </Route>

//           {/* Lab */}

//           <Route element={<RoleAccess roles={["lab"]} />}>
//             {/* <Route> */}
//             <Route path="/dashboard" element={<Dashboard />} />
//             <Route path="/add-reports" element={<AddRecords />} />
//             <Route path="/paitient-records" element={<Paitents />} />
//           </Route>

//           {/* Insurance */}

//           <Route element={<RoleAccess roles={["insurance"]} />}>
//             {/* <Route>   */}
//             <Route path="/dashboard" element={<Dashboard />} />
//             <Route path="/latest-requests" element={<ClaimRequests />} />
//           </Route>

//           <Route path="/logout" element={<Logout />} />

//           <Route path="*" element={<Page404 />} />
//         </Routes>
//       </div>
//     </div>
//   );
// }

// export default App;

// // patient
// //      /health-records
// //      /select-doctor
// //      /select-doctor/doctor-data
// //      /select-chemist
// //      /select-chemist/chemist-data
// //      /select-labs
// //      /select-labs/lab-data
// //      /insurance-records

// // doctor
// //      /select-patient
// //      /patient-history
// //      /prescription

// // chemist
// //      /select-patient
// //      /update-dispensary
// //      /update-medicine-stock

// // lab
// //      /select-patient
// //      /add-reports

// // insurance
// //      /latest-requests
// //      /patient-record
// //      /patient-claim

// // admin
// //      /add-user

//second code
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./container/home";
import Navbar from "./container/navbar";
import Page404 from "./container/page404";
import Login from "./components/login/login";
import Register from "./components/login/register";
import RegisterByAdmin from "./components/login/registerByAdmin";
import Dashboard from "./container/dashboard";
import RoleAccess from "./common/roleAccess";
import SelectDoctor from "./components/patient/Doctor/selectDoctor";
import HealthRecords from "./components/patient/HealthRecords";
// import ChemistRecords from "./components/patient/selectChemist";
import InsuranceRecords from "./components/patient/InsuranceRecords";
import LabRecords from "./components/patient/LabRecords";
import PaitentsRecords from "./components/doctor/PaitirntRecords";
import ClaimRequests from "./components/Insurance/ClaimRequest";
import Paitents from "./components/lab/Paitient";
import AddRecords from "./components/lab/AddReports";
import GenerateBills from "./components/chemist/GenerateBill";
import CustomerList from "./components/chemist/CustomerList";
import DoctorData from "./components/patient/DoctorData";
import SelectChemist from "./components/patient/selectChemist";
import SelectLab from "./components/patient/SelectLab";
import PharmacyRecords from "./components/patient/PharmacyRecords";
import SelectInsuranceCompany from "./components/patient/SelectInsuranceCompany";
import AddPatientRecords from "./components/doctor/AddPatientRecord";
import LabData from "./components/patient/LabData";
import Logout from "./container/logout";
import UpdatePassword from "./components/login/updatePassword";
import UpdateProfile from "./components/profile/updateProfile";
import ChangePassword from "./components/ChangePassword/ChangePassword"; // Import ChangePassword component

// import MiniDrawer from "./components/patient/Dashboard";
import SelectDoctorpage from "./components/patient/Doctor/SelectDoctorpage";
import DoctorCategoryPage from "./components/patient/Doctor/DoctorCategoryPage";
import Sidebar from "./container/sidebar";
import { useLocation } from "react-router-dom";
import DoctorList from "./components/doctor/DoctorList";
import LabList from "./components/lab/LabList";
import PatientDetails from "./components/doctor/PatientDetail";
import PatientCategoryPage from "./components/doctor/PatientCategory";
import PatientDetailCategory from "./components/doctor/PatientDetailCategory";
import PatientList from "./components/lab/PatientList";
import AllLabRecords from "./components/patient/AllLabRecords";

function App() {
  const location = useLocation();
  const pathname = location.pathname;
  return (
    <div className="flex w-full">
      {pathname !== "/" &&
        pathname !== "/login" &&
        pathname !== "/register" && (
          <div className="hidden md:block md:w-1/5 xl:w-1/6">
            <Sidebar />
          </div>
        )}
      <div
        className={`${
          pathname !== "/" && pathname !== "/login" && pathname !== "/register"
            ? "w-full md:w-4/5 xl:w-5/6 flex flex-col"
            : "w-full"
        }`}
      >
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/update" element={<UpdatePassword />} />
          <Route path="/select-doctor/:id" element={<SelectDoctorpage />} />
          <Route path="/profile" element={<UpdateProfile />} />
          <Route path="/updatePassword" element={<UpdatePassword />} />
          <Route path="/lab-records/:id" element={<LabRecords />} />
          <Route path="/lab-records-all/:id" element={<AllLabRecords />} />
          <Route path="/patient-records" element={<PaitentsRecords />} />
          <Route path="/view-patient-reports/:id" element={<Paitents />} />
          <Route path="/patient-list" element={<PatientList />} />
          <Route path="/pharmacy-records/:id" element={<PharmacyRecords />} />

          {/* Admin */}
          <Route element={<RoleAccess roles={["Admin"]} />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/doctor-list" element={<DoctorList />} />
            <Route path="/lab-list" element={<LabList />} />
            <Route path="/add-user" element={<RegisterByAdmin />} />
          </Route>

          {/* Patient */}
          <Route element={<RoleAccess roles={["patient"]} />}>
            <Route path="/select-doctor" element={<DoctorCategoryPage />} />
            <Route path="/select-lab" element={<SelectLab />} />
            <Route
              path="/health-records-category"
              element={<PatientDetailCategory />}
            />
            <Route
              path="/health-records/:category"
              element={<HealthRecords />}
            />

            <Route
              path="/select-insurance-company"
              element={<SelectInsuranceCompany />}
            />

            <Route path="/select-doctor/doctor-data" element={<DoctorData />} />
            <Route path="/health-records" element={<HealthRecords />} />
            <Route path="/select-pharmacy" element={<SelectChemist />} />
            <Route path="/select-pharmacy/lab-data" element={<LabData />} />
            <Route path="/lab-records" element={<LabRecords />} />
            <Route path="/pharmacy-records" element={<PharmacyRecords />} />

            <Route path="/insurance-records" element={<InsuranceRecords />} />
          </Route>

          {/* Doctor */}
          <Route element={<RoleAccess roles={["doctor"]} />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route
              path="/patient-category/:patientId"
              element={<PatientCategoryPage />}
            />
            <Route
              path="/patient-details/:category/:patientId"
              element={<PatientDetails />}
            />

            <Route
              path="/add-patient-records/:id"
              element={<AddPatientRecords />}
            />
          </Route>

          {/* Pharmacy */}
          <Route element={<RoleAccess roles={["pharmacy"]} />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/customer-list" element={<CustomerList />} />
            <Route path="/generate-bill" element={<GenerateBills />} />
          </Route>

          {/* Lab */}
          <Route element={<RoleAccess roles={["lab"]} />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/add-reports/:rid/:pid" element={<AddRecords />} />
          </Route>

          {/* Insurance */}
          <Route element={<RoleAccess roles={["insurance"]} />}>
            <Route path="/dashboard" element={<Dashboard />} />

            <Route path="/latest-requests" element={<ClaimRequests />} />
          </Route>

          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

// patient
//      /health-records
//      /select-doctor
//      /select-doctor/doctor-data
//      /select-chemist
//      /select-chemist/chemist-data
//      /select-labs
//      /select-labs/lab-data
//      /insurance-records

// doctor
//      /select-patient
//      /patient-history
//      /prescription

// chemist
//      /select-patient
//      /update-dispensary
//      /update-medicine-stock

// lab
//      /select-patient
//      /add-reports

// insurance
//      /latest-requests
//      /patient-record
//      /patient-claim

// admin
//      /add-user
