import Canteen from "../assets/images/dashboard/canteen.png";
import BuyAndSell from "../assets/images/dashboard/buysell.png";
import AutoShare from "../assets/images/dashboard/autoshare.png";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import authService from "../services/authService";
const Sidebar = () => {
  const [user, setUser] = useState(authService.getRole("orgName"));
  const [apps, setApps] = useState([]);
  const [loader, setloader] = useState(false);

  const patientDashboard = [
    {
      name: "Select Doctor",
      imgSrc: Canteen,
      link: "/select-doctor",
      blocked: false,
    },
    // {
    //   name: "Select Pharmacy",
    //   imgSrc: Canteen,
    //   link: "/select-pharmacy",
    //   blocked: false,
    // },
    {
      name: "Select Lab",
      imgSrc: Canteen,
      link: "/select-lab",
      blocked: false,
    },
    // {
    //   name: "Select Insurance Company",
    //   imgSrc: Canteen,
    //   link: "/select-insurance-company",
    //   blocked: false,
    // },
    {
      name: "Health Records",
      imgSrc: BuyAndSell,
      link: "/health-records",
      blocked: false,
    },
    // {
    //   name: "Pharmacy Records",
    //   imgSrc: AutoShare,
    //   link: "/pharmacy-records",
    //   blocked: false,
    // },
    // {
    //   name: "Lab Records",
    //   imgSrc: AutoShare,
    //   link: "/lab-records",
    //   blocked: false,
    // },
    // {
    //   name: "Insurance Records",
    //   imgSrc: AutoShare,
    //   link: "/insurance-records",
    //   blocked: false,
    // }
  ];

  const doctorDashboard = [
    {
      name: "Patient Records",
      imgSrc: Canteen,
      link: "/patient-records",
      blocked: false,
    },
  ];

  const chemistDashboard = [
    // {
    //   name: "Registered Patient",
    //   imgSrc: Canteen,
    //   link: "/registered-patient",
    //   blocked: false,
    // },
    // {
    //   name: "Generate Bill",
    //   imgSrc: Canteen,
    //   link: "/generate-bill",
    //   blocked: false,
    // }
    {
      name: "Patient Records",
      imgSrc: Canteen,
      link: "/patient-records",
      blocked: false,
    },
  ];

  const labDashboard = [
    // {
    //   name: "Add Reports",
    //   imgSrc: Canteen,
    //   link: "/add-reports",
    //   blocked: false,
    // }
    {
      name: "Patient Records",
      imgSrc: Canteen,
      link: "/patient-records",
      blocked: false,
    },
  ];

  const insuranceDashboard = [
    // {
    //   name: "Latest Requests",
    //   imgSrc: Canteen,
    //   link: "/latest-requests",
    //   blocked: false,
    // }
    {
      name: "Patient Records",
      imgSrc: Canteen,
      link: "/patient-records",
      blocked: false,
    },
  ];

  const adminDashboard = [
    {
      name: "Add User",
      imgSrc: Canteen,
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
    setloader(true);
  }, [user]);
  console.log(user);
  const navigate = useNavigate();
  return (
    <div className="bg-gray-50 h-screen">
      <div className="capitalize h-16 bg-black text-white flex items-center justify-center">
        {user} Dashboard
      </div>
      {!loader ? (
        <>Loading.......</>
      ) : (
        <>
          <div className="flex flex-col">
            {apps?.map((app, index) => (
              <div
                className="hover:cursor-pointer"
                key={index}
                onClick={() => {
                  app.blocked ? <></> : navigate(`${app.link}`);
                }}
              >
                <div
                  // to={`${app.link}`}
                  className=""
                >
                  {/* <img
                  src={app.imgSrc}
                  className="object-scale-down h-28 w-32 mb-5 "
                  alt={`${app.name}`}
                /> */}
                  {app.name}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
