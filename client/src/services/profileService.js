import httpService from "./httpService";
const apiEndpoint = "/profile-me";

function getProfile() {
    return httpService.get(apiEndpoint);
}

function getProfileToUpdate(){
    return httpService.get("/get-user-detail-self");
}

function updateProfile(data) {
    console.log(data);
    return httpService.patch("/update-patient", data);
}

const profileService = { getProfile, updateProfile, getProfileToUpdate };

export default profileService;