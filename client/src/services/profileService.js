import httpService from "./httpService";
const apiEndpoint = "/profile-me";

function getProfile() {
  return httpService.get(apiEndpoint);
}

function getProfileToUpdate() {
  return httpService.get("/get-user-detail-self");
}
function getDoctorList() {
  return httpService.get("/doctorlist");
}
function getLabList() {
  return httpService.get("/lablist");
}

function updateProfile(data) {
  console.log(data);
  return httpService.patch("/update-patient", data);
}
function deleteProfile(id) {
  return httpService.delete(`/doctor/${id}`);
}
function deleteLabProfile(id) {
  return httpService.delete(`/lab/${id}`);
}

const profileService = {
  getProfile,
  getDoctorList,
  updateProfile,
  deleteProfile,
  deleteLabProfile,
  getProfileToUpdate,
  getLabList,
};

export default profileService;
