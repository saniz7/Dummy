import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../../common/loader";
import profileService from "../../services/profileService";
import PatientProfile from "./PatientProfile";
import DoctorProfile from "./DoctorProfile";
import authService from "../../services/authService";
import LabProfile from "./LabProfile";

function UpdateProfile() {
  const location = useLocation();
  const userRole = authService.getRole();

  const [loader, setLoader] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [username, setUsername] = useState("");
  const [gender, setGender] = useState("");
  const [blood, setBlood] = useState("");
  const [date, setDate] = useState("");
  const [fullAddress, setFullAddress] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [profileImageUpload, setProfileImageUpload] = useState();
  const [textPrompt, setTextPrompt] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [userType, setUserType] = useState("");
  const [degree, setDegree] = useState("");
  const [department, setDepartment] = useState("");
  const [NMCnumber, setNMCnumber] = useState("");

  // New state variables for LabProfile
  const [labName, setLabName] = useState("");
  const [labAddress, setLabAddress] = useState("");
  const [labContact, setLabContact] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [labId, setLabId] = useState("");

  const navigate = useNavigate();

  const getProfile = async () => {
    setLoader(true);

    if (location.state) {
      setTextPrompt(location.state.promptText);
    }

    const res = await profileService.getProfileToUpdate();
    console.log("res", res?.data);

    if (res?.data) {
      const userData = res?.data?.userDataFromLedger;
      setUsername(res?.data?.user?.userName ? res?.data?.user?.userName : "");
      setGender(userData?.gender ? userData?.gender : "");
      setFullAddress(userData?.address ? userData?.address : "");
      setPhoneNo(userData?.contact ? userData?.contact : "");
      setDate(userData?.dob ? userData?.dob : "");
      setProfileImage(res.data.user.image ? res.data.user.image : "");
      setProfileImageUpload(res.data.user.image ? res.data.user.image : "");

      setUserType(res.data.user?.type ? res.data.user.type : "");

      if (res.data.user.orgName === "doctor") {
        setDegree(userData?.degree ? userData?.degree : "");
        setDepartment(userData?.department ? userData?.department : "");
        setNMCnumber(userData?.NMCnumber ? userData?.NMCnumber : "");
      } else if (res.data.user.orgName === "lab") {
        setLabName(userData?.name ? userData?.name : "");
        setLabAddress(userData?.address ? userData?.address : "");
        setLabContact(userData?.contact ? userData?.contact : "");
        setCreatedAt(userData?.createdAt ? userData?.createdAt : "");
        setLabId(userData?.labId ? userData?.labId : "");
      } else {
        setBlood(userData?.bloodGroup ? userData?.bloodGroup : "");
      }
    }

    setLoader(false);
  };

  useEffect(() => {
    getProfile();
  }, []);

  const handleUpdateDataChange = (e) => {
    if (e.target.files[0].size / 1024 > 4096) {
      setError("Image size should be less than 4MB");
      setProfileImageUpload("");
      return;
    } else {
      const reader = new FileReader();
      setProfileImageUpload("");
      reader.onload = () => {
        if (reader.readyState === 2) {
          setProfileImage(reader.result);
          setProfileImageUpload(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const postProfile = async (e) => {
    setLoader(true);
    e.preventDefault();
    setError("");
    setSuccess("");

    const data = {
      username: username,
      contact: phoneNo,
      address: fullAddress,
      gender: gender,
      dob: date,
      // image: profileImageUpload,
    };

    if (userRole === "doctor") {
      data.degree = degree;
      data.department = department;
      data.NMCnumber = NMCnumber;
    } else if (userRole === "lab") {
      data.name = labName;
      data.address = labAddress;
      data.contact = labContact;
    } else {
      data.bloodGroup = blood;
    }

    try {
      const res = await profileService.updateProfile({
        args: [date, gender, phoneNo, blood, fullAddress],
        fcn: userType === "doctor" ? "updateDoctor" : "updatePatient",
        orgName:
          userType === "doctor"
            ? "doctor"
            : userType === "lab"
            ? "lab"
            : "patient",
        // password,
        username,
      });
      if (res.data.success) {
        setLoader(false);
        setTextPrompt("");
        localStorage.setItem("profile", true);
        setSuccess(res.data.message + "!");

        setTimeout(() => {
          navigate("/profile");
        }, 1000);
      } else {
        setLoader(false);
        setError("Something went wrong!!!");
      }
    } catch (error) {
      setError("Something went wrong!!!");
      setLoader(false);
    }
  };

  return (
    <>
      <div>
        {userRole === "doctor" ? (
          <DoctorProfile
            name={username}
            gender={gender}
            dob={date}
            department={department}
            degree={degree}
            NMCnumber={NMCnumber}
            contact={phoneNo}
            profileImage={profileImage}
            textPrompt={textPrompt}
          />
        ) : userRole === "lab" ? (
          <LabProfile
            labName={labName}
            labAddress={labAddress}
            labContact={labContact}
            createdAt={createdAt}
            labId={labId}
            profileImage={profileImage}
            textPrompt={textPrompt}
          />
        ) : (
          <PatientProfile
            username={username}
            gender={gender}
            blood={blood}
            date={date}
            fullAddress={fullAddress}
            phoneNo={phoneNo}
            profileImage={profileImage}
            editMode={editMode} // Pass editMode to PatientProfile
            setUsername={setUsername}
            setGender={setGender}
            setBlood={setBlood}
            setDate={setDate}
            setFullAddress={setFullAddress}
            setPhoneNo={setPhoneNo}
            handleUpdateDataChange={handleUpdateDataChange}
            textPrompt={textPrompt}
          />
        )}
        {userRole === "patient" &&
          !editMode && ( // Render Edit button only for patient and when not in editMode
            <div className="text-center mb-3 font-bold uppercase">
              <button
                className="bg-indigo-600 text-white active:bg-indigo-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                onClick={() => setEditMode(true)}
              >
                Edit
              </button>
            </div>
          )}
        {editMode &&
          userRole === "patient" && ( // Render Form only when in editMode and userRole is patient
            <form onSubmit={(e) => postProfile(e)}>
              {error ? (
                <div className="text-red-500 text-sm text-center">{error}</div>
              ) : null}
              {success ? (
                <div className="text-green-500 text-sm text-center">
                  {success}
                </div>
              ) : null}
              <div className="text-center mt-4">
                <button
                  className="bg-indigo-600 text-white active:bg-indigo-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                  type="submit"
                  style={{ transition: "all 0.15s ease 0s" }}
                  disabled={loader}
                >
                  {loader ? <Loader height={5} width={5} /> : "Submit"}
                </button>
              </div>
            </form>
          )}
      </div>
    </>
  );
}

export default UpdateProfile;
