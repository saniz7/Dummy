import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaUserMd, FaFlask, FaFileMedical, FaUsers, FaPills, FaBriefcaseMedical } from "react-icons/fa";
import authService from "../services/authService";
import Canteen from "../assets/images/dashboard/canteen.png";
import BuyAndSell from "../assets/images/dashboard/buysell.png";
import AutoShare from "../assets/images/dashboard/autoshare.png";

const Sidebar = () => {
  const [user, setUser] = useState(authService.getRole("orgName"));
  const [apps, setApps] = useState([]);
  const [loader, setLoader] = useState(false);
  const [selected, setSelected] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const patientDashboard = [
    {
      name: "Select Doctor",
      icon: <FaUserMd />,
      link: "/select-doctor",
      blocked: false,
    },
    {
      name: "Select Lab",
      icon: <FaFlask />,
      link: "/select-lab",
      blocked: false,
    },
    {
      name: "Health Records",
      icon: <FaFileMedical />,
      link: "/health-records",
      blocked: false,
    },
  ];

  const doctorDashboard = [
    {
      name: "Patient Records",
      icon: <FaFileMedical />,
      link: "/patient-records",
      blocked: false,
    },
  ];

  const chemistDashboard = [
    {
      name: "Patient Records",
      icon: <FaFileMedical />,
      link: "/patient-records",
      blocked: false,
    },
  ];

  const labDashboard = [
    {
      name: "Patient Records",
      icon: <FaFileMedical />,
      link: "/patient-records",
      blocked: false,
    },
  ];

  const insuranceDashboard = [
    {
      name: "Patient Records",
      icon: <FaFileMedical />,
      link: "/patient-records",
      blocked: false,
    },
  ];

  const adminDashboard = [
    {
      name: "Add User",
      icon: <FaUsers />,
      link: "/add-user",
      blocked: false,
    },
  ];

  useEffect(() => {
    if (user === "patient") {
      setApps(patientDashboard);
    } else if (user === "doctor") {
      setApps(doctorDashboard);
    } else if (user === "pharmacy") {
      setApps(chemistDashboard);
    } else if (user === "lab") {
      setApps(labDashboard);
    } else if (user === "insurance") {
      setApps(insuranceDashboard);
    } else if (user === "Admin") {
      setApps(adminDashboard);
    }
    setLoader(true);
  }, [user]);

  useEffect(() => {
    setSelected(location.pathname);
  }, [location.pathname]);

  return (
    <div className="bg-gray-50 h-screen">
      <div className="capitalize h-16 bg-gray-800 text-white flex items-center justify-center">
        {user} Dashboard
      </div>
      {!loader ? (
        <>Loading.......</>
      ) : (
        <div className="flex flex-col p-4">
          {apps.map((app, index) => (
            <div
              key={index}
              className={`flex items-center p-2 my-2 rounded cursor-pointer 
                ${selected === app.link ? "bg-gray-800 text-white" : "bg-gray-200 text-gray-700"}`}
              onClick={() => {
                if (!app.blocked) {
                  navigate(app.link);
                }
              }}
            >
              <div className="mr-3">{app.icon}</div>
              <div>{app.name}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
